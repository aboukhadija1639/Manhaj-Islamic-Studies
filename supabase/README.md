# Database & Supabase Setup

This project uses Supabase for Authentication, Database (PostgreSQL), and Storage. The schema is designed to support the LMD (Licence-Master-Doctorate) academic system with multi-tenancy support.

## 🚀 Getting Started

### 1. Prerequisites
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed.
- A Supabase project created at [database.new](https://database.new).

### 2. Initialize & Link
```bash
# Login to Supabase
supabase login

# Link your project (get project-ref from project settings)
supabase link --project-ref your-project-ref
```

### 3. Apply Migrations
The migrations are located in `/supabase/migrations` and are ordered by timestamp.
```bash
# Push migrations to your remote database
supabase db push
```

### 4. Seed Data
To populate your database with initial academic structure (University of El-Oued, Licence Program, etc.):
```bash
# Apply seed data
supabase db reset
```
*Note: `db reset` will recreate the database and apply all migrations followed by the seed script.*

## 🏗️ Database Architecture

### Core Tables
| Table | Description |
|-------|-------------|
| `organizations` | Supports multi-tenancy (e.g., different universities). |
| `programs` | Academic degrees (Licence, Master, Doctorate). |
| `academic_years` | Levels within a program (L1, L2, L3, etc.). |
| `semesters` | S1 to S6. |
| `modules` | Courses/Subjects (e.g., Prophetic Biography). |
| `topics` | Individual lessons or lectures. |
| `summaries` | Student-friendly Markdown content for each topic. |
| `diagrams` | Mermaid/JSON definitions for visual aids (Tashjeer). |
| `attachments` | Metadata for files stored in Supabase Storage. |

### Security (RLS)
- **Public Read**: All academic structure and published content are publicly readable.
- **Role-Based Write**: Only users with `admin`, `teacher`, or `editor` roles can modify content.
- **Private Progress**: Student progress and bookmarks are private to each user.

### Storage Buckets
- `attachments`: Publicly readable bucket for lecture notes and PDFs.
- `avatars`: Publicly readable bucket for user profile pictures.
- `teacher-sources`: Private bucket for internal teacher materials.

## 🛠️ Development Workflow
- **New Migration**: `supabase migration new your_migration_name`
- **Local Testing**: `supabase start` (requires Docker)
- **Type Generation**: `supabase gen types typescript --local > src/types/supabase.ts`
