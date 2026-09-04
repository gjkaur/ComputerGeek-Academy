import {
  DEFAULT_THUMBNAIL,
  INSTRUCTOR_NAME,
  SAMPLE_VIDEO_URL,
} from './siteContent';
import { pythonSoftwareEngineerBootcamp } from './courses/pythonSoftwareEngineerBootcamp';

/** @typedef {'video'|'quiz'|'assignment'|'lab'|'reading'} LessonType */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {LessonType} type
 * @property {string} [duration]
 * @property {string} [videoUrl]
 * @property {string} [content]
 * @property {string} [quizId]
 * @property {string} [assignmentId]
 * @property {string} [labId]
 */

/**
 * @typedef {Object} Module
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {Lesson[]} lessons
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} longDescription
 * @property {string} instructor
 * @property {string} category
 * @property {string} categoryId
 * @property {string} level
 * @property {string} duration
 * @property {number} priceAmount
 * @property {string} price
 * @property {string} thumbnail
 * @property {string} icon
 * @property {boolean} featured
 * @property {boolean} published
 * @property {boolean} certificateEnabled
 * @property {string[]} highlights
 * @property {Module[]} modules
 * @property {Object[]} quizzes
 * @property {Object[]} assignments
 * @property {Object[]} labs
 * @property {Object[]} resources
 */

function formatPrice(amount) {
  return `$${amount.toLocaleString()}`;
}

function createQuiz(id, title, questions) {
  return { id, title, questions, passingScore: 70 };
}

function createAssignment(id, title, description, instructions) {
  return { id, title, description, instructions };
}

function createLab(id, title, description, steps, objectives) {
  return { id, title, description, steps, objectives };
}

function createResource(id, title, fileName, fileUrl, type = 'pdf') {
  return { id, title, fileName, fileUrl, type };
}

