import { useParams } from 'react-router-dom';
import { CheckCircle, FlaskConical, Target } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getLabById } from '../../data/courseCatalog';

export default function LabPage() {
  const { courseId, labId } = useParams();
  const { getCourseById, getProgress, completeLab } = useApp();
  const course = getCourseById(courseId);
  const lab = course ? getLabById(course, labId) : null;
  const completed = !!getProgress(courseId).labCompletions[labId];

  if (!course || !lab) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-navy-600">Lab not found.</p>
      </div>
    );
  }

  const handleComplete = () => {
    completeLab(courseId, labId);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-brand-500">Hands-On Lab</span>
            <h1 className="text-2xl font-bold text-navy-900">{lab.title}</h1>
          </div>
        </div>

        <p className="mb-8 text-navy-600 leading-relaxed">{lab.description}</p>

        {lab.objectives?.length > 0 && (
          <div className="mb-8 rounded-xl bg-navy-50 p-6">
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-navy-900">
              <Target className="h-5 w-5 text-brand-500" />
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              {lab.objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-2 text-navy-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 font-semibold text-navy-900">Lab Steps</h2>
          <ol className="space-y-4">
            {lab.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-navy-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl border border-dashed border-navy-200 bg-navy-50/50 p-6 text-center">
          <p className="mb-4 text-sm text-navy-500">
            Lab environment placeholder — connect to cloud sandbox or Jupyter backend later.
          </p>

          {completed ? (
            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-6 py-3 font-semibold text-green-700">
              <CheckCircle className="h-5 w-5" />
              Lab Completed
            </div>
          ) : (
            <Button onClick={handleComplete}>Mark Lab as Complete</Button>
          )}
        </div>
      </div>
    </div>
  );
}
