-- Manhaj Islamic Studies - Structural Hardening v2
-- Senior Architect: Manus
-- Date: 2026-01-18

-- 1. Denormalize org_id for RLS Performance
-- This allows RLS to check tenant isolation without deep joins.
ALTER TABLE academic_years ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);
ALTER TABLE semesters ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);
ALTER TABLE modules ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);
ALTER TABLE topics ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES organizations(id);

-- 2. Data Migration: Populate denormalized org_id
UPDATE academic_years ay SET org_id = p.org_id FROM programs p WHERE ay.program_id = p.id;
UPDATE semesters s SET org_id = ay.org_id FROM academic_years ay WHERE s.year_id = ay.id;
UPDATE modules m SET org_id = s.org_id FROM semesters s WHERE m.semester_id = s.id;
UPDATE topics t SET org_id = m.org_id FROM modules m WHERE t.module_id = m.id;

-- 3. Enforce NOT NULL on denormalized columns
ALTER TABLE academic_years ALTER COLUMN org_id SET NOT NULL;
ALTER TABLE semesters ALTER COLUMN org_id SET NOT NULL;
ALTER TABLE modules ALTER COLUMN org_id SET NOT NULL;
ALTER TABLE topics ALTER COLUMN org_id SET NOT NULL;

-- 4. Academic Integrity: Unique Constraints
-- Ensure module codes are unique within an organization
ALTER TABLE modules ADD CONSTRAINT unique_module_code_per_org UNIQUE (org_id, code);

-- 5. Academic Ordering
-- Add order_index to semesters if not present
ALTER TABLE semesters ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 1;

-- 6. Refine Enums
-- Add 'verified_student' to user_role if needed, but for now we'll stick to the existing roles and use a flag.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- 7. Triggers to maintain denormalized org_id
CREATE OR REPLACE FUNCTION sync_org_id()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'academic_years' THEN
        SELECT org_id INTO NEW.org_id FROM programs WHERE id = NEW.program_id;
    ELSIF TG_TABLE_NAME = 'semesters' THEN
        SELECT org_id INTO NEW.org_id FROM academic_years WHERE id = NEW.year_id;
    ELSIF TG_TABLE_NAME = 'modules' THEN
        SELECT org_id INTO NEW.org_id FROM semesters WHERE id = NEW.semester_id;
    ELSIF TG_TABLE_NAME = 'topics' THEN
        SELECT org_id INTO NEW.org_id FROM modules WHERE id = NEW.module_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sync_org_id_ay BEFORE INSERT ON academic_years FOR EACH ROW EXECUTE FUNCTION sync_org_id();
CREATE TRIGGER trigger_sync_org_id_s BEFORE INSERT ON semesters FOR EACH ROW EXECUTE FUNCTION sync_org_id();
CREATE TRIGGER trigger_sync_org_id_m BEFORE INSERT ON modules FOR EACH ROW EXECUTE FUNCTION sync_org_id();
CREATE TRIGGER trigger_sync_org_id_t BEFORE INSERT ON topics FOR EACH ROW EXECUTE FUNCTION sync_org_id();

-- 8. Comments for future contributors
COMMENT ON COLUMN modules.org_id IS 'Denormalized from programs for RLS performance.';
COMMENT ON COLUMN topics.org_id IS 'Denormalized from modules for RLS performance.';
