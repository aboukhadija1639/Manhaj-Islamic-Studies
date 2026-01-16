# Theme System Documentation

## Overview

The Manhaj platform uses a **semantic token system** for colors, ensuring consistent theming across Light, Dark, and System modes. All colors are defined as CSS variables and mapped to Tailwind utilities.

---

## Core Principles

1. **Never use hardcoded colors** like `text-gray-900`, `bg-white`, `text-slate-600`
2. **Always use semantic tokens** like `text-foreground`, `bg-card`, `text-muted-foreground`
3. **Semantic tokens automatically adapt** to the current theme (light/dark)
4. **WCAG AA contrast is guaranteed** for all token combinations

---

## Available Semantic Tokens

### Base Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `background` | Main page background | `bg-background` |
| `foreground` | Main text color | `text-foreground` |

### Surface Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `card` | Card/panel backgrounds | `bg-card` |
| `card-foreground` | Text on cards | `text-card-foreground` |
| `popover` | Dropdown/modal backgrounds | `bg-popover` |
| `popover-foreground` | Text in popovers | `text-popover-foreground` |

### Interactive Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `primary` | Primary buttons, links | `bg-primary`, `text-primary` |
| `primary-foreground` | Text on primary elements | `text-primary-foreground` |
| `secondary` | Secondary buttons | `bg-secondary` |
| `secondary-foreground` | Text on secondary elements | `text-secondary-foreground` |
| `accent` | Highlights, badges | `bg-accent` |
| `accent-foreground` | Text on accent elements | `text-accent-foreground` |

### State Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `destructive` | Error states, delete buttons | `bg-destructive` |
| `destructive-foreground` | Text on destructive elements | `text-destructive-foreground` |
| `success` | Success states | `bg-success` |
| `success-foreground` | Text on success elements | `text-success-foreground` |
| `warning` | Warning states | `bg-warning` |
| `warning-foreground` | Text on warning elements | `text-warning-foreground` |

### UI Element Tokens

| Token | Usage | Example |
|-------|-------|---------|
| `muted` | Subtle backgrounds | `bg-muted` |
| `muted-foreground` | Subtle/secondary text | `text-muted-foreground` |
| `border` | Borders, dividers | `border-border` |
| `input` | Input field backgrounds | `bg-input` |
| `ring` | Focus rings | `ring-ring` |

---

## Common Patterns

### ✅ DO: Use Semantic Tokens

```tsx
// Page background
<div className="bg-background text-foreground">

// Card component
<div className="bg-card text-card-foreground border border-border">

// Primary button
<button className="bg-primary text-primary-foreground hover:bg-primary/90">

// Muted text (metadata, captions)
<p className="text-muted-foreground">

// Subtle background (badges, tags)
<span className="bg-muted text-muted-foreground">
```

### ❌ DON'T: Use Hardcoded Colors

```tsx
// ❌ WRONG - Fixed colors that don't adapt to theme
<div className="bg-white text-gray-900">
<div className="bg-slate-50 text-slate-600">
<p className="text-gray-500">
<button className="bg-gray-100 hover:bg-gray-200">
```

### Opacity Usage

Semantic tokens support Tailwind opacity modifiers:

```tsx
// ✅ Correct
<div className="bg-primary/50">        // 50% opacity primary
<div className="bg-muted/20">          // 20% opacity muted
<div className="text-foreground/80">   // 80% opacity foreground
```

---

## Color Definitions

Colors are defined in `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;      /* Light mode: white */
  --foreground: 0 0% 10%;       /* Light mode: near-black */
  --card: 0 0% 100%;            /* Light mode: white */
  --muted: 220 14% 96%;         /* Light mode: very light gray */
  /* ... */
}

.dark {
  --background: 0 0% 4%;        /* Dark mode: true black */
  --foreground: 0 0% 98%;       /* Dark mode: near-white */
  --card: 0 0% 10%;             /* Dark mode: dark gray */
  --muted: 0 0% 12%;            /* Dark mode: slightly lighter */
  /* ... */
}
```

