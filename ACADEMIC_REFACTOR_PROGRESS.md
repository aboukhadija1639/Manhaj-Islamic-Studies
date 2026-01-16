# Academic Structure Refactoring - Progress Report

**Date:** January 16, 2026  
**Branch:** `feature/academic-structure-refactor`  
**Status:** Phase 1-3 Complete, Phase 4-8 In Progress  

---

## Executive Summary

This document tracks the comprehensive refactoring of the Manhaj Islamic Studies Platform to accurately represent the Faculty of Islamic Sciences following the Algerian LMD (Licence-Master-Doctorat) model. The refactoring focuses on:

1. **Academic Accuracy**: Representing the real structure of Islamic Studies education
2. **Clear Transitions**: Modeling Year 1 Common Core → Year 2-3 Specialization → Master
3. **Career Pathways**: Showing academic and professional outlooks for each specialization
4. **Arabic-First UI**: Ensuring 100% Arabic interface for students

---

## What's Been Completed ✅

### Phase 1: Academic Structure Audit ✅

**Deliverable:** `ACADEMIC_STRUCTURE_AUDIT.md` (comprehensive analysis)

**Key Findings:**
- ✅ Identified 5 critical gaps in current implementation
- ✅ Documented missing Common Core concept
- ✅ Identified unclear specialization transitions
- ✅ Found missing Licence→Master pathways
- ✅ Discovered incomplete Master structure (4/6 specializations)
- ✅ Noted mixed language in UI

**Impact:** Clear roadmap for refactoring established

---

### Phase 2: Domain Model Enhancement ✅

**Deliverables:**
- `src/domain/academics/types/academic-path.types.ts` (new file, 300+ lines)
- Enhanced `specialty.types.ts` with masterPathways and researchAreas

**New Types Added:**
1. `YearLevel` - Academic year (1, 2, or 3)
2. `AcademicModuleType` - Module classification (common-core, orientation, specialization, elective, research)
3. `StudyPhase` - Study phase (common-core, orientation, specialization)
4. `AcademicPathway` - Licence→Master pathway with career outlooks
5. `CareerOutlook` - Detailed career information
6. `TransitionPoint` - Academic transition points
7. `SpecializationChoice` - Student specialization selection
8. `StudentAcademicPath` - Student progress tracking
9. `CommonCoreInfo` - Common Core information
10. `ExtendedSpecialtyInfo` - Extended specialty details
11. `AcademicPathStats` - Progress statistics

**Impact:** Complete type system for modeling academic structure

---

### Phase 3: Curriculum Configuration ✅

**Deliverables:**
- Updated `specialties.data.ts` with complete pathways
- Updated `degrees.data.ts` with all 6 Master specializations
- New `common-core.data.ts` with Year 1 structure
- New `pathways.data.ts` with 7 complete pathways

#### 3.1 Licence Specializations (7) ✅

All 7 Licence specializations now include:
- ✅ `masterPathways` - Possible Master tracks
- ✅ `researchAreas` - Research topics (4 per specialty)

| Licence Specialty | Master Pathway |
|-------------------|----------------|
| علوم القرآن والقراءات | التفسير وعلوم القرآن |
| الحديث وعلومه | الحديث وعلومه |
| الفقه وأصوله | الفقه وأصوله |
| العقيدة والمذاهب المعاصرة | العقيدة والفكر الإسلامي |
| الدعوة والثقافة الإسلامية | الدعوة والثقافة الإسلامية |
| الشريعة والقانون | الشريعة والقانون |
| اللغة العربية والدراسات القرآنية | التفسير وعلوم القرآن |

#### 3.2 Master Specializations (6) ✅

