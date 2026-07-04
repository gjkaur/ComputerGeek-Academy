import { Link } from 'react-router-dom';
import { BookOpen, Users, Eye, EyeOff, Plus, UserCheck, ClipboardList } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getAllLessons } from '../../data/courseCatalog';

export default function AdminDashboard() {
  const { courses, enrollments, pendingEnrollmentRequests } = useApp();

  const published = courses.filter((c) => c.published).length;
  const draft = courses.length - published;
  const totalEnrollments = Object.values(enrollments).reduce(
    (sum, userCourses) => sum + Object.keys(userCourses || {}).length,
    0,
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Overview</h2>
          <p className="text-navy-600">Manage students, approvals, and course content</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button to="/admin/students" variant="outline">
            <Users className="h-4 w-4" />
            Manage Students
          </Button>
          <Button to="/admin/courses/new">
            <Plus className="h-4 w-4" />
            Add New Course
          </Button>
        </div>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'bg-brand-50 text-brand-500' },
          { label: 'Published', value: published, icon: Eye, color: 'bg-green-50 text-green-600' },
          { label: 'Drafts', value: draft, icon: EyeOff, color: 'bg-navy-50 text-navy-600' },
          { label: 'Total Enrollments', value: totalEnrollments, icon: Users, color: 'bg-purple-50 text-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
            <div className={`mb-3 inline-flex rounded-xl p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
            <p className="text-sm text-navy-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {pendingEnrollmentRequests.length > 0 && (
        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-amber-600" />
              <div>
                <p className="font-semibold text-navy-900">
                  {pendingEnrollmentRequests.length} pending enrollment request(s)
                </p>
                <p className="text-sm text-navy-600">
                  Confirm enrollments after offline payment is received.
                </p>
              </div>
            </div>
            <Button to="/admin/students" size="sm">
              Review Requests
            </Button>
          </div>
        </div>
      )}

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/students"
          className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-navy-900">Approve Student Accounts</p>
            <p className="text-sm text-navy-500">Review and approve new registrations</p>
          </div>
        </Link>
        <Link
          to="/admin/students"
          className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-navy-900">Enrollment Requests</p>
            <p className="text-sm text-navy-500">Enroll students after offline payment</p>
          </div>
        </Link>
      </div>

      <h3 className="mb-4 text-lg font-bold text-navy-900">Recent Courses</h3>
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-navy-700">Course</th>
              <th className="hidden px-4 py-3 font-semibold text-navy-700 sm:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold text-navy-700">Price</th>
              <th className="px-4 py-3 font-semibold text-navy-700">Status</th>
              <th className="px-4 py-3 font-semibold text-navy-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-navy-50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-navy-900">{course.title}</p>
                  <p className="text-xs text-navy-500">{getAllLessons(course).length} lessons</p>
                </td>
                <td className="hidden px-4 py-3 text-navy-600 sm:table-cell">{course.category}</td>
                <td className="px-4 py-3 font-medium text-navy-900">{course.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      course.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-navy-100 text-navy-600'
                    }`}
                  >
                    {course.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/admin/courses/${course.id}/edit`}
                    className="font-medium text-brand-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
