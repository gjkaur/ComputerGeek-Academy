import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function assertSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    );
  }
  return supabase;
}

export async function fetchProfile(userId) {
  const client = assertSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, full_name, role, approval_status')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchAllStudents() {
  const client = assertSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, full_name, role, approval_status, created_at')
    .eq('role', 'student')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateStudentApproval(userId, approvalStatus) {
  const client = assertSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({ approval_status: approvalStatus })
    .eq('id', userId)
    .eq('role', 'student')
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function mapProfileToUser(profile) {
  const approvalStatus = profile.approval_status || 'approved';
  return {
    id: profile.id,
    email: profile.email,
    name: profile.full_name || profile.email,
    role: profile.role,
    approvalStatus,
    isApproved: profile.role === 'admin' || approvalStatus === 'approved',
  };
}

export async function signUpStudent({ email, password, fullName }) {
  const client = assertSupabase();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithPassword({ email, password }) {
  const client = assertSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = assertSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getMfaAssuranceLevel() {
  const client = assertSupabase();
  const { data, error } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) throw error;
  return data;
}

export async function listTotpFactors() {
  const client = assertSupabase();
  const { data, error } = await client.auth.mfa.listFactors();
  if (error) throw error;
  return data.totp.filter((f) => f.status === 'verified');
}

export async function enrollTotpFactor() {
  const client = assertSupabase();
  const { data, error } = await client.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'ComputerGeek Academy Admin',
  });
  if (error) throw error;
  return data;
}

export async function challengeTotpFactor(factorId) {
  const client = assertSupabase();
  const { data, error } = await client.auth.mfa.challenge({ factorId });
  if (error) throw error;
  return data;
}

export async function verifyTotpFactor({ factorId, challengeId, code }) {
  const client = assertSupabase();
  const { data, error } = await client.auth.mfa.verify({
    factorId,
    challengeId,
    code,
  });
  if (error) throw error;
  return data;
}

export async function signInAdmin({ email, password }) {
  const { user, session } = await signInWithPassword({ email, password });
  if (!user) throw new Error('Sign in failed.');

  const profile = await fetchProfile(user.id);
  if (profile.role !== 'admin') {
    await signOut();
    throw new Error('Access denied. This account is not authorized for admin access.');
  }

  const verifiedFactors = await listTotpFactors();

  if (verifiedFactors.length === 0) {
    return { step: 'enroll', user, session, profile };
  }

  const aal = await getMfaAssuranceLevel();
  if (aal.currentLevel === 'aal2') {
    return { step: 'complete', user, session, profile };
  }

  const factor = verifiedFactors[0];
  const challenge = await challengeTotpFactor(factor.id);
  return {
    step: 'verify',
    user,
    session,
    profile,
    factorId: factor.id,
    challengeId: challenge.id,
  };
}

export async function completeAdminMfaVerify({ factorId, challengeId, code }) {
  await verifyTotpFactor({ factorId, challengeId, code });
  const aal = await getMfaAssuranceLevel();
  if (aal.currentLevel !== 'aal2') {
    throw new Error('MFA verification failed. Please try again.');
  }
  return aal;
}

export async function completeAdminMfaEnroll({ factorId, challengeId, code }) {
  await verifyTotpFactor({ factorId, challengeId, code });
  const aal = await getMfaAssuranceLevel();
  return aal;
}

export async function checkAdminMfaVerified() {
  const client = assertSupabase();
  const { data: { session } } = await client.auth.getSession();
  if (!session) return false;

  const profile = await fetchProfile(session.user.id);
  if (profile.role !== 'admin') return false;

  const aal = await getMfaAssuranceLevel();
  return aal.currentLevel === 'aal2';
}
