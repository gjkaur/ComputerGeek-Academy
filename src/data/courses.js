export {
  categories,
  whyChooseUs,
  testimonials,
  contactInfo,
  INSTRUCTOR_NAME,
} from './siteContent';

export {
  initialCourseCatalog,
  getAllLessons,
  getLessonById,
  getQuizById,
  getAssignmentById,
  getLabById,
  getCourseStats,
  createEmptyCourse,
  formatPrice,
} from './courseCatalog';

// Legacy helpers — prefer useApp() hook in components
import { initialCourseCatalog } from './courseCatalog';

export const courses = initialCourseCatalog;

export function getCourseById(id) {
  return initialCourseCatalog.find((course) => course.id === id);
}

export function getFeaturedCourses() {
  return initialCourseCatalog.filter((course) => course.featured && course.published);
}

export function getCoursesByCategory(categoryId) {
  const published = initialCourseCatalog.filter((c) => c.published);
  if (!categoryId || categoryId === 'all') return published;
  return published.filter((course) => course.categoryId === categoryId);
}
