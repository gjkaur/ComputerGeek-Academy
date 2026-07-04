import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getLessonById, getAllLessons } from '../../data/courseCatalog';
import { getLessonPath } from '../../utils/progress';

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { getCourseById, getProgress, completeLesson } = useApp();
  const [marked, setMarked] = useState(false);

  const course = getCourseById(courseId);
  const lesson = course ? getLessonById(course, lessonId) : null;
  const progress = getProgress(courseId);
  const isComplete = progress.completedLessons.includes(lessonId);

  if (!course || !lesson) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-navy-600">Lesson not found.</p>
      </div>
    );
  }

  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    completeLesson(courseId, lessonId);
    setMarked(true);
  };

  const handleVideoEnded = () => {
    if (!isComplete && !marked) {
      completeLesson(courseId, lessonId);
      setMarked(true);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        {lesson.type === 'video' && lesson.videoUrl && (
          <div className="aspect-video bg-navy-900">
            <video
              ref={videoRef}
              src={lesson.videoUrl}
              controls
              className="h-full w-full"
              onEnded={handleVideoEnded}
            >
              Your browser does not support video playback.
            </video>
          </div>
        )}

        {lesson.type === 'reading' && (
          <div className="border-b border-navy-100 bg-navy-50 p-8">
            <div className="prose max-w-none text-navy-700">
              <p className="text-lg leading-relaxed">{lesson.content}</p>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-600">
              {lesson.type}
            </span>
            {lesson.duration && (
              <span className="text-sm text-navy-500">{lesson.duration}</span>
            )}
            {(isComplete || marked) && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                <CheckCircle className="h-4 w-4" />
                Completed
              </span>
            )}
          </div>

          <h1 className="mb-6 text-2xl font-bold text-navy-900">{lesson.title}</h1>

          {!isComplete && !marked && (
            <Button onClick={handleMarkComplete} className="mb-6">
              Mark as Complete
            </Button>
          )}

          {course.resources?.length > 0 && (
            <div className="mb-6 rounded-xl bg-navy-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-navy-800">Course Resources</h3>
              <ul className="space-y-2">
                {course.resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.fileUrl}
                      className="inline-flex items-center gap-2 text-sm text-brand-600 hover:underline"
                      onClick={(e) => e.preventDefault()}
                      title="Placeholder — backend file storage pending"
                    >
                      <Download className="h-4 w-4" />
                      {r.title} ({r.fileName})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-navy-100 pt-6">
            {prevLesson ? (
              <Link
                to={getLessonPath(courseId, prevLesson)}
                className="inline-flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-brand-500"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Button
                size="sm"
                onClick={() => navigate(getLessonPath(courseId, nextLesson))}
              >
                Next Lesson
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button to="/dashboard" size="sm" variant="secondary">
                Back to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
