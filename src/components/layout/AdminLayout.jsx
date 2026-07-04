import { Outlet, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, Loader2, Users } from 'lucide-react';
import { useApp } from '../../context/AppProvider';

export default function AdminLayout() {
  const { isAdmin, isAuthenticated, adminMfaVerified, authLoading, logout, user } = useApp();

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: '/admin' }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!adminMfaVerified) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/students', label: 'Students', icon: Users },
    { to: '/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/admin/courses/new', label: 'Add Course', icon: Settings },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-navy-50/30">
      <div className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold text-navy-900">Admin Dashboard</h1>
            <p className="text-sm text-navy-500">{user?.name}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              end={item.end}
              className="inline-flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm transition-all hover:border-brand-300 hover:text-brand-600"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <Outlet />
      </div>
    </div>
  );
}
