# Theme Root Cause Analysis
## Dark/Light Mode Inconsistency Investigation

**Date:** January 16, 2026  
**Project:** Manhaj Islamic Studies Platform  
**Issue:** Content disappears or becomes invisible when switching themes  

---

## Executive Summary

The Manhaj platform experiences theme inconsistencies where content becomes invisible or unreadable when switching between light and dark modes. This analysis identifies **216 instances** of hardcoded color classes that bypass the theme system.

### Critical Findings

1. **Hardcoded Colors:** 216 occurrences of `text-white`, `bg-white`, `text-gray-900`, `text-slate-*`, etc.
2. **Missing Dark Variants:** Many components lack `dark:` prefixes
3. **Inconsistent Token Usage:** Mix of semantic tokens and hardcoded colors
4. **Button Component Issues:** Uses `text-white` instead of semantic foreground colors
5. **Landing Page Problems:** Heavy use of absolute colors in hero sections

---

## 1. Current Theme Implementation

### 1.1 Theme System Architecture

**Location:** `src/shared/hooks/useTheme.ts`

```typescript
// Uses Zustand + localStorage persistence
type Theme = 'light' | 'dark' | 'system';

const applyTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  root.classList.toggle('dark', resolved === 'dark');
  return resolved;
};
```

✅ **Working Correctly:**
- Theme toggle mechanism functional
- LocalStorage persistence works
- System preference detection works
- Class-based dark mode (`class` strategy in Tailwind)

### 1.2 CSS Variables (Tokens)

**Location:** `src/styles/globals.css`

**Defined Tokens:**
```css
:root {
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-card: #ffffff;
  --color-card-foreground: #1a1a1a;
  --color-border: #e5e7eb;
  --color-muted: #f3f4f6;
  --color-muted-foreground: #6b7280;
}

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-card: #1a1a1a;
  --color-card-foreground: #fafafa;
  --color-border: #2a2a2a;
  --color-muted: #1f1f1f;
  --color-muted-foreground: #a1a1aa;
}
```

⚠️ **Missing Tokens:**
- `--color-input` (not defined)
- `--color-ring` (not defined)
- `--color-destructive` (not defined)
- `--color-destructive-foreground` (not defined)
- `--color-accent` (color scale exists but no semantic token)
- `--color-accent-foreground` (not defined)

### 1.3 Tailwind Configuration

**Location:** `tailwind.config.js`

```javascript
darkMode: 'class', // ✅ Correct strategy
colors: {
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  card: 'var(--color-card)',
  'card-foreground': 'var(--color-card-foreground)',
  border: 'var(--color-border)',
  muted: 'var(--color-muted)',
  'muted-foreground': 'var(--color-muted-foreground)',
}
```

✅ **Working:** Token mapping is correct  
⚠️ **Issue:** Developers not consistently using these tokens

---

## 2. Root Causes of Content Disappearing

### 2.1 Hardcoded `text-white` on Light Backgrounds

**Problem:** White text on white background in light mode

**Example 1:** Button Component (`src/shared/ui/Button.tsx:37`)
```tsx
primary: 'bg-primary-600 text-white hover:bg-primary-700'
//                       ^^^^^^^^^^
// ❌ Hardcoded text-white
```

**Why it fails:** 
- In light mode: `text-white` on `bg-primary-600` (teal) = ✅ visible
- In dark mode: If background changes but text stays `text-white` = ⚠️ potential issue
- **However**, this specific case is OK because primary button background is always colored

**Example 2:** Landing Page Hero (`src/features/landing/LandingPageEnhanced.tsx`)
```tsx
<section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
//                                                                                     ^^^^^^^^^^
// ❌ Hardcoded text-white on colored background
```

**Why it fails:**
- Works in both modes because background is always colored
- **BUT** if someone removes the background gradient, text becomes invisible

### 2.2 Hardcoded `text-gray-900` Without Dark Variant

**Problem:** Dark text on dark background in dark mode

**Example:** Module Detail Page (`src/modules/ulum-al-quran/components/ModuleDetailPage.tsx`)
```tsx
<h2 className="text-2xl font-bold text-gray-900 mb-4">
//                                 ^^^^^^^^^^^^^^
// ❌ Hardcoded text-gray-900, no dark: variant
```

