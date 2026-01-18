-- Manhaj Islamic Studies - RLS v2 Performance
-- Senior Architect: Manus
-- Date: 2026-01-18

-- 1. Optimized get_user_org_id
-- Using a STABLE function is good, but we can also use session variables if needed.
-- For now, we'll keep the function but ensure it's used efficiently.
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. Flattened RLS Policies
-- We now use the denormalized org_id to avoid deep joins.

-- Academic Years
DROP POLICY IF EXISTS "Academic years are viewable in the same org" ON academic_years;
CREATE POLICY "Academic years are viewable in the same org" ON academic_years 
FOR SELECT USING (org_id = get_user_org_id());

-- Semesters
DROP POLICY IF EXISTS "Semesters are viewable in the same org" ON semesters;
CREATE POLICY "Semesters are viewable in the same org" ON semesters 
FOR SELECT USING (org_id = get_user_org_id());

-- Modules
DROP POLICY IF EXISTS "Published modules are viewable in the same org" ON modules;
CREATE POLICY "Published modules are viewable in the same org" ON modules 
FOR SELECT USING (
    org_id = get_user_org_id() AND (is_published = true OR is_editor())
);

-- Topics
DROP POLICY IF EXISTS "Published topics are viewable in the same org" ON topics;
CREATE POLICY "Published topics are viewable in the same org" ON topics 
FOR SELECT USING (
    org_id = get_user_org_id() AND (status = 'published' OR is_editor())
);

-- 3. Public Access Policy (Guest)
-- Some content should be visible even without login (e.g., landing page info)
-- But we must be careful. Let's define a policy for "Public" programs.
ALTER TABLE programs ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

CREATE POLICY "Public programs are viewable by everyone" ON programs
FOR SELECT USING (is_public = true);

-- 4. Secure auth.uid() usage
-- Ensure all write policies check both role AND org_id correctly.
-- (Already improved in v1, but we'll re-verify and simplify using denormalized org_id)

DROP POLICY IF EXISTS "Editors can manage modules in their org" ON modules;
CREATE POLICY "Editors can manage modules in their org" ON modules 
FOR ALL USING (is_editor() AND org_id = get_user_org_id());

DROP POLICY IF EXISTS "Editors can manage topics in their org" ON topics;
CREATE POLICY "Editors can manage topics in their org" ON topics 
FOR ALL USING (is_editor() AND org_id = get_user_org_id());
