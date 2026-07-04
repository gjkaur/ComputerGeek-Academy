/**
 * Placeholder Stripe payment integration.
 * Replace processPayment with real Stripe Checkout / Payment Intent API calls.
 */

export async function processPayment({ courseId, courseTitle, amount, email, cardNumber }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!email || !cardNumber) {
    throw new Error('Payment details are incomplete.');
  }

  // Mock validation — any 16-digit card number succeeds
  const digits = cardNumber.replace(/\s/g, '');
  if (digits.length < 15) {
    throw new Error('Invalid card number. Please check and try again.');
  }

  // In production: create Stripe PaymentIntent or redirect to Checkout Session
  // const response = await fetch('/api/create-checkout-session', { ... });

  return {
    success: true,
    transactionId: `txn_mock_${Date.now()}`,
    courseId,
    courseTitle,
    amount,
    message: 'Payment successful (mock). Backend Stripe integration pending.',
  };
}

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_placeholder_replace_with_real_key';