const genAiCourse = {
  id: 'generative-ai-professionals',
  title: 'Generative AI for Professionals',
  description:
    'Practical generative AI training for professionals — LLMs, prompt engineering, RAG, and building AI-powered applications for business.',
  longDescription:
    'Designed for professionals who want to leverage generative AI in their work. Learn prompt engineering, retrieval-augmented generation (RAG), fine-tuning fundamentals, and how to integrate LLMs into business workflows. Includes hands-on projects building chatbots, document Q&A systems, and content generation tools.',
  instructor: INSTRUCTOR_NAME,
  category: 'Generative AI',
  categoryId: 'genai',
  level: 'Beginner',
  duration: '12 hours',
  priceAmount: 999,
  price: formatPrice(999),
  thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
  icon: 'Sparkles',
  featured: true,
  published: true,
  certificateEnabled: true,
  highlights: [
    'Prompt engineering and LLM fundamentals',
    'Building RAG applications',
    'Responsible AI and governance',
    'Business use cases and ROI assessment',
  ],
  modules: [
    {
      id: 'genai-m1',
      title: 'Introduction to Generative AI',
      order: 1,
      lessons: [
        {
          id: 'genai-l1',
          title: 'What is Generative AI?',
          type: 'video',
          duration: '18 min',
          videoUrl: SAMPLE_VIDEO_URL,
        },
        {
          id: 'genai-l2',
          title: 'LLM Landscape Overview',
          type: 'video',
          duration: '22 min',
          videoUrl: SAMPLE_VIDEO_URL,
        },
        {
          id: 'genai-l3',
          title: 'Module 1 Knowledge Check',
          type: 'quiz',
          quizId: 'genai-q1',
        },
      ],
    },
    {
      id: 'genai-m2',
      title: 'Prompt Engineering',
      order: 2,
      lessons: [
        {
          id: 'genai-l4',
          title: 'Prompt Design Principles',
          type: 'video',
          duration: '25 min',
          videoUrl: SAMPLE_VIDEO_URL,
        },
        {
          id: 'genai-l5',
          title: 'Advanced Prompting Techniques',
          type: 'reading',
          duration: '10 min',
          content:
            'Learn chain-of-thought prompting, few-shot examples, and system prompts. Practice structuring prompts for consistent, reliable outputs in business contexts.',
        },
        {
          id: 'genai-l6',
          title: 'Prompt Engineering Lab',
          type: 'lab',
          labId: 'genai-lab1',
        },
        {
          id: 'genai-l7',
          title: 'Prompt Engineering Assignment',
          type: 'assignment',
          assignmentId: 'genai-a1',
        },
      ],
    },
    {
      id: 'genai-m3',
      title: 'RAG & Business Applications',
      order: 3,
      lessons: [
        {
          id: 'genai-l8',
          title: 'Retrieval-Augmented Generation',
          type: 'video',
          duration: '30 min',
          videoUrl: SAMPLE_VIDEO_URL,
        },
        {
          id: 'genai-l9',
          title: 'Building a Document Q&A System',
          type: 'lab',
          labId: 'genai-lab2',
        },
        {
          id: 'genai-l10',
          title: 'Final Assessment',
          type: 'quiz',
          quizId: 'genai-q2',
        },
      ],
    },
  ],
  quizzes: [
    createQuiz('genai-q1', 'Module 1 Knowledge Check', [
      {
        id: 'genai-q1-1',
        question: 'What does LLM stand for?',
        options: ['Large Language Model', 'Linear Learning Method', 'Local Logic Module', 'Linked Layer Model'],
        correctIndex: 0,
      },
      {
        id: 'genai-q1-2',
        question: 'Which is a primary use case for generative AI in business?',
        options: ['Hardware manufacturing', 'Content generation and automation', 'Network routing', 'Database indexing'],
        correctIndex: 1,
      },
      {
        id: 'genai-q1-3',
        question: 'Generative AI models are primarily trained to:',
        options: ['Delete data', 'Generate new content from patterns', 'Encrypt files', 'Monitor networks'],
        correctIndex: 1,
      },
    ]),
    createQuiz('genai-q2', 'Final Assessment', [
      {
        id: 'genai-q2-1',
        question: 'RAG stands for:',
        options: ['Random Access Gateway', 'Retrieval-Augmented Generation', 'Rapid AI Growth', 'Resource Allocation Graph'],
        correctIndex: 1,
      },
      {
        id: 'genai-q2-2',
        question: 'Few-shot prompting involves:',
        options: ['Providing examples in the prompt', 'Reducing model size', 'Deleting training data', 'Using only one word prompts'],
        correctIndex: 0,
      },
    ]),
  ],
  assignments: [
    createAssignment(
      'genai-a1',
      'Prompt Engineering Assignment',
      'Design and test prompts for a business use case.',
      'Choose a business scenario (e.g., customer support, report summarization). Write 5 prompts using different techniques (zero-shot, few-shot, chain-of-thought). Document results and refine your best prompt. Submit your prompts and a brief analysis (300+ words).',
    ),
  ],
  labs: [
    createLab(
      'genai-lab1',
      'Prompt Engineering Lab',
      'Hands-on practice with prompt design in a sandbox environment.',
      [
        'Open the provided prompt sandbox template',
        'Test zero-shot prompts for email drafting',
        'Apply few-shot examples for consistent tone',
        'Compare outputs and document best practices',
      ],
      ['Design effective prompts', 'Compare prompting strategies', 'Evaluate output quality'],
    ),
    createLab(
      'genai-lab2',
      'Document Q&A System Lab',
      'Build a simple RAG pipeline for document question answering.',
      [
        'Upload sample PDF documents to the lab environment',
        'Configure embedding and retrieval settings',
        'Connect an LLM for answer generation',
        'Test with 5 sample questions and verify accuracy',
      ],
      ['Configure a RAG pipeline', 'Test retrieval quality', 'Generate accurate answers from documents'],
    ),
  ],
  resources: [
    createResource('genai-r1', 'Course Slides — Module 1', 'genai-module1-slides.pdf', '#', 'pdf'),
    createResource('genai-r2', 'Prompt Engineering Cheat Sheet', 'prompt-cheatsheet.pdf', '#', 'pdf'),
    createResource('genai-r3', 'RAG Architecture Diagram', 'rag-architecture.png', '#', 'image'),
  ],
};

