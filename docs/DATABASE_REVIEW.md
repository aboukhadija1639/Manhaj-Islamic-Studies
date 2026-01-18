# Production Hardening Review Report: Manhaj Islamic Studies Database

**Role:** Senior PostgreSQL + Supabase Architect
**Date:** January 18, 2026
**Target:** Existing `20260118000000_init.sql` and `20260118000001_rls.sql` migrations.

## Executive Summary

The initial design is structurally sound, utilizing UUIDs, audit fields, and a clear academic hierarchy. However, it exhibits **critical security and data integrity risks** that must be addressed before production deployment. The primary risks are **tenant data leakage** due to weak Row Level Security (RLS) and **missing data integrity constraints** (e.g., `NOT NULL` on essential fields). The hardening patches (`20260118000002_hardening.sql` and `20260118000003_rls_fix.sql`) address these issues.

---

## Review Findings and Remediation

### Critical Issues (Must Fix)

| ID | Issue | Risk | Remediation |
| :--- | :--- | :--- | :--- |
| **C1** | **Tenant Data Leakage (RLS)** | The original RLS policies only checked for `is_published = true` or `is_editor()`, but **failed to enforce multi-tenancy isolation** via `org_id`. A user from Organization A could read published content from Organization B. | **RLS Patch (`20260118000003_rls_fix.sql`)**: All RLS policies are rewritten to join up the academic hierarchy to the `programs` table and enforce `org_id = get_user_org_id()`. |
| **C2** | **Missing `NOT NULL` Constraints** | Critical fields like `created_by` (audit) and essential content fields (`name_ar`, `title_ar`) were nullable, risking data corruption and breaking audit trails. | **Hardening Patch (`20260118000002_hardening.sql`)**: Added `NOT NULL` constraints to all audit fields (`created_by`) and primary Arabic content fields. |
| **C3** | **Unenforced Publishing Workflow** | The `topics` table allowed `status = 'published'` even if `published_at` was `NULL`, making scheduled publishing logic purely application-side and unenforceable at the database level. | **Hardening Patch**: Added a `CHECK` constraint to `topics` to ensure `published_at` is not null if `status = 'published'`. |
| **C4** | **Summaries Versioning Integrity** | The versioning logic for `summaries` (`is_current = true`) was not enforced by a unique constraint, allowing multiple "current" summaries for a single topic. | **Hardening Patch**: Added a **Partial Unique Index** (`idx_summaries_current_version`) on `(topic_id)` where `is_current = true`. |

### Medium Risks (Should Fix)

| ID | Issue | Risk | Remediation |
| :--- | :--- | :--- | :--- |
| **M1** | **Missing Audit Field Enforcement** | The `profiles` table, which links to `auth.users`, had a default UUID generator, which is incorrect for a foreign key to `auth.users(id)`. | **Hardening Patch**: Removed `DEFAULT uuid_generate_v4()` from `profiles.id`. |
| **M2** | **Missing Partial Indexes for Hot Queries** | Queries for published content (e.g., `WHERE is_published = true`) were not optimized with partial indexes, leading to slower performance as the number of drafts/archived items grows. | **Hardening Patch**: Added partial indexes like `idx_modules_published_semester` and `idx_topics_published_module`. |
| **M3** | **Weak Attachment Integrity** | The `attachments` table allowed both `module_id` and `topic_id` to be `NULL` (due to `ON DELETE SET NULL` on FKs), leaving orphaned file metadata. | **Hardening Patch**: Added a `CHECK` constraint to `attachments` to ensure at least one of `module_id` or `topic_id` is present. |

### Minor Improvements (Nice to Have)

| ID | Improvement | Benefit | Remediation |
| :--- | :--- | :--- | :--- |
| **I1** | **Explicit Module Code Format** | Enforce a standard format (e.g., `UEF-111`) for `modules.code` to maintain data quality. | **Hardening Patch**: Added a `CHECK` constraint using a regex pattern to `modules.code`. |
| **I2** | **Explicit Semester Number Range** | Enforce that `semester_number` is within a logical range (1-6 for Licence/Master). | **Hardening Patch**: Added a `CHECK` constraint to `semesters.semester_number`. |
| **I3** | **RLS Helper Function Refinement** | Created a dedicated `get_user_org_id()` function to simplify and centralize the logic for tenant isolation in RLS policies. | **RLS Patch**: Defined and used `get_user_org_id()` in all new RLS policies. |

---

## Performance & Scaling Notes

### Expected Hot Queries

The application will primarily generate traffic from the following query patterns:

1.  **Curriculum Map**: Fetching the entire academic hierarchy for a program (`programs` -> `academic_years` -> `semesters` -> `modules`). This should be heavily cached at the application layer.
2.  **Module Detail**: Fetching a specific module and its published content (`modules` -> `topics` -> `summaries` / `diagrams` / `attachments`).
3.  **Public Content Listing**: Listing all published modules for a semester (`modules WHERE semester_id = X AND is_published = true`).
4.  **Full-Text Search**: Searching module/topic titles and descriptions in Arabic.

### Index Strategy

The index strategy is optimized for these hot queries:

| Table | Index Name | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `modules` | `idx_modules_published_semester` | Partial B-tree | Speeds up public module listings. |
| `topics` | `idx_topics_published_module` | Partial B-tree | Speeds up fetching published topics within a module. |
| `summaries` | `idx_summaries_current_version` | Partial Unique | Enforces and speeds up fetching the single current summary. |
| `modules` | `idx_modules_search` | GIN | Full-Text Search on Arabic module names/descriptions. |
| `topics` | `idx_topics_search` | GIN | Full-Text Search on Arabic topic names/descriptions. |
| **All FKs** | (Default B-tree) | B-tree | Ensures fast joins across the academic hierarchy. |

### Future Growth Considerations (10x–100x Data)

1.  **Partitioning**: The `audit_logs` table is the most likely candidate for rapid growth. If the platform scales to 100x the current data, this table should be partitioned by `changed_at` (e.g., by month or year) to maintain query performance.
2.  **Full-Text Search Scaling**: For very large datasets, the GIN indexes on `search_vector` may become slow to update. Consider moving to a dedicated search service (e.g., ElasticSearch or Supabase's built-in search) if the FTS performance degrades significantly.
3.  **Storage Buckets**: The `attachments` table is metadata for Supabase Storage. Ensure the actual file storage is configured with appropriate CDN and caching policies to handle high traffic for media delivery.
4.  **Tenant Isolation Performance**: The RLS policies rely on subqueries to determine the user's `org_id`. While PostgreSQL is highly optimized for this, if performance becomes an issue, consider denormalizing the `org_id` onto the `auth.users` table itself (if possible in Supabase) or heavily caching the `get_user_org_id()` function result.
