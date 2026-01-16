# Academic Structure Audit
## Current State vs. Required State

**Date:** January 16, 2026  
**Project:** Manhaj Islamic Studies Platform  
**Purpose:** Identify gaps between current implementation and required academic structure  

---

## Executive Summary

The current implementation has a **solid foundation** but needs refinement to accurately represent the Faculty of Islamic Sciences following the Algerian LMD model. The main gaps are:

1. **Missing Common Core concept** (Year 1 جذع مشترك)
2. **Unclear specialization transitions** (Year 1 → Year 2 → Year 3)
3. **Missing academic pathways** (Licence → Master transitions)
4. **Incomplete Master structure** (only 4 specializations vs. required 6)
5. **Mixed language in UI** (needs to be Arabic-only)

---

## Current State Analysis

### ✅ What's Working Well

1. **Domain Models**
   - Clean TypeScript interfaces
   - Proper separation of Degree, Specialty, Module types
   - LMD system recognized (3 years Licence, 2 years Master)

2. **Data Structure**
   - Degrees data exists for Licence and Master
   - 7 Licence specializations defined
   - 4 Master specializations defined
   - Module structure with credits, hours, prerequisites

3. **Technical Foundation**
   - React + TypeScript (strict)
   - Tailwind CSS
   - RTL support
   - Theme system implemented
   - Build passing

### ❌ Critical Gaps

#### 1. Missing Common Core Concept

**Current State:**
- Year 1 modules exist but not explicitly marked as "Common Core"
- No clear indication that Year 1 is shared across all students
- Specialization choice timing is unclear

**Required State:**
- Year 1 must be explicitly labeled as "جذع مشترك" (Common Core)
- All students take the same modules in Year 1
- Specialization begins in Year 2
- UI must show this progression clearly

**Impact:** Students don't understand when they choose specialization

---

#### 2. Unclear Specialization Transitions

**Current State:**
- Specializations exist but no transition logic
- No guidance on how to choose specialization
- No prerequisites for entering a specialization
- No academic pathways shown

**Required State:**
- Clear transition points:
  - Year 1: Common Core (all students)
  - Year 2: Orientation & deepening (specialization begins)
  - Year 3: Full specialization
- UI components showing:
  - "Choose your specialization" at end of Year 1
  - Prerequisites for each specialization
  - Academic and career outcomes per specialization

**Impact:** Students don't know how to progress through the system

---

#### 3. Missing Licence → Master Pathways

**Current State:**
- Licence specializations: 7
- Master specializations: 4
- No explicit mapping between them
- No guidance on which Licence leads to which Master

**Required State:**
- Clear pathways documented:
  - Qur'anic Sciences (Licence) → Tafsir and Qur'anic Sciences (Master)
  - Hadith Sciences (Licence) → Hadith and Its Sciences (Master)
  - Fiqh (Licence) → Fiqh and Usul al-Fiqh (Master)
  - Aqidah (Licence) → Aqidah and Islamic Thought (Master)
  - Da'wah (Licence) → Da'wah and Islamic Culture (Master)
  - Sharia-Law (Licence) → Sharia and Law (Master)
- UI showing possible Master tracks after Licence
- Academic and professional outlooks per pathway

**Impact:** Students can't plan their academic journey

---

#### 4. Incomplete Master Structure

**Current State:**
- Only 4 Master specializations defined
- Missing 2 required specializations

**Required State:**
- 6 Master specializations:
  1. Tafsir and Qur'anic Sciences ✅ (exists as 'quran-sciences-master')
  2. Hadith and Its Sciences ✅ (exists as 'hadith-sciences-master')
  3. Fiqh and Usul al-Fiqh ✅ (exists as 'fiqh-master')
  4. Aqidah and Islamic Thought ✅ (exists as 'aqidah-master')
  5. Da'wah and Islamic Culture ❌ (MISSING)
  6. Sharia and Law ❌ (MISSING)

**Impact:** Incomplete academic offering

---

#### 5. Mixed Language in UI

**Current State:**
- Some UI elements in English
- Mixed Arabic/English in breadcrumbs
- English fallbacks in some components

