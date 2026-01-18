# Database Maturity & Production Hardening Report: Manhaj Islamic Studies

**Role:** Senior Software Architect & PostgreSQL/Supabase Expert
**Date:** January 18, 2026
**Status:** Production Hardening Phase (v2)

## 1. Executive Summary
The Manhaj database has a solid foundation (v1) with a clear academic hierarchy and initial security hardening. This report outlines the transition to a **mature, production-grade** system. We focus on academic integrity, multi-role security refinement, and performance optimization for Arabic-first content.

## 2. Audit Findings

### 2.1. What is Good (Maintain)
- **Academic Hierarchy:** The `Program -> Year -> Semester -> Module -> Topic` structure correctly reflects the Algerian university system.
- **UUID Usage:** Consistent use of UUIDs for primary keys ensures global uniqueness and Supabase compatibility.
- **Arabic Search Foundation:** Initial `tsvector` implementation for Arabic search is a strong start.
- **Audit Fields:** Presence of `created_at`, `updated_at`, and `created_by` across tables.

### 2.2. Risks & Fragility (Must Improve Now)
- **RLS Performance:** Current RLS policies use deep nested subqueries (e.g., checking `org_id` by traversing 4 levels up). This will cause significant latency as the dataset grows.
- **Role Ambiguity:** The `user_role` enum is flat. We need a more robust permission strategy that handles "Student" vs "Guest" vs "Verified Student" more clearly.
- **Academic Ordering:** While `order_index` exists for topics, it's missing for other levels where logical sequence matters (e.g., semesters within a year).
- **Scheduled Publishing:** The current implementation is a simple timestamp check. It lacks a mechanism for "expiring" content or handling "unpublishing" events gracefully.

### 2.3. Future Roadmap (Later)
- **Materialized Views:** For complex curriculum maps that don't change often but are expensive to query.
- **Partitioning:** For `audit_logs` and `attachments` if they exceed millions of rows.

---

## 3. Proposed Improvements

### 3.1. Structural Hardening
- **Denormalize `org_id`:** To solve RLS performance, we will denormalize `org_id` down to `modules` and `topics`. This allows RLS to check the tenant in a single join or lookup.
- **Academic Constraints:** Add unique constraints to ensure a module code is unique within an organization, not just globally.
- **Enhanced Enums:** Refine `module_category` and `attachment_type` to match official academic nomenclature more precisely.

### 3.2. Security & RLS v2
- **Policy Optimization:** Replace nested subqueries with a cached session variable or a flattened check.
- **Public vs. Private:** Explicitly separate "Public" (Guest) access from "Academic" (Student) access. Some summaries might be public, but official source files should require student authentication.

### 3.3. Performance & Search
- **Fuzzy Search:** Add `pg_trgm` support for Arabic names to handle common spelling variations (e.g., Alif with/without Hamza).
- **Covering Indexes:** Add indexes that "include" frequently accessed columns to avoid heap fetches.

---

## 4. Implementation Plan
1. **Migration `20260118000004_structural_hardening_v2.sql`**: Add denormalized columns, constraints, and triggers.
2. **Migration `20260118000005_rls_v2_performance.sql`**: Optimize RLS policies for scale.
3. **Migration `20260118000006_search_and_performance.sql`**: Add fuzzy search and covering indexes.
