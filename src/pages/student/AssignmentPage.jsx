import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, Upload } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getAssignmentById } from '../../data/courseCatalog';

export default function AssignmentPage() {
  const { courseId, assignmentId } = useParams();
  const { getCourseById, getProgress, submitAssignment } = useApp();
  const course = getCourseById(courseId);
  const assignment = course ? getAssignmentById(course, assignmentId) : null;
  const existing = getProgress(courseId).assignmentSubmissions[assignmentId];

  const [text, setText] = useState(existing?.text || '');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(!!existing);

  if (!course || !assignment) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-navy-600">Assignment not found.</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = fileName ? `${text}\n\n[Attached file: ${fileName}]` : text;
    submitAssignment(courseId, assignmentId, submission);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="mb-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase text-brand-600">
          Assignment
        </span>
        <h1 className="mb-4 text-2xl font-bold text-navy-900">{assignment.title}</h1>
        <p className="mb-6 text-navy-600">{assignment.description}</p>

        <div className="mb-8 rounded-xl bg-navy-50 p-6">
          <h2 className="mb-2 font-semibold text-navy-900">Instructions</h2>
          <p className="whitespace-pre-wrap text-navy-700 leading-relaxed">
            {assignment.instructions}
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-bold text-navy-900">Assignment Submitted</p>
                <p className="text-sm text-navy-600">
                  Submitted on {new Date(existing?.submittedAt || Date.now()).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-4 text-sm text-navy-700">
              {text}
              {fileName && <p className="mt-2 text-navy-500">File: {fileName}</p>}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="submission" className="mb-2 block text-sm font-medium text-navy-700">
                Your Submission <span className="text-red-500">*</span>
              </label>
              <textarea
                id="submission"
                required
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                placeholder="Write your assignment response here..."
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-navy-700">
                Attach File (optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-navy-300 px-4 py-3 text-sm text-navy-600 transition-colors hover:border-brand-400 hover:bg-brand-50">
                  <Upload className="h-4 w-4" />
                  Choose file
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
                {fileName && <span className="text-sm text-navy-500">{fileName}</span>}
              </div>
              <p className="mt-1 text-xs text-navy-400">
                Placeholder upload — backend file storage integration pending.
              </p>
            </div>

            <Button type="submit">Submit Assignment</Button>
          </form>
        )}
      </div>
    </div>
  );
}
