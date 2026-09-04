import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { CreditCard, Loader2, Lock, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppProvider';
import { processPayment } from '../services/payment';
import { DEMO_PAYMENT_CARD } from '../data/demoAccounts';

export default function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    getCourseById,
    isAuthenticated,
    isStudent,
    isApproved,
    isEnrolled,
    authLoading,
    user,
    enrollAfterPayment,
  } = useApp();

  const course = getCourseById(courseId);
  const [form, setForm] = useState({
    cardName: DEMO_PAYMENT_CARD.name,
    cardNumber: DEMO_PAYMENT_CARD.number,
    expiry: DEMO_PAYMENT_CARD.expiry,
    cvc: DEMO_PAYMENT_CARD.cvc,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const amountLabel = useMemo(() => {
    if (!course) return '';
    return course.price?.startsWith('CA') ? course.price : `CA${course.price}`;
  }, [course]);

  if (authLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!course || !course.published) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-navy-900">Course not found</h1>
        <Button to="/courses">Back to courses</Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: `/courses/${courseId}/checkout` }} replace />;
  }
  if (!isStudent) {
    return <Navigate to="/admin" replace />;
  }
  if (!isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }
  if (isEnrolled(courseId)) {
    return <Navigate to={`/learn/${courseId}`} replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const fillDemoCard = () => {
    setForm({
      cardName: DEMO_PAYMENT_CARD.name,
      cardNumber: DEMO_PAYMENT_CARD.number,
      expiry: DEMO_PAYMENT_CARD.expiry,
      cvc: DEMO_PAYMENT_CARD.cvc,
    });
    setError('');
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payment = await processPayment({
        courseId: course.id,
        courseTitle: course.title,
        amount: course.priceAmount,
        email: user.email,
        cardNumber: form.cardNumber,
      });
      await enrollAfterPayment({
        courseId: course.id,
        transactionId: payment.transactionId,
        amount: course.price,
      });
      setReceipt(payment);
      setTimeout(() => navigate(`/learn/${course.id}`), 1200);
    } catch (err) {
      setError(err.message || 'Payment failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 lg:grid-cols-5 sm:px-6 lg:px-8">
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">Secure checkout</h1>
                <p className="text-sm text-navy-500">Dummy Stripe gateway — test cards only</p>
              </div>
            </div>

            {receipt ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-600" />
                <p className="font-bold text-navy-900">Payment successful</p>
                <p className="mt-1 text-sm text-navy-600">Txn {receipt.transactionId}</p>
                <p className="mt-2 text-sm text-navy-500">Opening your course…</p>
              </div>
            ) : (
              <form onSubmit={handlePay} className="space-y-4">
                <button
                  type="button"
                  onClick={fillDemoCard}
                  className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
                >
                  Fill demo card {DEMO_PAYMENT_CARD.number}
                </button>

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Name on card</label>
                  <input
                    name="cardName"
                    required
                    value={form.cardName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Card number</label>
                  <input
                    name="cardNumber"
                    required
                    inputMode="numeric"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-navy-700">Expiry</label>
                    <input
                      name="expiry"
                      required
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-navy-700">CVC</label>
                    <input
                      name="cvc"
                      required
                      value={form.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      className="w-full rounded-xl border border-navy-200 px-4 py-2.5"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Pay {amountLabel} & enroll
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-navy-500">
                  No real charges. Any 15–16 digit card number succeeds in demo mode.
                </p>
              </form>
            )}
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
            <h2 className="mb-2 text-lg font-bold text-navy-900">Order summary</h2>
            <p className="font-medium text-navy-800">{course.title}</p>
            <p className="mt-1 text-sm text-navy-600">{course.duration} · {course.level}</p>
            <p className="mt-6 text-3xl font-bold text-brand-600">{amountLabel}</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-700">
              <li>1-year course access after payment</li>
              <li>Certificate after all labs pass</li>
              <li>Student: {user?.email}</li>
            </ul>
            <Link
              to={`/courses/${course.id}`}
              className="mt-6 inline-block text-sm font-medium text-brand-600 hover:underline"
            >
              Back to course details
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
