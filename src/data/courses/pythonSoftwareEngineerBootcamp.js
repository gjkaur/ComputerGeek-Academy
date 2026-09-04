import {
  DEFAULT_THUMBNAIL,
  INSTRUCTOR_NAME,
  SAMPLE_VIDEO_URL,
} from '../siteContent';

const COURSE_ID = 'python-software-engineer-bootcamp';

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

/** @type {Array<{ week: number, title: string, modules: Array<{ n: number, title: string, topics: string, labTitle: string, labGoal: string }> }>} */
const WEEKS = [
  {
    week: 1,
    title: 'Python Foundations',
    modules: [
      {
        n: 1,
        title: 'Python & Software Development Fundamentals',
        topics:
          'What is Python, ecosystem, install, versions, CPython, REPL, IDE setup, PEP 8, first app, debugging.',
        labTitle: 'Dev environment & CLI app',
        labGoal: 'Set up Python tooling and build a command-line application.',
      },
      {
        n: 2,
        title: 'Variables, Data Types & Operators',
        topics:
          'Variables, dynamic typing, numbers, bool, str, None, conversion, operators, mutability, type hints intro.',
        labTitle: 'Typed data-processing utility',
        labGoal: 'Build a small utility with typed functions. Practice dry-runs in Code Lab.',
      },
      {
        n: 3,
        title: 'Control Flow',
        topics:
          'if/elif/else, truthy/falsy, match/case, for/while, range, break/continue/pass, nested control.',
        labTitle: 'Rule-based transaction processor',
        labGoal: 'Implement branching and looping rules for sample transactions.',
      },
      {
        n: 4,
        title: 'Python Collections',
        topics:
          'Lists, tuples, sets, dicts, slicing, comprehensions, enumerate/zip, sorting, choosing structures.',
        labTitle: 'In-memory inventory system',
        labGoal: 'Model inventory with the right collections and operations.',
      },
    ],
  },
  {
    week: 2,
    title: 'Functions, OOP & Professional Python',
    modules: [
      {
        n: 5,
        title: 'Functions & Functional Concepts',
        topics:
          'Parameters, returns, *args/**kwargs, scope/LEGB, lambda, HOF, closures, pure functions, recursion.',
        labTitle: 'Reusable business functions',
        labGoal: 'Refactor Week 1 scripts into reusable functions.',
      },
      {
        n: 6,
        title: 'Modules, Packages & Dependency Management',
        topics:
          'Modules, packages, imports, venv, pip, pyproject.toml, pinning, semver, reproducible environments.',
        labTitle: 'Professional Python package',
        labGoal: 'Convert a single-file app into a packaged project.',
      },
      {
        n: 7,
        title: 'Object-Oriented Programming',
        topics:
          'Classes, methods, inheritance, composition, polymorphism, ABCs, properties, dataclasses, SOLID intro.',
        labTitle: 'OO order management system',
        labGoal: 'Model orders and inventory with classes and composition.',
      },
      {
        n: 8,
        title: 'Exceptions, Logging & Defensive Programming',
        topics:
          'try/except/else/finally, custom exceptions, validation, logging levels, structured logging, fail-fast.',
        labTitle: 'Validation, exceptions & logging',
        labGoal: 'Add production-style error handling and logs.',
      },
    ],
  },
  {
    week: 3,
    title: 'Advanced Python & Engineering Practices',
    modules: [
      {
        n: 9,
        title: 'Advanced Python Language Features',
        topics:
          'Iterators, generators, decorators, context managers, collections, itertools, functools.',
        labTitle: 'Decorators & streaming processors',
        labGoal: 'Build reusable decorators and generator-based pipelines.',
      },
      {
        n: 10,
        title: 'Type-Safe Python',
        topics:
          'Type hints, Optional/Union/Literal, TypedDict, Protocol, generics, mypy/Pyright, gradual typing.',
        labTitle: 'Strongly typed codebase',
        labGoal: 'Add types and pass a static type checker.',
      },
      {
        n: 11,
        title: 'Files, Serialization & Configuration',
        topics:
          'pathlib, CSV/JSON, env vars, .env, secrets vs config, environment-specific configuration.',
        labTitle: 'Configurable file-processing service',
        labGoal: 'Read/write files with clean configuration loading.',
      },
      {
        n: 12,
        title: 'Clean Code & Python Architecture',
        topics:
          'PEP 8, DRY/KISS/YAGNI, SOLID, layered architecture, repository/service, DTOs, code review.',
        labTitle: 'Layered architecture refactor',
        labGoal: 'Refactor a messy app into maintainable layers.',
      },
    ],
  },
  {
    week: 4,
    title: 'Databases & Persistence',
    modules: [
      {
        n: 13,
        title: 'SQL for Python Developers',
        topics:
          'Tables, keys, constraints, CRUD, joins, aggregation, transactions, indexes, PostgreSQL intro.',
        labTitle: 'Enterprise schema design',
        labGoal: 'Design the database for the bootcamp application.',
      },
      {
        n: 14,
        title: 'Python Database Programming',
        topics:
          'DB-API, connections, cursors, parameterized SQL, pooling, SQL injection prevention, repositories.',
        labTitle: 'Production persistence layer',
        labGoal: 'Implement safe SQL access with transactions.',
      },
      {
        n: 15,
        title: 'SQLAlchemy ORM',
        topics:
          'Engines, sessions, models, relationships, queries, lazy vs eager, N+1, when to use raw SQL.',
        labTitle: 'SQLAlchemy persistence',
        labGoal: 'Implement models and repositories with SQLAlchemy.',
      },
      {
        n: 16,
        title: 'Database Migrations & Production Data Practices',
        topics:
          'Alembic, versioning, rollbacks, seeds, indexes, optimization, low-downtime migration concepts.',
        labTitle: 'Versioned migration workflow',
        labGoal: 'Create and apply Alembic migrations safely.',
      },
    ],
  },
  {
    week: 5,
    title: 'Enterprise REST API Development',
    modules: [
      {
        n: 17,
        title: 'HTTP & REST API Fundamentals',
        topics:
          'HTTP methods/status/headers, REST, URI design, idempotency, pagination, filtering, versioning.',
        labTitle: 'API contract design',
        labGoal: 'Design a resource-oriented REST API contract.',
      },
      {
        n: 18,
        title: 'FastAPI',
        topics:
          'Routes, path/query/body, Pydantic, validation, DI, exception handlers, OpenAPI/Swagger.',
        labTitle: 'CRUD REST API',
        labGoal: 'Build a working FastAPI CRUD service.',
      },
      {
        n: 19,
        title: 'Enterprise API Architecture',
        topics:
          'Router/service/repository, DTOs, transactions, standardized errors, correlation IDs, compatibility.',
        labTitle: 'Enterprise API refactor',
        labGoal: 'Restructure the API into clean layers.',
      },
      {
        n: 20,
        title: 'Authentication & API Security',
        topics:
          'AuthN/AuthZ, password hashing, JWT, RBAC, CORS, injection risks, secrets, OWASP API risks.',
        labTitle: 'Secure API with RBAC',
        labGoal: 'Add authentication and role-based authorization.',
      },
    ],
  },
  {
    week: 6,
    title: 'Testing, Concurrency & Performance',
    modules: [
      {
        n: 21,
        title: 'Automated Testing with pytest',
        topics:
          'Unit tests, fixtures, parametrize, mocking, API tests, integration tests, coverage.',
        labTitle: 'Automated test suite',
        labGoal: 'Cover services, repositories, and endpoints with pytest.',
      },
      {
        n: 22,
        title: 'Test-Driven Development & Quality Engineering',
        topics:
          'TDD, test pyramid, Ruff/Black, type checking, pre-commit hooks, quality gates.',
        labTitle: 'Feature via TDD',
        labGoal: 'Deliver a feature using Red-Green-Refactor.',
      },
      {
        n: 23,
        title: 'Concurrency & Asynchronous Python',
        topics:
          'Threads/processes, GIL, Futures, asyncio, async I/O, choosing the right model.',
        labTitle: 'Async workflow',
        labGoal: 'Build an asynchronous processing/API flow.',
      },
      {
        n: 24,
        title: 'Python Performance Engineering',
        topics:
          'Profiling, complexity, caching, DB bottlenecks, generators, benchmark-first optimization.',
        labTitle: 'Profile & optimize',
        labGoal: 'Measure and speed up an inefficient service.',
      },
    ],
  },
  {
    week: 7,
    title: 'Distributed Systems & Production Infrastructure',
    modules: [
      {
        n: 25,
        title: 'Background Processing & Messaging',
        topics:
          'Task queues, Celery, Redis/RabbitMQ concepts, retries, DLQ, idempotency, event-driven design.',
        labTitle: 'Async order processing',
        labGoal: 'Offload order work to a background worker.',
      },
      {
        n: 26,
        title: 'Caching & Resilience',
        topics:
          'Redis cache-aside, TTL, invalidation, timeouts, circuit breakers, health checks, degradation.',
        labTitle: 'Caching & resilience',
        labGoal: 'Add cache and resilience patterns to the API.',
      },
      {
        n: 27,
        title: 'Docker & Containerization',
        topics:
          'Images, Dockerfile, Compose, multi-stage builds, non-root, security, health checks.',
        labTitle: 'Containerize the stack',
        labGoal: 'Run API + dependencies with Docker Compose.',
      },
      {
        n: 28,
        title: 'CI/CD for Python',
        topics:
          'Git workflow, lint/test/type gates, image build, promotion, GitHub Actions, rollbacks.',
        labTitle: 'Automated CI pipeline',
        labGoal: 'Create a CI pipeline for quality and build.',
      },
    ],
  },
  {
    week: 8,
    title: 'Enterprise Production Engineering',
    modules: [
      {
        n: 29,
        title: 'Cloud & Kubernetes Fundamentals',
        topics:
          '12-factor, Pods/Deployments/Services, ConfigMaps/Secrets, probes, HPA, rolling deploys.',
        labTitle: 'Kubernetes deployment',
        labGoal: 'Deploy the service with Kubernetes manifests.',
      },
      {
        n: 30,
        title: 'Observability & Production Monitoring',
        topics:
          'Logs/metrics/traces, correlation IDs, OpenTelemetry, Prometheus/Grafana concepts, SLI/SLO.',
        labTitle: 'Production instrumentation',
        labGoal: 'Add structured logs, metrics, and health endpoints.',
      },
      {
        n: 31,
        title: 'Production Security & Reliability',
        topics:
          'Threat modeling, OWASP, secrets, TLS, supply chain, graceful shutdown, readiness reviews.',
        labTitle: 'Security & readiness review',
        labGoal: 'Run a production-readiness and security checklist.',
      },
      {
        n: 32,
        title: 'Enterprise Architecture & Production Code Review',
        topics:
          'Monolith vs microservices, Clean/Hexagonal, DDD fundamentals, ADRs, review checklist.',
        labTitle: 'Architecture & code review',
        labGoal: 'Review the bootcamp app against enterprise standards.',
      },
    ],
  },
];

