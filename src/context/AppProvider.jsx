import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import { initialCourseCatalog, formatPrice } from '../data/courseCatalog';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../services/storage';
import {
  createEmptyProgress,
  calculateProgress,
  isCourseComplete,
  markLessonComplete,
} from '../utils/progress';
import { computeExpiryDate, isEnrollmentActive, formatExpiryDate } from '../utils/enrollmentAccess';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  claimActiveSession,
  releaseActiveSession,
} from '../services/sessionGuard';
import {
  notifyAdminStudentRegistered,
  notifyAdminEnrollmentRequest,
  sendStudentPaymentInstructions,
  notifyStudentAccountApproved,
  notifyStudentEnrolled,
} from '../services/email';
import {
  loadUserEnrollmentsFromDb,
  saveEnrollmentToDb,
  saveEnrollmentRequestToDb,
  loadPendingEnrollmentRequests,
  resolveEnrollmentRequest,
} from '../services/enrollmentsDb';
import {
  fetchProfile,
  mapProfileToUser,
  fetchAllStudents,
  updateStudentApproval,
  signUpStudent,
  signInWithPassword,
  signOut as authSignOut,
  signInAdmin,
  completeAdminMfaVerify,
  completeAdminMfaEnroll,
  enrollTotpFactor,
  challengeTotpFactor,
  getMfaAssuranceLevel,
} from '../services/auth';

const AppContext = createContext(null);

function normalizeUserEnrollments(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const sample = Object.values(raw)[0];
  if (sample && typeof sample === 'object' && 'courseId' in sample && !Object.values(sample).some((v) => typeof v === 'object')) {
    return {};
  }
  return raw;
}

function normalizeUserProgress(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const sample = Object.values(raw)[0];
  if (sample && typeof sample === 'object' && 'completedLessons' in sample) {
    return {};
  }
  return raw;
}