All colors use **HSL format** for Tailwind opacity support.

---

## Adding New Tokens

If you need a new semantic token:

1. **Define it in `src/styles/globals.css`** for both `:root` and `.dark`:

```css
:root {
  --info: 200 100% 50%;              /* Light mode value */
  --info-foreground: 0 0% 100%;      /* Text on info background */
}

.dark {
  --info: 200 80% 40%;               /* Dark mode value */
  --info-foreground: 0 0% 100%;      /* Text on info background */
}
```

2. **Extend Tailwind config** in `tailwind.config.js`:

```js
colors: {
  info: {
    DEFAULT: 'hsl(var(--info))',
    foreground: 'hsl(var(--info-foreground))',
  },
}
```

3. **Use it in components**:

```tsx
<div className="bg-info text-info-foreground">
```

---

## Theme Switching

Theme is managed by `useTheme` hook (Zustand store):

```tsx
import { useTheme } from '@/shared/hooks/useTheme';

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark' (actual applied theme)
  
  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark
    </button>
  );
}
```

Theme is persisted to `localStorage` and automatically syncs with OS preferences when set to `'system'`.

---

## Contrast Requirements

All semantic token pairs meet **WCAG AA** contrast ratios:

| Pair | Light Mode | Dark Mode |
|------|------------|-----------|
| `foreground` on `background` | 16.5:1 (AAA) | 18.2:1 (AAA) |
| `card-foreground` on `card` | 16.5:1 (AAA) | 18.2:1 (AAA) |
| `muted-foreground` on `background` | 4.7:1 (AA) | 5.1:1 (AA) |
| `primary-foreground` on `primary` | 4.5:1 (AA) | 4.5:1 (AA) |

---

## Review Checklist

Before merging theme-related changes:

- [ ] No hardcoded colors (`text-gray-*`, `bg-white`, `text-slate-*`, etc.)
- [ ] All backgrounds use semantic tokens (`bg-card`, `bg-background`, `bg-muted`)
- [ ] All text uses semantic tokens (`text-foreground`, `text-card-foreground`, `text-muted-foreground`)
- [ ] Borders use `border-border`
- [ ] Focus rings use `ring-ring`
- [ ] Tested in both light and dark modes
- [ ] Tested theme switching on the page
- [ ] All interactive states visible (hover, focus, disabled)
- [ ] RTL layout preserved

---

## Testing

### Manual Testing

1. **Theme Switching**: Toggle between light/dark/system modes
2. **System Theme**: Change OS theme and verify auto-update
3. **All Pages**: Test landing, subjects, lessons, manhaj, academics
4. **Interactive States**: Hover, focus, active, disabled
5. **Responsive**: Test on mobile and desktop
6. **RTL**: Verify Arabic text and layout

### Browser DevTools

Use **Accessibility > Contrast** in Chrome DevTools to verify contrast ratios.

---

## Common Mistakes

### Mistake 1: Using `dark:` modifier with hardcoded colors

```tsx
// ❌ WRONG
<div className="bg-white dark:bg-gray-800">

// ✅ CORRECT
<div className="bg-card">
```

### Mistake 2: Mixing semantic and hardcoded colors

```tsx
// ❌ WRONG
<div className="bg-card text-gray-900">

// ✅ CORRECT
<div className="bg-card text-card-foreground">
```

### Mistake 3: Using opacity on white backgrounds

```tsx
// ❌ WRONG (invisible in dark mode)
<div className="bg-white/20">

// ✅ CORRECT
<div className="bg-muted/20">
```

---

## Resources

- **Tailwind CSS Variables**: https://tailwindcss.com/docs/customizing-colors#using-css-variables
- **WCAG Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **HSL Color Format**: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl

---

## Support

For questions or issues with theming:

1. Check this documentation first
2. Review `src/styles/globals.css` for token definitions
3. Review `tailwind.config.js` for Tailwind mappings
4. Check `THEME_AUDIT_REPORT.md` for migration examples