function buildWeekModule(weekDef) {
  const w = weekDef.week;
  const lessons = [];

  weekDef.modules.forEach((mod, idx) => {
    const videoId = `pseb-w${w}-m${mod.n}-video`;
    const labLessonId = `pseb-w${w}-m${mod.n}-lab`;
    const labId = `pseb-lab-m${mod.n}`;

    lessons.push({
      id: videoId,
      title: `Module ${mod.n}: ${mod.title}`,
      type: 'video',
      duration: '45 min',
      videoUrl: SAMPLE_VIDEO_URL,
      content: mod.topics,
    });

    lessons.push({
      id: labLessonId,
      title: `Lab ${mod.n}: ${mod.labTitle}`,
      type: 'lab',
      duration: '90 min',
      labId,
      content: mod.labGoal,
    });

    if (idx === weekDef.modules.length - 1) {
      lessons.push({
        id: `pseb-w${w}-quiz`,
        title: `Week ${w} Knowledge Check`,
        type: 'quiz',
        duration: '20 min',
        quizId: `pseb-quiz-w${w}`,
      });
    }
  });

  lessons.push({
    id: `pseb-w${w}-assignment`,
    title: `Week ${w} Project Checkpoint`,
    type: 'assignment',
    duration: '2 hours',
    assignmentId: `pseb-asg-w${w}`,
  });

  return {
    id: `pseb-week-${w}`,
    title: `Week ${w} — ${weekDef.title}`,
    order: w,
    lessons,
  };
}

