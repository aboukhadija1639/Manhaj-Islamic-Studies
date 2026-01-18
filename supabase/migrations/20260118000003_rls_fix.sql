-- Manhaj Islamic Studies Platform - RLS Security Patch
-- Senior Backend Architect: Manus
-- Date: 2026-01-18

-- 1. Fix Profiles RLS: Enforce tenant isolation for read access
-- The original policy allowed reading all profiles globally, which is a tenant leak risk.
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone in the same org" ON profiles FOR SELECT USING (
    org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
);

-- 2. Fix Programs RLS: Enforce tenant isolation
-- The original policy allowed reading all active programs globally.
DROP POLICY IF EXISTS "Programs are viewable by everyone" ON programs;
CREATE POLICY "Programs are viewable by everyone in the same org" ON programs FOR SELECT USING (
    is_active = true AND org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
);

-- 3. Fix Academic Structure RLS: Enforce tenant isolation by joining up to programs
-- Academic Years
DROP POLICY IF EXISTS "Academic structure is viewable by everyone" ON academic_years;
CREATE POLICY "Academic years are viewable in the same org" ON academic_years FOR SELECT USING (
    program_id IN (SELECT id FROM programs WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid()))
);

-- Semesters
DROP POLICY IF EXISTS "Semesters are viewable by everyone" ON semesters;
CREATE POLICY "Semesters are viewable in the same org" ON semesters FOR SELECT USING (
    year_id IN (
        SELECT id FROM academic_years 
        WHERE program_id IN (
            SELECT id FROM programs 
            WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
        )
    )
);

-- 4. Fix Modules RLS: Enforce tenant isolation and publishing workflow
DROP POLICY IF EXISTS "Published modules are viewable by everyone" ON modules;
CREATE POLICY "Published modules are viewable in the same org" ON modules FOR SELECT USING (
    is_published = true AND semester_id IN (
        SELECT id FROM semesters 
        WHERE year_id IN (
            SELECT id FROM academic_years 
            WHERE program_id IN (
                SELECT id FROM programs 
                WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
            )
        )
    )
);

-- 5. Fix Topics RLS: Enforce tenant isolation and publishing workflow
DROP POLICY IF EXISTS "Published topics are viewable by everyone" ON topics;
CREATE POLICY "Published topics are viewable in the same org" ON topics FOR SELECT USING (
    status = 'published' AND module_id IN (
        SELECT id FROM modules 
        WHERE is_published = true AND semester_id IN (
            SELECT id FROM semesters 
            WHERE year_id IN (
                SELECT id FROM academic_years 
                WHERE program_id IN (
                    SELECT id FROM programs 
                    WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
                )
            )
        )
    )
);

-- 6. Fix Summaries RLS: Enforce tenant isolation and publishing workflow
DROP POLICY IF EXISTS "Summaries are viewable by everyone" ON summaries;
CREATE POLICY "Summaries are viewable in the same org" ON summaries FOR SELECT USING (
  is_current = true AND topic_id IN (
    SELECT id FROM topics 
    WHERE status = 'published' AND module_id IN (
        SELECT id FROM modules 
        WHERE is_published = true AND semester_id IN (
            SELECT id FROM semesters 
            WHERE year_id IN (
                SELECT id FROM academic_years 
                WHERE program_id IN (
                    SELECT id FROM programs 
                    WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
                )
            )
        )
    )
  )
);

-- 7. Fix Attachments RLS: Enforce tenant isolation and soft delete
DROP POLICY IF EXISTS "Attachments are viewable by everyone" ON attachments;
CREATE POLICY "Attachments are viewable in the same org" ON attachments FOR SELECT USING (
    is_deleted = false AND (
        module_id IN (
            SELECT id FROM modules 
            WHERE is_published = true AND semester_id IN (
                SELECT id FROM semesters 
                WHERE year_id IN (
                    SELECT id FROM academic_years 
                    WHERE program_id IN (
                        SELECT id FROM programs 
                        WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
                    )
                )
            )
        ) OR topic_id IN (
            SELECT id FROM topics 
            WHERE status = 'published' AND module_id IN (
                SELECT id FROM modules 
                WHERE is_published = true AND semester_id IN (
                    SELECT id FROM semesters 
                    WHERE year_id IN (
                        SELECT id FROM academic_years 
                        WHERE program_id IN (
                            SELECT id FROM programs 
                            WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid())
                        )
                    )
                )
            )
        )
    )
);

