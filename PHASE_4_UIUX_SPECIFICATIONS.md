## Phase 4: UI/UX Design Specifications

## Overview

This phase defines the complete UI/UX redesign that transforms the platform from a collection of pages into a **professional university LMS** with persistent navigation, clear hierarchy, and excellent user experience.

---

## Design Principles

1. **Academic Seriousness** - Clean, professional, respectful design
2. **Arabic-First** - RTL-native with perfect Arabic typography
3. **Clarity Over Decoration** - No visual noise, clear hierarchy
4. **Persistent Context** - Always know where you are
5. **Efficient Navigation** - Quick access to any content
6. **Calm Aesthetics** - Generous whitespace, soft colors, readable text

---

## Layout System

### Three Main Layouts

#### 1. **PublicLayout** (Landing, About, Manhaj)
```
┌─────────────────────────────────────┐
│           Header (Simple)            │
├─────────────────────────────────────┤
│                                      │
│          Full-Width Content          │
│                                      │
├─────────────────────────────────────┤
│              Footer                  │
└─────────────────────────────────────┘
```

**Characteristics:**
- Simple header with logo + navigation links
- Full-width content area
- Minimal distractions
- Focus on content

#### 2. **AcademicLayout** (Years, Semesters, Subjects)
```
┌─────────────────────────────────────┐
│        Header with Breadcrumbs       │
├──────────┬──────────────────────────┤
│          │                           │
│ Sidebar  │     Main Content          │
│          │                           │
│ - Years  │   (Subject Cards,         │
│ - Sems   │    Statistics, etc.)      │
│ - Subs   │                           │
│          │                           │
├──────────┴──────────────────────────┤
│              Footer                  │
└─────────────────────────────────────┘
```

**Characteristics:**
- Persistent sidebar with navigation tree
- Breadcrumbs showing current location
- Main content area for page content
- Sidebar collapsible on mobile

#### 3. **LessonLayout** (Lesson Reading View)
```
┌─────────────────────────────────────┐
│        Header with Breadcrumbs       │
├──────┬──────────────────────┬───────┤
│      │                       │       │
│ TOC  │   Lesson Content      │ Meta  │
│      │                       │       │
│ - 1  │   # Introduction      │ Info  │
│ - 2  │   Lorem ipsum...      │       │
│ - 3  │                       │ Refs  │
│      │   ## Section 1        │       │
│      │   More content...     │       │
│      │                       │       │
│      │   [Prev] [Next]       │       │
├──────┴──────────────────────┴───────┤
│              Footer                  │
└─────────────────────────────────────┘
```

**Characteristics:**
- Table of Contents (left sidebar)
- Main lesson content (center, max-width for readability)
- Metadata sidebar (right): objectives, references, keywords
- Previous/Next lesson navigation
- TOC highlights current section on scroll

---

## Component Specifications

### 1. Sidebar Navigation

**Purpose:** Provide quick access to all academic content

**Structure:**
```
Sidebar
├── Year Selector (if multiple years)
├── Semester Selector
├── Subjects List
│   ├── Subject 1
│   │   └── Lessons (expandable)
│   ├── Subject 2
│   └── ...
└── Quick Links
    ├── Curriculum Map
    └── Statistics
```

**Behavior:**
- Current year/semester highlighted
- Current subject expanded
- Current lesson highlighted
- Click subject → go to subject detail
- Click lesson → go to lesson view
- Collapsible on mobile (hamburger menu)

**Visual:**
- Clean hierarchy with indentation
- Icons for subjects
- Numbers for lessons
- Subtle hover effects
- Active state clearly visible

### 2. Breadcrumbs

**Purpose:** Show current location in hierarchy

**Format:**
```
Home > Year 1 > Semester 1 > Subjects > Aqeedah > Lesson 1
```

**Behavior:**
- Each segment is clickable (except current)
- Truncate on mobile (show only last 2-3 levels)
- Arabic labels when in Arabic mode

**Visual:**
- Small, unobtrusive
- Clear separators (> or /)
- Current page not clickable
- Hover effect on clickable segments

### 3. Lesson Reader

**Purpose:** Optimal reading experience for lesson content

**Features:**
- **Table of Contents** (left)
  - Auto-generated from headings
  - Scroll spy (highlight current section)
  - Click to jump to section
  - Collapsible on mobile

- **Content Area** (center)
  - Max-width: 65ch (optimal reading width)
  - Large, readable font (18-20px)
  - Generous line-height (1.7-1.8)
  - Proper heading hierarchy
  - Code blocks with syntax highlighting
  - Tables with proper styling
  - Images with captions

- **Metadata Sidebar** (right)
  - Lesson objectives
  - References
  - Keywords
  - Estimated duration
  - Difficulty level
  - Related lessons

- **Navigation** (bottom)
  - Previous lesson button
  - Next lesson button
  - Back to subject button

### 4. Subject Card (Enhanced)

**Current:** Simple card with title, description, stats

**Enhanced:**
```
┌─────────────────────────────────────┐
│ [Icon]  Subject Title (Arabic)       │
│         Subject Title (English)      │
├─────────────────────────────────────┤
│ Short description...                 │
│                                      │
│ 📊 6 Credits | 45 Hours | 4 Lessons  │
│ 🔗 Connects to: Fiqh, Quran          │
│                                      │
│ [View Details]  [Start Learning]     │
└─────────────────────────────────────┘
```

**Features:**
- Gradient background (category-specific)
- Hover effect (lift + shadow)
- Progress bar (if tracking enabled)
- Connection indicators
- Clear CTAs

### 5. Semester Overview

**Purpose:** Give students a clear picture of the semester

**Sections:**
1. **Statistics Cards**
   - Total subjects
   - Total credits
   - Total hours
   - Total lessons

