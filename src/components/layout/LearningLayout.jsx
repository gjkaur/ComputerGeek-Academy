import { Outlet, Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Loader2, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../context/AppProvider';
import LessonSidebar from '../course/LessonSidebar';
import ProgressBar from '../course/ProgressBar';
import SessionGuard from '../security/SessionGuard';
import { formatExpiryDate } from '../../utils/enrollmentAccess';

export default function LearningLayout() {
  const { courseId } = useParams();
  const {
    getCourseById,
    isEnrolled,
    isEnrollmentExpired,
    getEnrollmentRecord,
    getCourseProgress,
    isAuthenticated,
    isApproved,
    authLoading,
  } = useApp();
  const course = getCourseById(courseId);

  if (authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: `/learn/${courseId}` }} />;
  }

  if (!isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Course not found</h1>
        <Link to="/dashboard" className="mt-4 inline-block text-brand-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (isEnrollmentExpired(courseId)) {
    const record = getEnrollmentRecord(courseId);
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <Clock className="mx-auto mb-4 h-14 w-14 text-amber-600" />
          <h1 className="mb-2 text-2xl font-bold text-navy-900">Access Expired</h1>
          <p className="mb-4 text-navy-700 leading-relaxed">
            Your 1-year access to <strong>{course.title}</strong> ended on{' '}
            {formatExpiryDate(record?.expiresAt)}.
          </p>
          <p className="mb-6 text-sm text-navy-600">
            Contact ComputerGeek Academy to renew your enrollment.
          </p>
          <Button to="/contact" variant="outline" className="mb-3 w-full">
            Contact to Renew
          </Button>
          <Button to="/dashboard" className="w-full">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!isEnrolled(courseId)) {
    return <Navigate to={`/courses/${courseId}`} replace />;
  }

  const progress = getCourseProgress(courseId);
  const record = getEnrollmentRecord(courseId);

  return (
    <SessionGuard>
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        <LessonSidebar course={course} />

        <div className="flex flex-1 flex-col">
          <div className="border-b border-navy-100 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-brand-500"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              {record?.expiresAt && (
                <span className="text-xs text-navy-500">
                  Access until {formatExpiryDate(record.expiresAt)} · One device at a time
                </span>
              )}
              <Link
                to={`/courses/${courseId}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 hover:text-brand-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Course Overview
              </Link>
            </div>
            <div className="mt-3 max-w-md">
              <ProgressBar value={progress} />
            </div>
          </div>

          <div className="flex-1 bg-navy-50/30 p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SessionGuard>
  );
}