**Required State:**
- **100% Arabic UI** (as per requirement)
- No English in interface
- English only in code comments and documentation

**Impact:** Not aligned with user requirement (Arabic-only platform)

---

#### 6. Module Positioning Unclear

**Current State:**
- Modules exist but not clearly positioned in academic progression
- Qur'anic Sciences module exists but not explicitly marked as "Year 1 Common Core"
- No indication of which modules are core vs. specialization

**Required State:**
- Every module must have:
  - Year (1, 2, or 3 for Licence; 1 or 2 for Master)
  - Type (Common Core, Orientation, Specialization, Elective)
  - Position in academic journey
- UI showing: "هذا المقياس جزء من الجذع المشترك للسنة الأولى"

**Impact:** Students don't understand where modules fit in their studies

---

## Required Academic Structure

### Licence (3 years, 6 semesters)

#### Year 1: Common Core (جذع مشترك)
**All students take the same modules:**

**Semester 1 (S1):**
1. علوم القرآن (Qur'anic Sciences) ✅ EXISTS
2. التفسير التحليلي (Analytical Tafsir)
3. الحديث النبوي (Prophetic Hadith)
4. الفقه الإسلامي (Islamic Jurisprudence)
5. أصول الفقه (Principles of Jurisprudence)
6. العقيدة الإسلامية (Islamic Creed)
7. السيرة النبوية (Prophetic Biography)
8. اللغة العربية (Arabic Language)
9. منهجية البحث (Research Methodology)
10. اللغة الأجنبية (Foreign Language)

**Semester 2 (S2):**
1. علوم الحديث (Hadith Sciences)
2. التفسير الموضوعي (Thematic Tafsir)
3. الفقه المقارن (Comparative Fiqh)
4. أصول الفقه المتقدم (Advanced Usul al-Fiqh)
5. العقيدة والمذاهب (Creed and Sects)
6. الدعوة والثقافة الإسلامية (Da'wah and Islamic Culture)
7. النحو والصرف (Grammar and Morphology)
8. الإعلام الآلي (Computer Science)
9. حقوق الإنسان (Human Rights)
10. اللغة الأجنبية 2 (Foreign Language 2)

#### Year 2: Orientation & Deepening (التوجيه والتعمق)
**Students choose specialization and begin specialized modules**

- 70% specialized modules
- 30% complementary modules
- Semesters: S3, S4

#### Year 3: Full Specialization (التخصص الكامل)
**100% specialized modules in chosen field**

- Deep dive into specialization
- Research project or thesis
- Semesters: S5, S6

### Master (2 years, 4 semesters)

**Fully specialized and research-oriented**

- Advanced research methodology
- Specialized seminars
- Master's thesis
- Semesters: S1, S2, S3, S4

---

## Specializations Mapping

### Licence Specializations (7)

1. **علوم القرآن والقراءات** (Qur'anic Sciences and Readings)
   - ID: `quran-sciences`
   - Begins: Year 2
   - Master pathway: Tafsir and Qur'anic Sciences

2. **الحديث وعلومه** (Hadith and Its Sciences)
   - ID: `hadith-sciences`
   - Begins: Year 2
   - Master pathway: Hadith and Its Sciences

3. **الفقه وأصوله** (Fiqh and Its Principles)
   - ID: `fiqh`
   - Begins: Year 2
   - Master pathway: Fiqh and Usul al-Fiqh

4. **العقيدة والمذاهب المعاصرة** (Aqidah and Contemporary Sects)
   - ID: `aqidah`
   - Begins: Year 2
   - Master pathway: Aqidah and Islamic Thought

5. **الدعوة والثقافة الإسلامية** (Da'wah and Islamic Culture)
   - ID: `dawah`
   - Begins: Year 2
   - Master pathway: Da'wah and Islamic Culture

6. **الشريعة والقانون** (Sharia and Law)
   - ID: `sharia-law`
   - Begins: Year 2
   - Master pathway: Sharia and Law

7. **اللغة العربية والدراسات القرآنية** (Arabic Language and Qur'anic Studies)
   - ID: `arabic-quran`
   - Begins: Year 2
   - Master pathway: Tafsir and Qur'anic Sciences

### Master Specializations (6)

1. **التفسير وعلوم القرآن** (Tafsir and Qur'anic Sciences)
   - ID: `tafsir-quran-master`
   - From Licence: Qur'anic Sciences, Arabic-Quran

2. **الحديث وعلومه** (Hadith and Its Sciences)
   - ID: `hadith-master`
   - From Licence: Hadith Sciences

3. **الفقه وأصوله** (Fiqh and Usul al-Fiqh)
   - ID: `fiqh-master`
   - From Licence: Fiqh

4. **العقيدة والفكر الإسلامي** (Aqidah and Islamic Thought)
   - ID: `aqidah-master`
   - From Licence: Aqidah

5. **الدعوة والثقافة الإسلامية** (Da'wah and Islamic Culture)
   - ID: `dawah-master`
   - From Licence: Da'wah

6. **الشريعة والقانون** (Sharia and Law)
   - ID: `sharia-law-master`
   - From Licence: Sharia-Law

---

## Implementation Gaps Summary

| Area | Current State | Required State | Priority |
|------|---------------|----------------|----------|
| Common Core | Not explicit | Year 1 labeled as جذع مشترك | 🔴 HIGH |
| Transitions | No UI | Clear Year 1→2→3 progression | 🔴 HIGH |
| Pathways | Not documented | Licence→Master mapping | 🔴 HIGH |
| Master specs | 4 specializations | 6 specializations | 🔴 HIGH |
| UI Language | Mixed AR/EN | 100% Arabic | 🔴 HIGH |
| Module positioning | Unclear | Year + Type for each module | 🟡 MEDIUM |
| Career outlooks | Missing | Per specialization | 🟡 MEDIUM |
| Prerequisites | Basic | Detailed per specialization | 🟢 LOW |

---

## Recommended Refactoring Approach

### Phase 1: Domain Model Enhancement
1. Add `yearLevel` to Module type (1, 2, 3)
2. Add `moduleType` to Module type (common-core, orientation, specialization, elective)
3. Add `masterPathways` to Specialty type (array of Master IDs)
4. Add `licencePrerequisites` to Master Specialty type
5. Add `careerOutlooks` and `researchAreas` to Specialty type

### Phase 2: Data Structure Update
1. Mark all Year 1 modules as `common-core`
2. Create complete Year 2 and Year 3 modules for each specialization
3. Add 2 missing Master specializations (Da'wah, Sharia-Law)
4. Document Licence→Master pathways in data
5. Add career and research outlooks per specialization

### Phase 3: Routing Refactor
1. Update routes to reflect academic hierarchy:
   - `/academics/licence/year-1` (Common Core)
   - `/academics/licence/year-2/:specialtyId` (Orientation)
   - `/academics/licence/year-3/:specialtyId` (Specialization)
   - `/academics/master/:specialtyId`
2. Add transition pages:
   - `/academics/choose-specialization` (after Year 1)
   - `/academics/master-pathways` (after Licence)

### Phase 4: UI Components
1. Create `CommonCoreIndicator` component
2. Create `SpecializationChooser` component
3. Create `AcademicPathwayViewer` component
4. Create `CareerOutlookSection` component
5. Update all UI text to Arabic-only

### Phase 5: Module Enhancement
1. Refactor Qur'anic Sciences module to show:
   - "جزء من الجذع المشترك - السنة الأولى"
   - "يؤهل للتخصص في: التفسير وعلوم القرآن"
2. Add similar indicators to all modules

---

## Success Criteria

✅ **Academic Accuracy**
- Year 1 clearly labeled as Common Core
- Specialization begins in Year 2
- All 6 Master specializations exist
- Licence→Master pathways documented

✅ **UI Clarity**
- 100% Arabic interface
- Clear academic progression shown
- Specialization choice guidance
- Career outlooks visible

✅ **Technical Quality**
- Build passes
- TypeScript strict mode
- No hardcoded data
- Clean separation of concerns

✅ **Documentation**
- How to add a specialization
- How to add a module
- How to define transitions

---

**Next Steps:** Proceed to Phase 1 (Domain Model Enhancement)

---

**End of Audit**
