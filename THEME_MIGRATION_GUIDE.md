# Theme Migration Guide
## How to Use the Token-Based Theme System

**Date:** January 16, 2026  
**For:** Developers working on Manhaj Islamic Studies Platform  
**Version:** 2.0  

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Available Tokens](#available-tokens)
3. [Migration Rules](#migration-rules)
4. [Common Patterns](#common-patterns)
5. [Do's and Don'ts](#dos-and-donts)
6. [Examples](#examples)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### The Golden Rule

**NEVER use hardcoded colors.** Always use semantic tokens.

```tsx
// ❌ BAD
<div className="bg-white text-gray-900">

// ✅ GOOD
<div className="bg-card text-card-foreground">
```

### Why?

Hardcoded colors break in dark mode. Semantic tokens automatically adapt to the current theme.

---

## Available Tokens

### Base Tokens

| Token | Usage | Light Mode | Dark Mode |
|-------|-------|------------|-----------|
| `background` | Page background | White | Dark |
| `foreground` | Main text | Dark | Light |

```tsx
<div className="bg-background text-foreground">
  Main content
</div>
```

### Card/Surface Tokens

| Token | Usage | Light Mode | Dark Mode |
|-------|-------|------------|-----------|
| `card` | Card background | White | Dark Gray |
| `card-foreground` | Text on cards | Dark | Light |
| `popover` | Dropdown/tooltip background | White | Dark Gray |
| `popover-foreground` | Text in popovers | Dark | Light |

```tsx
<div className="bg-card text-card-foreground">
  Card content
</div>
```

### Interactive Tokens

| Token | Usage | Light Mode | Dark Mode |
|-------|-------|------------|-----------|
| `primary` | Primary brand color | Teal | Teal |
| `primary-foreground` | Text on primary | White | White |
| `secondary` | Secondary actions | Beige | Dark Beige |
| `secondary-foreground` | Text on secondary | Dark Beige | Light |
| `accent` | Highlights | Yellow | Yellow |
| `accent-foreground` | Text on accent | Dark | Dark |

```tsx
<button className="bg-primary text-primary-foreground">
  Submit
</button>
```

### State Tokens

| Token | Usage | Light Mode | Dark Mode |
|-------|-------|------------|-----------|
| `destructive` | Error/delete | Red | Red |
| `destructive-foreground` | Text on destructive | White | White |
| `success` | Success states | Green | Green |
| `success-foreground` | Text on success | White | White |
| `warning` | Warning states | Amber | Amber |
| `warning-foreground` | Text on warning | White | White |

```tsx
<button className="bg-destructive text-destructive-foreground">
  Delete
</button>
```

### UI Element Tokens

| Token | Usage | Light Mode | Dark Mode |
|-------|-------|------------|-----------|
| `muted` | Subtle backgrounds | Light Gray | Dark Gray |
| `muted-foreground` | Subtle text | Gray | Light Gray |
| `border` | Borders | Light Gray | Dark Gray |
| `input` | Input backgrounds | Light Gray | Dark Gray |
| `ring` | Focus rings | Teal | Teal |

```tsx
<div className="bg-muted text-muted-foreground border border-border">
  Muted content
</div>
```

---

## Migration Rules

### Rule 1: Text Colors

| Old (Hardcoded) | New (Token) | Usage |
|-----------------|-------------|-------|
| `text-black` | `text-foreground` | Main text |
| `text-white` | `text-primary-foreground` | Only on colored backgrounds |
| `text-gray-900` | `text-foreground` | Main text |
| `text-gray-800` | `text-foreground` | Main text |
| `text-gray-700` | `text-foreground` | Main text |
| `text-gray-600` | `text-muted-foreground` | Secondary text |
| `text-gray-500` | `text-muted-foreground` | Secondary text |
| `text-gray-400` | `text-muted-foreground` | Subtle text |

### Rule 2: Background Colors

| Old (Hardcoded) | New (Token) | Usage |
|-----------------|-------------|-------|
| `bg-white` | `bg-card` or `bg-background` | Depends on context |
| `bg-black` | `bg-foreground` | Rarely used |
| `bg-gray-50` | `bg-muted` | Subtle backgrounds |
| `bg-gray-100` | `bg-muted` | Subtle backgrounds |
| `bg-gray-200` | `bg-muted` | Subtle backgrounds |

### Rule 3: Border Colors

| Old (Hardcoded) | New (Token) | Usage |
|-----------------|-------------|-------|
| `border-gray-200` | `border-border` | All borders |
| `border-gray-300` | `border-border` | All borders |
| `border-slate-200` | `border-border` | All borders |

### Rule 4: Brand Colors

| Old (Hardcoded) | New (Token) | Usage |
|-----------------|-------------|-------|
| `text-emerald-600` | `text-primary` | Links, icons |
| `bg-emerald-600` | `bg-primary` | Buttons, highlights |
| `text-teal-600` | `text-primary` | Links, icons |
| `bg-teal-600` | `bg-primary` | Buttons, highlights |

---

## Common Patterns

### Pattern 1: Page Layout

```tsx
// ❌ BAD
<div className="min-h-screen bg-gray-50">
  <div className="bg-white p-6">
    <h1 className="text-gray-900">Title</h1>
    <p className="text-gray-600">Description</p>
  </div>
</div>

// ✅ GOOD
<div className="min-h-screen bg-background">
  <div className="bg-card p-6">
    <h1 className="text-foreground">Title</h1>
    <p className="text-muted-foreground">Description</p>
  </div>
</div>
```

### Pattern 2: Cards

```tsx
// ❌ BAD
<div className="bg-white border border-gray-200 rounded-lg p-6">
  <h2 className="text-gray-900 font-bold">Card Title</h2>
  <p className="text-gray-600">Card content</p>
</div>

// ✅ GOOD
<div className="bg-card border border-border rounded-lg p-6">
  <h2 className="text-foreground font-bold">Card Title</h2>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Pattern 3: Buttons

```tsx
// ❌ BAD
<button className="bg-emerald-600 text-white hover:bg-emerald-700">
  Submit
</button>

// ✅ GOOD
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Submit
</button>
```

### Pattern 4: Links

```tsx
// ❌ BAD
<a href="#" className="text-emerald-600 hover:text-emerald-700">
  Link
</a>

// ✅ GOOD
<a href="#" className="text-primary hover:text-primary/80">
  Link
</a>
```

### Pattern 5: Icons

```tsx
// ❌ BAD
<CheckIcon className="text-emerald-600" />

// ✅ GOOD
<CheckIcon className="text-primary" />
```

### Pattern 6: Badges

```tsx
// ❌ BAD
<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
  Badge
</span>

// ✅ GOOD
<span className="bg-primary/10 text-primary px-2 py-1 rounded">
  Badge
</span>
```

### Pattern 7: Hover States

```tsx
// ❌ BAD
<div className="hover:bg-gray-100">
  Hoverable
</div>

// ✅ GOOD
<div className="hover:bg-muted/50">
  Hoverable
</div>
```

### Pattern 8: Focus States

```tsx
// ❌ BAD
<input className="focus:ring-2 focus:ring-blue-500" />

// ✅ GOOD
<input className="focus:ring-2 focus:ring-ring" />
```

---

## Do's and Don'ts

### ✅ DO

1. **Use semantic tokens for all colors**
   ```tsx
   <div className="bg-card text-foreground">
   ```

2. **Use opacity for variations**
   ```tsx
   <div className="bg-primary/10 text-primary">
   ```

3. **Use hover states with opacity**
   ```tsx
   <button className="bg-primary hover:bg-primary/90">
   ```

4. **Use muted-foreground for secondary text**
   ```tsx
   <p className="text-muted-foreground">
   ```

5. **Use border-border for all borders**
   ```tsx
   <div className="border border-border">
   ```

6. **Test in both light and dark modes**
   - Always toggle theme after making changes

7. **Use the Card component from shared/ui**
   ```tsx
   import { Card } from '@/shared/ui/Card';
   <Card>Content</Card>
   ```

### ❌ DON'T

1. **Don't use hardcoded colors**
   ```tsx
   // ❌ NEVER DO THIS
   <div className="bg-white text-gray-900">
   ```

2. **Don't use `text-white` on page backgrounds**
   ```tsx
   // ❌ BAD (invisible in light mode)
   <div className="bg-background text-white">
   ```

3. **Don't use `text-black` anywhere**
   ```tsx
   // ❌ BAD (invisible in dark mode)
   <div className="text-black">
   ```

4. **Don't add manual `dark:` variants**
   ```tsx
   // ❌ BAD (not maintainable)
   <div className="text-gray-900 dark:text-white">
   
   // ✅ GOOD (automatic)
   <div className="text-foreground">
   ```

5. **Don't use inline styles with hex colors**
   ```tsx
   // ❌ BAD
   <div style={{ color: '#1a1a1a' }}>
   
   // ✅ GOOD
   <div className="text-foreground">
   ```

6. **Don't use gray-* colors**
   ```tsx
   // ❌ BAD
   <div className="bg-gray-100 text-gray-700">
   
   // ✅ GOOD
   <div className="bg-muted text-muted-foreground">
   ```

7. **Don't use slate-* colors**
   ```tsx
   // ❌ BAD
   <div className="bg-slate-50 text-slate-900">
   
   // ✅ GOOD
   <div className="bg-background text-foreground">
   ```

---

## Examples

### Example 1: Module Detail Page Header

```tsx
// ❌ BEFORE
<div className="bg-gradient-to-l from-emerald-600 to-teal-700 text-white">
  <Badge className="bg-white/20 text-white">UEF-111</Badge>
  <h1 className="text-3xl font-bold">علوم القرآن</h1>
  <p className="text-emerald-100">Quranic Sciences</p>
</div>

// ✅ AFTER
<div className="bg-gradient-to-l from-primary to-primary/90 text-primary-foreground">
  <Badge className="bg-primary-foreground/20 text-primary-foreground">UEF-111</Badge>
  <h1 className="text-3xl font-bold">علوم القرآن</h1>
  <p className="text-primary-foreground/80">Quranic Sciences</p>
</div>
```

### Example 2: Card with Content

```tsx
// ❌ BEFORE
<div className="bg-white border border-gray-200 rounded-lg p-6">
  <h2 className="text-gray-900 font-bold mb-2">أهمية المقياس</h2>
  <p className="text-gray-700 leading-relaxed">
    يعتبر هذا المقياس من المقاييس الأساسية...
  </p>
</div>

// ✅ AFTER
<div className="bg-card border border-border rounded-lg p-6">
  <h2 className="text-foreground font-bold mb-2">أهمية المقياس</h2>
  <p className="text-foreground leading-relaxed">
    يعتبر هذا المقياس من المقاييس الأساسية...
  </p>
</div>
```

### Example 3: List with Icons

```tsx
// ❌ BEFORE
<ul className="space-y-2">
  {items.map((item) => (
    <li key={item.id} className="flex items-start gap-2">
      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      <span className="text-gray-700">{item.text}</span>
    </li>
  ))}
</ul>

// ✅ AFTER
<ul className="space-y-2">
  {items.map((item) => (
    <li key={item.id} className="flex items-start gap-2">
      <CheckCircle2 className="h-5 w-5 text-primary" />
      <span className="text-foreground">{item.text}</span>
    </li>
  ))}
</ul>
```

### Example 4: Statistics Cards

```tsx
// ❌ BEFORE
<div className="bg-emerald-50 p-4 rounded-lg">
  <div className="text-2xl font-bold text-emerald-700">42</div>
  <div className="text-sm text-gray-600">دروس مكتملة</div>
</div>

// ✅ AFTER
<div className="bg-primary/10 p-4 rounded-lg">
  <div className="text-2xl font-bold text-primary">42</div>
  <div className="text-sm text-muted-foreground">دروس مكتملة</div>
</div>
```

### Example 5: Breadcrumb Navigation

```tsx
// ❌ BEFORE
<nav className="flex items-center gap-2 text-sm text-gray-600">
  <button className="hover:text-emerald-600">الأكاديميات</button>
  <span>/</span>
  <span className="text-gray-900 font-medium">علوم القرآن</span>
</nav>

// ✅ AFTER
<nav className="flex items-center gap-2 text-sm text-muted-foreground">
  <button className="hover:text-primary">الأكاديميات</button>
  <span>/</span>
  <span className="text-foreground font-medium">علوم القرآن</span>
</nav>
```

### Example 6: Lesson Item (Conditional Styling)

```tsx
// ❌ BEFORE
<div className={`flex items-center gap-3 p-3 rounded-lg border ${
  isCompleted
    ? 'bg-emerald-50 border-emerald-200'
    : 'bg-white border-gray-200 hover:bg-gray-50'
}`}>
  {isCompleted ? (
    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
  ) : (
    <Circle className="h-5 w-5 text-gray-400" />
  )}
  <div className="font-medium text-gray-900">{lesson.title}</div>
</div>

// ✅ AFTER
<div className={`flex items-center gap-3 p-3 rounded-lg border ${
  isCompleted
    ? 'bg-primary/10 border-primary/20'
    : 'bg-card border-border hover:bg-muted/50'
}`}>
  {isCompleted ? (
    <CheckCircle2 className="h-5 w-5 text-primary" />
  ) : (
    <Circle className="h-5 w-5 text-muted-foreground" />
  )}
  <div className="font-medium text-foreground">{lesson.title}</div>
</div>
```

---

## Troubleshooting

### Problem 1: Text Disappears in Dark Mode

**Symptom:** Text is invisible when switching to dark mode.

**Cause:** Using hardcoded dark colors (e.g., `text-gray-900`) on dark backgrounds.

**Solution:**
```tsx
// ❌ BEFORE
<div className="text-gray-900">Invisible in dark mode</div>

// ✅ AFTER
<div className="text-foreground">Visible in both modes</div>
```

### Problem 2: White Cards on Dark Background

**Symptom:** Blinding white cards in dark mode.

**Cause:** Using `bg-white` instead of semantic token.

**Solution:**
```tsx
// ❌ BEFORE
<div className="bg-white">Blinding white card</div>

// ✅ AFTER
<div className="bg-card">Adapts to theme</div>
```

### Problem 3: Borders Not Visible

**Symptom:** Borders disappear in one of the themes.

**Cause:** Using hardcoded border colors.

**Solution:**
```tsx
// ❌ BEFORE
<div className="border border-gray-200">Border may disappear</div>

// ✅ AFTER
<div className="border border-border">Border always visible</div>
```

### Problem 4: Links Not Visible

**Symptom:** Links blend with text or disappear.

**Cause:** Using hardcoded link colors.

**Solution:**
```tsx
// ❌ BEFORE
<a className="text-blue-600">May not be visible</a>

// ✅ AFTER
<a className="text-primary hover:text-primary/80">Always visible</a>
```

### Problem 5: Hover States Break

**Symptom:** Hover states look wrong in one theme.

**Cause:** Using hardcoded hover colors.

**Solution:**
```tsx
// ❌ BEFORE
<button className="hover:bg-gray-100">Breaks in dark mode</button>

// ✅ AFTER
<button className="hover:bg-muted/50">Works in both modes</button>
```

---

## Quick Reference Card

### Text Colors
- Main text: `text-foreground`
- Secondary text: `text-muted-foreground`
- On primary: `text-primary-foreground`
- Links: `text-primary`

### Backgrounds
- Page: `bg-background`
- Cards: `bg-card`
- Subtle: `bg-muted`
- Primary: `bg-primary`

### Borders
- All borders: `border-border`
- Focus rings: `ring-ring`

### Interactive
- Primary button: `bg-primary text-primary-foreground`
- Secondary button: `bg-secondary text-secondary-foreground`
- Destructive button: `bg-destructive text-destructive-foreground`

---

## Need Help?

1. **Check the documentation:**
   - `THEME_ARCHITECTURE.md` - Complete token system design
   - `THEME_ROOT_CAUSE_ANALYSIS.md` - Why we made these changes

2. **Look at examples:**
   - `src/modules/ulum-al-quran/components/ModuleDetailPage.tsx` - Fully refactored
   - `src/features/academics/AcademicModulePage.tsx` - Fully refactored

3. **Test your changes:**
   - Always toggle between light and dark modes
   - Check contrast with DevTools
   - Verify on mobile

4. **Ask for review:**
   - Request code review before merging
   - Include screenshots of both themes

---

**Migration Guide Version:** 2.0  
**Last Updated:** January 16, 2026  
**Maintained By:** Senior Frontend Engineer  

---

**End of Migration Guide**
