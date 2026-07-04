import { Link } from 'react-router-dom';
import { Clock, LogOut, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppProvider';

export default function PendingApproval() {
  const { user, logout, isApproved, isAdmin, authLoading, isAuthenticated } = useApp();

  if (authLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Button to="/login">Sign In</Button>
      </div>
    );
  }

  if (isAdmin || isApproved) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Button to="/dashboard">Go to Dashboard</Button>
      </div>
    );
  }

  const isRejected = user?.approvalStatus === 'rejected';

  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-lg">
        {isRejected ? (
          <>
            <XCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
            <h1 className="mb-2 text-2xl font-bold text-navy-900">Account Not Approved</h1>
            <p className="mb-6 text-navy-600 leading-relaxed">
              Your account request was not approved. Please contact ComputerGeek Academy if you
              believe this is an error.
            </p>
            <Button to="/contact" variant="outline" className="mb-3 w-full">
              Contact Us
            </Button>
          </>
        ) : (
          <>
            <Clock className="mx-auto mb-4 h-14 w-14 text-brand-500" />
            <h1 className="mb-2 text-2xl font-bold text-navy-900">Account Pending Approval</h1>
            <p className="mb-2 text-navy-600 leading-relaxed">
              Thank you for registering, <strong>{user?.name}</strong>.
            </p>
            <p className="mb-6 text-navy-600 leading-relaxed">
              Your account is waiting for manual approval from ComputerGeek Academy. You will be
              able to access courses once an administrator approves your account.
            </p>
            <p className="mb-6 text-sm text-navy-500">
              Course payments are handled offline — after approval, you can request enrollment and
              we will confirm once payment is received.
            </p>
          </>
        )}

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-brand-500"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>

        <div className="mt-6">
          <Link to="/" className="text-sm text-brand-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
