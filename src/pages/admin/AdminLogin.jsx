import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Shield } from 'lucide-react';
import Button from '../../components/ui/Button';
import AuthField, { inputClass } from '../../components/auth/AuthField';
import SupabaseSetupRequired from '../../components/auth/SupabaseSetupRequired';
import DemoCredentialsHint from '../../components/auth/DemoCredentialsHint';
import { useApp } from '../../context/AppProvider';
import { DEMO_INSTRUCTOR } from '../../data/demoAccounts';

export default function AdminLogin() {
  const {
    isAuthenticated,
    isAdmin,
    adminMfaVerified,
    authLoading,
    isSupabaseConfigured,
    adminSignIn,
    adminVerifyMfa,
    adminEnrollMfa,
    logout,
  } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState('credentials');
  const [form, setForm] = useState({
    email: DEMO_INSTRUCTOR.email,
    password: DEMO_INSTRUCTOR.password,
    code: '',
  });
  const [mfaData, setMfaData] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (isAuthenticated && isAdmin && adminMfaVerified) {
    return <Navigate to="/admin" replace />;
  }

  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Real MFA path still needs Supabase; demo instructor works offline
  if (!isSupabaseConfigured && step !== 'credentials') {
    return <SupabaseSetupRequired />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleCredentials = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const result = await adminSignIn({ email: form.email, password: form.password });

      if (result.step === 'complete') {
        navigate('/admin', { replace: true });
        return;
      }

      setMfaData(result);
      setStep(result.step);
    } catch (err) {
      setError(err.message || 'Admin sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (step === 'verify') {
        await adminVerifyMfa({
          factorId: mfaData.factorId,
          challengeId: mfaData.challengeId,
          code: form.code,
        });
      } else if (step === 'enroll') {
        await adminEnrollMfa({
          factorId: mfaData.factorId,
          challengeId: mfaData.challengeId,
          code: form.code,
        });
      }
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'MFA verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-white">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Admin Sign In</h1>
          <p className="mt-2 text-navy-600">
            {step === 'credentials' && 'Sign in with your admin credentials.'}
            {step === 'verify' && 'Enter the 6-digit code from your authenticator app.'}
            {step === 'enroll' && 'Set up two-factor authentication to continue.'}
          </p>
        </div>

        {step === 'credentials' && <DemoCredentialsHint role="admin" />}

        {step === 'credentials' && (
          <form onSubmit={handleCredentials} className="space-y-4">
            <AuthField
              label="Admin Email"
              id="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <AuthField
              label="Password"
              id="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
            </Button>
          </form>
        )}

        {(step === 'verify' || step === 'enroll') && mfaData && (
          <form onSubmit={handleMfaSubmit} className="space-y-4">
            {step === 'enroll' && mfaData.qrCode && (
              <div className="rounded-xl bg-navy-50 p-4 text-center">
                <p className="mb-3 text-sm text-navy-600">
                  Scan this QR code with Google Authenticator, Authy, or similar:
                </p>
                <img
                  src={mfaData.qrCode}
                  alt="MFA QR Code"
                  className="mx-auto mb-3 h-40 w-40"
                />
                {mfaData.secret && (
                  <p className="text-xs text-navy-500">
                    Manual key: <code className="rounded bg-white px-1">{mfaData.secret}</code>
                  </p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="code" className="mb-1 block text-sm font-medium text-navy-700">
                Authentication Code <span className="text-red-500">*</span>
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={form.code}
                onChange={handleChange}
                placeholder="000000"
                className={inputClass}
                autoComplete="one-time-code"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : step === 'enroll' ? (
                'Verify & Enable MFA'
              ) : (
                'Verify Code'
              )}
            </Button>
            <button
              type="button"
              onClick={async () => {
                await logout();
                setStep('credentials');
                setMfaData(null);
                setForm({ email: '', password: '', code: '' });
              }}
              className="w-full text-sm text-navy-500 hover:text-brand-500"
            >
              Back to sign in
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-brand-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
