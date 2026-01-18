-- Manhaj Islamic Studies - Search & Performance
-- Senior Architect: Manus
-- Date: 2026-01-18

-- 1. Fuzzy Search Support (Arabic)
-- Enable pg_trgm for trigram-based fuzzy matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add GIST indexes for fuzzy search on Arabic names
CREATE INDEX IF NOT EXISTS idx_modules_name_ar_trgm ON modules USING GIST (name_ar gist_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_topics_title_ar_trgm ON topics USING GIST (title_ar gist_trgm_ops);

-- 2. Covering Indexes for Hot Queries
-- Home Page: List programs
CREATE INDEX IF NOT EXISTS idx_programs_home ON programs (is_active, is_public) INCLUDE (name_ar, name_en, icon, color);

-- Module Page: List topics
CREATE INDEX IF NOT EXISTS idx_topics_module_list ON topics (module_id, status, order_index) INCLUDE (title_ar, title_en);

-- 3. Arabic Search Refinement
-- The existing tsvector is good. Let's add a trigger to ensure it's always updated if not already generated.
-- (The original used GENERATED ALWAYS, which is perfect).

-- 4. Performance: Index for denormalized org_id
CREATE INDEX IF NOT EXISTS idx_modules_org_id ON modules (org_id);
CREATE INDEX IF NOT EXISTS idx_topics_org_id ON topics (org_id);

-- 5. Academic Ordering Index
CREATE INDEX IF NOT EXISTS idx_semesters_order ON semesters (year_id, order_index);
