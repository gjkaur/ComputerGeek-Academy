# ComputerGeek Academy — Online Course Platform

A full-featured online course-selling platform for **ComputerGeek Academy** — sell recorded courses with video lectures, quizzes, assignments, labs, resources, and completion certificates.

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **React Router**
- **Lucide React** icons
- **Supabase Auth** — secure student/admin login with MFA for admin
- **localStorage** for course/enrollment data (Phase 2: migrate to Supabase DB)

## Getting Started

```bash
npm install
cp .env.example .env   # add your Supabase URL and anon key
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Supabase setup (required for auth)

See **[supabase/SETUP.md](supabase/SETUP.md)** for full instructions:

1. Create a Supabase project
2. Run `supabase/schema.sql` in SQL Editor
3. Enable TOTP MFA in Auth settings
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`
5. Promote your admin email in the database

## Authentication

| Route | Purpose |
|-------|---------|
| `/login` | Student sign in / sign up |
| `/admin/login` | Admin sign in + MFA (direct URL only) |

- **Students:** email + password
- **Admin:** email + password + **TOTP MFA** (Google Authenticator, Authy, etc.)
- Mock "click to login" has been removed

## Platform Features

### Public
- Course catalog with category filters
- Course detail with full curriculum
- Checkout with Stripe placeholder payment
- About, Contact pages

### Student
- `/dashboard` — purchased courses, progress tracking
- `/learn/:courseId/lesson/:lessonId` — video player
- `/learn/:courseId/quiz/:quizId` — quizzes with scoring
- `/learn/:courseId/assignment/:assignmentId` — assignment submission
- `/learn/:courseId/lab/:labId` — lab instructions
- Certificate download on course completion

### Admin
- `/admin` — overview stats
- `/admin/courses` — manage all courses
- `/admin/courses/new` — create course
- `/admin/courses/:id/edit` — edit modules, videos, quizzes, assignments, labs, resources, pricing, publish status

## Project Structure

```
src/
├── context/AppProvider.jsx    # Auth, enrollments, progress, course CRUD
├── data/
│   ├── courseCatalog.js       # Full course structure (modules, lessons, etc.)
│   └── siteContent.js         # Marketing content, categories
├── services/
│   ├── storage.js             # localStorage helpers
│   └── payment.js             # Stripe placeholder
├── utils/progress.js          # Progress calculation helpers
├── components/
│   ├── course/                # Curriculum, sidebar, progress
│   └── layout/                # Navbar, Footer, Learning, Admin layouts
└── pages/
    ├── student/               # Dashboard, player, quiz, assignment, lab
    ├── admin/                 # Dashboard, course editor
    └── Checkout.jsx           # Payment flow
```

## Course Data Model

Each course includes: title, description, instructor, category, level, duration, price, thumbnail, modules, lessons (video/quiz/assignment/lab/reading), quizzes, assignments, labs, resources, and certificate option.

Edit `src/data/courseCatalog.js` for seed data. Admin-created courses persist in localStorage.

## Backend Integration (Future)

Replace mock layers with real APIs:

| Layer | File | Replace with |
|-------|------|--------------|
| Auth | `AppProvider.jsx` | JWT/session API |
| Courses | `AppProvider.jsx` | REST/GraphQL course API |
| Payments | `services/payment.js` | Stripe Checkout / Payment Intents |
| Uploads | `CourseEditor.jsx` | S3/Cloudinary presigned URLs |
| Progress | `AppProvider.jsx` | User progress API |

## Build

```bash
npm run build
npm run preview
```