-- 8. Refine Editor/Admin Write Policies: Enforce tenant isolation for all write operations
-- The original policies only checked the role, not the organization.

-- Helper function to get the user's organization ID
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
BEGIN
    RETURN (SELECT org_id FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql STABLE;

-- Organizations: Only Admin can manage, and only within their org (or create a new one)
DROP POLICY IF EXISTS "Only admins can insert/update organizations" ON organizations;
CREATE POLICY "Admins can manage their own organization" ON organizations FOR ALL USING (
    is_admin() AND id = get_user_org_id()
);
CREATE POLICY "Admins can create new organizations" ON organizations FOR INSERT WITH CHECK (
    is_admin()
);

-- Programs: Editors can manage programs within their org
DROP POLICY IF EXISTS "Editors can manage programs" ON programs;
CREATE POLICY "Editors can manage programs in their org" ON programs FOR ALL USING (
    is_editor() AND org_id = get_user_org_id()
);

-- Academic Years: Editors can manage years within their org's programs
DROP POLICY IF EXISTS "Editors can manage academic years" ON academic_years;
CREATE POLICY "Editors can manage academic years in their org" ON academic_years FOR ALL USING (
    is_editor() AND program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())
);

-- Semesters: Editors can manage semesters within their org's years
DROP POLICY IF EXISTS "Editors can manage semesters" ON semesters;
CREATE POLICY "Editors can manage semesters in their org" ON semesters FOR ALL USING (
    is_editor() AND year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id()))
);

-- Modules: Editors can manage modules within their org's semesters
DROP POLICY IF EXISTS "Editors can manage modules" ON modules;
CREATE POLICY "Editors can manage modules in their org" ON modules FOR ALL USING (
    is_editor() AND semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())))
);

-- Topics: Editors can manage topics within their org's modules
DROP POLICY IF EXISTS "Editors can manage topics" ON topics;
CREATE POLICY "Editors can manage topics in their org" ON topics FOR ALL USING (
    is_editor() AND module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id()))))
);

-- Summaries: Editors can manage summaries within their org's topics
DROP POLICY IF EXISTS "Editors can manage summaries" ON summaries;
CREATE POLICY "Editors can manage summaries in their org" ON summaries FOR ALL USING (
    is_editor() AND topic_id IN (SELECT id FROM topics WHERE module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())))))
);

-- Diagrams: Editors can manage diagrams within their org's topics/modules
DROP POLICY IF EXISTS "Editors can manage diagrams" ON diagrams;
CREATE POLICY "Editors can manage diagrams in their org" ON diagrams FOR ALL USING (
    is_editor() AND (
        topic_id IN (SELECT id FROM topics WHERE module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())))))
        OR module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id()))))
    )
);

-- Attachments: Editors can manage attachments within their org's topics/modules
DROP POLICY IF EXISTS "Editors can manage attachments" ON attachments;
CREATE POLICY "Editors can manage attachments in their org" ON attachments FOR ALL USING (
    is_editor() AND (
        topic_id IN (SELECT id FROM topics WHERE module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())))))
        OR module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id()))))
    )
);

-- External References: Editors can manage references within their org's topics
DROP POLICY IF EXISTS "Editors can manage references" ON external_references;
CREATE POLICY "Editors can manage references in their org" ON external_references FOR ALL USING (
    is_editor() AND topic_id IN (SELECT id FROM topics WHERE module_id IN (SELECT id FROM modules WHERE semester_id IN (SELECT id FROM semesters WHERE year_id IN (SELECT id FROM academic_years WHERE program_id IN (SELECT id FROM programs WHERE org_id = get_user_org_id())))))
);
