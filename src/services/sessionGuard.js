import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SESSION_TOKEN_KEY = 'cga_device_session';

export function getOrCreateDeviceSessionToken() {
  let token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }
  return token;
}

export function clearDeviceSessionToken() {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
}

export async function getClientIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
}

export async function claimActiveSession(userId) {
  if (!isSupabaseConfigured || !supabase) return { success: true };

  const ip = await getClientIp();
  const sessionToken = getOrCreateDeviceSessionToken();

  const { error } = await supabase.from('user_sessions').upsert(
    {
      user_id: userId,
      ip_address: ip,
      session_token: sessionToken,
      user_agent: navigator.userAgent.slice(0, 512),
      last_seen: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    console.warn('Session claim failed:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true, ip, sessionToken };
}

export async function validateActiveSession(userId) {
  if (!isSupabaseConfigured || !supabase) return { valid: true };

  const ip = await getClientIp();
  const sessionToken = getOrCreateDeviceSessionToken();

  const { data, error } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return { valid: true };

  const ipMatch = data.ip_address === ip;
  const tokenMatch = data.session_token === sessionToken;

  if (!ipMatch || !tokenMatch) {
    return {
      valid: false,
      reason:
        'This account is already active on another device or network. Only one location is allowed at a time to prevent account sharing.',
    };
  }

  await supabase
    .from('user_sessions')
    .update({ last_seen: new Date().toISOString() })
    .eq('user_id', userId);

  return { valid: true };
}

export async function releaseActiveSession(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return;
  clearDeviceSessionToken();
  await supabase.from('user_sessions').delete().eq('user_id', userId);
}