const mlFoundationsCourse = {
  id: 'ml-foundations',
  title: 'Machine Learning Foundations',
  description:
    'Build a strong ML foundation — supervised and unsupervised learning, model evaluation, feature engineering, and scikit-learn workflows.',
  longDescription:
    'A rigorous introduction to machine learning covering the mathematical intuition and practical implementation of core algorithms. Learn regression, classification, clustering, dimensionality reduction, and ensemble methods.',
  instructor: INSTRUCTOR_NAME,
  category: 'Machine Learning',
  categoryId: 'ml',
  level: 'Intermediate',
  duration: '18 hours',
  priceAmount: 1399,
  price: formatPrice(1399),
  thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
  icon: 'Cpu',
  featured: true,
  published: true,
  certificateEnabled: true,
  highlights: [
    'Supervised and unsupervised learning',
    'Feature engineering and selection',
    'Model evaluation and hyperparameter tuning',
    'End-to-end ML project workflow',
  ],
  modules: [
    {
      id: 'ml-m1',
      title: 'ML Fundamentals',
      order: 1,
      lessons: [
        { id: 'ml-l1', title: 'Introduction to Machine Learning', type: 'video', duration: '20 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'ml-l2', title: 'Types of Learning', type: 'video', duration: '15 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'ml-l3', title: 'ML Basics Quiz', type: 'quiz', quizId: 'ml-q1' },
      ],
    },
    {
      id: 'ml-m2',
      title: 'Supervised Learning',
      order: 2,
      lessons: [
        { id: 'ml-l4', title: 'Regression Models', type: 'video', duration: '28 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'ml-l5', title: 'Classification Algorithms', type: 'video', duration: '32 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'ml-l6', title: 'Scikit-learn Lab', type: 'lab', labId: 'ml-lab1' },
        { id: 'ml-l7', title: 'Model Evaluation Assignment', type: 'assignment', assignmentId: 'ml-a1' },
      ],
    },
    {
      id: 'ml-m3',
      title: 'Unsupervised Learning & Projects',
      order: 3,
      lessons: [
        { id: 'ml-l8', title: 'Clustering & Dimensionality Reduction', type: 'video', duration: '25 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'ml-l9', title: 'End-to-End ML Project Lab', type: 'lab', labId: 'ml-lab2' },
        { id: 'ml-l10', title: 'Final Exam', type: 'quiz', quizId: 'ml-q2' },
      ],
    },
  ],
  quizzes: [
    createQuiz('ml-q1', 'ML Basics Quiz', [
      {
        id: 'ml-q1-1',
        question: 'Supervised learning uses:',
        options: ['Unlabeled data only', 'Labeled training data', 'No training data', 'Random data'],
        correctIndex: 1,
      },
      {
        id: 'ml-q1-2',
        question: 'Overfitting occurs when a model:',
        options: ['Performs well on training but poorly on new data', 'Is too simple', 'Has no parameters', 'Uses too little data only'],
        correctIndex: 0,
      },
    ]),
    createQuiz('ml-q2', 'Final Exam', [
      {
        id: 'ml-q2-1',
        question: 'Cross-validation is used to:',
        options: ['Increase model size', 'Estimate model performance on unseen data', 'Remove features', 'Speed up training only'],
        correctIndex: 1,
      },
      {
        id: 'ml-q2-2',
        question: 'K-Means is a:',
        options: ['Classification algorithm', 'Clustering algorithm', 'Regression algorithm', 'Optimization method'],
        correctIndex: 1,
      },
    ]),
  ],
  assignments: [
    createAssignment(
      'ml-a1',
      'Model Evaluation Assignment',
      'Evaluate and compare ML models on a dataset.',
      'Using the provided dataset, train at least two classification models. Compare accuracy, precision, recall, and F1-score. Write a report (400+ words) explaining your findings and which model you would deploy and why.',
    ),
  ],
  labs: [
    createLab(
      'ml-lab1',
      'Scikit-learn Lab',
      'Build and evaluate models with scikit-learn.',
      ['Load the iris dataset', 'Split into train/test sets', 'Train a Random Forest classifier', 'Evaluate with classification report'],
      ['Use scikit-learn pipelines', 'Evaluate model metrics', 'Interpret results'],
    ),
    createLab(
      'ml-lab2',
      'End-to-End ML Project Lab',
      'Complete a full ML workflow from data to deployment-ready model.',
      ['Perform EDA on the dataset', 'Engineer features', 'Train and tune models', 'Document your workflow and results'],
      ['Complete an ML pipeline', 'Apply feature engineering', 'Present findings'],
    ),
  ],
  resources: [
    createResource('ml-r1', 'ML Foundations Workbook', 'ml-workbook.pdf', '#', 'pdf'),
    createResource('ml-r2', 'Scikit-learn Reference', 'sklearn-ref.pdf', '#', 'pdf'),
  ],
};

const mlopsCourse = {
  id: 'mlops-aws',
  title: 'MLOps on AWS',
  description:
    'Master end-to-end ML pipelines on AWS — from model training and versioning to deployment, monitoring, and CI/CD for machine learning.',
  longDescription:
    'Build production-grade ML systems on AWS using SageMaker, CodePipeline, and related services. This course covers the full MLOps lifecycle.',
  instructor: INSTRUCTOR_NAME,
  category: 'MLOps',
  categoryId: 'mlops',
  level: 'Advanced',
  duration: '20 hours',
  priceAmount: 1499,
  price: formatPrice(1499),
  thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
  icon: 'Workflow',
  featured: true,
  published: true,
  certificateEnabled: true,
  highlights: [
    'AWS SageMaker pipelines and model registry',
    'CI/CD for machine learning workflows',
    'Model monitoring and drift detection',
    'Infrastructure as code for ML environments',
  ],
  modules: [
    {
      id: 'mlops-m1',
      title: 'MLOps Foundations',
      order: 1,
      lessons: [
        { id: 'mlops-l1', title: 'Introduction to MLOps', type: 'video', duration: '22 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'mlops-l2', title: 'AWS ML Services Overview', type: 'video', duration: '26 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'mlops-l3', title: 'MLOps Concepts Quiz', type: 'quiz', quizId: 'mlops-q1' },
      ],
    },
    {
      id: 'mlops-m2',
      title: 'Pipelines & Deployment',
      order: 2,
      lessons: [
        { id: 'mlops-l4', title: 'SageMaker Pipelines', type: 'video', duration: '35 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'mlops-l5', title: 'Model Registry & Versioning', type: 'video', duration: '20 min', videoUrl: SAMPLE_VIDEO_URL },
        { id: 'mlops-l6', title: 'Deploy a Model Lab', type: 'lab', labId: 'mlops-lab1' },
        { id: 'mlops-l7', title: 'CI/CD Pipeline Assignment', type: 'assignment', assignmentId: 'mlops-a1' },
      ],
    },
  ],
  quizzes: [
    createQuiz('mlops-q1', 'MLOps Concepts Quiz', [
      {
        id: 'mlops-q1-1',
        question: 'MLOps primarily bridges:',
        options: ['ML development and operations', 'Frontend and backend', 'Hardware and software', 'Sales and marketing'],
        correctIndex: 0,
      },
      {
        id: 'mlops-q1-2',
        question: 'Model drift refers to:',
        options: ['Model performance degrading over time', 'Faster training', 'Data encryption', 'Network latency'],
        correctIndex: 0,
      },
    ]),
  ],
  assignments: [
    createAssignment(
      'mlops-a1',
      'CI/CD Pipeline Assignment',
      'Design an MLOps CI/CD pipeline for a sample project.',
      'Document a CI/CD pipeline architecture for an ML project on AWS. Include stages for data validation, training, testing, deployment, and monitoring. Submit architecture diagram description and step-by-step workflow (500+ words).',
    ),
  ],
  labs: [
    createLab(
      'mlops-lab1',
      'Deploy a Model Lab',
      'Deploy a trained model using SageMaker endpoints.',
      ['Configure SageMaker model artifact', 'Create an inference endpoint', 'Test with sample payloads', 'Monitor endpoint metrics'],
      ['Deploy ML models on AWS', 'Configure inference endpoints', 'Monitor deployment health'],
    ),
  ],
  resources: [
    createResource('mlops-r1', 'AWS MLOps Guide', 'aws-mlops-guide.pdf', '#', 'pdf'),
  ],
};

/** Generate a basic course structure for catalog entries without full content */
function generateBasicCourse(meta) {
  const prefix = meta.id.replace(/-/g, '').slice(0, 6);
  return {
    ...meta,
    instructor: INSTRUCTOR_NAME,
    price: formatPrice(meta.priceAmount),
    thumbnail: meta.thumbnail || DEFAULT_THUMBNAIL,
    published: meta.published ?? true,
    certificateEnabled: true,
    modules: [
      {
        id: `${prefix}-m1`,
        title: 'Getting Started',
        order: 1,
        lessons: [
          {
            id: `${prefix}-l1`,
            title: `Introduction to ${meta.title}`,
            type: 'video',
            duration: '20 min',
            videoUrl: SAMPLE_VIDEO_URL,
          },
          {
            id: `${prefix}-l2`,
            title: 'Core Concepts',
            type: 'video',
            duration: '25 min',
            videoUrl: SAMPLE_VIDEO_URL,
          },
          {
            id: `${prefix}-l3`,
            title: 'Knowledge Check',
            type: 'quiz',
            quizId: `${prefix}-q1`,
          },
        ],
      },
      {
        id: `${prefix}-m2`,
        title: 'Hands-On Practice',
        order: 2,
        lessons: [
          {
            id: `${prefix}-l4`,
            title: 'Practical Lab',
            type: 'lab',
            labId: `${prefix}-lab1`,
          },
          {
            id: `${prefix}-l5`,
            title: 'Course Assignment',
            type: 'assignment',
            assignmentId: `${prefix}-a1`,
          },
          {
            id: `${prefix}-l6`,
            title: 'Final Quiz',
            type: 'quiz',
            quizId: `${prefix}-q2`,
          },
        ],
      },
    ],
    quizzes: [
      createQuiz(`${prefix}-q1`, 'Knowledge Check', [
        {
          id: `${prefix}-q1-1`,
          question: `What is the primary focus of ${meta.title}?`,
          options: [meta.highlights[0], 'Unrelated topic A', 'Unrelated topic B', 'Unrelated topic C'],
          correctIndex: 0,
        },
      ]),
      createQuiz(`${prefix}-q2`, 'Final Quiz', [
        {
          id: `${prefix}-q2-1`,
          question: 'Which best describes your learning outcome from this course?',
          options: ['Practical job-ready skills', 'No applicable skills', 'Theory only', 'None of the above'],
          correctIndex: 0,
        },
      ]),
    ],
    assignments: [
      createAssignment(
        `${prefix}-a1`,
        'Course Assignment',
        `Apply concepts from ${meta.title}.`,
        `Complete the course project as described in the lab materials. Submit your code, results, and a brief summary (250+ words) of what you learned.`,
      ),
    ],
    labs: [
      createLab(
        `${prefix}-lab1`,
        'Practical Lab',
        `Hands-on lab for ${meta.title}.`,
        ['Review lab instructions', 'Complete all exercises', 'Submit your results'],
        ['Apply course concepts', 'Complete practical exercises'],
      ),
    ],
    resources: [
      createResource(`${prefix}-r1`, 'Course Materials', 'course-materials.pdf', '#', 'pdf'),
    ],
  };
}

const basicCourseMeta = [
  {
    id: 'ai-cybersecurity',
    title: 'AI in Cybersecurity',
    category: 'Cybersecurity',
    categoryId: 'cybersecurity',
    duration: '14 hours',
    level: 'Intermediate',
    priceAmount: 1299,
    featured: true,
    description:
      'Learn how AI and machine learning are transforming threat detection, anomaly analysis, and automated incident response.',
    longDescription:
      'This hands-on program explores the intersection of artificial intelligence and cybersecurity. You will build AI-powered threat detection models and analyze security logs with ML techniques.',
    highlights: [
      'AI-driven threat detection and anomaly analysis',
      'Security log analysis with machine learning',
      'Adversarial AI and defense strategies',
      'Hands-on labs with real-world datasets',
    ],
    icon: 'Shield',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
  },
  {
    id: 'java-fullstack',
    title: 'Java Full Stack Bootcamp',
    category: 'Programming',
    categoryId: 'programming',
    duration: '40 hours',
    level: 'Beginner',
    priceAmount: 1799,
    featured: false,
    description: 'Comprehensive Java full stack development — core Java, Spring Boot, REST APIs, and databases.',
    longDescription:
      'A complete bootcamp covering Java fundamentals through enterprise full stack development with Spring Boot and REST APIs.',
    highlights: ['Core Java and OOP', 'Spring Boot REST APIs', 'Database design with JPA', 'Capstone project'],
    icon: 'Code',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    category: 'Data Science',
    categoryId: 'data-science',
    duration: '24 hours',
    level: 'Beginner',
    priceAmount: 1199,
    featured: false,
    description: 'Learn Python for data analysis — NumPy, Pandas, visualization, and statistical foundations.',
    longDescription: 'Start your data science journey with Python, Pandas, NumPy, and visualization libraries.',
    highlights: ['Python fundamentals', 'Pandas and NumPy', 'Data visualization', 'Statistical analysis'],
    icon: 'BarChart3',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
  },
  {
    id: 'cloud-aws',
    title: 'Cloud Computing with AWS',
    category: 'Cloud Computing',
    categoryId: 'cloud',
    duration: '16 hours',
    level: 'Intermediate',
    priceAmount: 1299,
    featured: false,
    description: 'Hands-on AWS cloud training — EC2, S3, Lambda, VPC, IAM, and cloud architecture patterns.',
    longDescription: 'Gain practical AWS cloud skills through instructor-led labs and projects.',
    highlights: ['Core AWS services', 'Serverless with Lambda', 'Security and IAM', 'Cost optimization'],
    icon: 'Cloud',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
  },
  {
    id: 'data-analytics-python',
    title: 'Data Analytics with Python',
    category: 'Data Science',
    categoryId: 'data-science',
    duration: '14 hours',
    level: 'Intermediate',
    priceAmount: 1099,
    featured: false,
    description: 'Transform raw data into actionable insights — analytics workflows, dashboards, and reporting.',
    longDescription: 'Focused on the analytics practitioner role with SQL, Python, and dashboard tools.',
    highlights: ['Analytics workflow', 'SQL and Python', 'Dashboards and reporting', 'Business case studies'],
    icon: 'LineChart',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  },
];

export const initialCourseCatalog = [
  pythonSoftwareEngineerBootcamp,
];

// Other catalog courses temporarily removed — Python bootcamp only for now.
// Restore from git history when ready: genAiCourse, mlFoundationsCourse, mlopsCourse, basicCourseMeta.

export function getAllLessons(course) {
  return course.modules.flatMap((m) => m.lessons);
}

export function getLessonById(course, lessonId) {
  return getAllLessons(course).find((l) => l.id === lessonId);
}

export function getQuizById(course, quizId) {
  return course.quizzes?.find((q) => q.id === quizId);
}

export function getAssignmentById(course, assignmentId) {
  return course.assignments?.find((a) => a.id === assignmentId);
}

export function getLabById(course, labId) {
  return course.labs?.find((l) => l.id === labId);
}

export function getCourseStats(course) {
  const lessons = getAllLessons(course);
  return {
    moduleCount: course.modules.length,
    lessonCount: lessons.length,
    videoCount: lessons.filter((l) => l.type === 'video').length,
    quizCount: lessons.filter((l) => l.type === 'quiz').length,
    labCount: lessons.filter((l) => l.type === 'lab').length,
    assignmentCount: lessons.filter((l) => l.type === 'assignment').length,
  };
}

export function createEmptyCourse() {
  const id = `course-${Date.now()}`;
  return {
    id,
    title: 'New Course',
    description: '',
    longDescription: '',
    instructor: INSTRUCTOR_NAME,
    category: 'Artificial Intelligence',
    categoryId: 'ai',
    level: 'Beginner',
    duration: '0 hours',
    priceAmount: 0,
    price: '$0',
    thumbnail: DEFAULT_THUMBNAIL,
    icon: 'Brain',
    featured: false,
    published: false,
    certificateEnabled: true,
    highlights: [],
    modules: [],
    quizzes: [],
    assignments: [],
    labs: [],
    resources: [],
  };
}

export { formatPrice };
