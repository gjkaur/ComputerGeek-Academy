const STORAGE_KEYS = {
  courses: 'cga_courses_v3',
  enrollments: 'cga_enrollments',
  progress: 'cga_progress',
  enrollmentRequests: 'cga_enrollment_requests',
};

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently fail for mock frontend
  }
}

export { STORAGE_KEYS };
