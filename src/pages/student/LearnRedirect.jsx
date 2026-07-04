import { Navigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppProvider';
import { getNextLesson, getLessonPath } from '../../utils/progress';

export default function LearnRedirect() {
  const { courseId } = useParams();
  const { getCourseById, getProgress } = useApp();
  const course = getCourseById(courseId);

  if (!course) {
    return <Navigate to="/dashboard" replace />;
  }

  const progress = getProgress(courseId);
  const next = getNextLesson(course, progress);

  if (next) {
    return <Navigate to={getLessonPath(courseId, next)} replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
