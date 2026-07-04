import {
  Video,
  HelpCircle,
  FileText,
  FlaskConical,
  BookOpen,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { getCourseStats } from '../../data/courseCatalog';

const typeIcons = {
  video: Video,
  quiz: HelpCircle,
  assignment: FileText,
  lab: FlaskConical,
  reading: BookOpen,
};

const typeLabels = {
  video: 'Video',
  quiz: 'Quiz',
  assignment: 'Assignment',
  lab: 'Lab',
  reading: 'Reading',
};

export default function CourseCurriculum({ course }) {
  const stats = getCourseStats(course);
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(course.modules.map((m) => [m.id, true])),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 text-sm text-navy-600">
        <span>{stats.moduleCount} modules</span>
        <span>{stats.videoCount} videos</span>
        <span>{stats.quizCount} quizzes</span>
        <span>{stats.labCount} labs</span>
        <span>{stats.assignmentCount} assignments</span>
      </div>

      <div className="space-y-3">
        {course.modules.map((module) => (
          <div key={module.id} className="overflow-hidden rounded-xl border border-navy-100 bg-white">
            <button
              type="button"
              onClick={() =>
                setExpanded((prev) => ({ ...prev, [module.id]: !prev[module.id] }))
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-navy-900 hover:bg-navy-50"
            >
              <span>{module.title}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-normal text-navy-500">
                  {module.lessons.length} lessons
                </span>
                {expanded[module.id] ? (
                  <ChevronDown className="h-5 w-5 text-navy-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-navy-400" />
                )}
              </div>
            </button>

            {expanded[module.id] && (
              <ul className="border-t border-navy-100">
                {module.lessons.map((lesson) => {
                  const Icon = typeIcons[lesson.type] || BookOpen;
                  return (
                    <li
                      key={lesson.id}
                      className="flex items-center gap-3 border-b border-navy-50 px-5 py-3 last:border-0"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-brand-500" />
                      <span className="flex-1 text-navy-700">{lesson.title}</span>
                      <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-600">
                        {typeLabels[lesson.type]}
                      </span>
                      {lesson.duration && (
                        <span className="text-xs text-navy-400">{lesson.duration}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      {course.resources?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-3 font-bold text-navy-900">Downloadable Resources</h4>
          <ul className="space-y-2">
            {course.resources.map((r) => (
              <li key={r.id}>
                <span className="inline-flex items-center gap-2 text-sm text-brand-600">
                  <FileText className="h-4 w-4" />
                  {r.title} ({r.fileName})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {course.certificateEnabled && (
        <p className="mt-6 text-sm text-navy-600">
          Includes a completion certificate upon finishing all lessons, quizzes, assignments, and labs.
        </p>
      )}
    </div>
  );
}
