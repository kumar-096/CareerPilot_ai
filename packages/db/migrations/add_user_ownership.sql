-- add_user_ownership.sql
-- Safely execute alter tables mapping schema securely accurately without dropping native states.

ALTER TABLE readiness_snapshots ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
ALTER TABLE trust_snapshots ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
ALTER TABLE interview_sessions ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
ALTER TABLE progress_snapshots ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
ALTER TABLE roadmap_snapshots ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
ALTER TABLE activity_events ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL DEFAULT 'dev-user-001';
