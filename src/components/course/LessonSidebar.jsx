import { Link, useParams } from 'react-router-dom';
import {
  Video,
  HelpCircle,
  FileText,
  FlaskConical,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppProvider';
import { isLessonComplete, getLessonPath } from '../../utils/progress';

const typeIcons = {
  video: Video,
  quiz: HelpCircle,
  assignment: FileText,
  lab: FlaskConical,
  reading: BookOpen,
};

export default function LessonSidebar({ course }) {
  const { courseId } = useParams();
  const { getProgress } = useApp();
  const progress = getProgress(courseId);
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(course.modules.map((m) => [m.id, true])),
  );

  const toggleModule = (moduleId) => {
    setExpanded((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  return (
    <aside className="w-full shrink-0 border-r border-navy-100 bg-white lg:w-80">
      <div className="border-b border-navy-100 p-4">
        <h2 className="font-bold text-navy-900 line-clamp-2">{course.title}</h2>
        <p className="mt-1 text-sm text-navy-500">{course.modules.length} modules</p>
      </div>

      <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto p-2">
        {course.modules.map((module) => (
          <div key={module.id} className="mb-2">
            <button
              type="button"
              onClick={() => toggleModule(module.id)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-navy-800 hover:bg-navy-50"
            >
              {expanded[module.id] ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
              {module.title}
            </button>

            {expanded[module.id] && (
              <ul className="ml-2 space-y-0.5 border-l border-navy-100 pl-2">
                {module.lessons.map((lesson) => {
                  const Icon = typeIcons[lesson.type] || BookOpen;
                  const complete = isLessonComplete(lesson, progress);
                  const path = getLessonPath(courseId, lesson);

                  return (
                    <li key={lesson.id}>
                      <Link
                        to={path}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-50"
                      >
                        {complete ? (
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                        ) : (
                          <Icon className="h-4 w-4 shrink-0 text-navy-400" />
                        )}
                        <span className={complete ? 'text-navy-500' : 'text-navy-700'}>
                          {lesson.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
