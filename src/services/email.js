import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { paymentDetails, contactInfo } from '../data/siteContent';

async function invokeEmailFunction(functionName, payload) {
  if (!isSupabaseConfigured || !supabase) {
    console.info(`[Email mock] ${functionName}`, payload);
    return { mock: true };
  }

  const { data, error } = await supabase.functions.invoke(functionName, {
    body: payload,
  });

  if (error) throw error;
  return data;
}

export async function notifyAdminStudentRegistered({ studentName, studentEmail }) {
  return invokeEmailFunction('notify-admin', {
    type: 'student_registered',
    studentName,
    studentEmail,
    adminEmail: contactInfo.adminEmail,
    siteName: 'ComputerGeek Academy',
  });
}

export async function notifyAdminEnrollmentRequest({
  studentName,
  studentEmail,
  courseTitle,
  coursePrice,
}) {
  return invokeEmailFunction('notify-admin', {
    type: 'enrollment_requested',
    studentName,
    studentEmail,
    courseTitle,
    coursePrice,
    adminEmail: contactInfo.adminEmail,
    siteName: 'ComputerGeek Academy',
  });
}

export async function sendStudentPaymentInstructions({
  studentName,
  studentEmail,
  courseTitle,
  coursePrice,
}) {
  return invokeEmailFunction('send-student-email', {
    type: 'payment_instructions',
    studentName,
    studentEmail,
    courseTitle,
    coursePrice,
    paymentDetails,
    contactEmail: contactInfo.email,
    contactPhone: contactInfo.phone,
    siteName: 'ComputerGeek Academy',
  });
}

export async function notifyStudentAccountApproved({ studentName, studentEmail }) {
  return invokeEmailFunction('send-student-email', {
    type: 'account_approved',
    studentName,
    studentEmail,
    siteName: 'ComputerGeek Academy',
    loginUrl: `${window.location.origin}/login`,
  });
}

export async function notifyStudentEnrolled({
  studentName,
  studentEmail,
  courseTitle,
  expiresAt,
}) {
  return invokeEmailFunction('send-student-email', {
    type: 'course_enrolled',
    studentName,
    studentEmail,
    courseTitle,
    expiresAt,
    siteName: 'ComputerGeek Academy',
    dashboardUrl: `${window.location.origin}/dashboard`,
  });
}
