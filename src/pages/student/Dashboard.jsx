import { Link, Navigate } from 'react-router-dom';
import { Play, Award, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import SessionGuard from '../../components/security/SessionGuard';
import ProgressBar from '../../components/course/ProgressBar';
import { useApp } from '../../context/AppProvider';
import { getNextLesson, isCourseComplete, getLessonPath } from '../../utils/progress';
import { formatExpiryDate, getDaysRemaining } from '../../utils/enrollmentAccess';

export default function StudentDashboard() {
  const {
    isAuthenticated,
    isStudent,
    isApproved,
    authLoading,
    enrolledCourses,
    getCourseProgress,
    getProgress,
    getEnrollmentRecord,
    downloadCertificate,
    user,
  } = useApp();

  if (authLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isStudent && !isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (!isStudent) {
    return <Navigate to="/admin" replace />;
  }

  const handleCertificate = (courseId, courseTitle) => {
    const ok = downloadCertificate(courseId);
    if (ok) {
      // Placeholder certificate download
      const content = `
COMPUTERGEEK ACADEMY
Certificate of Completion

This certifies that
${user?.name}

has successfully completed
${courseTitle}

Date: ${new Date().toLocaleDateString()}

Dr. Gurinderjeet Kaur
ComputerGeek Academy
      `.trim();

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseTitle.replace(/\s+/g, '-')}-certificate.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <SessionGuard>
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-navy-900">My Learning Dashboard</h1>
          <p className="mt-2 text-navy-600">Welcome back, {user?.name}</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-sm">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-navy-300" />
            <h2 className="mb-2 text-xl font-bold text-navy-900">No courses yet</h2>
            <p className="mb-6 text-navy-600">
              Browse our catalog and enroll in a course to start learning.
            </p>
            <Button to="/courses">Browse Courses</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => {
              const progressPct = getCourseProgress(course.id);
              const progress = getProgress(course.id);
              const enrollment = getEnrollmentRecord(course.id);
              const nextLesson = getNextLesson(course, progress);
              const complete = isCourseComplete(course, progress);
              const continuePath = nextLesson
                ? getLessonPath(course.id, nextLesson)
                : `/learn/${course.id}`;

              return (
                <article
                  key={course.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden bg-navy-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                    {complete && (
                      <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-2 text-xs font-semibold uppercase text-brand-500">
                      {course.category}
                    </span>
                    <h3 className="mb-3 text-lg font-bold text-navy-900">{course.title}</h3>
                    <ProgressBar value={progressPct} className="mb-4" />
                    {enrollment?.expiresAt && (
                      <p className="mb-4 text-xs text-navy-500">
                        Access until {formatExpiryDate(enrollment.expiresAt)}
                        {getDaysRemaining(enrollment.expiresAt) <= 30 &&
                          ` (${getDaysRemaining(enrollment.expiresAt)} days left)`}
                      </p>
                    )}

                    <div className="mt-auto flex flex-col gap-2">
                      <Button to={continuePath} size="sm" className="w-full">
                        <Play className="h-4 w-4" />
                        {complete ? 'Review Course' : 'Continue Learning'}
                      </Button>

                      {complete && course.certificateEnabled && (
                        <button
                          type="button"
                          onClick={() => handleCertificate(course.id, course.title)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-500 px-4 py-2 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-50"
                        >
                          <Award className="h-4 w-4" />
                          Download Certificate
                        </button>
                      )}

                      <Link
                        to={`/courses/${course.id}`}
                        className="text-center text-sm text-navy-500 hover:text-brand-500"
                      >
                        Course details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-navy-100 bg-brand-50/50 p-8">
          <h2 className="mb-2 text-xl font-bold text-navy-900">Explore More Courses</h2>
          <p className="mb-4 text-navy-600">Expand your skills with our full catalog.</p>
          <Button to="/courses" variant="outline">
            View Catalog
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </SessionGuard>
  );
}
