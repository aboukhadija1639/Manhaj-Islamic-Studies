# Sprint 1 Implementation Plan
## Manhaj Islamic Studies Platform - Foundation & UI System

### Objective
Establish production-grade foundation with RTL-first Arabic UI, modern design system, clean architecture, and performance baseline.

---

## Task Breakdown

### 1. Project Foundation & Tooling (30 min)
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS with RTL support
- [x] Setup ESLint + Prettier with strict rules
- [x] Configure TypeScript strict mode
- [x] Setup folder structure (Clean Architecture boundaries)
- [x] Configure path aliases (@/, @components/, @features/, etc.)

### 2. Design System Core (45 min)
- [x] Theme Provider (light/dark/system with persistence)
- [x] CSS Variables for color tokens (both themes)
- [x] Arabic typography system (Cairo + Tajawal)
- [x] Spacing scale and design tokens
- [x] RTL configuration in Tailwind
- [x] Reduced motion support

### 3. Base UI Components (60 min)
- [x] Button (primary/secondary/ghost/destructive)
- [x] Card component
- [x] Input & Textarea
- [x] Modal/Dialog
- [x] Toast notification system
- [x] Skeleton loader
- [x] Container & Section components
- [x] All components RTL-ready with dark/light support

### 4. Layout System (30 min)
- [x] App shell layout (Header + Sidebar + Main)
- [x] RTL-aware navigation
- [x] Responsive sidebar (drawer on mobile)
- [x] Theme toggle component
- [x] Breadcrumb navigation

### 5. Routing & Pages (45 min)
- [x] React Router setup with lazy loading
- [x] Landing page (Arabic, hero + featured subjects)
- [x] Subjects listing page (cards + filters, mock data)
- [x] Content reading page (MDX integration, TOC)
- [x] 404 page
- [x] Loading states with skeletons

### 6. Content System (30 min)
- [x] MDX configuration
- [x] Sample content files with frontmatter
- [x] Content loader utility
- [x] Table of Contents generator
- [x] Next/Previous navigation

### 7. Performance Optimization (20 min)
- [x] Route-based code splitting
- [x] Component lazy loading
- [x] Image optimization setup
- [x] Bundle size analysis config

### 8. Quality & Testing (20 min)
- [x] Vitest configuration
- [x] Smoke test for core components
- [x] Pre-commit hooks (optional)
- [x] Build verification

### 9. Deployment Setup (15 min)
- [x] Vercel configuration
- [x] Environment variables setup
- [x] Build optimization
- [x] Deployment guide

---

## Acceptance Criteria

✅ **RTL Layout**: All pages render correctly in RTL with proper spacing and alignment  
✅ **Theme System**: Dark/light/system toggle works and persists in localStorage  
✅ **Modern UI**: Components have hover/focus states, shadows, and professional appearance  
✅ **Performance**: Routes lazy-loaded, skeletons shown, bundle optimized  
✅ **Clean Architecture**: Clear separation of concerns, SOLID principles, typed contracts  
✅ **Responsive**: Works on 1366×768 to large screens + mobile devices  
✅ **Accessibility**: WCAG contrast, focus rings, semantic HTML, keyboard navigation  
✅ **Arabic Typography**: Optimized line-height, letter-spacing for readability  
✅ **One Command**: `pnpm dev` runs locally, `pnpm build` creates production bundle  
✅ **Deployment Ready**: Can deploy to Vercel/Netlify with provided guide  

---

## Tech Stack Confirmation

- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 + CSS Variables
- **Components**: shadcn/ui (Radix UI + Tailwind)
- **Animations**: Framer Motion (minimal usage)
- **Routing**: React Router 6 with lazy loading
- **State**: Zustand (theme, minimal global state)
- **Content**: MDX with frontmatter
- **i18n**: i18next (Arabic first)
- **Validation**: Zod
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

---

## Folder Structure

```
Manhaj-Islamic-Studies/
├── public/
│   └── fonts/           # Arabic fonts
├── src/
│   ├── app/             # App shell, providers, routing
│   │   ├── providers/
│   │   ├── router/
│   │   └── App.tsx
│   ├── shared/          # Shared utilities, hooks, types
│   │   ├── ui/          # Base UI components (Button, Card, etc.)
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── features/        # Feature modules
│   │   ├── landing/
│   │   ├── subjects/
│   │   ├── content/
│   │   └── search/
│   ├── content/         # MDX content files
│   │   └── subjects/
│   ├── styles/          # Global styles, theme tokens
│   └── main.tsx
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Next Steps (Sprint 2)

- Content management workflow (GitHub-based)
- Search functionality (local JSON index)
- More subjects and content
- Analytics integration
- Admin panel (Supabase consideration)

---

**Status**: Ready to implement ✅
