import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BarChart,
  Tag,
  User,
  Play,
  Video,
  HelpCircle,
  FlaskConical,
  FileText,
  Award,
} from 'lucide-react';
import Button from '../components/ui/Button';
import CourseCurriculum from '../components/course/CourseCurriculum';
import { useApp } from '../context/AppProvider';
import { getCourseStats } from '../data/courseCatalog';

export default function CourseDetail() {
  const { id } = useParams();
  const { getCourseById, isEnrolled, getCourseProgress, hasPendingRequest, isAuthenticated, isApproved, isEnrollmentExpired, getEnrollmentRecord, formatExpiryDate } = useApp();
  const course = getCourseById(id);

  if (!course || !course.published) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-navy-900">Course Not Found</h1>
        <p className="mb-8 text-navy-600">The course you are looking for does not exist or is not published.</p>
        <Button to="/courses">Back to Courses</Button>
      </div>
    );
  }

  const stats = getCourseStats(course);
  const enrolled = isEnrolled(id);
  const expired = isEnrollmentExpired(id);
  const expiredRecord = expired ? getEnrollmentRecord(id) : null;
  const progress = enrolled ? getCourseProgress(id) : 0;

  return (
    <div>
      <section className="gradient-brand py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-100 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="mb-6 h-48 w-full rounded-2xl object-cover shadow-lg sm:h-64"
              />
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
                {course.category}
              </span>
              <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{course.title}</h1>
              <p className="mb-4 flex items-center gap-2 text-brand-100">
                <User className="h-5 w-5" />
                {course.instructor}
              </p>
              <p className="text-lg leading-relaxed text-brand-100">{course.description}</p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-100">
                <span className="flex items-center gap-1"><Video className="h-4 w-4" />{stats.videoCount} videos</span>
                <span className="flex items-center gap-1"><HelpCircle className="h-4 w-4" />{stats.quizCount} quizzes</span>
                <span className="flex items-center gap-1"><FlaskConical className="h-4 w-4" />{stats.labCount} labs</span>
                <span className="flex items-center gap-1"><FileText className="h-4 w-4" />{stats.assignmentCount} assignments</span>
                {course.certificateEnabled && (
                  <span className="flex items-center gap-1"><Award className="h-4 w-4" />Certificate included</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <p className="mb-1 text-sm text-navy-500">Course Fee</p>
              <p className="mb-6 text-3xl font-bold text-navy-900">{course.price}</p>

              <div className="mb-6 space-y-3 border-t border-navy-100 pt-6">
                <div className="flex items-center gap-3 text-navy-700">
                  <Clock className="h-5 w-5 text-brand-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-navy-700">
                  <BarChart className="h-5 w-5 text-brand-500" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-3 text-navy-700">
                  <Tag className="h-5 w-5 text-brand-500" />
                  <span>{course.category}</span>
                </div>
              </div>

              {enrolled ? (
                <div className="space-y-3">
                  <div className="rounded-xl bg-green-50 p-4 text-center">
                    <p className="font-semibold text-green-700">Enrolled</p>
                    <p className="text-sm text-green-600">{progress}% complete</p>
                  </div>
                  <Button to={`/learn/${course.id}`} className="w-full">
                    <Play className="h-5 w-5" />
                    Continue Learning
                  </Button>
                  <Button to="/dashboard" variant="outline" className="w-full">
                    Go to Dashboard
                  </Button>
                </div>
              ) : expired ? (
                <div className="flex flex-col gap-3">
                  <div className="rounded-xl bg-amber-50 p-4 text-center">
                    <p className="font-semibold text-amber-800">Access Expired</p>
                    <p className="text-sm text-amber-700">
                      Your enrollment ended on {formatExpiryDate(expiredRecord?.expiresAt)}.
                    </p>
                  </div>
                  <Button to={`/courses/${course.id}/request`} className="w-full">
                    Request Re-enrollment
                  </Button>
                  <p className="text-center text-xs text-navy-500">
                    Contact admin to renew access after payment.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {!isAuthenticated ? (
                    <Button to="/login" state={{ from: `/courses/${course.id}/request` }} className="w-full">
                      Sign In to Request Enrollment
                    </Button>
                  ) : !isApproved ? (
                    <Button to="/pending-approval" variant="outline" className="w-full">
                      Account Pending Approval
                    </Button>
                  ) : hasPendingRequest(id) ? (
                    <Button to={`/courses/${course.id}/request`} variant="outline" className="w-full">
                      Enrollment Request Pending
                    </Button>
                  ) : (
                    <Button to={`/courses/${course.id}/request`} className="w-full">
                      Request Enrollment — {course.price}
                    </Button>
                  )}
                  <p className="text-center text-xs text-navy-500">
                    Payment handled offline. Admin enrolls you after payment is confirmed.
                  </p>
                  <Button
                    to={`/contact?course=${encodeURIComponent(course.title)}`}
                    variant="outline"
                    className="w-full"
                  >
                    Ask a Question
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold text-navy-900">About This Course</h2>
              <p className="mb-8 text-lg leading-relaxed text-navy-600">{course.longDescription}</p>

              <h3 className="mb-4 text-xl font-bold text-navy-900">What You Will Learn</h3>
              <ul className="mb-12 space-y-3">
                {course.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mb-6 text-2xl font-bold text-navy-900">Course Curriculum</h3>
              <CourseCurriculum course={course} />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-8">
                <h3 className="mb-4 text-lg font-bold text-navy-900">Course Includes</h3>
                <ul className="space-y-3 text-sm text-navy-700">
                  <li className="flex items-center gap-2"><Video className="h-4 w-4 text-brand-500" />{stats.videoCount} recorded video lectures</li>
                  <li className="flex items-center gap-2"><HelpCircle className="h-4 w-4 text-brand-500" />{stats.quizCount} quizzes</li>
                  <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-500" />{stats.assignmentCount} assignments</li>
                  <li className="flex items-center gap-2"><FlaskConical className="h-4 w-4 text-brand-500" />{stats.labCount} hands-on labs</li>
                  <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-500" />{course.resources?.length || 0} downloadable resources</li>
                  {course.certificateEnabled && (
                    <li className="flex items-center gap-2"><Award className="h-4 w-4 text-brand-500" />Completion certificate</li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-8">
                <h3 className="mb-2 text-lg font-bold text-navy-900">Instructor</h3>
                <p className="font-medium text-brand-600">{course.instructor}</p>
                <p className="mt-2 text-sm text-navy-600">
                  PhD in Computer Science with 11+ years of experience in academia, research, industry, and corporate training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
