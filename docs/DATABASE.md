# Manhaj Islamic Studies - Database Design Documentation

## Overview
This database is designed for a production-grade, scalable academic platform for Islamic Studies. It supports multi-tenancy, multi-role access control, and a robust content publishing workflow.

## ERD Description

### Core Entities
- **Organizations**: Supports multi-tenancy (e.g., different universities).
- **Profiles**: Extends Supabase Auth users with roles (`admin`, `teacher`, `editor`, `student`) and Arabic/English names.
- **Programs**: Academic specialties (e.g., "Sharia Law", "Quranic Sciences").
- **Academic Structure**: Hierarchical structure: `Program` -> `Academic Year` -> `Semester` -> `Module`.
- **Content Entities**:
    - **Topics**: Individual lessons within a module.
    - **Summaries**: Student-friendly Markdown content for topics.
    - **Diagrams**: "Tashjeer" (trees) stored as Mermaid or JSON.
    - **Attachments**: File metadata for PDF/DOCX/Media with versioning and soft-delete.
    - **External References**: Links to books, articles, or videos.

### Relationships
- **1:N**: Program to Academic Years, Year to Semesters, Semester to Modules, Module to Topics.
- **1:N**: Topic to Summaries (versioned), Topic to Diagrams, Topic to Attachments.
- **N:1**: All entities link back to `profiles` via `created_by` for auditing.

## Key Trade-offs & Design Decisions

1. **UUID Primary Keys**: Used for all tables to ensure global uniqueness and easier data merging/syncing.
2. **Arabic Full-Text Search**: Implemented using PostgreSQL `tsvector` with the `arabic` configuration on `modules` and `topics`.
3. **Soft Deletes for Attachments**: Files are marked `is_deleted` instead of being physically removed immediately, allowing for recovery and audit trails.
4. **JSONB for Metadata**: Used in `organizations` and `attachments` to allow flexible, schema-less extensions without migration overhead.
5. **Row Level Security (RLS)**: Strict policies ensure that students only see published content, while editors can manage drafts.

## Security Strategy (RLS)
- **Public Read**: Published modules, topics, and summaries are readable by everyone.
- **Restricted Write**: Only users with `admin`, `teacher`, or `editor` roles can modify content.
- **Owner Update**: Users can only update their own profiles.

## Example Queries

### 1. Home Page: List all Programs
```sql
SELECT name_ar, name_en, degree_type, icon, color 
FROM programs 
WHERE is_active = true;
```

### 2. Program Map: Fetch Year/Semester/Module Hierarchy
```sql
SELECT 
  ay.name_ar as year_name, 
  s.semester_number, 
  m.name_ar as module_name, 
  m.code
FROM academic_years ay
JOIN semesters s ON s.year_id = ay.id
JOIN modules m ON m.semester_id = s.id
WHERE ay.program_id = 'program-uuid'
ORDER BY ay.year_number, s.semester_number;
```

### 3. Module Detail: Fetch Topics, Summaries, and Diagrams
```sql
SELECT 
  t.title_ar, 
  s.content_ar as summary, 
  d.definition as diagram_code
FROM topics t
LEFT JOIN summaries s ON s.topic_id = t.id AND s.is_current = true
LEFT JOIN diagrams d ON d.topic_id = t.id
WHERE t.module_id = 'module-uuid' AND t.status = 'published'
ORDER BY t.order_index;
```

### 4. Search: Search for "التفسير" in Modules and Topics
```sql
SELECT name_ar, 'module' as type 
FROM modules 
WHERE search_vector @@ to_tsquery('arabic', 'التفسير')
UNION ALL
SELECT title_ar, 'topic' as type 
FROM topics 
WHERE search_vector @@ to_tsquery('arabic', 'التفسير');
```

### 5. Latest Updates: Recently Published Topics
```sql
SELECT t.title_ar, m.name_ar as module_name, t.published_at
FROM topics t
JOIN modules m ON m.id = t.module_id
WHERE t.status = 'published'
ORDER BY t.published_at DESC
LIMIT 10;
```

## Scaling Notes
- **Indexes**: GIN indexes are used for full-text search. B-tree indexes are placed on all foreign keys and frequently filtered columns (`is_published`, `status`).
- **Partitioning**: For future growth (millions of records), the `audit_logs` table can be partitioned by `changed_at`.
- **Caching**: Use Supabase's built-in caching or a Redis layer for the hierarchical program map which changes infrequently.
