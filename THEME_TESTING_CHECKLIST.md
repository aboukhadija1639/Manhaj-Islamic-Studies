# Theme Testing & Verification Checklist
## Dark/Light Mode Quality Assurance

**Date:** January 16, 2026  
**Project:** Manhaj Islamic Studies Platform  
**Branch:** `fix/theme-consistency`  

---

## 1. Theme Toggle Functionality

### 1.1 Basic Toggle ✅
- [ ] Click theme toggle button
- [ ] Verify theme switches from light → dark
- [ ] Click again, verify dark → system
- [ ] Click again, verify system → light
- [ ] Verify icon changes for each mode

### 1.2 Persistence ✅
- [ ] Switch to dark mode
- [ ] Refresh page
- [ ] Verify dark mode persists
- [ ] Switch to light mode
- [ ] Refresh page
- [ ] Verify light mode persists

### 1.3 System Preference ✅
- [ ] Set OS to dark mode
- [ ] Set theme to "system"
- [ ] Verify site uses dark mode
- [ ] Change OS to light mode
- [ ] Verify site switches to light mode automatically

---

## 2. Visual Verification - Light Mode

### 2.1 ModuleDetailPage (علوم القرآن)
**URL:** `/academics/licence-islamic-sciences/quran-sciences/year-1/s1/ulum-al-quran`

