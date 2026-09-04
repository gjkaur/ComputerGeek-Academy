import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  HardDrive,
  MonitorPlay,
  Quote,
  Sparkles,
  Layers,
  Shield,
  Rocket,
} from 'lucide-react';
import Button from '../ui/Button';
import {
  whyChooseUs,
  testimonials,
  bootcampWeeksOverview,
  BOOTCAMP_PRICE_LABEL,
  INSTRUCTOR_NAME,
} from '../../data/siteContent';
import Icon from '../ui/Icon';

const COURSE = '/courses/python-software-engineer-bootcamp';
const LAB = '/labs/python';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy-900 text-white">
      {/* Keep overlays dark — never wash text to unreadable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 15%, rgba(0,123,255,0.35), transparent 55%), radial-gradient(ellipse 45% 35% at 0% 100%, rgba(0,123,255,0.18), transparent 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[85vh] lg:px-8 lg:py-24">
        <div className="mb-8 inline-flex w-fit rounded-2xl bg-white p-3 shadow-lg">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="ComputerGeek Academy"
            className="h-14 w-auto sm:h-16"
          />
        </div>
        <p className="font-display mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-300">
          ComputerGeek Academy · Python only
        </p>
        <h1 className="font-display mb-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Become a production-ready Python software engineer — starting from zero.
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
          An 8-week instructor-led bootcamp: beginner-friendly teaching, enterprise depth,
          visual dry-run Code Lab, and a real FastAPI capstone. Tuition{' '}
          <strong className="text-white">{BOOTCAMP_PRICE_LABEL}</strong> CAD.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button to={COURSE} size="lg" variant="primary">
            Enroll in the Python Bootcamp
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            to={LAB}
            size="lg"
            className="border-2 border-white/80 bg-transparent text-white hover:bg-white/10"
          >
            Try the free Code Lab
          </Button>
        </div>
      </div>
    </section>
  );
}

export function OutcomeSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
            Why this bootcamp
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Most “Python courses” teach syntax. We teach how software ships.
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            You will leave able to design, test, secure, containerize, and operate Python services —
            with a portfolio capstone employers recognize.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Layers,
              title: 'End-to-end curriculum',
              text: '32 modules from REPL to Kubernetes concepts — databases, FastAPI, security, CI/CD, observability.',
            },
            {
              icon: MonitorPlay,
              title: 'See code in memory',
              text: 'Our browser Code Lab lets beginners dry-run Python and watch variables change — no install friction.',
            },
            {
              icon: Rocket,
              title: 'Enterprise capstone',
              text: 'Build an Order & Inventory platform: API, auth, Postgres, Redis, workers, Docker, and deploy readiness.',
            },
          ].map((item) => (
            <div key={item.title} className="border-t-4 border-brand-500 pt-6">
              <item.icon className="mb-4 h-8 w-8 text-brand-600" />
              <h3 className="font-display text-xl font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-navy-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="bg-[linear-gradient(180deg,#f0f6fc_0%,#ffffff_100%)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
            8-week journey
          </p>
          <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            From first variable to production checklist
          </h2>
          <p className="mt-3 text-navy-600">
            Structured so beginners never feel lost — and advanced topics arrive only when foundations are solid.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bootcampWeeksOverview.map((w) => (
            <li
              key={w.week}
              className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition hover:border-brand-300"
            >
              <span className="font-display text-sm font-bold text-brand-600">Week {w.week}</span>
              <h3 className="font-display mt-1 text-lg font-bold text-navy-900">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{w.focus}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Button to={COURSE} variant="secondary">
            See full module outline
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CodeLabSection() {
  return (
    <section className="overflow-hidden bg-navy-900 py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-300">
            Free · In browser · No install
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Python Visual Code Lab — dry-run like a human on paper
          </h2>
          <p className="mt-4 text-lg text-navy-200">
            Trace real Python line by line. Watch memory boxes update. Follow arrows from code →
            memory → screen output. Built for total beginners in the ComputerGeek bootcamp.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Online compiler powered in your browser',
              'Step forward / back through execution',
              'Variables glow when they change',
              'Pairs with Week 1 foundations labs',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-navy-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={LAB} size="lg" variant="primary">
              Open Python Code Lab
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              to={COURSE}
              size="lg"
              className="border-2 border-white/80 bg-transparent text-white hover:bg-white/10"
            >
              Bootcamp details
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-navy-950 p-4 shadow-2xl sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-brand-200">
            <Code2 className="h-4 w-4" />
            <span className="font-mono">name = "ComputerGeek"</span>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-300">
            <span>Code</span>
            <ArrowRight className="h-4 w-4" />
            <span>Memory</span>
            <ArrowRight className="h-4 w-4" />
            <span>Output</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-brand-200">
                <HardDrive className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Memory</span>
              </div>
              <p className="font-mono text-sm">
                <span className="text-brand-300">name</span>
                <span className="text-navy-300"> → </span>
                <span className="text-white">"ComputerGeek"</span>
              </p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-brand-300">age</span>
                <span className="text-navy-300"> → </span>
                <span className="text-white">18</span>
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-emerald-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">Output</span>
              </div>
              <pre className="font-mono text-sm text-emerald-100">Hello, ComputerGeek{'\n'}Age: 18</pre>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-navy-300">
            Live at <Link to={LAB} className="font-semibold text-brand-300 hover:underline">/labs/python</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function CapstoneSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
              Capstone
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Enterprise Order & Inventory Platform
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Not a toy CRUD demo — a production-shaped system with layers, security, tests, and ops.
            </p>
            <ul className="mt-6 space-y-2 text-navy-700">
              {[
                'FastAPI + Pydantic validation',
                'Auth / RBAC + secure practices',
                'PostgreSQL · SQLAlchemy · Alembic',
                'Redis cache · background workers',
                'Docker · CI/CD · Kubernetes concepts',
                'Logging, health checks, readiness review',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-navy-700 bg-navy-900 p-6 font-mono text-xs leading-relaxed text-brand-100 sm:text-sm">
{`Client
  │
  ▼
FastAPI REST API ── Auth / RBAC
  │
  ▼
Service / Domain Layer ──► Redis Cache
  │
  ▼
Repository ──► PostgreSQL
                (SQLAlchemy + Alembic)

API ──► Background Worker ──► Message Broker`}
          </pre>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="bg-navy-50/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
            ComputerGeek difference
          </p>
          <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Built for humans who want real engineering careers
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-2xl border border-navy-100 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-navy-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-navy-600">
          Led by <strong className="text-navy-900">{INSTRUCTOR_NAME}</strong>, PhD — academia, research,
          industry, and corporate training.
        </p>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display mb-3 text-sm font-bold uppercase tracking-widest text-brand-600">
          Fair Canadian tuition
        </p>
        <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Serious training. Sensible price.
        </h2>
        <p className="mt-4 text-navy-600">
          Not a $79 video dump. Not a $10k sales funnel. One focused Python software engineering
          bootcamp at a price that respects Canadian learners and employers.
        </p>

        <div className="mt-10 rounded-3xl border-2 border-brand-500 bg-gradient-to-br from-brand-50 to-white p-8 text-left shadow-lg sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-700">
                Python Software Engineer Bootcamp
              </p>
              <p className="font-display mt-2 text-5xl font-bold text-navy-900">{BOOTCAMP_PRICE_LABEL}</p>
              <p className="mt-1 text-navy-600">CAD · 8 weeks · instructor-led + labs + capstone</p>
            </div>
            <Shield className="h-10 w-10 text-brand-500" />
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              '32 modules + weekly labs',
              'Free Visual Code Lab access',
              '12 months course access after approval',
              'Capstone portfolio project',
              'Certificate on completion',
              'Offline payment · human enrollment',
            ].map((t) => (
              <li key={t} className="flex gap-2 text-navy-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={`${COURSE}/request`} size="lg" className="flex-1">
              Request enrollment
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="flex-1">
              Ask a question
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-navy-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display mb-10 text-center text-3xl font-bold text-navy-900">
          What learners value
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="rounded-2xl border border-navy-100 bg-white p-8">
              <Quote className="mb-4 h-8 w-8 text-brand-300" />
              <p className="mb-6 italic leading-relaxed text-navy-700">&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <span className="block font-semibold text-navy-900">{item.author}</span>
                <span className="text-sm text-navy-500">{item.company}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCTASection() {
  return (
    <section className="gradient-brand py-20 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Ready to learn Python the ComputerGeek way?
        </h2>
        <p className="mt-4 text-lg text-brand-100">
          Start with the free Code Lab today. Request enrollment when you are ready for the full
          8-week bootcamp — {BOOTCAMP_PRICE_LABEL} CAD.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button to={LAB} size="lg" variant="white">
            Open Code Lab
          </Button>
          <Button to={COURSE} size="lg" variant="secondary">
            View bootcamp
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/** @deprecated kept for any old imports */
export function FeaturedCoursesSection() {
  return null;
}
