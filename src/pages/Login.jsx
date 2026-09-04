import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import AuthField from '../components/auth/AuthField';
import SupabaseSetupRequired from '../components/auth/SupabaseSetupRequired';
import DemoCredentialsHint from '../components/auth/DemoCredentialsHint';
import { useApp } from '../context/AppProvider';
import { DEMO_STUDENT } from '../data/demoAccounts';

export default function Login() {
  const {
    isAuthenticated,
    isAdmin,
    isApproved,
    adminMfaVerified,
    authLoading,
    isSupabaseConfigured,
    studentSignIn,
    studentSignUp,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/dashboard';

  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({
    fullName: '',
    email: DEMO_STUDENT.email,
    password: DEMO_STUDENT.password,
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to={adminMfaVerified ? '/admin' : '/admin/login'} replace />;
    }
    if (!isApproved) {
      return <Navigate to="/pending-approval" replace />;
    }
    return <Navigate to={from} replace />;
  }

  // Demo accounts work without Supabase; real signup still needs it
  if (!isSupabaseConfigured && mode === 'signup') {
    return <SupabaseSetupRequired />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        if (form.password !== form.confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        if (form.password.length < 8) {
          throw new Error('Password must be at least 8 characters.');
        }
        const { needsEmailConfirmation } = await studentSignUp({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
        });
        if (needsEmailConfirmation) {
          setInfo('Check your email to confirm your account. After confirmation, your account will await admin approval.');
          setMode('signin');
        } else {
          setInfo('Account created! Your registration is pending admin approval.');
          setMode('signin');
        }
      } else {
        await studentSignIn({ email: form.email, password: form.password });
        // Redirect handled by isAuthenticated effect on next render
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="ComputerGeek Academy" className="mx-auto mb-4 h-16 w-auto" />
          <h1 className="text-2xl font-bold text-navy-900">Student Sign In</h1>
          <p className="mt-2 text-navy-600">
            Sign in to access your courses, dashboard, and learning progress.
          </p>
        </div>

        <DemoCredentialsHint role="student" />

        <div className="mb-6 flex rounded-xl bg-navy-50 p-1">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === 'signin' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === 'signup' ? 'bg-white text-navy-900 shadow-sm' : 'text-navy-600'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <AuthField
              label="Full Name"
              id="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
            />
          )}
          <AuthField
            label="Email"
            id="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <AuthField
            label="Password"
            id="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
          {mode === 'signup' && (
            <AuthField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          )}
          {info && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{info}</p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Please wait...
              </>
            ) : mode === 'signup' ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-brand-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