function buildLabs() {
  return WEEKS.flatMap((week) =>
    week.modules.map((mod) =>
      createLab(
        `pseb-lab-m${mod.n}`,
        `Lab ${mod.n}: ${mod.labTitle}`,
        mod.labGoal,
        [
          'Read the module objectives and sample starter code.',
          'Implement the lab requirements in your project folder.',
          'Run tests or manual checks; use /labs/python for Week 1 dry-runs.',
          'Commit your work and note blockers for the instructor session.',
        ],
        [
          `Complete Module ${mod.n} hands-on outcomes`,
          'Write clean, readable Python following PEP 8',
          'Be ready to demo your solution in class',
        ],
      ),
    ),
  );
}

function buildQuizzes() {
  return WEEKS.map((week) =>
    createQuiz(`pseb-quiz-w${week.week}`, `Week ${week.week} Knowledge Check`, [
      {
        id: `pseb-q-w${week.week}-1`,
        question: `Which statement best matches the focus of Week ${week.week}: ${week.title}?`,
        options: [
          'Only memorizing syntax with no projects',
          'Applying this week’s topics in labs toward production skills',
          'Skipping labs and watching videos only',
          'Deploying to production on day one without foundations',
        ],
        correctIndex: 1,
      },
      {
        id: `pseb-q-w${week.week}-2`,
        question: 'What is the bootcamp’s end goal?',
        options: [
          'Write one-off scripts without tests',
          'Build, test, secure, containerize, deploy, and monitor production Python apps',
          'Avoid databases and APIs',
          'Use Python only inside notebooks forever',
        ],
        correctIndex: 1,
      },
      {
        id: `pseb-q-w${week.week}-3`,
        question: 'Why does the curriculum delay Kubernetes until later weeks?',
        options: [
          'Kubernetes is unimportant',
          'Learners need language, architecture, data, API, and testing foundations first',
          'Docker cannot run Python',
          'CI/CD replaces the need for good code',
        ],
        correctIndex: 1,
      },
    ]),
  );
}

