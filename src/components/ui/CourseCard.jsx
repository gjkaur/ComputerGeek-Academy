import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useApp } from '../../context/AppProvider';

export default function CourseCard({ course, showFullDescription = false }) {
  const { isEnrolled, hasPendingRequest, isAuthenticated, isApproved } = useApp();
  const enrolled = isEnrolled(course.id);
  const pending = hasPendingRequest(course.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="relative h-40 overflow-hidden bg-navy-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {enrolled && (
          <span className="absolute left-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            Enrolled
          </span>
        )}
        {!enrolled && pending && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            Request Pending
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between">
          <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-600">
            {course.category}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <Icon name={course.icon} className="h-5 w-5" />
          </div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-navy-900 transition-colors group-hover:text-brand-600">
          {course.title}
        </h3>

        <div className="mb-3 flex flex-wrap gap-3 text-sm text-navy-500">
          <span className="flex items-center gap-1">
            <Icon name="Clock" className="h-4 w-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="BarChart" className="h-4 w-4" />
            {course.level}
          </span>
        </div>

        <p className="mb-6 flex-grow text-navy-600 leading-relaxed">
          {showFullDescription
            ? course.description
            : course.description.slice(0, 120) + (course.description.length > 120 ? '...' : '')}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-navy-100 pt-4">
          <span className="text-2xl font-bold text-navy-900">{course.price}</span>
          <div className="flex gap-2">
            <Link
              to={`/courses/${course.id}`}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-50"
            >
              Details
            </Link>
            {enrolled ? (
              <Link
                to={`/learn/${course.id}`}
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-600"
              >
                Continue
              </Link>
            ) : pending ? (
              <span className="rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                Pending
              </span>
            ) : (
              <Link
                to={
                  !isAuthenticated
                    ? '/login'
                    : !isApproved
                      ? '/pending-approval'
                      : `/courses/${course.id}/request`
                }
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-600"
              >
                Request
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
