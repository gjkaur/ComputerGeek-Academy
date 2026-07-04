import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/ui/CourseCard';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { categories } from '../data/siteContent';
import { useApp } from '../context/AppProvider';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const { getPublishedCourses, getCoursesByCategory } = useApp();

  const allCourses = getPublishedCourses();

  const filteredCourses = useMemo(
    () => getCoursesByCategory(activeCategory),
    [activeCategory, getCoursesByCategory],
  );

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Course Catalog"
          title="Online Courses"
          subtitle="Self-paced recorded courses with video lectures, quizzes, assignments, hands-on labs, and completion certificates."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-navy-50 text-navy-700 hover:bg-brand-50 hover:text-brand-600'
            }`}
          >
            All Courses
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-navy-50 text-navy-700 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              <Icon name={cat.icon} className="h-4 w-4" />
              {cat.name}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} showFullDescription />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-navy-100 bg-navy-50/50 py-16 text-center">
            <p className="text-lg text-navy-600">No courses found in this category.</p>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className="mt-4 font-semibold text-brand-500 hover:text-brand-600"
            >
              View all courses
            </button>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-navy-500">
          Showing {filteredCourses.length} of {allCourses.length} courses
        </p>
      </div>
    </div>
  );
}
