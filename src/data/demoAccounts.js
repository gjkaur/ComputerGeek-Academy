/**
 * Local demo accounts for full-stack QA (no Supabase / MFA required).
 * Use these on login pages and in Playwright.
 */
export const DEMO_INSTRUCTOR = {
  id: 'demo-instructor-001',
  email: 'instructor@demo.computergeekacademy.com',
  password: 'InstructorDemo123!',
  name: 'Demo Instructor',
  role: 'admin',
  approvalStatus: 'approved',
  isApproved: true,
  isDemo: true,
};

export const DEMO_STUDENT = {
  id: 'demo-student-001',
  email: 'student@demo.computergeekacademy.com',
  password: 'StudentDemo123!',
  name: 'Demo Student',
  role: 'student',
  approvalStatus: 'approved',
  isApproved: true,
  isDemo: true,
};

export const DEMO_PAYMENT_CARD = {
  number: '4242 4242 4242 4242',
  expiry: '12/30',
  cvc: '123',
  name: 'Demo Student',
};

export function matchDemoAccount(email, password) {
  const normalized = (email || '').trim().toLowerCase();
  for (const account of [DEMO_INSTRUCTOR, DEMO_STUDENT]) {
    if (account.email === normalized && account.password === password) {
      const { password: _pw, ...user } = account;
      return user;
    }
  }
  return null;
}

export const DEMO_SESSION_KEY = 'cga_demo_session';
