import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function SupabaseSetupRequired() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-amber-600" />
          <h1 className="text-xl font-bold text-navy-900">Supabase Setup Required</h1>
        </div>
        <p className="mb-4 text-navy-700 leading-relaxed">
          Authentication requires Supabase. Copy <code className="rounded bg-white px-1">.env.example</code> to{' '}
          <code className="rounded bg-white px-1">.env</code> and add your project URL and anon key.
        </p>
        <ol className="mb-6 list-decimal space-y-2 pl-5 text-sm text-navy-700">
          <li>Create a project at supabase.com</li>
          <li>Run <code className="rounded bg-white px-1">supabase/schema.sql</code> in SQL Editor</li>
          <li>Enable TOTP MFA under Authentication → Multi-Factor</li>
          <li>Add env vars and restart the dev server</li>
        </ol>
        <Link to="/" className="text-sm font-medium text-brand-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
