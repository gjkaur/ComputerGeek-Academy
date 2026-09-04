import { Link } from 'react-router-dom';
import { Code2, ArrowRight, MonitorPlay, HardDrive, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function LabsHub() {
  return (
    <div>
      <section className="gradient-brand py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-100">
            ComputerGeek Code Lab · Python
          </p>
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            See how Python thinks — in your browser
          </h1>
          <p className="max-w-2xl text-lg text-brand-100">
            Dry-run Python online. Watch variables fill memory boxes step by step.
            Built for the Python Software Engineer Bootcamp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: MonitorPlay,
                title: 'Run online',
                text: 'Type Python and execute in the browser — nothing to install.',
              },
              {
                icon: HardDrive,
                title: 'See memory',
                text: 'Every variable becomes a visual box so beginners understand storage.',
              },
              {
                icon: Sparkles,
                title: 'Step by step',
                text: 'Trace like a dry run on paper: one line at a time.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mb-1 font-bold text-navy-900">{item.title}</h2>
                <p className="text-sm text-navy-600">{item.text}</p>
              </div>
            ))}
          </div>

          <article className="mx-auto max-w-2xl overflow-hidden rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-white to-brand-50/40 p-8 shadow-md">
            <span className="mb-4 inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Focus · Python only
            </span>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <Code2 className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-2xl font-extrabold text-navy-900">Python Visual Lab</h2>
            <p className="mb-6 text-navy-600">
              Full Python engine in the browser. Trace variables, loops, lists, and decisions —
              and watch memory update on every step.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/labs/python" size="lg">
                Open Python Lab
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button to="/courses/python-software-engineer-bootcamp" variant="outline" size="lg">
                Bootcamp details
              </Button>
            </div>
          </article>

          <p className="mt-10 text-center text-sm text-navy-500">
            Part of the{' '}
            <Link
              to="/courses/python-software-engineer-bootcamp"
              className="font-semibold text-brand-600 hover:underline"
            >
              Python Software Engineer Bootcamp
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
