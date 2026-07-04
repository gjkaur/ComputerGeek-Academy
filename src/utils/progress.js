import { getAllLessons } from '../data/courseCatalog';

export function createEmptyProgress() {
  return {
    completedLessons: [],
    quizResults: {},
    assignmentSubmissions: {},
    labCompletions: {},
    certificateDownloaded: false,
    lastAccessedLessonId: null,
  };
}

export function calculateProgress(course, progress) {
  const lessons = getAllLessons(course);
  if (lessons.length === 0) return 0;

  const completed = progress.completedLessons.filter((id) =>
    lessons.some((l) => l.id === id),
  ).length;

  return Math.round((completed / lessons.length) * 100);
}

export function isLessonComplete(lesson, progress) {
  if (progress.completedLessons.includes(lesson.id)) return true;

  if (lesson.type === 'quiz' && lesson.quizId) {
    const result = progress.quizResults[lesson.quizId];
    return result?.passed === true;
  }
  if (lesson.type === 'assignment' && lesson.assignmentId) {
    return !!progress.assignmentSubmissions[lesson.assignmentId];
  }
  if (lesson.type === 'lab' && lesson.labId) {
    return !!progress.labCompletions[lesson.labId];
  }

  return false;
}

export function isCourseComplete(course, progress) {
  const lessons = getAllLessons(course);
  return lessons.length > 0 && lessons.every((l) => isLessonComplete(l, progress));
}

export function getNextLesson(course, progress) {
  const lessons = getAllLessons(course);
  return lessons.find((l) => !isLessonComplete(l, progress)) || lessons[0];
}

export function getLessonPath(courseId, lesson) {
  switch (lesson.type) {
    case 'quiz':
      return `/learn/${courseId}/quiz/${lesson.quizId}`;
    case 'assignment':
      return `/learn/${courseId}/assignment/${lesson.assignmentId}`;
    case 'lab':
      return `/learn/${courseId}/lab/${lesson.labId}`;
    default:
      return `/learn/${courseId}/lesson/${lesson.id}`;
  }
}

export function markLessonComplete(progress, lessonId) {
  if (progress.completedLessons.includes(lessonId)) return progress;
  return {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    lastAccessedLessonId: lessonId,
  };
}
