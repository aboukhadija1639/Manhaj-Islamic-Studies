-- Manhaj Islamic Studies Platform - Seed Data
-- Senior Backend Architect: Manus
-- Date: 2026-01-18

-- 1. Insert Organization
INSERT INTO organizations (id, name_ar, name_en, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'جامعة الشهيد حمه لخضر - الوادي', 'University of El-Oued', 'univ-eloued');

-- 2. Insert Admin Profile (Note: In real Supabase, you'd create the user in auth.users first)
-- This is a placeholder for the seed script
-- INSERT INTO profiles (id, org_id, full_name_ar, role) 
-- VALUES ('admin-uuid-here', '00000000-0000-0000-0000-000000000001', 'مدير النظام', 'admin');

-- 3. Insert Program: Islamic Studies (Licence)
INSERT INTO programs (id, org_id, name_ar, name_en, description_ar, degree_type, icon, color)
VALUES (
    '11111111-1111-1111-1111-111111111111', 
    '00000000-0000-0000-0000-000000000001', 
    'ليسانس علوم إسلامية', 
    'Licence in Islamic Studies', 
    'برنامج شامل يغطي أصول الدين والشريعة', 
    'licence', 
    'book-open', 
    '#10b981'
);

-- 4. Insert Academic Year: Year 1 (Common Core)
INSERT INTO academic_years (id, program_id, year_number, name_ar, name_en, is_common_core)
VALUES (
    '22222222-2222-2222-2222-222222222222', 
    '11111111-1111-1111-1111-111111111111', 
    1, 
    'السنة الأولى - جذع مشترك', 
    'Year 1 - Common Core', 
    true
);

-- 5. Insert Semester: Semester 1
INSERT INTO semesters (id, year_id, semester_number, name_ar, name_en)
VALUES (
    '33333333-3333-3333-3333-333333333333', 
    '22222222-2222-2222-2222-222222222222', 
    1, 
    'السداسي الأول', 
    'Semester 1'
);

-- 6. Insert Module: Ulum Al-Quran
INSERT INTO modules (id, semester_id, code, name_ar, name_en, category, credits, coefficient, is_published)
VALUES (
    '44444444-4444-4444-4444-444444444444', 
    '33333333-3333-3333-3333-333333333333', 
    'UEF-111', 
    'علوم القرآن', 
    'Quranic Sciences', 
    'fundamental', 
    6, 
    3, 
    true
);

-- 7. Insert Topics for Ulum Al-Quran
INSERT INTO topics (id, module_id, order_index, title_ar, title_en, status, published_at)
VALUES 
(
    '55555555-5555-5555-5555-555555555551', 
    '44444444-4444-4444-4444-444444444444', 
    1, 
    'مقدمة في علوم القرآن', 
    'Introduction to Quranic Sciences', 
    'published', 
    NOW()
),
(
    '55555555-5555-5555-5555-555555555552', 
    '44444444-4444-4444-4444-444444444444', 
    2, 
    'تاريخ تدوين القرآن', 
    'History of Quran Compilation', 
    'published', 
    NOW()
);

-- 8. Insert Summary for Topic 1
INSERT INTO summaries (topic_id, content_ar, content_en)
VALUES (
    '55555555-5555-5555-5555-555555555551', 
    '# مقدمة في علوم القرآن\n\nعلوم القرآن هي العلوم التي تتعلق بالقرآن الكريم من حيث نزوله وترتيبه وجمعه وكتابته وقراءته وتفسيره وإعجازه وناسخه ومنسوخه ودفع الشبه عنه وغير ذلك.', 
    '# Introduction to Quranic Sciences\n\nQuranic sciences are the sciences related to the Holy Quran in terms of its revelation, arrangement, collection, writing, recitation, interpretation, inimitability, abrogation, and more.'
);

-- 9. Insert Diagram (Tashjeer) for Topic 1
INSERT INTO diagrams (topic_id, title_ar, diagram_type, definition)
VALUES (
    '55555555-5555-5555-5555-555555555551', 
    'شجرة علوم القرآن', 
    'mermaid', 
    'graph TD
    A[علوم القرآن] --> B[علوم النزول]
    A --> C[علوم الأداء]
    A --> D[علوم التفسير]
    B --> B1[المكي والمدني]
    B --> B2[أسباب النزول]'
);

-- 10. Insert Attachment (Official Teacher File)
INSERT INTO attachments (module_id, topic_id, file_name, file_path, content_type, is_official)
VALUES (
    '44444444-4444-4444-4444-444444444444', 
    '55555555-5555-5555-5555-555555555551', 
    'محاضرات_علوم_القرآن_1.pdf', 
    'modules/ulum-al-quran/lectures/part1.pdf', 
    'pdf', 
    true
);