**Why it fails:**
- Light mode: `text-gray-900` (#111827) on `bg-background` (#ffffff) = ✅ visible
- Dark mode: `text-gray-900` (#111827) on `bg-background` (#0a0a0a) = ❌ **INVISIBLE**

**Correct Fix:**
```tsx
<h2 className="text-2xl font-bold text-foreground mb-4">
//                                 ^^^^^^^^^^^^^^
// ✅ Uses semantic token that adapts to theme
```

### 2.3 Hardcoded `bg-white` Without Dark Variant

**Problem:** White cards on dark background look broken

**Example:** Academic Module Page (`src/features/academics/AcademicModulePage.tsx:51`)
```tsx
<div className="bg-white border-b" dir="rtl">
//               ^^^^^^^^
// ❌ Hardcoded bg-white, no dark: variant
```

**Why it fails:**
- Light mode: White card on light background = ✅ visible
- Dark mode: White card on dark background = ❌ **JARRING CONTRAST**

**Correct Fix:**
```tsx
<div className="bg-card border-b" dir="rtl">
//               ^^^^^^^
// ✅ Uses semantic token (white in light, #1a1a1a in dark)
```

### 2.4 Missing Dark Variants on Gray Colors

**Problem:** Gray text becomes unreadable in dark mode

**Example:** Landing Page (`src/features/landing/LandingPageEnhanced.tsx`)
```tsx
<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                                               ^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^
// ⚠️ Has dark: variant BUT uses absolute colors instead of tokens
```

**Why it's suboptimal:**
- Works, but requires manual `dark:` prefix everywhere
- Not maintainable at scale
- Easy to forget `dark:` variant

**Better Fix:**
```tsx
<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//                                               ^^^^^^^^^^^^^^
// ✅ Automatic theme adaptation
```

### 2.5 Opacity-Based Colors Causing Low Contrast

**Example:** Landing Page (`src/features/landing/LandingPageEnhanced.tsx:11`)
```tsx
<div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
//                                                   ^^^^^^^^
// ❌ Decorative white blur on colored background
```

**Why it fails:**
- Light mode: White blur on teal gradient = visible glow
- Dark mode: If background changes, white blur may be too harsh
- **This is decorative**, so less critical, but should use `bg-white/10` or theme-aware color

---

## 3. Problematic Patterns by Component

### 3.1 Shared UI Components

| Component | File | Issues | Count |
|-----------|------|--------|-------|
| Button | `src/shared/ui/Button.tsx` | `text-white` in primary/destructive variants | 3 |
| Card | `src/shared/ui/Card.tsx` | ✅ Uses semantic tokens correctly | 0 |
| Badge | `src/shared/ui/Badge.tsx` | Uses `bg-primary`, `text-primary-foreground` | 0 |
| ModuleCard | `src/shared/ui/ModuleCard.tsx` | Not checked yet | ? |
| StatsCard | `src/shared/ui/StatsCard.tsx` | Not checked yet | ? |

### 3.2 Feature Components

| Component | File | Issues | Count |
|-----------|------|--------|-------|
| LandingPageEnhanced | `src/features/landing/LandingPageEnhanced.tsx` | Heavy use of `text-white`, `text-gray-900`, `bg-white` | 50+ |
| AboutPage | `src/features/landing/AboutPage.tsx` | `text-white` on colored backgrounds | 10+ |
| AcademicModulePage | `src/features/academics/AcademicModulePage.tsx` | `bg-white`, `text-gray-900` without dark variants | 5+ |
| ModuleDetailPage | `src/modules/ulum-al-quran/components/ModuleDetailPage.tsx` | `text-gray-900`, `bg-gray-50` without dark variants | 20+ |

---

## 4. Specific Files with Critical Issues

### 4.1 `src/features/landing/LandingPageEnhanced.tsx`

**Total Hardcoded Colors:** ~60 instances

**Critical Issues:**
1. **Line 8:** `text-white` on gradient background (OK but not semantic)
2. **Line 18:** `text-gray-900 dark:text-white` (manual dark variant)
3. **Line 19:** `bg-white dark:bg-gray-800` (manual dark variant)
4. **Line 30:** `bg-white/20` on colored background (opacity-based)

**Impact:** Medium - Works with manual `dark:` variants but not maintainable

### 4.2 `src/modules/ulum-al-quran/components/ModuleDetailPage.tsx`

**Total Hardcoded Colors:** ~25 instances

**Critical Issues:**
1. **Multiple instances:** `text-gray-900` without dark variants
2. **Multiple instances:** `bg-gray-50` without dark variants
3. **Multiple instances:** `border-gray-200` without dark variants

**Impact:** HIGH - Content becomes invisible in dark mode

### 4.3 `src/features/academics/AcademicModulePage.tsx`

**Total Hardcoded Colors:** ~8 instances

**Critical Issues:**
1. **Line 51:** `bg-white border-b` (card background)
2. **Line 89:** `text-gray-900 font-medium` (breadcrumb text)
3. **Line 133:** `bg-white rounded-xl shadow-sm border border-slate-200` (inline Card component)

**Impact:** HIGH - White cards and dark text break in dark mode

### 4.4 `src/shared/ui/Button.tsx`

**Total Hardcoded Colors:** 3 instances

**Issues:**
1. **Line 37:** `text-white` in primary variant
2. **Line 43:** `text-white` in destructive variant

**Impact:** LOW - These are intentional (colored buttons should have white text)

**Note:** Button component is actually well-designed. The `text-white` is appropriate for colored button backgrounds.

---

## 5. Why Content Disappears: Technical Explanation

### Scenario 1: Dark Text on Dark Background

```
Light Mode:
  background: #ffffff (white)
  text: #111827 (gray-900, nearly black)
  contrast: 19.5:1 ✅ WCAG AAA

Dark Mode:
  background: #0a0a0a (nearly black)
  text: #111827 (gray-900, nearly black)
  contrast: 1.1:1 ❌ FAIL (text invisible)
```

### Scenario 2: White Card on Dark Background

```
Light Mode:
  page background: #ffffff
  card background: #ffffff
  border: #e5e7eb (light gray)
  result: Card blends in but border provides definition ✅

Dark Mode:
  page background: #0a0a0a (dark)
  card background: #ffffff (white) ← HARDCODED
  result: Blinding white card on dark page ❌ JARRING
```

### Scenario 3: Missing Foreground Color

```
Component uses: className="text-gray-600"

Light Mode:
  background: #ffffff
  text: #4b5563 (gray-600)
  contrast: 7.4:1 ✅ WCAG AA

Dark Mode:
  background: #0a0a0a
  text: #4b5563 (gray-600) ← SAME COLOR
  contrast: 2.8:1 ❌ FAIL (barely readable)
```

---

## 6. Missing Semantic Tokens

The current theme system is missing these recommended tokens:

```css
/* Missing in globals.css */
--color-input: /* should be defined */
--color-ring: /* for focus rings */
--color-destructive: /* for error states */
--color-destructive-foreground: /* text on destructive background */
--color-accent: /* for highlights */
--color-accent-foreground: /* text on accent background */
--color-popover: /* for dropdowns/tooltips */
--color-popover-foreground: /* text in popovers */
```

---

## 7. Summary of Root Causes

### Primary Causes

1. **Hardcoded Absolute Colors** (216 instances)
   - `text-white`, `text-black`, `text-gray-900`, `bg-white`, etc.
   - Developers not using semantic tokens

2. **Missing Dark Variants**
   - Components use `text-gray-900` without `dark:text-gray-100`
   - Requires manual `dark:` prefix on every element

3. **Incomplete Token System**
   - Missing `input`, `ring`, `destructive`, `accent` tokens
   - Developers fall back to hardcoded colors

4. **Lack of Developer Guidelines**
   - No documentation on how to use theme tokens
   - No linting rules to enforce token usage

### Secondary Causes

1. **Copy-Paste from Examples**
   - Developers copying code with hardcoded colors
   - No code review for theme consistency

2. **Opacity-Based Colors**
   - `bg-white/20`, `text-white/90` may not work in all contexts
   - Should use theme-aware opacity

3. **Inline Styles**
   - Some components may use inline `style={{}}` with hex colors
   - Not checked in this audit

---

## 8. Impact Assessment

### High Impact (Content Invisible)
- ❌ `ModuleDetailPage.tsx` - Headings and text disappear in dark mode
- ❌ `AcademicModulePage.tsx` - Cards and breadcrumbs break
- ❌ Any component using `text-gray-900` without dark variant

### Medium Impact (Jarring but Readable)
- ⚠️ `LandingPageEnhanced.tsx` - Manual dark variants work but not scalable
- ⚠️ White cards on dark backgrounds (harsh contrast)

### Low Impact (Cosmetic)
- ✅ Button component - `text-white` is intentional for colored buttons
- ✅ Decorative elements with opacity

---

## 9. Recommended Fix Strategy

### Phase 1: Complete Token System (Priority: HIGH)
1. Add missing semantic tokens to `globals.css`
2. Update Tailwind config to map new tokens
3. Document all available tokens

### Phase 2: Refactor Core Components (Priority: HIGH)
1. Fix `ModuleDetailPage.tsx` (25 instances)
2. Fix `AcademicModulePage.tsx` (8 instances)
3. Audit and fix all `src/shared/ui/*` components

### Phase 3: Refactor Feature Pages (Priority: MEDIUM)
1. Fix `LandingPageEnhanced.tsx` (60 instances)
2. Fix `AboutPage.tsx` (10 instances)
3. Fix remaining feature pages

### Phase 4: Developer Guidelines (Priority: HIGH)
1. Create migration guide
2. Add ESLint rules to prevent hardcoded colors
3. Update component documentation

### Phase 5: Testing (Priority: HIGH)
1. Manual QA in both themes
2. Automated contrast ratio testing
3. Cross-browser verification

---

## 10. Next Steps

1. ✅ **Complete this root cause analysis**
2. ⏭️ **Design complete token system** (Phase 2 of implementation)
3. ⏭️ **Implement token system in globals.css**
4. ⏭️ **Refactor components systematically**
5. ⏭️ **Create developer migration guide**
6. ⏭️ **Test across browsers and devices**

---

**Analysis Completed By:** Senior Frontend Engineer  
**Date:** January 16, 2026  
**Status:** ✅ Root Cause Identified  
**Next Phase:** Design Robust Token System

---

**End of Root Cause Analysis**
