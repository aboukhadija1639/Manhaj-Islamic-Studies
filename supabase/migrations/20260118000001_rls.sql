-- Manhaj Islamic Studies Platform - RLS Policies
-- Senior Backend Architect: Manus
-- Date: 2026-01-18

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_references ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is teacher/editor
CREATE OR REPLACE FUNCTION is_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role IN ('admin', 'teacher', 'editor')
    FROM profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Organizations: Public read, Admin write
CREATE POLICY "Organizations are viewable by everyone" ON organizations FOR SELECT USING (true);
CREATE POLICY "Only admins can insert/update organizations" ON organizations FOR ALL USING (is_admin());

-- 2. Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Programs: Public read for active, Editor write
CREATE POLICY "Programs are viewable by everyone" ON programs FOR SELECT USING (is_active = true OR is_editor());
CREATE POLICY "Editors can manage programs" ON programs FOR ALL USING (is_editor());

-- 4. Academic Years & Semesters: Public read, Editor write
CREATE POLICY "Academic structure is viewable by everyone" ON academic_years FOR SELECT USING (true);
CREATE POLICY "Editors can manage academic years" ON academic_years FOR ALL USING (is_editor());

CREATE POLICY "Semesters are viewable by everyone" ON semesters FOR SELECT USING (true);
CREATE POLICY "Editors can manage semesters" ON semesters FOR ALL USING (is_editor());

-- 5. Modules: Public read for published, Editor write
CREATE POLICY "Published modules are viewable by everyone" ON modules FOR SELECT USING (is_published = true OR is_editor());
CREATE POLICY "Editors can manage modules" ON modules FOR ALL USING (is_editor());

-- 6. Topics: Public read for published, Editor write
CREATE POLICY "Published topics are viewable by everyone" ON topics FOR SELECT USING (status = 'published' OR is_editor());
CREATE POLICY "Editors can manage topics" ON topics FOR ALL USING (is_editor());

-- 7. Summaries: Public read for current summaries of published topics
CREATE POLICY "Summaries are viewable by everyone" ON summaries FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM topics 
    WHERE topics.id = summaries.topic_id 
    AND (topics.status = 'published' OR is_editor())
  )
);
CREATE POLICY "Editors can manage summaries" ON summaries FOR ALL USING (is_editor());

-- 8. Diagrams: Public read, Editor write
CREATE POLICY "Diagrams are viewable by everyone" ON diagrams FOR SELECT USING (true);
CREATE POLICY "Editors can manage diagrams" ON diagrams FOR ALL USING (is_editor());

-- 9. Attachments: Public read for non-deleted, Editor write
CREATE POLICY "Attachments are viewable by everyone" ON attachments FOR SELECT USING (is_deleted = false);
CREATE POLICY "Editors can manage attachments" ON attachments FOR ALL USING (is_editor());

-- 10. External References: Public read, Editor write
CREATE POLICY "References are viewable by everyone" ON external_references FOR SELECT USING (true);
CREATE POLICY "Editors can manage references" ON external_references FOR ALL USING (is_editor());
