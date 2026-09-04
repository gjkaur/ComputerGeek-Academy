import { DEMO_INSTRUCTOR, DEMO_STUDENT } from '../../data/demoAccounts';

export default function DemoCredentialsHint({ role = 'student' }) {
  const account = role === 'admin' ? DEMO_INSTRUCTOR : DEMO_STUDENT;
  return (
    <div className="mb-6 rounded-xl border border-brand-200 bg-brand-50/80 p-4 text-sm text-navy-800">
      <p className="font-semibold text-navy-900">
        Demo {role === 'admin' ? 'instructor' : 'student'} (no MFA)
      </p>
      <p className="mt-1 font-mono text-xs sm:text-sm">
        {account.email}
        <br />
        {account.password}
      </p>
      <p className="mt-2 text-xs text-navy-600">
        Local demo session — use for full-stack QA of course design, payment, labs, and certificates.
      </p>
    </div>
  );
}
