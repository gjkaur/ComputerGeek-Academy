import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Full-viewport lab chrome — no site navbar/footer so the IDE can own the screen.
 */
export default function LabWorkspaceLayout() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="lab-workspace fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#e8eef5]">
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-navy-200 bg-white px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg object-contain" />
            <span className="hidden font-display text-sm font-bold text-navy-900 sm:inline">
              ComputerGeek Academy
            </span>
          </Link>
          <span className="hidden h-5 w-px bg-navy-200 sm:block" />
          <span className="truncate text-xs font-bold uppercase tracking-wider text-brand-600">
            Code Lab
          </span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-navy-600 hover:bg-navy-50 hover:text-brand-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Exit lab
        </Link>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
