/**
 * Curriculum Data - Manhaj Islamic Studies Platform
 * 
 * This is the single source of truth for all academic content.
 * Adding Year 2 requires only adding a new Year object here.
 * 
 * Structure: Year → Semester → Subject → Lesson
 */

import type { Curriculum } from './types';
import { englishLessons } from '@/shared/data/englishLessons';

export const curriculum: Curriculum = {
  metadata: {
    institution: 'University of El-Oued',
    institutionAr: 'جامعة الوادي',
    program: 'Bachelor in Sharia Sciences',
    programAr: 'ليسانس العلوم الشرعية',
    degree: 'Bachelor / Licence',
    degreeAr: 'ليسانس',
  },
  
  years: [
    {
      id: 1,
      titleAr: 'السنة الأولى',
      title: 'Year 1',
      description: 'Foundation year establishing correct belief, language skills, and methodological tools',
      
      semesters: [
        {
          id: 1,
          titleAr: 'الفصل الدراسي الأول',
          title: 'Semester 1',
          description: 'Building the foundation: Aqeedah, Arabic, Quranic Sciences, and core methodologies',
          weeks: 16,
          
          learningPhases: [
            {
              id: 1,
              titleAr: 'المرحلة الأولى: الأساس',
              title: 'Phase 1: Foundation',
              weeks: '1-4',
              description: 'Establish correct belief, build language foundation, and learn how to learn effectively.',
              subjectIds: ['aqeedah', 'arabic-language', 'manhaj-talab'],
            },
            {
              id: 2,
              titleAr: 'المرحلة الثانية: المصادر',
              title: 'Phase 2: Sources',
              weeks: '5-8',
              description: 'Study the primary sources of knowledge and contextualize revelation.',
              subjectIds: ['quranic-sciences', 'seerah'],
            },
            {
              id: 3,
              titleAr: 'المرحلة الثالثة: المنهجية',
              title: 'Phase 3: Methodology',
              weeks: '9-12',
              description: 'Learn the methodologies for deriving rulings and authenticating traditions.',
              subjectIds: ['usul-fiqh', 'hadith-sciences'],
            },
            {
              id: 4,
              titleAr: 'المرحلة الرابعة: التطبيق',
              title: 'Phase 4: Application',
              weeks: '13-16',
              description: 'Apply knowledge to worship and integrate spiritual purification.',
              subjectIds: ['fiqh-worship', 'tazkiyah', 'english-language'],
            },
          ],
          
          curriculumMap: {
            description: 'Visual representation of how all sciences interconnect under the framework of Tawhid',
            descriptionAr: 'تمثيل بصري لكيفية ترابط جميع العلوم تحت إطار التوحيد',
            diagram: '/docs/diagrams/integration.png',
            relationships: [
              { from: 'aqeedah', to: 'quranic-sciences', type: 'prerequisite' },
              { from: 'aqeedah', to: 'fiqh-worship', type: 'prerequisite' },
              { from: 'arabic-language', to: 'quranic-sciences', type: 'prerequisite' },
              { from: 'arabic-language', to: 'hadith-sciences', type: 'prerequisite' },
              { from: 'quranic-sciences', to: 'fiqh-worship', type: 'supports' },
              { from: 'usul-fiqh', to: 'fiqh-worship', type: 'prerequisite' },
              { from: 'seerah', to: 'hadith-sciences', type: 'supports' },
              { from: 'tazkiyah', to: 'aqeedah', type: 'supports' },
            ],
          },
          
          subjects: [
            // CORE SHARIA SCIENCES
            {
              id: 'aqeedah',
              titleAr: 'العقيدة',
              title: 'Islamic Creed',
              shortDesc: 'Foundation of correct belief in Allah, His attributes, and the unseen',
              icon: '☪️',
              category: 'core',
              credits: 5,
              hours: 37.5,
              gradient: 'from-yellow-500 via-amber-500 to-orange-500',
              
              purpose: 'To establish correct belief in Allah, His attributes, His messengers, and the unseen realities. Aqeedah is the foundation of all Islamic knowledge because belief governs how we understand and practice everything else.',
              educationalGoal: 'A student with sound Tawhid (monotheism), correct understanding of Allah\'s attributes, firm belief in the unseen, and the ability to distinguish orthodox belief from deviant sects.',
              functionalRole: 'Aqeedah governs all other sciences. It is the lens through which we understand Quran, Hadith, Fiqh, and all knowledge. Sound Aqeedah prevents misinterpretation and protects from deviation.',
              practicalOutcome: 'The student worships Allah correctly, avoids shirk (polytheism) in all its forms, has firm faith in trials, distinguishes truth from falsehood, and protects others from deviant beliefs.',
              
              epistemologicalPosition: {
                type: 'revealed',
                typeAr: 'معرفة عقلية',
                description: 'Text-based with rational support. Aqeedah is primarily derived from Quran and Sunnah, but uses reason to support and defend revealed truths.',
              },
              
              connections: [
                {
                  targetId: 'quranic-sciences',
                  relationship: 'governs',
                  relationshipAr: 'يحكم',
                  description: 'Aqeedah governs how we understand Quranic revelation',
                },
                {
                  targetId: 'fiqh-worship',
                  relationship: 'governs',
                  relationshipAr: 'يحكم',
                  description: 'Correct belief determines correct worship',
                },
                {
                  targetId: 'usul-fiqh',
                  relationship: 'governs',
                  relationshipAr: 'يحكم',
                  description: 'Belief in Allah\'s wisdom affects how we derive rulings',
                },
              ],
              
              prerequisites: [],
              enables: ['All sciences - Aqeedah is the foundation'],
              
              topics: [
                'التوحيد وأقسامه',
                'أركان الإيمان',
                'القضاء والقدر',
                'الأسماء والصفات',
                'الإيمان بالغيب',
              ],
              
              objectives: [
                'فهم معنى التوحيد',
                'معرفة أركان الإيمان',
                'إدراك عقيدة أهل السنة',
                'التمييز بين العقيدة الصحيحة والمنحرفة',
              ],
              
              lessons: [],
            },
            
            {
              id: 'arabic-language',
              titleAr: 'اللغة العربية',
              title: 'Arabic Language',
              shortDesc: 'The key tool for accessing Quran, Hadith, and all Islamic texts',
              icon: '✍️',
              category: 'supporting',
              credits: 5,
              hours: 37.5,
              gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
              
              purpose: 'To provide students with the linguistic tools necessary to access primary Islamic sources (Quran and Hadith) directly, without dependence on translations. Arabic is not just a subject but the key that unlocks all other sciences.',
              educationalGoal: 'A student proficient in Nahw (grammar), Sarf (morphology), and basic Balagha (rhetoric), capable of reading classical texts, understanding Quranic verses, and analyzing Hadith narrations linguistically.',
              functionalRole: 'Arabic unlocks the Quran and Hadith. Without it, students depend on translations and interpretations. With it, they engage directly with revelation and can verify scholarly claims.',
              practicalOutcome: 'The student reads Quran with understanding, analyzes Hadith texts independently, distinguishes between linguistic interpretations, and appreciates the miraculous eloquence of revelation.',
              
              epistemologicalPosition: {
                type: 'instrumental',
                typeAr: 'معرفة أداتية',
                description: 'Linguistic tool. Arabic is the instrument through which we access revealed knowledge. Mastery of Arabic is prerequisite for deep engagement with Quran and Sunnah.',
              },
              
              connections: [
                {
                  targetId: 'quranic-sciences',
                  relationship: 'unlocks',
                  relationshipAr: 'يفتح',
                  description: 'Arabic unlocks direct understanding of Quranic text',
                },
                {
                  targetId: 'hadith-sciences',
                  relationship: 'unlocks',
                  relationshipAr: 'يفتح',
                  description: 'Arabic enables analysis of Hadith narrations',
                },
                {
                  targetId: 'usul-fiqh',
                  relationship: 'supports',
                  relationshipAr: 'يدعم',
                  description: 'Linguistic analysis is essential for deriving rulings',
                },
              ],
              
              prerequisites: [],
              enables: ['Quran', 'Hadith', 'Fiqh', 'Usul', 'All textual sciences'],
              
              topics: [
                'النحو الأساسي',
                'الصرف',
                'البلاغة',
                'الإعراب',
                'التحليل اللغوي',
              ],
              
              objectives: [
                'قراءة النصوص الكلاسيكية',
                'فهم القرآن لغوياً',
                'تحليل الأحاديث',
                'التمييز بين التفسيرات اللغوية',
              ],
              
              lessons: [],
            },
            
            {
              id: 'quranic-sciences',
              titleAr: 'علوم القرآن',
              title: 'Quranic Sciences',
              shortDesc: 'Understanding the nature, compilation, and context of divine revelation',
              icon: '📖',
              category: 'core',
              credits: 6,
              hours: 45,
              gradient: 'from-teal-500 via-cyan-500 to-blue-500',
              
              purpose: 'To study the Quran as a revealed text: its compilation, preservation, recitation, interpretation, and the sciences that serve its understanding. This science provides the methodological framework for engaging with divine revelation.',
              educationalGoal: 'A student who understands how the Quran was revealed, compiled, and preserved; knows the principles of Tafsir; can distinguish between authentic and weak interpretations; and approaches the Quran with reverence and methodology.',
              functionalRole: 'Quranic Sciences provide the framework for proper engagement with the Quran. They protect from misinterpretation, establish authenticity, and guide correct understanding.',
              practicalOutcome: 'The student reads Quran with Tajweed, understands context of revelation (Asbab al-Nuzul), applies correct Tafsir principles, distinguishes between Makki and Madani verses, and refutes deviant interpretations.',
              
              epistemologicalPosition: {
                type: 'revealed',
                typeAr: 'معرفة نصية',
                description: 'Text-centered. Quranic Sciences are entirely focused on understanding the revealed text of the Quran through established methodologies.',
              },
              
              connections: [
                {
                  targetId: 'arabic-language',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Arabic linguistic tools are applied to Quranic text',
                },
                {
                  targetId: 'seerah',
                  relationship: 'contextualizes',
                  relationshipAr: 'يسياق',
                  description: 'Seerah provides historical context for Quranic verses',
                },
                {
                  targetId: 'fiqh-worship',
                  relationship: 'supports',
                  relationshipAr: 'يدعم',
                  description: 'Quranic verses are primary sources for Fiqh rulings',
                },
              ],
              
              prerequisites: ['Basic Arabic', 'Sound Aqeedah'],
              enables: ['Tafsir', 'Fiqh', 'Da\'wah', 'Teaching'],
              
              topics: [
                'نزول القرآن',
                'جمع القرآن',
                'التجويد',
                'أصول التفسير',
                'أسباب النزول',
              ],
              
              objectives: [
                'فهم كيفية نزول القرآن',
                'معرفة أصول التفسير',
                'التمييز بين التفسيرات الصحيحة والضعيفة',
                'قراءة القرآن بالتجويد',
              ],
              
              lessons: [],
            },
            
            {
              id: 'hadith-sciences',
              titleAr: 'علوم الحديث',
              title: 'Hadith Sciences',
              shortDesc: 'Methodology for authenticating and understanding Prophetic traditions',
              icon: '📜',
              category: 'core',
              credits: 5,
              hours: 37.5,
              gradient: 'from-blue-500 via-indigo-500 to-purple-500',
              
              purpose: 'To establish the methodology for authenticating Prophetic traditions (Hadith), distinguishing between authentic and weak narrations, and understanding the Sunnah as the second source of Islamic law.',
              educationalGoal: 'A student who can evaluate Hadith chains (Isnad), classify narrations by authenticity, understand Hadith terminology, and apply Sunnah correctly in worship and daily life.',
              functionalRole: 'Hadith Sciences protect the Sunnah from fabrication and ensure we follow authentic Prophetic guidance. They provide the tools to verify what the Prophet ﷺ actually said and did.',
              practicalOutcome: 'The student distinguishes between Sahih, Hasan, and Da\'if Hadith; evaluates narrator reliability; understands Hadith collections (Bukhari, Muslim, etc.); and applies authentic Sunnah in practice.',
              
              epistemologicalPosition: {
                type: 'rational',
                typeAr: 'معرفة نقدية',
                description: 'Critical methodology. Hadith Sciences use rigorous rational criteria (narrator reliability, chain continuity) to authenticate revealed traditions.',
              },
              
              connections: [
                {
                  targetId: 'seerah',
                  relationship: 'contextualizes',
                  relationshipAr: 'يسياق',
                  description: 'Seerah provides context for understanding Hadith',
                },
                {
                  targetId: 'fiqh-worship',
                  relationship: 'supports',
                  relationshipAr: 'يدعم',
                  description: 'Authentic Hadith are primary sources for Fiqh',
                },
                {
                  targetId: 'usul-fiqh',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Usul principles are applied to Hadith texts',
                },
              ],
              
              prerequisites: ['Basic Arabic', 'Seerah'],
              enables: ['Fiqh', 'Fatwa', 'Teaching', 'Research'],
              
              topics: [
                'أنواع الحديث',
                'علم الإسناد',
                'الجرح والتعديل',
                'كتب الحديث',
                'منهج النقد',
              ],
              
              objectives: [
                'التمييز بين الحديث الصحيح والضعيف',
                'معرفة كتب الحديث الرئيسية',
                'فهم منهج النقد الحديثي',
                'تطبيق السنة الصحيحة',
              ],
              
              lessons: [],
            },
            
            {
              id: 'seerah',
              titleAr: 'السيرة النبوية',
              title: 'Prophetic Biography',
              shortDesc: 'The living context for understanding revelation and the practical model of Islamic life',
              icon: '🌙',
              category: 'core',
              credits: 4,
              hours: 30,
              gradient: 'from-purple-500 via-pink-500 to-rose-500',
              
              purpose: 'To study the life of Prophet Muhammad ﷺ as the living embodiment of Islam, the practical model for believers, and the historical context for understanding Quranic revelation and Prophetic traditions.',
              educationalGoal: 'A student who knows the major events of the Prophet\'s life, understands the context of revelation, can extract lessons from his biography, and models their life on his example.',
              functionalRole: 'Seerah contextualizes the Quran and Hadith. It shows how revelation was lived, provides historical background for verses, and demonstrates the practical application of Islamic teachings.',
              practicalOutcome: 'The student understands Asbab al-Nuzul (context of revelation), knows the Prophet\'s character and conduct, can extract practical lessons from his life, and follows his example in worship and ethics.',
              
              epistemologicalPosition: {
                type: 'applied',
                typeAr: 'معرفة تطبيقية',
                description: 'Historical and practical. Seerah is the lived application of revelation, showing how the Prophet ﷺ embodied Quranic teachings.',
              },
              
              connections: [
                {
                  targetId: 'quranic-sciences',
                  relationship: 'contextualizes',
                  relationshipAr: 'يسياق',
                  description: 'Seerah provides historical context for Quranic verses',
                },
                {
                  targetId: 'hadith-sciences',
                  relationship: 'contextualizes',
                  relationshipAr: 'يسياق',
                  description: 'Seerah helps understand circumstances of Hadith',
                },
                {
                  targetId: 'tazkiyah',
                  relationship: 'supports',
                  relationshipAr: 'يدعم',
                  description: 'The Prophet\'s character is the model for Tazkiyah',
                },
              ],
              
              prerequisites: [],
              enables: ['Understanding Quran', 'Understanding Hadith', 'Da\'wah', 'Character development'],
              
              topics: [
                'المرحلة المكية',
                'الهجرة',
                'المرحلة المدنية',
                'الغزوات',
                'أخلاق النبي',
              ],
              
              objectives: [
                'معرفة أحداث حياة النبي',
                'فهم سياق الوحي',
                'استخلاص الدروس من السيرة',
                'الاقتداء بالنبي',
              ],
              
              lessons: [],
            },
            
            {
              id: 'usul-fiqh',
              titleAr: 'أصول الفقه',
              title: 'Principles of Jurisprudence',
              shortDesc: 'The methodology for deriving Islamic rulings from textual sources',
              icon: '⚖️',
              category: 'core',
              credits: 5,
              hours: 37.5,
              gradient: 'from-amber-500 via-yellow-500 to-lime-500',
              
              purpose: 'To establish the methodology for deriving Islamic legal rulings (Ahkam) from the Quran and Sunnah. Usul al-Fiqh is the science of legal theory and methodology.',
              educationalGoal: 'A student who understands the sources of Islamic law, knows the principles of legal reasoning, can distinguish between types of evidence, and applies correct methodology in deriving rulings.',
              functionalRole: 'Usul al-Fiqh structures Fiqh. It provides the rules for how to derive rulings, how to prioritize evidence, and how to resolve apparent contradictions between texts.',
              practicalOutcome: 'The student can derive simple rulings from texts, understands scholarly differences in methodology, evaluates Fiqh opinions based on evidence, and avoids arbitrary interpretation.',
              
              epistemologicalPosition: {
                type: 'rational',
                typeAr: 'معرفة منهجية',
                description: 'Methodological. Usul al-Fiqh is the rational framework for extracting rulings from revealed texts.',
              },
              
              connections: [
                {
                  targetId: 'fiqh-worship',
                  relationship: 'structures',
                  relationshipAr: 'ينظم',
                  description: 'Usul provides the methodology for deriving Fiqh rulings',
                },
                {
                  targetId: 'quranic-sciences',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Usul principles are applied to Quranic texts',
                },
                {
                  targetId: 'hadith-sciences',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Usul principles are applied to Hadith texts',
                },
              ],
              
              prerequisites: ['Basic Arabic', 'Basic Fiqh'],
              enables: ['Ijtihad', 'Fatwa', 'Advanced Fiqh', 'Legal research'],
              
              topics: [
                'مصادر التشريع',
                'الأدلة الشرعية',
                'القياس',
                'الإجماع',
                'الاستدلال',
              ],
              
              objectives: [
                'معرفة مصادر التشريع',
                'فهم منهج الاستدلال',
                'التمييز بين أنواع الأدلة',
                'تطبيق المنهج الصحيح',
              ],
              
              lessons: [],
            },
            
            {
              id: 'fiqh-worship',
              titleAr: 'فقه العبادات',
              title: 'Fiqh of Worship',
              shortDesc: 'Practical rulings for correct worship according to Quran and Sunnah',
              icon: '🕌',
              category: 'core',
              credits: 6,
              hours: 45,
              gradient: 'from-green-500 via-emerald-500 to-teal-500',
              
              purpose: 'To teach the practical rulings (Ahkam) for acts of worship: prayer, fasting, Zakat, Hajj, and other rituals. Fiqh al-\'Ibadat ensures Muslims worship Allah correctly according to the Sunnah.',
              educationalGoal: 'A student who knows the rulings of Taharah, Salah, Sawm, Zakat, and Hajj; can perform these acts correctly; understands the wisdom behind them; and can teach others.',
              functionalRole: 'Fiqh al-\'Ibadat is the practical application of Aqeedah, Quran, Hadith, and Usul. It translates belief and texts into correct practice.',
              practicalOutcome: 'The student prays correctly, fasts properly, calculates Zakat accurately, knows Hajj rites, and corrects common mistakes in worship.',
              
              epistemologicalPosition: {
                type: 'applied',
                typeAr: 'معرفة تطبيقية',
                description: 'Practical application. Fiqh translates textual knowledge into correct worship practice.',
              },
              
              connections: [
                {
                  targetId: 'aqeedah',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Correct belief determines correct worship',
                },
                {
                  targetId: 'quranic-sciences',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Quranic verses are primary sources for Fiqh',
                },
                {
                  targetId: 'hadith-sciences',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Authentic Hadith provide detailed rulings',
                },
                {
                  targetId: 'usul-fiqh',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'Usul methodology structures Fiqh derivation',
                },
              ],
              
              prerequisites: ['Aqeedah', 'Basic Quran', 'Basic Hadith'],
              enables: ['Correct worship', 'Teaching', 'Fatwa', 'Imam role'],
              
              topics: [
                'الطهارة',
                'الصلاة',
                'الصيام',
                'الزكاة',
                'الحج',
              ],
              
              objectives: [
                'معرفة أحكام العبادات',
                'أداء العبادات بشكل صحيح',
                'فهم الحكمة من العبادات',
                'تعليم الآخرين',
              ],
              
              lessons: [],
            },
            
            {
              id: 'tazkiyah',
              titleAr: 'الأخلاق الإسلامية والتزكية',
              title: 'Islamic Ethics & Tazkiyah',
              shortDesc: 'Purification of the soul and perfection of character',
              icon: '💜',
              category: 'supporting',
              credits: 3,
              hours: 22.5,
              gradient: 'from-purple-500 via-violet-500 to-indigo-500',
              
              purpose: 'To purify the soul (Nafs) from spiritual diseases, perfect character (Akhlaq), and ensure that knowledge leads to humility and closeness to Allah rather than arrogance.',
              educationalGoal: 'A student with purified heart, excellent character, humility despite knowledge, and constant awareness of Allah (Muraqabah).',
              functionalRole: 'Tazkiyah protects knowledge from corrupting the soul. It ensures that learning leads to spiritual growth rather than pride, and that worship is sincere rather than show.',
              practicalOutcome: 'The student is humble, sincere, patient, grateful, and exhibits the character of the Prophet ﷺ. They seek knowledge for Allah, not for status.',
              
              epistemologicalPosition: {
                type: 'spiritual',
                typeAr: 'معرفة روحية',
                description: 'Spiritual practice. Tazkiyah is the inner dimension of Islam, focusing on heart purification and character development.',
              },
              
              connections: [
                {
                  targetId: 'aqeedah',
                  relationship: 'protects',
                  relationshipAr: 'يحمي',
                  description: 'Tazkiyah protects Aqeedah from spiritual corruption',
                },
                {
                  targetId: 'seerah',
                  relationship: 'applies',
                  relationshipAr: 'يطبق',
                  description: 'The Prophet\'s character is the model for Tazkiyah',
                },
              ],
              
              prerequisites: [],
              enables: ['Sincere worship', 'Da\'wah', 'Teaching', 'Leadership'],
              
              topics: [
                'تزكية النفس',
                'الأخلاق النبوية',
                'أمراض القلوب',
                'الإخلاص',
                'المراقبة',
              ],
              
              objectives: [
                'تزكية النفس من الأمراض',
                'التحلي بالأخلاق النبوية',
                'الإخلاص في طلب العلم',
                'المراقبة الدائمة لله',
              ],
              
              lessons: [],
            },
            
            {
              id: 'manhaj-talab',
              titleAr: 'منهج طلب العلم',
              title: 'Methodology of Seeking Knowledge',
              shortDesc: 'How to learn effectively and conduct research properly',
              icon: '🔍',
              category: 'supporting',
              credits: 4,
              hours: 30,
              gradient: 'from-blue-500 via-cyan-500 to-teal-500',
              
              purpose: 'To teach students how to seek knowledge effectively: study methods, research skills, critical thinking, note-taking, and the etiquette of seeking knowledge.',
              educationalGoal: 'A student who knows how to learn, can conduct research, thinks critically, takes effective notes, and approaches knowledge with proper etiquette and respect.',
              functionalRole: 'Manhaj al-Talab provides meta-cognitive skills that enhance all other learning. It teaches students how to be effective learners.',
              practicalOutcome: 'The student studies efficiently, conducts research properly, evaluates sources critically, takes organized notes, and maintains the etiquette of seeking knowledge.',
              
              epistemologicalPosition: {
                type: 'instrumental',
                typeAr: 'معرفة منهجية',
                description: 'Meta-cognitive tool. This science teaches how to learn and research effectively.',
              },
              
              connections: [],
              
              prerequisites: [],
              enables: ['Effective learning', 'Research', 'Critical thinking', 'Lifelong learning'],
              
              topics: [
                'آداب طلب العلم',
                'طرق الدراسة',
                'البحث العلمي',
                'التفكير النقدي',
                'تدوين الملاحظات',
              ],
              
              objectives: [
                'معرفة آداب طلب العلم',
                'إتقان طرق الدراسة الفعالة',
                'إجراء البحث العلمي',
                'التفكير النقدي',
              ],
              
              lessons: [],
            },
            
            // TECHNICAL SCIENCES
            {
              id: 'english-language',
              titleAr: 'اللغة الإنجليزية',
              title: 'English Language',
              shortDesc: 'Essential language skills for academic research and global communication',
              icon: '🌍',
              category: 'technical',
              credits: 6,
              hours: 45,
              gradient: 'from-blue-500 via-sky-500 to-cyan-500',
              
              purpose: 'To provide students with English language skills necessary for academic research, accessing global Islamic scholarship, and communicating with the international Muslim community.',
              educationalGoal: 'A student proficient in reading academic English, understanding Islamic terminology in English, and communicating effectively in written and spoken English.',
              functionalRole: 'English enables access to contemporary Islamic scholarship, academic journals, and global Islamic discourse. It is essential for research and da\'wah in the modern world.',
              practicalOutcome: 'The student reads English academic texts, understands Islamic terminology in English, writes research papers, and communicates with English-speaking Muslims.',
              
              epistemologicalPosition: {
                type: 'instrumental',
                typeAr: 'معرفة أداتية',
                description: 'Linguistic tool. English is an instrument for accessing contemporary scholarship and global communication.',
              },
              
              connections: [],
              
              prerequisites: [],
              enables: ['Academic research', 'Global communication', 'Contemporary scholarship', 'Da\'wah'],
              
              topics: [
                'Grammar fundamentals',
                'Academic vocabulary',
                'Islamic terminology',
                'Reading comprehension',
                'Writing skills',
              ],
              
              objectives: [
                'Read academic English texts',
                'Understand Islamic terminology',
                'Write clear English',
                'Communicate effectively',
              ],
              
              // Import existing English lessons
              lessons: englishLessons.map((lesson, index) => ({
                id: lesson.id,
                number: index + 1,
                titleAr: lesson.titleAr,
                title: lesson.title,
                description: lesson.description,
                duration: parseInt(lesson.duration) || 45,
                objectives: lesson.sections
                  .filter(s => s.type === 'theory')
                  .slice(0, 3)
                  .map(s => s.title || s.content?.substring(0, 50) || ''),
                contentType: 'embedded',
                sections: lesson.sections.map(section => ({
                  id: section.id,
                  type: section.type as any,
                  title: section.title,
                  content: section.content,
                  data: section.data,
                })),
                difficulty: lesson.difficulty,
              })),
            },
          ],
        },
      ],
    },
    
    // Year 2 placeholder (to demonstrate scalability)
    // Uncomment and populate when ready to add Year 2
    /*
    {
      id: 2,
      titleAr: 'السنة الثانية',
      title: 'Year 2',
      description: 'Advanced studies in Fiqh, Tafsir, and specialized Islamic sciences',
      semesters: [
        {
          id: 1,
          titleAr: 'الفصل الدراسي الأول',
          title: 'Semester 1',
          weeks: 16,
          subjects: [
            // Add Year 2 subjects here
          ],
        },
      ],
    },
    */
  ],
};
