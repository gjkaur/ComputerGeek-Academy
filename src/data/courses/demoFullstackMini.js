import { INSTRUCTOR_NAME, SAMPLE_VIDEO_URL, DEFAULT_THUMBNAIL } from '../siteContent';

/**
 * Compact published course for instructor/student full-stack demos.
 * Labs require a passing code submission before certificate unlock.
 */
export const demoFullstackMini = {
  id: 'demo-fullstack-mini',
  title: 'Demo Full-Stack Python Mini Course',
  description:
    'Short instructor-designed demo: video, quiz, assignment, and auto-graded lab. Used to practice enrollment, payment, and certificates.',
  longDescription:
    'This mini course mirrors how an instructor builds a full course: upload a lecture video URL, write a quiz, assign homework, and attach a graded Python lab. Students pay (dummy gateway), complete work, pass the lab, then download a certificate.',
  instructor: INSTRUCTOR_NAME,
  category: 'Python',
  categoryId: 'python',
  level: 'Beginner',
  duration: '45 minutes',
  priceAmount: 49,
  price: '$49',
  thumbnail: DEFAULT_THUMBNAIL,
  icon: 'Code2',
  featured: true,
  published: true,
  certificateEnabled: true,
  highlights: [
    'Dummy payment checkout',
    'Auto-graded Python lab (must pass for certificate)',
    'Quiz + assignment + video lesson',
  ],
  modules: [
    {
      id: 'demo-mod-1',
      title: 'Module 1 — Foundations',
      order: 1,
      lessons: [
        {
          id: 'demo-lesson-video',
          title: 'Welcome video: how this mini course works',
          type: 'video',
          duration: '5 min',
          videoUrl: SAMPLE_VIDEO_URL,
        },
        {
          id: 'demo-lesson-quiz',
          title: 'Knowledge check',
          type: 'quiz',
          quizId: 'demo-quiz-1',
        },
        {
          id: 'demo-lesson-assignment',
          title: 'Short reflection',
          type: 'assignment',
          assignmentId: 'demo-assign-1',
        },
        {
          id: 'demo-lesson-lab',
          title: 'Graded lab: Hello ComputerGeek',
          type: 'lab',
          labId: 'demo-lab-1',
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'demo-quiz-1',
      title: 'Knowledge check',
      passingScore: 70,
      questions: [
        {
          id: 'dq1',
          question: 'What must a student do before a certificate is issued?',
          options: [
            'Only watch videos',
            'Pass all graded labs with correct solutions',
            'Email the instructor',
            'Pay twice',
          ],
          correctIndex: 1,
        },
        {
          id: 'dq2',
          question: 'Which language does this mini lab grade?',
          options: ['Java', 'Python', 'C++', 'Ruby'],
          correctIndex: 1,
        },
      ],
    },
  ],
  assignments: [
    {
      id: 'demo-assign-1',
      title: 'Short reflection',
      description: 'Write 2–3 sentences on what you expect to learn.',
      instructions:
        'Submit a short reflection. Attach an optional .txt file if you like. Any non-empty answer is accepted for this demo.',
    },
  ],
  labs: [
    {
      id: 'demo-lab-1',
      title: 'Graded lab: Hello ComputerGeek',
      description:
        'Write a Python program that prints exactly: Hello, ComputerGeek Academy!',
      steps: [
        'Open the starter code editor below.',
        'Complete the print statement.',
        'Click Submit solution — the grader checks your code automatically.',
        'You must pass this lab to unlock the certificate.',
      ],
      objectives: [
        'Submit a real solution (not self-mark)',
        'Pass automated checks before certificate unlock',
      ],
      language: 'python',
      starterCode: '# Complete the print below\nprint("")\n',
      requiredSubstrings: ['print(', 'Hello, ComputerGeek Academy!'],
      forbiddenSubstrings: [],
      expectedOutputContains: ['Hello, ComputerGeek Academy!'],
    },
  ],
  resources: [
    {
      id: 'demo-res-1',
      title: 'Mini course cheat sheet',
      fileName: 'demo-cheatsheet.txt',
      fileUrl: '#',
      type: 'txt',
    },
  ],
};
