import { useEffect, useState } from 'react';
import { ShieldAlert, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppProvider';
import { validateActiveSession } from '../../services/sessionGuard';

const HEARTBEAT_MS = 60_000;

export default function SessionGuard({ children }) {
  const { user, isStudent, logout, isDemoUser } = useApp();
  const [blocked, setBlocked] = useState(null);

  useEffect(() => {
    if (!user?.id || !isStudent || isDemoUser) return;

    let cancelled = false;

    const check = async () => {
      const result = await validateActiveSession(user.id);
      if (!cancelled && !result.valid) {
        setBlocked(result.reason);
        await logout();
      }
    };

    check();
    const interval = setInterval(check, HEARTBEAT_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user?.id, isStudent, isDemoUser, logout]);

  if (blocked) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 h-14 w-14 text-red-500" />
          <h1 className="mb-2 text-xl font-bold text-navy-900">Session Ended</h1>
          <p className="mb-6 text-navy-700 leading-relaxed">{blocked}</p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3 text-sm font-semibold text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign In Again
          </a>
        </div>
      </div>
    );
  }

  return children;
}