**Complete Master Structure:**
1. ✅ التفسير وعلوم القرآن (Tafsir and Qur'anic Sciences)
2. ✅ الحديث وعلومه (Hadith and Its Sciences)
3. ✅ الفقه وأصوله (Fiqh and Usul al-Fiqh)
4. ✅ العقيدة والفكر الإسلامي (Aqidah and Islamic Thought)
5. ✅ الدعوة والثقافة الإسلامية (Da'wah and Islamic Culture) - **NEW**
6. ✅ الشريعة والقانون (Sharia and Law) - **NEW**

All Master specializations include:
- ✅ `licencePrerequisites` - Required Licence background
- ✅ `researchAreas` - Research topics (4 per specialty)

#### 3.3 Common Core Data ✅

**File:** `src/data/academics/common-core.data.ts`

**Contents:**
- ✅ Common Core overview and objectives
- ✅ Semester 1 modules (10 modules, 41 credits)
- ✅ Semester 2 modules (10 modules, 38 credits)
- ✅ Specialization choice guidance
- ✅ Selection criteria and process

**Key Modules (Year 1):**
- علوم القرآن (Qur'anic Sciences)
- التفسير التحليلي (Analytical Tafsir)
- الحديث النبوي (Prophetic Hadith)
- الفقه الإسلامي (Islamic Jurisprudence)
- أصول الفقه (Principles of Jurisprudence)
- العقيدة الإسلامية (Islamic Creed)
- السيرة النبوية (Prophetic Biography)
- اللغة العربية (Arabic Language)
- منهجية البحث (Research Methodology)
- اللغة الأجنبية (Foreign Language)

#### 3.4 Academic Pathways ✅

**File:** `src/data/academics/pathways.data.ts`

**Contents:**
- ✅ 7 complete Licence→Master pathways
- ✅ 21 career outlooks (3 per pathway)
- ✅ Research areas for each pathway
- ✅ Requirements (minimum grade, required modules, skills)
- ✅ Helper functions for pathway queries

**Example Pathway Structure:**
```typescript
{
  id: 'quran-to-tafsir',
  licenceSpecialtyId: 'quran-sciences',
  masterSpecialtyIds: ['tafsir-quran-master'],
  description: '...',
  requirements: {
    minimumGrade: 12.0,
    requiredModules: [...],
    requiredSkills: [...]
  },
  careerOutlooks: [
    {
      title: 'أستاذ جامعي في علوم القرآن',
      description: '...',
      sectors: [...],
      requiredSkills: [...]
    },
    // 2 more career outlooks
  ],
  researchAreas: [...]
}
```

**Career Outlooks by Pathway:**
1. **Qur'anic Sciences → Tafsir**: University professor, Researcher, Qur'an teacher
2. **Hadith Sciences → Hadith**: University professor, Manuscript editor, Researcher
3. **Fiqh → Fiqh**: Mufti, University professor, Sharia consultant
4. **Aqidah → Aqidah**: University professor, Religious researcher, Creed consultant
5. **Da'wah → Da'wah**: Program director, University professor, Dialogue researcher
6. **Sharia-Law → Sharia-Law**: Judge, University professor, Legal consultant
7. **Arabic-Quran → Tafsir**: University professor, Linguistic researcher, Editor

---

## Statistics

### Code Changes
- **Files Created:** 3 new files
- **Files Modified:** 4 files
- **Lines Added:** ~1,500 lines
- **Commits:** 3 commits

### Data Completeness
- **Licence Specializations:** 7/7 (100%) ✅
- **Master Specializations:** 6/6 (100%) ✅
- **Pathways Documented:** 7/7 (100%) ✅
- **Career Outlooks:** 21 detailed descriptions ✅
- **Research Areas:** 35+ research topics ✅

### Build Status
- **TypeScript Compilation:** ✅ Passing
- **Type Safety:** ✅ Strict mode enabled
- **Errors:** 0
- **Warnings:** 0

---

## What's Remaining 🚧

### Phase 4: Routing Refactor (Not Started)

**Goal:** Update routing to reflect academic hierarchy

**Tasks:**
- [ ] Create `/academics/licence/year-1` route (Common Core)
- [ ] Create `/academics/licence/year-2/:specialtyId` route (Orientation)
- [ ] Create `/academics/licence/year-3/:specialtyId` route (Specialization)
- [ ] Create `/academics/master/:specialtyId` route
- [ ] Create `/academics/choose-specialization` page
- [ ] Create `/academics/pathways` page (Licence→Master)
- [ ] Update existing routes to use new structure
- [ ] Add breadcrumb navigation

**Estimated Time:** 4-6 hours

---

### Phase 5: UI Components (Not Started)

**Goal:** Create UI components for academic navigation

**Components Needed:**
1. **CommonCoreIndicator** - Shows "جزء من الجذع المشترك"
2. **SpecializationChooser** - Helps students choose specialization
3. **AcademicPathwayViewer** - Shows Licence→Master pathways
4. **CareerOutlookSection** - Displays career information
5. **TransitionGuide** - Shows Year 1→2→3 progression
6. **MasterPathwayCard** - Shows possible Master tracks

**Estimated Time:** 6-8 hours

---

### Phase 6: Qur'anic Sciences Module Enhancement (Not Started)

**Goal:** Position module as Year 1 Common Core

**Tasks:**
- [ ] Add "جزء من الجذع المشترك - السنة الأولى" indicator
- [ ] Add "يؤهل للتخصص في: التفسير وعلوم القرآن" section
- [ ] Link to specialization pathways
- [ ] Show career outlooks for Qur'anic Sciences pathway
- [ ] Add transition guidance

**Estimated Time:** 2-3 hours

---

### Phase 7: Documentation (Not Started)

**Goal:** Create developer and user documentation

**Documents Needed:**
1. **How to Add a Specialization** (developer guide)
2. **How to Add a Module** (developer guide)
3. **How to Define Transitions** (developer guide)
4. **Student Guide** (Arabic, for students)
5. **Academic Structure Overview** (Arabic, for students)

**Estimated Time:** 3-4 hours

---

### Phase 8: Testing & Verification (Not Started)

**Goal:** Ensure everything works correctly

**Tasks:**
- [ ] Manual testing of all routes
- [ ] Verify data consistency
- [ ] Check Arabic text quality
- [ ] Test on mobile devices
- [ ] Verify theme compatibility
- [ ] Cross-browser testing
- [ ] Performance testing

**Estimated Time:** 2-3 hours

---

## Total Estimated Time Remaining

**Phases 4-8:** ~17-24 hours of work

---

## Technical Debt & Future Improvements

### Immediate Priorities
1. **Routing Refactor** - Critical for user navigation
2. **UI Components** - Essential for student experience
3. **Arabic-Only UI** - Required by specification

### Future Enhancements
1. **Student Progress Tracking** - Track completed modules
2. **Specialization Recommendation** - AI-based suggestions
3. **Career Path Explorer** - Interactive career planning
4. **Alumni Profiles** - Real-world career examples
5. **Master Application System** - Online application flow

---

## Migration Strategy

### For Existing Users
1. **No Breaking Changes** - Existing routes still work
2. **Gradual Migration** - New structure alongside old
3. **Data Preservation** - All existing data maintained
4. **Backward Compatibility** - Old links redirect to new structure

### For Developers
1. **Type Safety** - All new types exported from domain
2. **Helper Functions** - Utility functions for common queries
3. **Documentation** - Comprehensive guides for adding content
4. **Examples** - Real examples in pathways.data.ts

---

## Key Decisions Made

### 1. Master Specialty IDs
**Decision:** Rename Master IDs for clarity
- `quran-sciences-master` → `tafsir-quran-master`
- `hadith-sciences-master` → `hadith-master`

**Rationale:** Better reflects actual Master program names

### 2. Common Core Structure
**Decision:** Year 1 is mandatory common core for all students

**Rationale:** Aligns with Algerian LMD model

### 3. Pathway Modeling
**Decision:** Use explicit `AcademicPathway` type with career outlooks

**Rationale:** Provides clear guidance for students

### 4. Research Areas
**Decision:** Add research areas to all specializations

**Rationale:** Helps students understand academic focus

---

## Lessons Learned

### What Worked Well
1. **Type-First Approach** - Defining types before data prevented errors
2. **Incremental Commits** - Small commits made progress trackable
3. **Comprehensive Audit** - Initial audit provided clear roadmap
4. **Real Data** - Using actual specializations ensured accuracy

### Challenges Faced
1. **Data Volume** - Large amount of data to create (1,500+ lines)
2. **Arabic Content** - Ensuring high-quality Arabic text
3. **Complexity** - Modeling 7 Licence → 6 Master pathways
4. **Consistency** - Maintaining consistent structure across all data

---

## Next Steps

### Immediate (Today)
1. ✅ Push all changes to GitHub
2. ✅ Create this progress documentation
3. 🚧 Begin Phase 4 (Routing Refactor)

### Short-Term (This Week)
1. Complete routing refactor
2. Create UI components
3. Enhance Qur'anic Sciences module
4. Write documentation

### Long-Term (Next Sprint)
1. Student progress tracking
2. Specialization recommendation system
3. Career path explorer
4. Alumni profiles

---

## Conclusion

**Phase 1-3 Status:** ✅ **COMPLETE**

The foundational work for the academic structure refactoring is complete. We now have:
- ✅ Comprehensive domain models
- ✅ Complete curriculum data (7 Licence + 6 Master)
- ✅ 7 documented Licence→Master pathways
- ✅ 21 career outlooks
- ✅ Common Core structure
- ✅ Build passing with zero errors

**Next:** Proceed with routing refactor and UI component development.

---

**Document Version:** 1.0  
**Last Updated:** January 16, 2026  
**Author:** Manus AI Agent  
**Branch:** `feature/academic-structure-refactor`
