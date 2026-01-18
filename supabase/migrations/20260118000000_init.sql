-- Manhaj Islamic Studies Platform - Initial Schema
-- Senior Backend Architect: Manus
-- Date: 2026-01-18

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For search normalization

-- Custom Types
DO $$ BEGIN
    CREATE TYPE academic_degree_type AS ENUM ('licence', 'master', 'doctorate');
    CREATE TYPE module_category AS ENUM ('fundamental', 'methodology', 'discovery', 'transversal', 'optional');
    CREATE TYPE content_status AS ENUM ('draft', 'review', 'published', 'archived');
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'editor', 'student');
    CREATE TYPE attachment_type AS ENUM ('pdf', 'docx', 'png', 'jpg', 'mp4', 'mp3', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Organizations (Multi-tenancy support)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles (User extension)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES organizations(id),
    full_name_ar TEXT,
    full_name_en TEXT,
    role user_role DEFAULT 'student',
    avatar_url TEXT,
    bio_ar TEXT,
    bio_en TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Programs / Specialties
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) NOT NULL,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    degree_type academic_degree_type NOT NULL,
    icon TEXT,
    color TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academic Years
CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE NOT NULL,
    year_number INTEGER NOT NULL, -- 1, 2, 3
    name_ar TEXT NOT NULL,
    name_en TEXT,
    is_common_core BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(program_id, year_number)
);

-- 5. Semesters
CREATE TABLE IF NOT EXISTS semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    semester_number INTEGER NOT NULL, -- 1, 2
    name_ar TEXT NOT NULL,
    name_en TEXT,
    weeks_count INTEGER DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(year_id, semester_number)
);

-- 6. Modules (Courses)
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    semester_id UUID REFERENCES semesters(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL, -- e.g., UEF-111
    name_ar TEXT NOT NULL,
    name_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    category module_category NOT NULL,
    credits INTEGER DEFAULT 0,
    coefficient INTEGER DEFAULT 1,
    weekly_lecture_hours NUMERIC(4,2) DEFAULT 0,
    weekly_tutorial_hours NUMERIC(4,2) DEFAULT 0,
    weekly_practical_hours NUMERIC(4,2) DEFAULT 0,
    icon TEXT,
    color TEXT,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Topics (Lessons)
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
    order_index INTEGER NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    status content_status DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Summaries (Student-friendly content)
CREATE TABLE IF NOT EXISTS summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE NOT NULL,
    content_ar TEXT NOT NULL, -- Markdown/HTML
    content_en TEXT,
    version INTEGER DEFAULT 1,
    is_current BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Diagrams (Tashjeer / Trees)
CREATE TABLE IF NOT EXISTS diagrams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE, -- Can be module-level or topic-level
    title_ar TEXT NOT NULL,
    title_en TEXT,
    diagram_type TEXT DEFAULT 'mermaid', -- mermaid, json, svg
    definition TEXT NOT NULL, -- The actual code/json
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Storage Buckets Metadata
CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Path in Supabase Storage
    file_size INTEGER,
    content_type attachment_type NOT NULL,
    content_hash TEXT, -- For deduplication
    version INTEGER DEFAULT 1,
    is_official BOOLEAN DEFAULT false, -- Official teacher source
    is_deleted BOOLEAN DEFAULT false, -- Soft delete
    deleted_at TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. References & Links
CREATE TABLE IF NOT EXISTS external_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    url TEXT NOT NULL,
    ref_type TEXT, -- book, article, video
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL, -- INSERT, UPDATE, DELETE
    old_data JSONB,
    new_data JSONB,
    changed_by UUID REFERENCES profiles(id),
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all relevant tables
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('organizations', 'profiles', 'programs', 'academic_years', 'semesters', 'modules', 'topics', 'summaries', 'diagrams', 'attachments')
    LOOP
        EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()', t, t);
    END LOOP;
END $$;

-- Indexes for Performance
CREATE INDEX idx_modules_semester ON modules(semester_id);
CREATE INDEX idx_topics_module ON topics(module_id, order_index);
CREATE INDEX idx_summaries_topic ON summaries(topic_id) WHERE is_current = true;
CREATE INDEX idx_attachments_module ON attachments(module_id) WHERE is_deleted = false;
CREATE INDEX idx_attachments_topic ON attachments(topic_id) WHERE is_deleted = false;

-- Full-Text Search (Arabic)
-- We use a generated column for search to keep it fast
ALTER TABLE modules ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('arabic', coalesce(name_ar, '') || ' ' || coalesce(description_ar, ''))
) STORED;

ALTER TABLE topics ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('arabic', coalesce(title_ar, '') || ' ' || coalesce(description_ar, ''))
) STORED;

CREATE INDEX idx_modules_search ON modules USING GIN(search_vector);
CREATE INDEX idx_topics_search ON topics USING GIN(search_vector);
