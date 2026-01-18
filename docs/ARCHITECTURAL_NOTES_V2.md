# Architectural Notes: Database Maturity (v2)

## 1. Denormalization for RLS Performance
**Decision:** We denormalized `org_id` from `programs` down to `modules` and `topics`.
**Reasoning:** In Supabase, RLS policies are executed for every row in a result set. The previous design required joining up 3-4 tables to verify the `org_id`. On a page with 50 modules, this could result in hundreds of hidden joins. By denormalizing `org_id`, we reduce the RLS check to a single column comparison, ensuring the platform remains fast even with 50x more data.
**Trade-off:** We now have to maintain data integrity using triggers (`sync_org_id`) to ensure the `org_id` remains consistent if a module is moved.

## 2. Fuzzy Search vs. Full-Text Search
**Decision:** We added `pg_trgm` (trigram) indexes alongside the existing `tsvector` (Full-Text Search).
**Reasoning:** Arabic is a morphologically rich language. While `tsvector` is great for finding words by their roots, users often make small spelling mistakes (e.g., swapping Alif with Hamza). Trigram search allows for "fuzzy" matching, significantly improving the user experience for Arabic-speaking students.

## 3. Academic Integrity over Generic CMS
**Decision:** Added unique constraints on `(org_id, code)` for modules.
**Reasoning:** In a university setting, module codes (like `UEF-111`) are unique identifiers within the institution. A generic CMS might allow duplicate codes, but an academic platform must enforce this at the database level to prevent scheduling and grading conflicts.

## 4. RLS Refinement: Public vs. Private
**Decision:** Introduced `is_public` flag on programs.
**Reasoning:** Not all academic content should be hidden behind a login. To attract new students and share knowledge, some programs can be marked as public. This allows the landing page to fetch content without an `auth.uid()`, while still keeping official source files and student-specific data secure.

## 5. Conscious Omissions
- **Materialized Views:** We chose not to implement these yet. While they are great for performance, they add complexity to the cache invalidation logic. We will wait until the curriculum map query performance degrades before adding this layer.
- **Advanced Partitioning:** Not needed at this stage. The current structure can easily handle tens of thousands of modules. Partitioning would be premature optimization.
