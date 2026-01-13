export interface LessonSection {
  id: string;
  type: 'theory' | 'table' | 'example' | 'practice' | 'tip' | 'steps';
  title?: string;
  content?: string;
  data?: any;
  icon?: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  description: string;
  duration: string; // e.g., "30 دقيقة"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  sections: LessonSection[];
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'fill-in' | 'multiple-choice' | 'transformation' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export const englishLessons: Lesson[] = [
  {
    id: 'lesson-1-numbers',
    number: 1,
    title: 'Numbers: The Basics (0 to 100)',
    titleAr: 'الأرقام: الأساسيات (من 0 إلى 100)',
    description: 'Learn how to write and say numbers in English from 0 to 100, including irregular numbers, tens, and large numbers.',
    duration: '45 دقيقة',
    difficulty: 'beginner',
    icon: '🔢',
    sections: [
      {
        id: 'intro',
        type: 'theory',
        title: 'Introduction',
        content: "We'll start with the most crucial numbers, which form the building blocks for everything else.",
      },
      {
        id: 'part-1',
        type: 'theory',
        title: 'Part 1: Numbers 0 to 19',
        content: 'These numbers are often irregular and must be memorized. **Focus on these first.**',
      },
      {
        id: 'table-0-19',
        type: 'table',
        data: {
          headers: ['Number', 'Written Form', 'Number', 'Written Form'],
          rows: [
            ['0', 'zero', '10', 'ten'],
            ['1', 'one', '11', 'eleven'],
            ['2', 'two', '12', 'twelve'],
            ['3', 'three', '13', 'thirteen'],
            ['4', 'four', '14', 'fourteen'],
            ['5', 'five', '15', 'fifteen'],
            ['6', 'six', '16', 'sixteen'],
            ['7', 'seven', '17', 'seventeen'],
            ['8', 'eight', '18', 'eighteen'],
            ['9', 'nine', '19', 'nineteen'],
          ],
        },
      },
      {
        id: 'part-2',
        type: 'theory',
        title: 'Part 2: The Tens (20, 30, 40, etc.)',
        content: 'These are the anchors for the rest of the numbers up to 99. Notice they all end with the "ty" sound.',
      },
      {
        id: 'table-tens',
        type: 'table',
        data: {
          headers: ['Number', 'Written Form', 'Number', 'Written Form'],
          rows: [
            ['20', 'twenty', '60', 'sixty'],
            ['30', 'thirty', '70', 'seventy'],
            ['40', 'forty', '80', 'eighty'],
            ['50', 'fifty', '90', 'ninety'],
          ],
        },
      },
      {
        id: 'part-3',
        type: 'theory',
        title: 'Part 3: Combining Numbers (21 to 99)',
        content: 'This is where the pattern becomes very clear! To write any number between 21 and 99 (excluding the "tens" above):\n\n1. Write the **Ten** number.\n2. Add a **hyphen (-).**\n3. Write the **Single** number (1-9).',
      },
      {
        id: 'examples-combining',
        type: 'example',
        icon: '💡',
        data: {
          examples: [
            { number: '24', text: 'twenty-four' },
            { number: '58', text: 'fifty-eight' },
            { number: '99', text: 'ninety-nine' },
          ],
        },
      },
      {
        id: 'practice-tip-1',
        type: 'tip',
        icon: '⚠️',
        title: 'Practice Tip',
        content: 'Write down these numbers with letters.',
      },
      {
        id: 'part-4',
        type: 'theory',
        title: '🚀 Moving to Larger Numbers',
        content: 'Once you master (0-99), you just need to learn the names for the "big places" (Hundreds, Thousands, Millions).',
      },
      {
        id: 'table-large',
        type: 'table',
        title: 'Part 4: Hundreds and Thousands',
        data: {
          headers: ['Value', 'Name'],
          rows: [
            ['100', 'one hundred'],
            ['1,000', 'one thousand'],
            ['100,000', 'one hundred thousand'],
            ['1,000,000', 'one million'],
          ],
        },
      },
      {
        id: 'large-numbers-guide',
        type: 'theory',
        title: 'How to Say and Write Large Numbers',
        content: '**1. The Hundreds (100 to 999):**\n\nSay the first digit, then say "hundred," then say the last two digits as you learned in Part 3.\n\n- 125 is **one hundred twenty-five**\n- 604 is **six hundred four**\n\n**2. The Thousands (1,000 and up):**\n\nRead the numbers to the **left** of the comma, then say "thousand," then read the rest.\n\n- 5,000 is **five thousand**\n- 1,450 is **one thousand, four hundred fifty**\n- 16,302 is **sixteen thousand, three hundred two**\n- 250,711 is **two hundred fifty thousand, seven hundred eleven**',
      },
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'fill-in',
        question: '47 is',
        correctAnswer: 'forty-seven',
      },
      {
        id: 'ex2',
        type: 'fill-in',
        question: '81 is',
        correctAnswer: 'eighty-one',
      },
      {
        id: 'ex3',
        type: 'fill-in',
        question: '63 is',
        correctAnswer: 'sixty-three',
      },
      {
        id: 'ex4',
        type: 'fill-in',
        question: '15 is',
        correctAnswer: 'fifteen',
      },
      {
        id: 'ex5',
        type: 'fill-in',
        question: '12 is',
        correctAnswer: 'twelve',
      },
    ],
  },
  {
    id: 'lesson-2-speech',
    number: 2,
    title: 'Direct and Indirect Speech',
    titleAr: 'الكلام المباشر وغير المباشر',
    description: 'Learn how to report what someone said using direct and indirect speech, with examples from Islamic texts.',
    duration: '50 دقيقة',
    difficulty: 'intermediate',
    icon: '💬',
    sections: [
      {
        id: 'intro',
        type: 'theory',
        title: 'Introduction',
        content: 'When we want to tell someone what another person said, we have two main ways to do it: **Direct Speech** and **Indirect Speech**.',
      },
      {
        id: 'direct-speech',
        type: 'theory',
        title: '1. Direct Speech (القول المباشر)',
        content: 'Direct speech reports the **exact words** of the speaker. It\'s like a direct quotation.\n\n**Key Feature:** The exact words are enclosed in quotation marks ("...").\n\n**Punctuation:** A reporting verb either in the past (like *said, told, commanded*) or in the present (like *say, tell, command*) is usually followed by a comma (,) before the opening quotation mark.',
      },
      {
        id: 'direct-examples',
        type: 'example',
        icon: '📖',
        title: 'Examples of Direct Speech',
        data: {
          examples: [
            {
              text: 'The Prophet (peace be upon him) said, "The best among you are those who learn the Qur\'an and teach it."',
              structure: 'Reporting verb + comma + Quotation marks + exact words',
            },
            {
              text: 'Allah says, "Eat what is lawful and good on earth."',
              structure: 'Reporting verb + comma + Quotation marks + exact words',
            },
          ],
        },
      },
      {
        id: 'indirect-speech',
        type: 'theory',
        title: '2. Indirect Speech (القول غير المباشر)',
        content: 'Indirect speech (or **Reported Speech**) reports the substance or meaning of what the speaker said, but **not the exact words**.\n\n**Key Feature:** No quotation marks are used. The reported clause is often introduced by a subordinating conjunction like **"that"** or **"if"** in case of a question.\n\n**Shifts:** Crucially, when converting from direct to indirect speech, changes often occur in:\n- Pronouns\n- Verb tenses\n- Time/place expressions',
      },
      {
        id: 'indirect-examples',
        type: 'example',
        icon: '📝',
        title: 'Examples of Indirect Speech',
        data: {
          examples: [
            {
              direct: 'The Prophet (peace be upon him) said, "The best among you are those who learn the Qur\'an and teach it."',
              indirect: 'The Prophet (peace be upon him) said **that** the best among them were those who learned the Qur\'an and taught it.',
              structure: 'Reporting verb + "that" + changed pronouns/tenses',
            },
          ],
        },
      },
      {
        id: 'conversion-steps',
        type: 'steps',
        title: 'Steps to Convert Direct to Indirect Speech',
        data: {
          steps: [
            'Remove the quotation marks',
            'Add "that" after the reporting verb',
            'Change pronouns (I → he/she, you → they, etc.)',
            'Shift verb tense back (present → past, past → past perfect)',
            'Adjust time/place expressions (now → then, here → there, today → that day)',
          ],
        },
      },
      {
        id: 'tense-shifts',
        type: 'table',
        title: 'Common Tense Shifts',
        data: {
          headers: ['Direct Speech', 'Indirect Speech'],
          rows: [
            ['Simple Present', 'Simple Past'],
            ['Present Continuous', 'Past Continuous'],
            ['Simple Past', 'Past Perfect'],
            ['Present Perfect', 'Past Perfect'],
            ['Will', 'Would'],
            ['Can', 'Could'],
            ['May', 'Might'],
          ],
        },
      },
      {
        id: 'practice-tip',
        type: 'tip',
        icon: '💡',
        title: 'Practice Tip',
        content: 'When converting speech, always ask: Who is speaking? Who are they talking about? What time frame are they referring to?',
      },
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'transformation',
        question: 'Convert to indirect speech: She said, "I am reading the Quran."',
        correctAnswer: 'She said that she was reading the Quran.',
      },
      {
        id: 'ex2',
        type: 'transformation',
        question: 'Convert to indirect speech: He said, "I will pray Fajr."',
        correctAnswer: 'He said that he would pray Fajr.',
      },
    ],
  },
  {
    id: 'lesson-3-conditionals',
    number: 3,
    title: 'Conditional Sentences',
    titleAr: 'الجمل الشرطية',
    description: 'Master the four types of conditional sentences and learn when to use each one.',
    duration: '55 دقيقة',
    difficulty: 'intermediate',
    icon: '🔀',
    sections: [
      {
        id: 'intro',
        type: 'theory',
        title: 'Introduction to Conditionals',
        content: 'Conditionals allow us to express relationships where one event or state is dependent on another. They answer the question: **"What happens IF something else is true?"**\n\nThe entire structure is built around the basic **"If-Then"** formula:\n\n**IF** (a condition is met), **THEN** (a specific result follows).',
      },
      {
        id: 'type-zero',
        type: 'theory',
        title: '1. Conditional Type Zero: Facts and General Truths',
        content: 'The Zero Conditional is used to talk about things that are **always true**, such as scientific facts, habits, or general rules.\n\n**Structure:** If + Simple Present, ... Simple Present',
      },
      {
        id: 'zero-examples',
        type: 'example',
        icon: '🔬',
        data: {
          examples: [
            { text: 'If you heat water to 100 degrees, it boils.', note: '(Scientific fact)' },
            { text: "If I don't get enough sleep, I am tired the next day.", note: '(General habit)' },
            { text: 'If you press that button, the light turns on.', note: '(General rule/mechanism)' },
          ],
        },
      },
      {
        id: 'zero-tip',
        type: 'tip',
        icon: '💡',
        content: 'You can often replace "if" with "when" in the Zero Conditional without changing the meaning.',
      },
      {
        id: 'type-one',
        type: 'theory',
        title: '2. Conditional Type One: Real and Possible Future',
        content: 'The First Conditional is used to talk about a **real and possible situation in the future**. The condition is likely to be met.\n\n**Structure:** If + Simple Present, ... Will + Verb',
      },
      {
        id: 'one-examples',
        type: 'example',
        icon: '🌤️',
        data: {
          examples: [
            { text: 'If it rains tomorrow, we will stay inside.', note: '(Rain is a real possibility)' },
            { text: 'If you study hard, you will pass the exam.', note: '(Studying hard makes passing likely)' },
            { text: "You will miss the bus if you don't hurry.", note: '(Condition and result can be reversed)' },
          ],
        },
      },
      {
        id: 'one-tip',
        type: 'tip',
        icon: '💡',
        content: 'This type describes a direct consequence of a possible future action. Other modals like **can, may, might, or should** can replace **will** to express different degrees of certainty.',
      },
      {
        id: 'type-two',
        type: 'theory',
        title: '3. Conditional Type Two: Unreal Present or Future',
        content: 'The Second Conditional is used to talk about **hypothetical or unlikely situations** in the present or future. It expresses what would happen if something untrue or impossible were true.\n\n**Structure:** If + Simple Past, ... Would + Verb',
      },
      {
        id: 'two-examples',
        type: 'example',
        icon: '💭',
        data: {
          examples: [
            { text: 'If I had a million dollars, I would build a mosque.', note: '(I don\'t have a million dollars)' },
            { text: 'If I were you, I would apologize.', note: '(I am not you - hypothetical advice)' },
            { text: 'If she studied more, she would get better grades.', note: '(She doesn\'t study much now)' },
          ],
        },
      },
      {
        id: 'two-tip',
        type: 'tip',
        icon: '⚠️',
        content: 'Note: We often use "were" instead of "was" in formal Second Conditional sentences, even with "I" and "he/she/it".',
      },
      {
        id: 'type-three',
        type: 'theory',
        title: '4. Conditional Type Three: Unreal Past',
        content: 'The Third Conditional is used to talk about **impossible situations in the past**. It expresses regret or imagines how things could have been different.\n\n**Structure:** If + Past Perfect, ... Would have + Past Participle',
      },
      {
        id: 'three-examples',
        type: 'example',
        icon: '⏮️',
        data: {
          examples: [
            { text: 'If I had studied harder, I would have passed the exam.', note: '(I didn\'t study hard, so I didn\'t pass)' },
            { text: 'If we had left earlier, we would have caught the train.', note: '(We didn\'t leave early, so we missed it)' },
          ],
        },
      },
      {
        id: 'summary-table',
        type: 'table',
        title: 'Conditional Types Summary',
        data: {
          headers: ['Type', 'Use', 'Structure', 'Example'],
          rows: [
            ['Zero', 'Facts/Habits', 'If + Present, Present', 'If you heat ice, it melts'],
            ['One', 'Real Future', 'If + Present, Will + Verb', 'If it rains, I will stay home'],
            ['Two', 'Unreal Present', 'If + Past, Would + Verb', 'If I were rich, I would travel'],
            ['Three', 'Unreal Past', 'If + Past Perfect, Would have + PP', 'If I had known, I would have helped'],
          ],
        },
      },
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'multiple-choice',
        question: 'If you _____ water to 100°C, it boils.',
        options: ['heat', 'will heat', 'heated', 'would heat'],
        correctAnswer: 'heat',
        explanation: 'This is a scientific fact, so we use Type Zero (Present + Present)',
      },
      {
        id: 'ex2',
        type: 'multiple-choice',
        question: 'If it _____ tomorrow, we will cancel the picnic.',
        options: ['rains', 'will rain', 'rained', 'would rain'],
        correctAnswer: 'rains',
        explanation: 'This is a real future possibility, so we use Type One (Present + Will)',
      },
    ],
  },
  {
    id: 'lesson-4-voice',
    number: 4,
    title: 'Active and Passive Voice',
    titleAr: 'المبني للمعلوم والمبني للمجهول',
    description: 'Learn how to transform sentences between active and passive voice with step-by-step guidance.',
    duration: '50 دقيقة',
    difficulty: 'intermediate',
    icon: '🔄',
    sections: [
      {
        id: 'definitions',
        type: 'theory',
        title: 'Definitions',
        content: '✔ **Active voice** occurs when a clear subject performs a clear action.\n\n✔ **Passive voice** occurs when one uses a "to-be" verb (am, is, are, was, were, be, being, been) with a past tense verb. Sentences with "to-be" verbs are passive because they describe an object rather than show action.\n\n✔ We use the **active voice** when we want to emphasize the **subject**, and we use the **passive voice** when we want to emphasize the **object**.',
      },
      {
        id: 'when-to-use',
        type: 'theory',
        title: 'When to Use Each Voice',
        content: '**Use Active Voice when:**\n- The subject is important\n- You want clear, direct sentences\n- You want to emphasize who did the action\n\n**Use Passive Voice when:**\n- The object is more important than the subject\n- The subject is unknown or unimportant\n- You want to sound more formal or academic',
      },
      {
        id: 'steps',
        type: 'steps',
        title: 'Steps to Form the Passive',
        data: {
          steps: [
            'First of all, find the **subject**, the **object** and the **main verb**.',
            'Determine the **tense** of the verb then use the suitable helping verb or auxiliary verb accordingly. If helping verb is given, use the verb as it is. But note that the helping verb used should be according to the object.',
            'Convert the verb into **past participle** or 3rd form of the verb.',
            'Switch the object and the subject.',
            'Use the preposition **"by"** after the verb.',
          ],
        },
      },
      {
        id: 'example-1',
        type: 'example',
        icon: '📝',
        title: 'Example 1: Simple Past',
        data: {
          examples: [
            {
              step: 'Original (Active)',
              text: 'Colin wrote the paper.',
            },
            {
              step: 'Step 1: Identify parts',
              text: '**Subject:** Colin | **Verb:** wrote | **Object:** the paper',
            },
            {
              step: 'Step 2: Determine tense',
              text: 'The verb "wrote" is in the **simple past** tense.',
            },
            {
              step: 'Step 3: Find auxiliary',
              text: 'The verb "to be" in the past simple is **was/were**.',
            },
            {
              step: 'Step 4: Past participle',
              text: 'The past participle of "write" is **written**.',
            },
            {
              step: 'Step 5: Rearrange',
              text: '**The paper was written by Colin.** (Passive)',
            },
          ],
        },
      },
      {
        id: 'example-2',
        type: 'example',
        icon: '📝',
        title: 'Example 2: Present Perfect',
        data: {
          examples: [
            {
              active: 'Colin has broken his smartphone.',
              passive: 'The smartphone has been broken by Colin.',
            },
          ],
        },
      },
      {
        id: 'example-3',
        type: 'example',
        icon: '📝',
        title: 'Example 3: Present Continuous',
        data: {
          examples: [
            {
              active: 'The CEO is organizing a company dinner tonight.',
              passive: 'A company dinner is being organized by the CEO tonight.',
            },
          ],
        },
      },
      {
        id: 'tense-table',
        type: 'table',
        title: 'Passive Forms by Tense',
        data: {
          headers: ['Tense', 'Active', 'Passive'],
          rows: [
            ['Simple Present', 'writes', 'is/are written'],
            ['Simple Past', 'wrote', 'was/were written'],
            ['Present Continuous', 'is writing', 'is/are being written'],
            ['Past Continuous', 'was writing', 'was/were being written'],
            ['Present Perfect', 'has written', 'has/have been written'],
            ['Past Perfect', 'had written', 'had been written'],
            ['Future Simple', 'will write', 'will be written'],
            ['Modal (can)', 'can write', 'can be written'],
          ],
        },
      },
      {
        id: 'practice-tip',
        type: 'tip',
        icon: '💡',
        title: 'Practice Tip',
        content: 'Always identify the tense first! The passive form depends entirely on the tense of the active sentence.',
      },
    ],
    exercises: [
      {
        id: 'ex1',
        type: 'transformation',
        question: 'Transform to passive: The teacher explains the lesson.',
        correctAnswer: 'The lesson is explained by the teacher.',
      },
      {
        id: 'ex2',
        type: 'transformation',
        question: 'Transform to passive: They built the mosque in 2020.',
        correctAnswer: 'The mosque was built in 2020.',
      },
      {
        id: 'ex3',
        type: 'transformation',
        question: 'Transform to active: The Quran is recited by millions.',
        correctAnswer: 'Millions recite the Quran.',
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return englishLessons.find((lesson) => lesson.id === id);
}

export function getLessonByNumber(number: number): Lesson | undefined {
  return englishLessons.find((lesson) => lesson.number === number);
}
