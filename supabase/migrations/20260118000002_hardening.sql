-- Manhaj Islamic Studies Platform - Hardening Patch
-- Senior Backend Architect: Manus
-- Date: 2026-01-18

-- 1. Fix Profiles table: Remove default UUID generation, enforce NOT NULL for audit fields
ALTER TABLE profiles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE profiles ALTER COLUMN full_name_ar SET NOT NULL;
ALTER TABLE profiles ALTER COLUMN role SET NOT NULL;

-- 2. Enforce NOT NULL on audit fields for Programs
ALTER TABLE programs ALTER COLUMN created_by SET NOT NULL;

-- 3. Enforce NOT NULL on audit fields for Modules
ALTER TABLE modules ALTER COLUMN created_by SET NOT NULL;

-- 4. Enforce NOT NULL on audit fields for Topics
ALTER TABLE topics ALTER COLUMN created_by SET NOT NULL;

-- 5. Enforce NOT NULL on audit fields for Summaries
ALTER TABLE summaries ALTER COLUMN created_by SET NOT NULL;

-- 6. Enforce NOT NULL on audit fields for Diagrams
ALTER TABLE diagrams ALTER COLUMN created_by SET NOT NULL;

-- 7. Enforce NOT NULL on audit fields for Attachments
ALTER TABLE attachments ALTER COLUMN created_by SET NOT NULL;

-- 8. Fix Summaries versioning with Partial Unique Index
-- This ensures only one summary is marked as 'is_current' per topic.
CREATE UNIQUE INDEX idx_summaries_current_version ON summaries (topic_id) WHERE is_current = true;

-- 9. Add Partial Index for Soft Delete filtering on Attachments
-- This speeds up queries that only look for active attachments.
CREATE UNIQUE INDEX idx_attachments_active_path ON attachments (file_path) WHERE is_deleted = false;

-- 10. Add NOT NULL constraint to file_path in Attachments
ALTER TABLE attachments ALTER COLUMN file_path SET NOT NULL;

-- 11. Add a Partial Index for the Publishing Workflow (Topics)
-- Speeds up fetching published topics for a module.
CREATE INDEX idx_topics_published_module ON topics (module_id, order_index) WHERE status = 'published';

-- 12. Add a Partial Index for the Publishing Workflow (Modules)
-- Speeds up fetching published modules for a semester.
CREATE INDEX idx_modules_published_semester ON modules (semester_id) WHERE is_published = true;

-- 13. Add a Partial Index for Tenant Isolation on Programs
-- Speeds up fetching programs for a specific organization.
CREATE INDEX idx_programs_org_active ON programs (org_id) WHERE is_active = true;

-- 14. Add NOT NULL constraint to name_ar in Academic Years
ALTER TABLE academic_years ALTER COLUMN name_ar SET NOT NULL;

-- 15. Add NOT NULL constraint to name_ar in Semesters
ALTER TABLE semesters ALTER COLUMN name_ar SET NOT NULL;

-- 16. Add NOT NULL constraint to name_ar in Modules
ALTER TABLE modules ALTER COLUMN name_ar SET NOT NULL;

-- 17. Add NOT NULL constraint to title_ar in Topics
ALTER TABLE topics ALTER COLUMN title_ar SET NOT NULL;

-- 18. Add NOT NULL constraint to title_ar in Diagrams
ALTER TABLE diagrams ALTER COLUMN title_ar SET NOT NULL;

-- 19. Add NOT NULL constraint to title_ar in External References
ALTER TABLE external_references ALTER COLUMN title_ar SET NOT NULL;

-- 20. Add NOT NULL constraint to url in External References
ALTER TABLE external_references ALTER COLUMN url SET NOT NULL;

-- 21. Add a CHECK constraint to enforce publishing workflow order
-- This ensures a topic cannot be published without a published_at timestamp.
ALTER TABLE topics ADD CONSTRAINT check_published_at_if_published CHECK (
    (status <> 'published') OR (status = 'published' AND published_at IS NOT NULL)
);

-- 22. Add a CHECK constraint to enforce module code format (e.g., UEF-111)
ALTER TABLE modules ADD CONSTRAINT check_module_code_format CHECK (
    code ~ '^[A-Z]{3}-\d{3}$'
);

-- 23. Add a CHECK constraint to enforce semester number range
ALTER TABLE semesters ADD CONSTRAINT check_semester_number_range CHECK (
    semester_number BETWEEN 1 AND 6
);

-- 24. Update the updated_at trigger to use the correct function name (it was missing in the original file)
-- The original file defined the function but did not apply the trigger correctly to all tables.
-- The original file's trigger application was inside a DO block, which is fine, but I will ensure the function is defined and the triggers are applied correctly here for idempotency.

-- Redefine the function to ensure it exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables that might have been missed or for safety
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('organizations', 'profiles', 'programs', 'academic_years', 'semesters', 'modules', 'topics', 'summaries', 'diagrams', 'attachments')
    LOOP
        -- Drop if exists to ensure the trigger is applied correctly
        EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON %I', t, t);
        EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()', t, t);
    END LOOP;
END $$;

-- 25. Add a CHECK constraint to ensure topic_id or module_id is present in Diagrams
ALTER TABLE diagrams ADD CONSTRAINT check_topic_or_module_id CHECK (
    (topic_id IS NOT NULL AND module_id IS NULL) OR (topic_id IS NULL AND module_id IS NOT NULL)
);

-- 26. Add a CHECK constraint to ensure topic_id or module_id is present in Attachments
ALTER TABLE attachments ADD CONSTRAINT check_topic_or_module_id_attachment CHECK (
    (topic_id IS NOT NULL AND module_id IS NULL) OR (topic_id IS NULL AND module_id IS NOT NULL) OR (topic_id IS NOT NULL AND module_id IS NOT NULL)
);
-- Note: Allowing both for attachments is acceptable, e.g., a file that applies to both.
-- The original design allowed both to be NULL via ON DELETE SET NULL, which is risky.
-- We will enforce at least one is present.
ALTER TABLE attachments DROP CONSTRAINT IF EXISTS check_topic_or_module_id_attachment;
ALTER TABLE attachments ADD CONSTRAINT check_topic_or_module_id_attachment CHECK (
    topic_id IS NOT NULL OR module_id IS NOT NULL
);
