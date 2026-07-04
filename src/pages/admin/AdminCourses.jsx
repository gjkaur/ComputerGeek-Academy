import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getAllLessons } from '../../data/courseCatalog';

export default function AdminCourses() {
  const { courses, deleteCourse } = useApp();

  const handleDelete = (courseId, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteCourse(courseId);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-navy-900">All Courses</h2>
        <Button to="/admin/courses/new">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm"
          >
            <div className="relative h-36">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              <span
                className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  course.published ? 'bg-green-500 text-white' : 'bg-navy-800 text-white'
                }`}
              >
                {course.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="p-5">
              <h3 className="mb-1 font-bold text-navy-900">{course.title}</h3>
              <p className="mb-3 text-sm text-navy-500">
                {course.category} · {getAllLessons(course).length} lessons · {course.price}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/admin/courses/${course.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-100"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(course.id, course.title)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
