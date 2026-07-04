import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { computeExpiryDate } from '../utils/enrollmentAccess';

export async function loadUserEnrollmentsFromDb(userId) {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('course_enrollments')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const mapped = {};
  data.forEach((row) => {
    mapped[row.course_id] = {
      enrolledAt: row.enrolled_at,
      expiresAt: row.expires_at,
      courseId: row.course_id,
      enrolledBy: row.enrolled_by,
      paymentNote: row.payment_note,
    };
  });
  return mapped;
}

export async function saveEnrollmentToDb({ userId, courseId, paymentNote = '' }) {
  if (!isSupabaseConfigured || !supabase) return null;

  const enrolledAt = new Date().toISOString();
  const expiresAt = computeExpiryDate(new Date(enrolledAt));

  const { data, error } = await supabase
    .from('course_enrollments')
    .upsert(
      {
        user_id: userId,
        course_id: courseId,
        enrolled_at: enrolledAt,
        expires_at: expiresAt,
        enrolled_by: 'admin',
        payment_note: paymentNote,
      },
      { onConflict: 'user_id,course_id' },
    )
    .select()
    .single();

  if (error) throw error;
  return {
    enrolledAt: data.enrolled_at,
    expiresAt: data.expires_at,
    courseId: data.course_id,
    enrolledBy: data.enrolled_by,
    paymentNote: data.payment_note,
  };
}

export async function saveEnrollmentRequestToDb(request) {
  if (!isSupabaseConfigured || !supabase) return request;

  const { data, error } = await supabase
    .from('enrollment_requests')
    .insert({
      user_id: request.userId,
      course_id: request.courseId,
      course_title: request.courseTitle,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    userId: data.user_id,
    userEmail: request.userEmail,
    userName: request.userName,
    courseId: data.course_id,
    courseTitle: data.course_title,
    status: data.status,
    requestedAt: data.requested_at,
  };
}

export async function loadPendingEnrollmentRequests() {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('enrollment_requests')
    .select('*, profiles(full_name, email)')
    .eq('status', 'pending')
    .order('requested_at', { ascending: false });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    userId: row.user_id,
    userEmail: row.profiles?.email || '',
    userName: row.profiles?.full_name || '',
    courseId: row.course_id,
    courseTitle: row.course_title,
    status: row.status,
    requestedAt: row.requested_at,
  }));
}

export async function resolveEnrollmentRequest(requestId) {
  if (!isSupabaseConfigured || !supabase) return;

  await supabase
    .from('enrollment_requests')
    .update({ status: 'enrolled', resolved_at: new Date().toISOString() })
    .eq('id', requestId);
}