export function AppProvider({ children }) {
  const [courses, setCourses] = useState(() =>
    loadFromStorage(STORAGE_KEYS.courses, initialCourseCatalog),
  );
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [adminMfaVerified, setAdminMfaVerified] = useState(false);
  const [enrollments, setEnrollments] = useState(() =>
    normalizeUserEnrollments(loadFromStorage(STORAGE_KEYS.enrollments, {})),
  );
  const [enrollmentRequests, setEnrollmentRequests] = useState(() =>
    loadFromStorage(STORAGE_KEYS.enrollmentRequests, []),
  );
  const [progressMap, setProgressMap] = useState(() =>
    normalizeUserProgress(loadFromStorage(STORAGE_KEYS.progress, {})),
  );

  const loadUserFromSession = useCallback(async (session) => {
    if (!session?.user) {
      setUser(null);
      setAdminMfaVerified(false);
      return;
    }

    try {
      const profile = await fetchProfile(session.user.id);
      setUser(mapProfileToUser(profile));

      if (profile.role === 'student' && profile.approval_status === 'approved') {
        await claimActiveSession(session.user.id);
        const dbEnrollments = await loadUserEnrollmentsFromDb(session.user.id);
        if (dbEnrollments) {
          setEnrollments((prev) => ({ ...prev, [session.user.id]: dbEnrollments }));
        }
      }

      if (profile.role === 'admin') {
        const aal = await getMfaAssuranceLevel();
        setAdminMfaVerified(aal.currentLevel === 'aal2');
      } else {
        setAdminMfaVerified(false);
      }
    } catch {
      setUser(null);
      setAdminMfaVerified(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUserFromSession(session).finally(() => setAuthLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUserFromSession(session);
    });

    return () => subscription.unsubscribe();
  }, [loadUserFromSession]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.courses, courses);
  }, [courses]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.enrollments, enrollments);
  }, [enrollments]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.enrollmentRequests, enrollmentRequests);
  }, [enrollmentRequests]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.progress, progressMap);
  }, [progressMap]);

  const logout = useCallback(async () => {
    const userId = user?.id;
    if (isSupabaseConfigured && userId) {
      await releaseActiveSession(userId);
    }
    if (isSupabaseConfigured) {
      await authSignOut();
    }
    setUser(null);
    setAdminMfaVerified(false);
  }, [user?.id]);

  const studentSignUp = useCallback(async ({ email, password, fullName }) => {
    const { user: newUser, session } = await signUpStudent({ email, password, fullName });

    try {
      await notifyAdminStudentRegistered({ studentName: fullName, studentEmail: email });
    } catch (err) {
      console.warn('Registration email failed:', err);
    }

    if (session && newUser) {
      await loadUserFromSession(session);
    }
    return { needsEmailConfirmation: !session };
  }, [loadUserFromSession]);

  const studentSignIn = useCallback(async ({ email, password }) => {
    const { session } = await signInWithPassword({ email, password });
    if (!session) throw new Error('Sign in failed.');
    await loadUserFromSession(session);

    const profile = await fetchProfile(session.user.id);
    if (profile.role === 'student' && profile.approval_status === 'approved') {
      const claim = await claimActiveSession(session.user.id);
      if (!claim.success) {
        throw new Error('Could not establish secure session.');
      }
    }
  }, [loadUserFromSession]);

  const adminSignIn = useCallback(async ({ email, password }) => {
    const result = await signInAdmin({ email, password });

    if (result.step === 'complete') {
      await loadUserFromSession(result.session);
      setAdminMfaVerified(true);
      return { step: 'complete' };
    }

    if (result.step === 'verify') {
      setUser(mapProfileToUser(result.profile));
      setAdminMfaVerified(false);
      return {
        step: 'verify',
        factorId: result.factorId,
        challengeId: result.challengeId,
      };
    }

    if (result.step === 'enroll') {
      setUser(mapProfileToUser(result.profile));
      setAdminMfaVerified(false);
      const enrollment = await enrollTotpFactor();
      const challenge = await challengeTotpFactor(enrollment.id);
      return {
        step: 'enroll',
        factorId: enrollment.id,
        challengeId: challenge.id,
        qrCode: enrollment.totp.qr_code,
        secret: enrollment.totp.secret,
      };
    }

    return result;
  }, [loadUserFromSession]);

  const adminVerifyMfa = useCallback(async ({ factorId, challengeId, code }) => {
    await completeAdminMfaVerify({ factorId, challengeId, code });
    setAdminMfaVerified(true);
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      await loadUserFromSession(session);
    }
  }, [loadUserFromSession]);

  const adminEnrollMfa = useCallback(async ({ factorId, challengeId, code }) => {
    await completeAdminMfaEnroll({ factorId, challengeId, code });
    setAdminMfaVerified(true);
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      await loadUserFromSession(session);
    }
  }, [loadUserFromSession]);

  const getCourseById = useCallback(
    (id) => courses.find((c) => c.id === id),
    [courses],
  );

  const getPublishedCourses = useCallback(
    () => courses.filter((c) => c.published),
    [courses],
  );

  const getFeaturedCourses = useCallback(
    () => courses.filter((c) => c.featured && c.published),
    [courses],
  );

  const getCoursesByCategory = useCallback(
    (categoryId) => {
      const published = courses.filter((c) => c.published);
      if (!categoryId || categoryId === 'all') return published;
      return published.filter((c) => c.categoryId === categoryId);
    },
    [courses],
  );

  const getUserEnrollments = useCallback(
    (userId) => (userId ? enrollments[userId] || {} : {}),
    [enrollments],
  );

  const getEnrollmentRecord = useCallback(
    (courseId, userId = user?.id) => {
      if (!userId) return null;
      return getUserEnrollments(userId)[courseId] || null;
    },
    [user, getUserEnrollments],
  );

  const isEnrolled = useCallback(
    (courseId) => {
      const record = getEnrollmentRecord(courseId);
      return isEnrollmentActive(record);
    },
    [getEnrollmentRecord],
  );

  const isEnrollmentExpired = useCallback(
    (courseId) => {
      const record = getEnrollmentRecord(courseId);
      return !!record && !isEnrollmentActive(record);
    },
    [getEnrollmentRecord],
  );

  const hasPendingRequest = useCallback(
    (courseId) => {
      if (!user?.id) return false;
      return enrollmentRequests.some(
        (r) => r.userId === user.id && r.courseId === courseId && r.status === 'pending',
      );
    },
    [user, enrollmentRequests],
  );

  const getProgress = useCallback(
    (courseId) => {
      if (!user?.id) return createEmptyProgress();
      return progressMap[user.id]?.[courseId] || createEmptyProgress();
    },
    [user, progressMap],
  );

  const getCourseProgress = useCallback(
    (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return 0;
      return calculateProgress(course, getProgress(courseId));
    },
    [courses, getProgress],
  );

  const adminEnrollStudent = useCallback(async (userId, courseId, note = '', meta = {}) => {
    const enrolledAt = new Date().toISOString();
    const expiresAt = computeExpiryDate(new Date(enrolledAt));
    const course = courses.find((c) => c.id === courseId);

    let record = {
      enrolledAt,
      expiresAt,
      courseId,
      enrolledBy: 'admin',
      paymentNote: note,
    };

    try {
      const dbRecord = await saveEnrollmentToDb({ userId, courseId, paymentNote: note });
      if (dbRecord) record = dbRecord;
    } catch (err) {
      console.warn('DB enrollment save failed, using local storage:', err);
    }

    setEnrollments((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [courseId]: record,
      },
    }));
    setProgressMap((prev) => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [courseId]: prev[userId]?.[courseId] || createEmptyProgress(),
      },
    }));

    const matchingRequest = enrollmentRequests.find(
      (r) => r.userId === userId && r.courseId === courseId && r.status === 'pending',
    );
    if (matchingRequest?.id) {
      try {
        await resolveEnrollmentRequest(matchingRequest.id);
      } catch {
        /* local fallback below */
      }
    }

    setEnrollmentRequests((prev) =>
      prev.map((r) =>
        r.userId === userId && r.courseId === courseId && r.status === 'pending'
          ? { ...r, status: 'enrolled', resolvedAt: new Date().toISOString() }
          : r,
      ),
    );

    try {
      await notifyStudentEnrolled({
        studentName: meta.userName || 'Student',
        studentEmail: meta.userEmail || '',
        courseTitle: course?.title || courseId,
        expiresAt,
      });
    } catch (err) {
      console.warn('Enrollment confirmation email failed:', err);
    }
  }, [courses, enrollmentRequests]);

  const requestEnrollment = useCallback(
    async (courseId) => {
      if (!user?.id) throw new Error('You must be signed in to request enrollment.');
      const course = courses.find((c) => c.id === courseId);
      if (!course) throw new Error('Course not found.');

      const existing = enrollmentRequests.find(
        (r) => r.userId === user.id && r.courseId === courseId && r.status === 'pending',
      );
      if (existing) return existing;

      let request = {
        id: `req-${Date.now()}`,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        courseId,
        courseTitle: course.title,
        status: 'pending',
        requestedAt: new Date().toISOString(),
      };

      try {
        const dbRequest = await saveEnrollmentRequestToDb(request);
        if (dbRequest) request = dbRequest;
      } catch (err) {
        console.warn('DB request save failed:', err);
      }

      setEnrollmentRequests((prev) => [...prev, request]);

      try {
        await Promise.all([
          notifyAdminEnrollmentRequest({
            studentName: user.name,
            studentEmail: user.email,
            courseTitle: course.title,
            coursePrice: course.price,
          }),
          sendStudentPaymentInstructions({
            studentName: user.name,
            studentEmail: user.email,
            courseTitle: course.title,
            coursePrice: course.price,
          }),
        ]);
      } catch (err) {
        console.warn('Enrollment request emails failed:', err);
      }

      return request;
    },
    [user, courses, enrollmentRequests],
  );

  const approveStudentAccount = useCallback(async (userId, meta = {}) => {
    if (isSupabaseConfigured) {
      await updateStudentApproval(userId, 'approved');
    }
    if (user?.id === userId) {
      setUser((prev) => (prev ? { ...prev, approvalStatus: 'approved', isApproved: true } : prev));
    }
    try {
      await notifyStudentAccountApproved({
        studentName: meta.full_name || meta.name || 'Student',
        studentEmail: meta.email || '',
      });
    } catch (err) {
      console.warn('Approval email failed:', err);
    }
  }, [user]);

  const rejectStudentAccount = useCallback(async (userId) => {
    if (isSupabaseConfigured) {
      await updateStudentApproval(userId, 'rejected');
    }
    if (user?.id === userId) {
      setUser((prev) => (prev ? { ...prev, approvalStatus: 'rejected', isApproved: false } : prev));
    }
  }, [user]);

  const fetchStudents = useCallback(async () => {
    if (!isSupabaseConfigured) return [];
    return fetchAllStudents();
  }, []);

  const refreshEnrollmentRequests = useCallback(async () => {
    try {
      const dbRequests = await loadPendingEnrollmentRequests();
      if (dbRequests) setEnrollmentRequests(dbRequests);
    } catch (err) {
      console.warn('Failed to load enrollment requests:', err);
    }
  }, []);

  const completeLesson = useCallback((courseId, lessonId) => {
    if (!user?.id) return;
    setProgressMap((prev) => ({
      ...prev,
      [user.id]: {
        ...(prev[user.id] || {}),
        [courseId]: markLessonComplete(
          prev[user.id]?.[courseId] || createEmptyProgress(),
          lessonId,
        ),
      },
    }));
  }, [user]);

  const submitQuiz = useCallback((courseId, quizId, score, passed, answers) => {
    if (!user?.id) return;
    setProgressMap((prev) => {
      const current = prev[user.id]?.[courseId] || createEmptyProgress();
      const lesson = courses
        .find((c) => c.id === courseId)
        ?.modules.flatMap((m) => m.lessons)
        .find((l) => l.type === 'quiz' && l.quizId === quizId);

      const updated = {
        ...current,
        quizResults: {
          ...current.quizResults,
          [quizId]: { score, passed, answers, submittedAt: new Date().toISOString() },
        },
      };

      if (passed && lesson) {
        return {
          ...prev,
          [user.id]: {
            ...(prev[user.id] || {}),
            [courseId]: markLessonComplete(updated, lesson.id),
          },
        };
      }
      return {
        ...prev,
        [user.id]: { ...(prev[user.id] || {}), [courseId]: updated },
      };
    });
  }, [courses, user]);

  const submitAssignment = useCallback((courseId, assignmentId, text) => {
    if (!user?.id) return;
    setProgressMap((prev) => {
      const current = prev[user.id]?.[courseId] || createEmptyProgress();
      const lesson = courses
        .find((c) => c.id === courseId)
        ?.modules.flatMap((m) => m.lessons)
        .find((l) => l.type === 'assignment' && l.assignmentId === assignmentId);

      const updated = {
        ...current,
        assignmentSubmissions: {
          ...current.assignmentSubmissions,
          [assignmentId]: { text, submittedAt: new Date().toISOString() },
        },
      };

      if (lesson) {
        return {
          ...prev,
          [user.id]: {
            ...(prev[user.id] || {}),
            [courseId]: markLessonComplete(updated, lesson.id),
          },
        };
      }
      return {
        ...prev,
        [user.id]: { ...(prev[user.id] || {}), [courseId]: updated },
      };
    });
  }, [courses, user]);

  const completeLab = useCallback((courseId, labId) => {
    if (!user?.id) return;
    setProgressMap((prev) => {
      const current = prev[user.id]?.[courseId] || createEmptyProgress();
      const lesson = courses
        .find((c) => c.id === courseId)
        ?.modules.flatMap((m) => m.lessons)
        .find((l) => l.type === 'lab' && l.labId === labId);

      const updated = {
        ...current,
        labCompletions: {
          ...current.labCompletions,
          [labId]: { completedAt: new Date().toISOString() },
        },
      };

      if (lesson) {
        return {
          ...prev,
          [user.id]: {
            ...(prev[user.id] || {}),
            [courseId]: markLessonComplete(updated, lesson.id),
          },
        };
      }
      return {
        ...prev,
        [user.id]: { ...(prev[user.id] || {}), [courseId]: updated },
      };
    });
  }, [courses, user]);

  const downloadCertificate = useCallback((courseId) => {
    if (!user?.id) return false;
    const course = courses.find((c) => c.id === courseId);
    const progress = progressMap[user.id]?.[courseId] || createEmptyProgress();
    if (!course || !isCourseComplete(course, progress)) return false;

    setProgressMap((prev) => ({
      ...prev,
      [user.id]: {
        ...(prev[user.id] || {}),
        [courseId]: { ...progress, certificateDownloaded: true },
      },
    }));
    return true;
  }, [courses, progressMap, user]);

  const addCourse = useCallback((course) => {
    setCourses((prev) => [...prev, course]);
  }, []);

  const updateCourse = useCallback((courseId, updates) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const merged = { ...c, ...updates };
        if (updates.priceAmount !== undefined) {
          merged.price = formatPrice(updates.priceAmount);
        }
        return merged;
      }),
    );
  }, []);

  const deleteCourse = useCallback((courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  }, []);

  const enrolledCourses = useMemo(() => {
    if (!user?.id) return [];
    const userCourses = getUserEnrollments(user.id);
    return Object.keys(userCourses)
      .map((id) => courses.find((c) => c.id === id))
      .filter(Boolean);
  }, [user, enrollments, courses, getUserEnrollments]);

  const pendingEnrollmentRequests = useMemo(
    () => enrollmentRequests.filter((r) => r.status === 'pending'),
    [enrollmentRequests],
  );

  const value = {
    courses,
    user,
    authLoading,
    adminMfaVerified,
    enrollments,
    progressMap,
    enrollmentRequests,
    pendingEnrollmentRequests,
    enrolledCourses,
    isSupabaseConfigured,
    studentSignUp,
    studentSignIn,
    adminSignIn,
    adminVerifyMfa,
    adminEnrollMfa,
    logout,
    getCourseById,
    getPublishedCourses,
    getFeaturedCourses,
    getCoursesByCategory,
    isEnrolled,
    isEnrollmentExpired,
    getEnrollmentRecord,
    formatExpiryDate,
    hasPendingRequest,
    getProgress,
    getCourseProgress,
    requestEnrollment,
    adminEnrollStudent,
    approveStudentAccount,
    rejectStudentAccount,
    fetchStudents,
    refreshEnrollmentRequests,
    getUserEnrollments,
    completeLesson,
    submitQuiz,
    submitAssignment,
    completeLab,
    downloadCertificate,
    addCourse,
    updateCourse,
    deleteCourse,
    isAuthenticated: !!user,
    isApproved: user?.isApproved ?? false,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
