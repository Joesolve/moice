-- ============================================================
-- Sierra Leone National Knowledge Hub - Ministry Reports
-- Ministry of Information and Civic Education (MOICE)
-- ============================================================

-- ============================================================
-- 1. MINISTRY REPORTS TABLE
-- ============================================================
CREATE TABLE ministry_reports (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  summary       TEXT NOT NULL,
  body          TEXT NOT NULL,
  ministry_id   UUID NOT NULL REFERENCES ministries(id) ON DELETE RESTRICT,
  submitted_by  UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  reviewed_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status        TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'published', 'rejected')),
  report_type   TEXT NOT NULL
    CHECK (report_type IN ('quarterly', 'annual', 'special', 'update')),
  period        TEXT NOT NULL,
  attachments   TEXT[] DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at  TIMESTAMPTZ
);

CREATE INDEX idx_ministry_reports_status ON ministry_reports (status);
CREATE INDEX idx_ministry_reports_ministry ON ministry_reports (ministry_id);
CREATE INDEX idx_ministry_reports_type ON ministry_reports (report_type);
CREATE INDEX idx_ministry_reports_created ON ministry_reports (created_at DESC);

-- Auto-update updated_at
CREATE TRIGGER trigger_ministry_reports_updated_at
  BEFORE UPDATE ON ministry_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 2. NEWS ARTICLES TABLE
-- ============================================================
CREATE TABLE news_articles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL,
  body          TEXT NOT NULL,
  ministry_id   UUID NOT NULL REFERENCES ministries(id) ON DELETE RESTRICT,
  category      TEXT NOT NULL,
  image_url     TEXT,
  published_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured   BOOLEAN NOT NULL DEFAULT false,
  tags          TEXT[] DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_news_articles_published ON news_articles (published_at DESC);
CREATE INDEX idx_news_articles_featured ON news_articles (is_featured) WHERE is_featured = true;
CREATE INDEX idx_news_articles_ministry ON news_articles (ministry_id);

-- Auto-update updated_at
CREATE TRIGGER trigger_news_articles_updated_at
  BEFORE UPDATE ON news_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 3. ROW LEVEL SECURITY
-- ============================================================

-- Ministry Reports
ALTER TABLE ministry_reports ENABLE ROW LEVEL SECURITY;

-- Published reports are public
CREATE POLICY "Published reports are public"
  ON ministry_reports FOR SELECT
  USING (status = 'published');

-- Contributors can see their own reports
CREATE POLICY "Contributors can see own reports"
  ON ministry_reports FOR SELECT
  USING (auth.uid() = submitted_by);

-- Admins can see all reports
CREATE POLICY "Admins can see all reports"
  ON ministry_reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contributors can insert reports for their ministry
CREATE POLICY "Contributors can insert reports"
  ON ministry_reports FOR INSERT
  WITH CHECK (
    auth.uid() = submitted_by
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('contributor', 'admin')
      AND (ministry_id = ministry_reports.ministry_id OR role = 'admin')
    )
  );

-- Contributors can update own draft/rejected reports
CREATE POLICY "Contributors can update own draft reports"
  ON ministry_reports FOR UPDATE
  USING (
    auth.uid() = submitted_by
    AND status IN ('draft', 'rejected')
  );

-- Admins can update any report
CREATE POLICY "Admins can update all reports"
  ON ministry_reports FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- News Articles
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Published news is public
CREATE POLICY "News articles are public"
  ON news_articles FOR SELECT USING (true);

-- Only admins can insert/update news
CREATE POLICY "Admins can manage news"
  ON news_articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
