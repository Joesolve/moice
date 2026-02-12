-- ============================================================
-- Sierra Leone National Knowledge Hub - Database Schema
-- Ministry of Information and Civic Education (MOICE)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. MINISTRIES
-- ============================================================
CREATE TABLE ministries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed ministries
INSERT INTO ministries (name, abbreviation, description) VALUES
  ('Ministry of Information and Civic Education', 'MOICE', 'Responsible for public information and civic engagement'),
  ('Ministry of Health and Sanitation', 'MoHS', 'Responsible for health policy and sanitation programs'),
  ('Ministry of Finance', 'MoF', 'Responsible for fiscal policy and national budget'),
  ('Ministry of Basic and Senior Secondary Education', 'MBSSE', 'Responsible for basic and secondary education'),
  ('Ministry of Works and Public Assets', 'MoWPA', 'Responsible for infrastructure and public works'),
  ('Ministry of Agriculture and Food Security', 'MAF', 'Responsible for agricultural policy and food security');

-- ============================================================
-- 2. PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'contributor', 'admin')),
  ministry_id UUID REFERENCES ministries(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO categories (name, slug, description) VALUES
  ('Health', 'health', 'Public health statistics and programs'),
  ('Budget & Finance', 'budget-finance', 'Government spending and fiscal data'),
  ('Education', 'education', 'Education statistics and programs'),
  ('Infrastructure', 'infrastructure', 'Roads, bridges, and public works'),
  ('Agriculture', 'agriculture', 'Agricultural output and programs'),
  ('Governance', 'governance', 'Government policy and administration');

-- ============================================================
-- 4. DATA POINTS (core content)
-- ============================================================
CREATE TABLE data_points (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  summary      TEXT NOT NULL,
  body         TEXT NOT NULL,
  category_id  UUID REFERENCES categories(id) ON DELETE SET NULL,
  ministry_id  UUID NOT NULL REFERENCES ministries(id) ON DELETE RESTRICT,
  submitted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  reviewed_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status       TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending_review', 'verified', 'rejected', 'archived')),
  source_url   TEXT,
  tags         TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at  TIMESTAMPTZ
);

-- Full-text search index using tsvector
ALTER TABLE data_points ADD COLUMN fts tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B')
  ) STORED;

CREATE INDEX idx_data_points_fts ON data_points USING GIN (fts);
CREATE INDEX idx_data_points_status ON data_points (status);
CREATE INDEX idx_data_points_ministry ON data_points (ministry_id);
CREATE INDEX idx_data_points_category ON data_points (category_id);
CREATE INDEX idx_data_points_created ON data_points (created_at DESC);

-- ============================================================
-- 5. AUDIT TRAIL
-- ============================================================
CREATE TABLE audit_trail (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data_point_id UUID NOT NULL REFERENCES data_points(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  action        TEXT NOT NULL CHECK (action IN (
    'created', 'updated', 'submitted_for_review',
    'verified', 'rejected', 'archived', 'restored'
  )),
  changes       JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_trail_data_point ON audit_trail (data_point_id, created_at DESC);

-- ============================================================
-- 6. AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_data_points_updated_at
  BEFORE UPDATE ON data_points
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Data Points
ALTER TABLE data_points ENABLE ROW LEVEL SECURITY;

-- Anyone can read verified data points
CREATE POLICY "Verified data points are public"
  ON data_points FOR SELECT
  USING (status = 'verified');

-- Contributors can see their own data points in any status
CREATE POLICY "Contributors can see own data points"
  ON data_points FOR SELECT
  USING (auth.uid() = submitted_by);

-- Admins can see all data points
CREATE POLICY "Admins can see all data points"
  ON data_points FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contributors can insert data points for their ministry
CREATE POLICY "Contributors can insert data points"
  ON data_points FOR INSERT
  WITH CHECK (
    auth.uid() = submitted_by
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('contributor', 'admin')
      AND (ministry_id = data_points.ministry_id OR role = 'admin')
    )
  );

-- Contributors can update their own draft/rejected data points
CREATE POLICY "Contributors can update own drafts"
  ON data_points FOR UPDATE
  USING (
    auth.uid() = submitted_by
    AND status IN ('draft', 'rejected')
  );

-- Admins can update any data point (for review workflow)
CREATE POLICY "Admins can update all data points"
  ON data_points FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit Trail
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit trail is viewable by authenticated users"
  ON audit_trail FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Audit entries are created by system"
  ON audit_trail FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Ministries (read-only for everyone)
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ministries are viewable by everyone"
  ON ministries FOR SELECT USING (true);

-- Categories (read-only for everyone)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (true);

-- ============================================================
-- 8. FULL-TEXT SEARCH FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION search_data_points(search_query TEXT)
RETURNS SETOF data_points AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM data_points
  WHERE status = 'verified'
    AND fts @@ plainto_tsquery('english', search_query)
  ORDER BY ts_rank(fts, plainto_tsquery('english', search_query)) DESC;
END;
$$ LANGUAGE plpgsql;
