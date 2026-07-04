import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, UserCheck, ClipboardList, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppProvider';

export default function AdminStudents() {
  const {
    courses,
    pendingEnrollmentRequests,
    approveStudentAccount,
    rejectStudentAccount,
    adminEnrollStudent,
    fetchStudents,
    refreshEnrollmentRequests,
    getUserEnrollments,
  } = useApp();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [manualForm, setManualForm] = useState({ userId: '', courseId: '', note: '' });
  const [message, setMessage] = useState('');

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
    refreshEnrollmentRequests();
  }, []);

  const approvedStudents = students.filter((s) => s.approval_status === 'approved');
  const pendingAccounts = students.filter((s) => s.approval_status === 'pending');

  const handleApprove = async (student) => {
    setActionId(student.id);
    try {
      await approveStudentAccount(student.id, {
        full_name: student.full_name,
        email: student.email,
      });
      await loadStudents();
      setMessage('Student account approved. Confirmation email sent.');
    } catch (err) {
      setMessage(err.message || 'Approval failed.');
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm('Reject this student account?')) return;
    setActionId(userId);
    try {
      await rejectStudentAccount(userId);
      await loadStudents();
      setMessage('Student account rejected.');
    } catch (err) {
      setMessage(err.message || 'Rejection failed.');
    } finally {
      setActionId(null);
    }
  };

  const handleEnrollFromRequest = async (request) => {
    setActionId(request.id);
    try {
      await adminEnrollStudent(
        request.userId,
        request.courseId,
        'Payment confirmed offline',
        { userName: request.userName, userEmail: request.userEmail },
      );
      await refreshEnrollmentRequests();
      setMessage(`Enrolled ${request.userName} in ${request.courseTitle}. Access valid for 1 year.`);
    } catch (err) {
      setMessage(err.message || 'Enrollment failed.');
    } finally {
      setActionId(null);
    }
  };

  const handleManualEnroll = async (e) => {
    e.preventDefault();
    if (!manualForm.userId || !manualForm.courseId) return;
    const student = approvedStudents.find((s) => s.id === manualForm.userId);
    const course = courses.find((c) => c.id === manualForm.courseId);
    try {
      await adminEnrollStudent(manualForm.userId, manualForm.courseId, manualForm.note, {
        userName: student?.full_name,
        userEmail: student?.email,
      });
      setMessage(`Enrolled ${student?.full_name || 'student'} in ${course?.title || 'course'}. Access valid for 1 year.`);
      setManualForm({ userId: '', courseId: '', note: '' });
    } catch (err) {
      setMessage(err.message || 'Enrollment failed.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-900">Students & Enrollments</h2>
        <p className="text-navy-600">
          Approve new accounts and enroll students after offline payment is received.
        </p>
      </div>

      {message && (
        <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>
      )}

      <section className="mb-10">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900">
          <UserCheck className="h-5 w-5 text-brand-500" />
          Pending Account Approvals ({pendingAccounts.length})
        </h3>
        {pendingAccounts.length === 0 ? (
          <p className="rounded-xl border border-navy-100 bg-white p-6 text-navy-500">
            No pending account requests.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-navy-100 bg-navy-50/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-navy-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-navy-700">Registered</th>
                  <th className="px-4 py-3 font-semibold text-navy-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAccounts.map((student) => (
                  <tr key={student.id} className="border-b border-navy-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-navy-900">{student.full_name}</td>
                    <td className="px-4 py-3 text-navy-600">{student.email}</td>
                    <td className="px-4 py-3 text-navy-500">
                      {new Date(student.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={actionId === student.id}
                          onClick={() => handleApprove(student)}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={actionId === student.id}
                          onClick={() => handleReject(student.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900">
          <ClipboardList className="h-5 w-5 text-brand-500" />
          Enrollment Requests ({pendingEnrollmentRequests.length})
        </h3>
        <p className="mb-4 text-sm text-navy-500">
          Confirm enrollment after offline payment is received.
        </p>
        {pendingEnrollmentRequests.length === 0 ? (
          <p className="rounded-xl border border-navy-100 bg-white p-6 text-navy-500">
            No pending enrollment requests.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingEnrollmentRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-navy-100 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-navy-900">{req.userName}</p>
                  <p className="text-sm text-navy-600">{req.userEmail}</p>
                  <p className="mt-1 text-sm">
                    Course: <strong>{req.courseTitle}</strong>
                  </p>
                  <p className="text-xs text-navy-400">
                    Requested {new Date(req.requestedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={actionId === req.id}
                  onClick={() => handleEnrollFromRequest(req)}
                  className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Confirm Enrollment (Paid)
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h3 className="mb-4 text-lg font-bold text-navy-900">Manual Enrollment</h3>
        <form
          onSubmit={handleManualEnroll}
          className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
        >
          <p className="mb-4 text-sm text-navy-600">
            Enroll an approved student directly after receiving offline payment.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Student</label>
              <select
                required
                value={manualForm.userId}
                onChange={(e) => setManualForm((p) => ({ ...p, userId: e.target.value }))}
                className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
              >
                <option value="">Select student</option>
                {approvedStudents.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Course</label>
              <select
                required
                value={manualForm.courseId}
                onChange={(e) => setManualForm((p) => ({ ...p, courseId: e.target.value }))}
                className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
              >
                <option value="">Select course</option>
                {courses.filter((c) => c.published).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — {c.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-navy-700">
                Payment note (optional)
              </label>
              <input
                value={manualForm.note}
                onChange={(e) => setManualForm((p) => ({ ...p, note: e.target.value }))}
                placeholder="e.g. Bank transfer ref #12345"
                className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
              />
            </div>
          </div>
          <Button type="submit" className="mt-4">
            Enroll Student
          </Button>
        </form>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-bold text-navy-900">
          Approved Students ({approvedStudents.length})
        </h3>
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-navy-50/50">
              <tr>
                <th className="px-4 py-3 font-semibold text-navy-700">Name</th>
                <th className="px-4 py-3 font-semibold text-navy-700">Email</th>
                <th className="px-4 py-3 font-semibold text-navy-700">Enrolled Courses</th>
              </tr>
            </thead>
            <tbody>
              {approvedStudents.map((student) => {
                const studentEnrollments = getUserEnrollments(student.id);
                const count = Object.keys(studentEnrollments).length;
                return (
                  <tr key={student.id} className="border-b border-navy-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-navy-900">{student.full_name}</td>
                    <td className="px-4 py-3 text-navy-600">{student.email}</td>
                    <td className="px-4 py-3 text-navy-500">{count} course(s)</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
