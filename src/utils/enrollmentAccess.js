export const ENROLLMENT_ACCESS_YEARS = 1;

export function computeExpiryDate(fromDate = new Date()) {
  const expires = new Date(fromDate);
  expires.setFullYear(expires.getFullYear() + ENROLLMENT_ACCESS_YEARS);
  return expires.toISOString();
}

export function isEnrollmentActive(enrollment) {
  if (!enrollment) return false;
  if (!enrollment.expiresAt) return true;
  return new Date(enrollment.expiresAt) > new Date();
}

export function getDaysRemaining(expiresAt) {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatExpiryDate(expiresAt) {
  if (!expiresAt) return '';
  return new Date(expiresAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