2. **Learning Phases**
   - 4 phases with timeline
   - Subjects in each phase
   - Visual progression

3. **Subjects Grid**
   - Organized by category
   - Filterable
   - Sortable

4. **Curriculum Map**
   - Visual diagram
   - Interactive (click subject → go to detail)

### 6. Year Overview

**Purpose:** Show all semesters in a year

**Layout:**
```
Year 1 - Bachelor in Sharia Sciences

┌─────────────┐  ┌─────────────┐
│ Semester 1  │  │ Semester 2  │
│             │  │             │
│ 10 Subjects │  │ Coming Soon │
│ 44 Credits  │  │             │
│             │  │             │
│ [View]      │  │             │
└─────────────┘  └─────────────┘
```

---

## Color System (Refined)

### Primary Colors
- **Teal** (#0d9488): Primary brand color, knowledge
- **Emerald** (#10b981): Growth, Arabic, life
- **Blue** (#3b82f6): Application, Fiqh, practical

### Category Colors
- **Core Sharia** (Gold/Amber): #f59e0b - Precious, foundational
- **Supporting** (Purple): #a855f7 - Spiritual, supportive
- **Technical** (Blue): #3b82f6 - Practical, modern

### Semantic Colors
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)

### Neutrals
- **Background Light**: #ffffff
- **Background Dark**: #0f172a
- **Surface Light**: #f8fafc
- **Surface Dark**: #1e293b
- **Border Light**: #e2e8f0
- **Border Dark**: #334155
- **Text Light**: #0f172a
- **Text Dark**: #f8fafc

---

## Typography

### Arabic Fonts
- **Headings**: Cairo (700 weight)
- **Body**: Tajawal (400 weight)
- **Code**: Cascadia Code

### English Fonts
- **Headings**: Inter (600-700 weight)
- **Body**: Inter (400 weight)
- **Code**: Cascadia Code

### Scale
```
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)
body: 1rem (16px)
small: 0.875rem (14px)
```

### Reading Content
```
body: 1.125rem (18px)
line-height: 1.75
max-width: 65ch
```

---

## Spacing System

Using Tailwind's spacing scale:
```
xs: 0.5rem (8px)
sm: 0.75rem (12px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
```

**Generous whitespace:**
- Section padding: 2xl-3xl
- Card padding: lg-xl
- Element spacing: md-lg

---

## Responsive Breakpoints

```
sm: 640px   (Mobile landscape)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
2xl: 1536px (Extra large)
```

**Behavior:**
- **Mobile (<768px)**: Sidebar hidden, hamburger menu, stacked layout
- **Tablet (768-1024px)**: Collapsible sidebar, 2-column grid
- **Desktop (>1024px)**: Full sidebar, 3-column grid, optimal layout

---

## Interaction Patterns

### Hover States
- **Cards**: Lift (translateY(-2px)) + shadow increase
- **Buttons**: Background darken + scale(1.02)
- **Links**: Underline + color change
- **Sidebar items**: Background highlight

### Active States
- **Current page**: Bold + colored indicator
- **Current section**: Highlighted background
- **Selected filter**: Filled background

### Loading States
- **Page load**: Skeleton screens (not spinners)
- **Data fetch**: Shimmer effect
- **Lazy load**: Fade in

### Transitions
- **Duration**: 150-300ms (fast, not slow)
- **Easing**: ease-in-out
- **Properties**: transform, opacity, background, shadow

---

## Accessibility

### Requirements
1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Enter/Space to activate
   - Escape to close modals/menus

2. **Screen Readers**
   - Proper ARIA labels
   - Semantic HTML
   - Skip links

3. **Color Contrast**
   - WCAG AA minimum (4.5:1 for text)
   - AAA preferred (7:1)

4. **Focus Indicators**
   - Visible focus rings
   - High contrast
   - Not removed

---

## Mobile Considerations

### Sidebar on Mobile
- Hidden by default
- Hamburger menu button (top-left)
- Slide in from right (RTL) or left (LTR)
- Overlay with backdrop
- Close on backdrop click or X button

### Breadcrumbs on Mobile
- Show only last 2 levels
- Truncate long names
- Horizontal scroll if needed

### Lesson Reader on Mobile
- TOC hidden by default (button to show)
- Metadata sidebar hidden (show in expandable section)
- Full-width content
- Sticky navigation buttons

### Touch Targets
- Minimum 44x44px
- Generous spacing between tappable elements
- No hover-only interactions

---

## Implementation Priority

### Phase 4A: Core Layouts
1. Create PublicLayout component
2. Create AcademicLayout component
3. Create LessonLayout component
4. Implement responsive behavior

### Phase 4B: Navigation Components
1. Sidebar component with navigation tree
2. Breadcrumbs component
3. Mobile hamburger menu
4. Lesson navigation (prev/next)

### Phase 4C: Content Components
1. Enhanced Subject Card
2. Lesson Reader with TOC
3. Metadata sidebar
4. Statistics cards

### Phase 4D: Polish
1. Transitions and animations
2. Loading states
3. Error states
4. Empty states

---

## Success Criteria

✅ **Navigation**
- Can reach any content in ≤3 clicks
- Always know current location
- Sidebar provides quick access

✅ **Reading Experience**
- Comfortable reading width
- Excellent typography
- Clear hierarchy
- Easy navigation between lessons

✅ **Professional Feel**
- Looks like a university LMS
- Clean, calm, serious design
- No visual clutter
- Consistent patterns

✅ **Responsive**
- Works perfectly on mobile
- Adapts to tablet
- Optimal on desktop

✅ **Accessible**
- Keyboard navigable
- Screen reader friendly
- High contrast
- Clear focus indicators

---

## Next Steps

**Phase 5:** Implement the layouts and components defined here, then refactor existing pages to use the new architecture.
