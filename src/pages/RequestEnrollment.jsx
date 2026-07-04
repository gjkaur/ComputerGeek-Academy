import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CheckCircle, Mail, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppProvider';
import { contactInfo } from '../data/siteContent';

export default function RequestEnrollment() {
  const { courseId } = useParams();
  const {
    getCourseById,
    isAuthenticated,
    isApproved,
    isEnrolled,
    hasPendingRequest,
    requestEnrollment,
    authLoading,
    user,
  } = useApp();
  const course = getCourseById(courseId);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!course || !course.published) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Course not found</h1>
        <Button to="/courses" className="mt-4">Browse Courses</Button>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: `/courses/${courseId}/request` }} />;
  }

  if (!isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (isEnrolled(courseId)) {
    return <Navigate to={`/learn/${courseId}`} replace />;
  }

  const alreadyRequested = hasPendingRequest(courseId) || submitted;

  const handleRequest = async () => {
    setError('');
    setSubmitting(true);
    try {
      await requestEnrollment(courseId);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (alreadyRequested) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="rounded-2xl border border-green-200 bg-white p-8 text-center shadow-lg">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-2xl font-bold text-navy-900">Request Submitted</h1>
          <p className="mb-4 text-navy-600 leading-relaxed">
            Your enrollment request for <strong>{course.title}</strong> has been received.
          </p>
          <p className="mb-6 text-sm text-navy-500 leading-relaxed">
            Payment is handled offline. Once we receive your payment, an administrator will enroll
            you and you will get access to the course.
          </p>
          <div className="mb-6 rounded-xl bg-navy-50 p-4 text-left text-sm text-navy-700">
            <p className="mb-2 font-semibold">Next steps:</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>Complete payment offline ({course.price})</li>
              <li>Email us at {contactInfo.email} with your payment confirmation</li>
              <li>We will enroll you once payment is verified</li>
            </ol>
          </div>
          <Button to="/dashboard" variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold text-navy-900">Request Enrollment</h1>

        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          <img src={course.thumbnail} alt={course.title} className="h-48 w-full object-cover" />
          <div className="p-8">
            <span className="mb-2 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
              {course.category}
            </span>
            <h2 className="mb-2 text-2xl font-bold text-navy-900">{course.title}</h2>
            <p className="mb-4 text-navy-600">{course.description}</p>
            <p className="mb-6 text-3xl font-bold text-navy-900">{course.price}</p>

            <div className="mb-6 rounded-xl bg-navy-50 p-5">
              <h3 className="mb-2 font-semibold text-navy-900">Offline Payment Process</h3>
              <p className="mb-3 text-sm text-navy-600 leading-relaxed">
                ComputerGeek Academy does not accept payments through this website. After submitting
                your request, complete payment using the method we provide (bank transfer, invoice,
                etc.) and contact us to confirm.
              </p>
              <a
                href={`mailto:${contactInfo.email}?subject=Enrollment%20Request%20-%20${encodeURIComponent(course.title)}&body=Hello,%0A%0AI%20would%20like%20to%20enroll%20in%20${encodeURIComponent(course.title)}.%0A%0AName:%20${encodeURIComponent(user?.name || '')}%0AEmail:%20${encodeURIComponent(user?.email || '')}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:underline"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <Button onClick={handleRequest} className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Submit Enrollment Request'
              )}
            </Button>

            <p className="mt-4 text-center text-xs text-navy-400">
              An admin will enroll you after payment is confirmed.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to={`/courses/${courseId}`} className="text-sm text-brand-500 hover:underline">
            Back to course details
          </Link>
        </div>
      </div>
    </div>
  );
}
