import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, FlaskConical, Target, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getLabById } from '../../data/courseCatalog';

export default function LabPage() {
  const { courseId, labId } = useParams();
  const { getCourseById, getProgress, submitLabSolution } = useApp();
  const course = getCourseById(courseId);
  const lab = course ? getLabById(course, labId) : null;
  const existing = getProgress(courseId).labCompletions[labId];
  const passed = existing?.passed === true;

  const [code, setCode] = useState(existing?.code || lab?.starterCode || '');
  const [result, setResult] = useState(
    existing
      ? { passed: existing.passed, score: existing.score, failures: existing.failures || [] }
      : null,
  );
  const [submitting, setSubmitting] = useState(false);

  if (!course || !lab) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-navy-600">Lab not found.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    setSubmitting(true);
    const graded = submitLabSolution(courseId, labId, code);
    setResult(graded);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-brand-500">Graded Lab</span>
            <h1 className="text-2xl font-bold text-navy-900">{lab.title}</h1>
          </div>
        </div>

        <p className="mb-6 text-navy-600 leading-relaxed">{lab.description}</p>

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
            {(lab.steps || []).map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-navy-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-navy-900">Your solution</h2>
            <span className="text-xs font-medium uppercase tracking-wide text-navy-500">
              {lab.language || 'python'}
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            spellCheck={false}
            className="w-full rounded-xl border-2 border-navy-800 bg-navy-900 p-4 font-mono text-sm leading-relaxed text-brand-100 focus:border-brand-500 focus:outline-none"
            aria-label="Lab solution code"
          />
          {(lab.requiredSubstrings?.length > 0 || lab.expectedOutputContains?.length > 0) && (
            <p className="mt-2 text-xs text-navy-500">
              Auto-grader checks for required code
              {lab.expectedOutputContains?.length
                ? ` and expected output (${lab.expectedOutputContains.join(', ')})`
                : ''}
              . Passing all labs is required for the certificate.
            </p>
          )}
        </div>

        {result && (
          <div
            className={`mb-6 rounded-xl border p-4 ${
              result.passed
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {result.passed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={result.passed ? 'text-green-800' : 'text-red-800'}>
                {result.passed ? `Passed (score ${result.score})` : `Not passed (score ${result.score})`}
              </span>
            </div>
            {!result.passed && result.failures?.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-700">
                {result.failures.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSubmit} disabled={submitting}>
            {passed ? 'Resubmit solution' : 'Submit solution for grading'}
          </Button>
          {passed && (
            <span className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              <CheckCircle className="h-4 w-4" /> Lab passed — counts toward certificate
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
