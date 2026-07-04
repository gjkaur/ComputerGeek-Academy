import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';
import { getQuizById } from '../../data/courseCatalog';

export default function QuizPage() {
  const { courseId, quizId } = useParams();
  const { getCourseById, getProgress, submitQuiz } = useApp();
  const course = getCourseById(courseId);
  const quiz = course ? getQuizById(course, quizId) : null;
  const existingResult = getProgress(courseId).quizResults[quizId];

  const [answers, setAnswers] = useState(() =>
    existingResult?.answers || {},
  );
  const [submitted, setSubmitted] = useState(!!existingResult);
  const [result, setResult] = useState(existingResult || null);

  if (!course || !quiz) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        <p className="text-navy-600">Quiz not found.</p>
      </div>
    );
  }

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= (quiz.passingScore || 70);
    const res = { score, passed, answers };
    setResult(res);
    setSubmitted(true);
    submitQuiz(courseId, quizId, score, passed, answers);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-2xl font-bold text-navy-900">{quiz.title}</h1>
        <p className="mb-8 text-navy-600">
          {quiz.questions.length} questions · Passing score: {quiz.passingScore || 70}%
        </p>

        {submitted && result && (
          <div
            className={`mb-8 rounded-xl p-6 ${
              result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {result.passed ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <XCircle className="h-8 w-8 text-red-500" />
              )}
              <div>
                <p className="text-lg font-bold text-navy-900">
                  {result.passed ? 'Quiz Passed!' : 'Quiz Not Passed'}
                </p>
                <p className="text-navy-600">Your score: {result.score}%</p>
              </div>
            </div>
            {!result.passed && (
              <Button onClick={handleRetry} variant="outline" size="sm" className="mt-4">
                <RotateCcw className="h-4 w-4" />
                Retry Quiz
              </Button>
            )}
          </div>
        )}

        <div className="space-y-8">
          {quiz.questions.map((q, qi) => (
            <fieldset key={q.id} className="border-b border-navy-100 pb-8 last:border-0">
              <legend className="mb-4 text-lg font-semibold text-navy-900">
                {qi + 1}. {q.question}
              </legend>
              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const selected = answers[q.id] === oi;
                  const showCorrect = submitted && oi === q.correctIndex;
                  const showWrong = submitted && selected && oi !== q.correctIndex;

                  return (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                        showCorrect
                          ? 'border-green-300 bg-green-50'
                          : showWrong
                            ? 'border-red-300 bg-red-50'
                            : selected
                              ? 'border-brand-500 bg-brand-50'
                              : 'border-navy-100 hover:border-brand-200'
                      } ${submitted ? 'cursor-default' : ''}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={selected}
                        onChange={() => handleSelect(q.id, oi)}
                        disabled={submitted}
                        className="text-brand-500"
                      />
                      <span className="text-navy-700">{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {!submitted && (
          <Button
            onClick={handleSubmit}
            className="mt-8"
            disabled={Object.keys(answers).length < quiz.questions.length}
          >
            Submit Quiz
          </Button>
        )}

        {submitted && result?.passed && (
          <div className="mt-8">
            <Button to="/dashboard" variant="secondary">
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