function buildAssignments() {
  return WEEKS.map((week) =>
    createAssignment(
      `pseb-asg-w${week.week}`,
      `Week ${week.week} Project Checkpoint — ${week.title}`,
      `Demonstrate Week ${week.week} skills in the growing Order & Inventory platform.`,
      [
        `Complete all Week ${week.week} labs.`,
        'Push code to your Git repository with a clear README section for this week.',
        'Prepare a short demo of what changed in the architecture this week.',
        'List open risks or questions for the next instructor session.',
      ],
    ),
  );
}

export const pythonSoftwareEngineerBootcamp = {
  id: COURSE_ID,
  title: 'Python Software Engineer Bootcamp',
  description:
    'Beginner → enterprise production Python in 8 weeks: foundations, OOP, databases, FastAPI, security, testing, Docker, CI/CD, Kubernetes, and observability.',
  longDescription:
    'An instructor-led bootcamp that takes learners from zero/beginner Python through enterprise-grade, production-ready development. You will not stop at syntax — you build testing, databases, APIs, architecture, security, performance, Docker, CI/CD, observability, and production engineering skills. Capstone: an Enterprise Order & Inventory Management Platform with FastAPI, PostgreSQL, Redis, background workers, containers, and Kubernetes deployment. Pair Week 1 topics with the free in-browser Python Code Lab to dry-run memory step by step.',
  instructor: INSTRUCTOR_NAME,
  category: 'Programming',
  categoryId: 'programming',
  level: 'Beginner to Advanced',
  duration: '8 weeks',
  priceAmount: 2999,
  price: formatPrice(2999),
  thumbnail:
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
  icon: 'Code',
  featured: true,
  published: true,
  certificateEnabled: true,
  highlights: [
    '32 modules from Python foundations to Kubernetes & observability',
    'Weekly labs + capstone: Order & Inventory production platform',
    'FastAPI, PostgreSQL, SQLAlchemy, pytest, Docker, CI/CD',
    'Security, RBAC, testing, caching, Celery, and production readiness',
    'Free Code Lab for visual dry-runs while learning Week 1 foundations',
  ],
  modules: WEEKS.map(buildWeekModule),
  quizzes: buildQuizzes(),
  assignments: buildAssignments(),
  labs: buildLabs(),
  resources: [
    createResource(
      'pseb-res-curriculum',
      'Full Bootcamp Curriculum (8 weeks)',
      'python-software-engineer-bootcamp.md',
      '/curriculum/python-software-engineer-bootcamp.md',
      'markdown',
    ),
    createResource(
      'pseb-res-stack',
      'Recommended Technology Stack',
      'tech-stack.pdf',
      '#',
      'pdf',
    ),
    createResource(
      'pseb-res-capstone',
      'Capstone Architecture Overview',
      'capstone-architecture.pdf',
      '#',
      'pdf',
    ),
    createResource(
      'pseb-res-checklist',
      'Production-Readiness Checklist',
      'production-readiness-checklist.pdf',
      '#',
      'pdf',
    ),
  ],
};

export { WEEKS as pythonBootcampWeeks };