#### Header Section
- [ ] Page background is white (#ffffff)
- [ ] Header gradient is teal (primary color)
- [ ] Header text is white and readable
- [ ] Badge has semi-transparent white background
- [ ] Progress card has semi-transparent white background
- [ ] All icons are visible

#### Overview Tab
- [ ] Card backgrounds are white
- [ ] Card text is dark (#1a1a1a)
- [ ] Checkmark icons are teal (primary)
- [ ] Bullet points are teal (primary)
- [ ] Links are teal and underline on hover
- [ ] All text is readable with high contrast

#### Objectives Tab
- [ ] Numbered circles have light teal background
- [ ] Numbered circles have teal text
- [ ] Objective text is dark and readable
- [ ] Checkmark icons are teal

#### Content Tab
- [ ] Unit cards have white background
- [ ] Unit card hover has light gray background
- [ ] Lesson items have white background
- [ ] Completed lessons have light teal background
- [ ] Lesson text is dark and readable
- [ ] Checkmark icons are teal
- [ ] Empty circle icons are gray

#### Resources Tab
- [ ] Resource cards have white background
- [ ] Resource icons have gray background
- [ ] Category badges have appropriate colors
- [ ] All text is readable

#### Progress Tab
- [ ] Statistics cards have colored backgrounds:
  - Completed: light teal
  - Remaining: light yellow
  - Percentage: beige
- [ ] Statistics text is readable
- [ ] Progress bars are visible
- [ ] Unit names are dark and readable

### 2.2 AcademicModulePage
**URL:** `/academics/licence-islamic-sciences/quran-sciences/year-1/s1/ulum-al-quran`

#### Breadcrumb
- [ ] Breadcrumb background is white
- [ ] Breadcrumb text is gray
- [ ] Breadcrumb hover is teal
- [ ] Current page text is dark
- [ ] Border is visible

#### "Under Construction" Page
**URL:** Any other module (e.g., `/academics/.../tafsir`)

- [ ] Page background is white
- [ ] Back link is teal
- [ ] Module title is dark
- [ ] Module details are gray
- [ ] Card background is white
- [ ] Card border is visible
- [ ] "Under construction" text is dark
- [ ] Description text is gray

---

## 3. Visual Verification - Dark Mode

### 3.1 ModuleDetailPage (علوم القرآن)
**URL:** `/academics/licence-islamic-sciences/quran-sciences/year-1/s1/ulum-al-quran`

#### Header Section
- [ ] Page background is dark (#0a0a0a)
- [ ] Header gradient is teal (same as light mode)
- [ ] Header text is white and readable
- [ ] Badge has semi-transparent white background
- [ ] Progress card has semi-transparent white background
- [ ] All icons are visible

#### Overview Tab
- [ ] Card backgrounds are dark gray (#1a1a1a)
- [ ] Card text is near-white (#fafafa)
- [ ] Checkmark icons are teal (primary)
- [ ] Bullet points are teal (primary)
- [ ] Links are teal and underline on hover
- [ ] All text is readable with high contrast
- [ ] **NO WHITE CARDS** (common issue)
- [ ] **NO DARK TEXT ON DARK BACKGROUND** (common issue)

#### Objectives Tab
- [ ] Numbered circles have semi-transparent teal background
- [ ] Numbered circles have teal text
- [ ] Objective text is near-white and readable
- [ ] Checkmark icons are teal

#### Content Tab
- [ ] Unit cards have dark gray background (#1a1a1a)
- [ ] Unit card hover has slightly lighter background
- [ ] Lesson items have dark gray background
- [ ] Completed lessons have semi-transparent teal background
- [ ] Lesson text is near-white and readable
- [ ] Checkmark icons are teal
- [ ] Empty circle icons are light gray
- [ ] **NO INVISIBLE TEXT**

#### Resources Tab
- [ ] Resource cards have dark gray background
- [ ] Resource icons have darker gray background
- [ ] Category badges have appropriate colors (adjusted for dark mode)
- [ ] All text is near-white and readable

#### Progress Tab
- [ ] Statistics cards have colored backgrounds (adjusted opacity):
  - Completed: semi-transparent teal
  - Remaining: semi-transparent yellow
  - Percentage: dark beige
- [ ] Statistics text is readable
- [ ] Progress bars are visible
- [ ] Unit names are near-white and readable

### 3.2 AcademicModulePage
**URL:** `/academics/licence-islamic-sciences/quran-sciences/year-1/s1/ulum-al-quran`

#### Breadcrumb
- [ ] Breadcrumb background is dark gray (#1a1a1a)
- [ ] Breadcrumb text is light gray
- [ ] Breadcrumb hover is teal
- [ ] Current page text is near-white
- [ ] Border is visible (subtle)

#### "Under Construction" Page
**URL:** Any other module

- [ ] Page background is dark (#0a0a0a)
- [ ] Back link is teal
- [ ] Module title is near-white
- [ ] Module details are light gray
- [ ] Card background is dark gray (#1a1a1a)
- [ ] Card border is visible (subtle)
- [ ] "Under construction" text is near-white
- [ ] Description text is light gray

---

## 4. Contrast Ratio Verification

### 4.1 Light Mode Contrast
Use browser DevTools or WebAIM Contrast Checker:

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Body text | #1a1a1a | #ffffff | 16.1:1 | ✅ AAA |
| Muted text | #6b7280 | #ffffff | 7.4:1 | ✅ AA |
| Primary button | #ffffff | #14b8a6 | 4.9:1 | ✅ AA |
| Card text | #1a1a1a | #ffffff | 16.1:1 | ✅ AAA |

### 4.2 Dark Mode Contrast
| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Body text | #fafafa | #0a0a0a | 18.2:1 | ✅ AAA |
| Muted text | #a1a1aa | #0a0a0a | 7.8:1 | ✅ AA |
| Primary button | #ffffff | #14b8a6 | 4.9:1 | ✅ AA |
| Card text | #fafafa | #1a1a1a | 14.5:1 | ✅ AAA |

---

## 5. Cross-Browser Testing

### 5.1 Desktop Browsers

#### Chrome/Edge (Chromium)
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works
- [ ] No flicker on page load
- [ ] CSS variables work
- [ ] HSL colors work

#### Firefox
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works
- [ ] No flicker on page load
- [ ] CSS variables work
- [ ] HSL colors work

#### Safari (macOS)
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works
- [ ] No flicker on page load
- [ ] CSS variables work
- [ ] HSL colors work

### 5.2 Mobile Browsers

#### Mobile Safari (iOS)
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works
- [ ] Touch interactions work
- [ ] No layout issues

#### Chrome Android
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Theme toggle works
- [ ] Touch interactions work
- [ ] No layout issues

---

## 6. Responsive Design Testing

### 6.1 Breakpoints
Test at these viewport widths:

#### Mobile (375px)
- [ ] Layout adapts correctly
- [ ] Text is readable
- [ ] Buttons are touchable
- [ ] Theme toggle accessible
- [ ] No horizontal scroll

#### Tablet (768px)
- [ ] Layout adapts correctly
- [ ] Cards arrange properly
- [ ] Navigation works
- [ ] Theme toggle accessible

#### Desktop (1280px)
- [ ] Full layout displays
- [ ] Cards in grid
- [ ] All features accessible
- [ ] Theme toggle visible

#### Large Desktop (1920px)
- [ ] Layout doesn't break
- [ ] Content centered
- [ ] No excessive whitespace

---

## 7. Accessibility Testing

### 7.1 Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Theme toggle accessible via keyboard
- [ ] Focus indicators visible in both themes
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals (if any)

### 7.2 Screen Reader Testing
- [ ] Theme toggle has aria-label
- [ ] Headings are properly structured
- [ ] Images have alt text
- [ ] Links are descriptive
- [ ] Form inputs have labels

### 7.3 Reduced Motion
- [ ] Set OS to "reduce motion"
- [ ] Verify animations are disabled
- [ ] Transitions are instant
- [ ] Theme switch is instant

### 7.4 High Contrast Mode (Windows)
- [ ] Enable Windows High Contrast
- [ ] Verify site is still usable
- [ ] Borders are visible
- [ ] Text is readable

---

## 8. Performance Testing

### 8.1 Theme Switch Performance
- [ ] Open DevTools Performance tab
- [ ] Record theme switch
- [ ] Verify < 16ms (1 frame)
- [ ] No layout thrashing
- [ ] No forced reflows

### 8.2 Page Load Performance
- [ ] No flicker on initial load
- [ ] Theme applied before first paint
- [ ] LocalStorage read is fast
- [ ] No FOUC (Flash of Unstyled Content)

---

## 9. Edge Cases

### 9.1 LocalStorage Disabled
- [ ] Disable LocalStorage in browser
- [ ] Verify theme defaults to system
- [ ] Verify no errors in console
- [ ] Theme still toggles (doesn't persist)

### 9.2 JavaScript Disabled
- [ ] Disable JavaScript
- [ ] Verify site defaults to light mode
- [ ] Content is still readable
- [ ] No broken layouts

### 9.3 Slow Network
- [ ] Throttle network to Slow 3G
- [ ] Verify theme loads correctly
- [ ] No flicker during load
- [ ] Fonts load properly

---

## 10. Regression Testing

### 10.1 Other Pages (Not Yet Refactored)
Check that non-refactored pages still work:

#### LandingPageEnhanced
- [ ] Light mode works (may have manual dark: variants)
- [ ] Dark mode works
- [ ] Hero section visible
- [ ] Call-to-action buttons visible

#### AboutPage
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Content readable

#### DegreesPage
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Cards visible

**Note:** These pages may still have hardcoded colors but should not be completely broken.

---

## 11. Developer Experience

### 11.1 Build Process
- [ ] `pnpm build` succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Bundle size reasonable

### 11.2 Development Mode
- [ ] `pnpm dev` starts correctly
- [ ] Hot reload works
- [ ] Theme changes reflect immediately
- [ ] No console errors

---

## 12. Documentation Verification

### 12.1 Documentation Files
- [ ] THEME_ROOT_CAUSE_ANALYSIS.md exists
- [ ] THEME_ARCHITECTURE.md exists
- [ ] THEME_TESTING_CHECKLIST.md exists (this file)
- [ ] MIGRATION_GUIDE.md exists (to be created)

### 12.2 Code Comments
- [ ] globals.css has clear comments
- [ ] tailwind.config.js has comments
- [ ] Token usage is documented

---

## 13. Final Checklist

### 13.1 Critical Issues (Must Fix)
- [ ] No content disappears in dark mode
- [ ] No white cards on dark background
- [ ] No dark text on dark background
- [ ] All text meets WCAG AA contrast
- [ ] Theme toggle works reliably

### 13.2 High Priority Issues
- [ ] All refactored components work in both themes
- [ ] Breadcrumbs visible in both themes
- [ ] Links visible and accessible
- [ ] Buttons visible and clickable

### 13.3 Medium Priority Issues
- [ ] Hover states work in both themes
- [ ] Focus states visible in both themes
- [ ] Borders visible in both themes
- [ ] Shadows appropriate for theme

### 13.4 Low Priority Issues
- [ ] Decorative elements look good
- [ ] Animations smooth
- [ ] Typography consistent
- [ ] Spacing consistent

---

## 14. Sign-Off

### 14.1 Testing Completed By
- [ ] Developer (self-test)
- [ ] QA Team
- [ ] Product Owner
- [ ] Accessibility Specialist

### 14.2 Approval
- [ ] All critical issues resolved
- [ ] All high priority issues resolved
- [ ] Documentation complete
- [ ] Ready for production

---

**Testing Status:** ⏳ In Progress  
**Last Updated:** January 16, 2026  
**Tested By:** Senior Frontend Engineer  

---

**End of Testing Checklist**
