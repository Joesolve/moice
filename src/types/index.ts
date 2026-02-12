export type UserRole = "citizen" | "contributor" | "admin";

export type DataPointStatus = "draft" | "pending_review" | "verified" | "rejected" | "archived";

export interface Ministry {
  id: string;
  name: string;
  abbreviation: string;
  description: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  ministry_id: string | null;
  ministry?: Ministry;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface DataPoint {
  id: string;
  title: string;
  summary: string;
  body: string;
  category_id: string | null;
  category?: Category;
  ministry_id: string;
  ministry?: Ministry;
  submitted_by: string;
  reviewed_by: string | null;
  status: DataPointStatus;
  source_url: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  verified_at: string | null;
}

export interface AuditEntry {
  id: string;
  data_point_id: string;
  user_id: string;
  profile?: Profile;
  action: string;
  changes: Record<string, unknown> | null;
  created_at: string;
}

export interface SearchResult {
  data_points: DataPoint[];
  total: number;
  query: string;
}
