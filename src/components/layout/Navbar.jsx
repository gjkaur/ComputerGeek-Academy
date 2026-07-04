import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Shield, LogOut, User } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppProvider';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About Instructor' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, isStudent, user, logout } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <img src="/logo.png" alt="ComputerGeek Academy" className="h-12 w-auto sm:h-14" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-navy-700 hover:bg-navy-50 hover:text-brand-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isStudent && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-700 hover:bg-navy-50'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50'
                }`
              }
            >
              <Shield className="h-4 w-4" />
              Admin
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="ml-2 flex items-center gap-2">
              <span className="hidden text-sm text-navy-500 xl:inline">{user?.name}</span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <Button to="/login" variant="ghost" size="sm" className="ml-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}

          <Button to="/courses" size="sm" className="ml-1">
            Explore Courses
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-navy-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-700 hover:bg-navy-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isStudent && (
              <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 font-medium text-navy-700">
                Dashboard
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 font-medium text-navy-700">
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <button type="button" onClick={() => { logout(); setMobileOpen(false); }} className="rounded-lg px-4 py-3 text-left font-medium text-navy-700">
                Logout
              </button>
            ) : (
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 font-medium text-brand-600">
                Sign In
              </NavLink>
            )}
            <Button to="/courses" className="mt-2 w-full" onClick={() => setMobileOpen(false)}>
              Explore Courses
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
