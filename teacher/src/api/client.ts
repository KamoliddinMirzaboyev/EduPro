import axios from 'axios';

export const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8001/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('edupro_token') || 'demo-teacher';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const requestOtp = async (phoneNumber: string) => {
  const res = await apiClient.post('/users/request-otp', { phone_number: phoneNumber });
  return res.data;
};

export const verifyOtp = async (phoneNumber: string, otpCode: string, role: string = 'TEACHER', fullName?: string) => {
  const res = await apiClient.post('/users/verify-otp', {
    phone_number: phoneNumber,
    otp_code: otpCode,
    role,
    full_name: fullName
  });
  if (res.data?.token) {
    localStorage.setItem('edupro_token', res.data.token);
  }
  return res.data;
};

export const submitTeacherOnboarding = async (data: {
  full_name: string;
  specialization: string;
  experience_years: number;
  bio: string;
  public_handle: string;
  certificate_type: string;
  certificate_number: string;
  certificate_url?: string;
  payout_card_number: string;
  payout_card_holder: string;
}) => {
  const res = await apiClient.post('/users/teacher-onboarding', data);
  return res.data;
};

// ==========================================
// ADVANCED SWR CACHING & DEDUPLICATION
// ==========================================
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();
const inFlightRequests = new Map<string, Promise<any>>();
const DEFAULT_TTL_MS = 60 * 1000;

export async function cachedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL_MS,
  forceRefresh: boolean = false
): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(key);

  if (!forceRefresh && cached && (now - cached.timestamp < ttl)) {
    return cached.data;
  }

  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const reqPromise = (async () => {
    try {
      const data = await fetcher();
      cacheStore.set(key, { data, timestamp: Date.now() });
      return data;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, reqPromise);
  return reqPromise;
}

export function invalidateCache(keyPrefix?: string) {
  if (!keyPrefix) {
    cacheStore.clear();
  } else {
    for (const key of cacheStore.keys()) {
      if (key.startsWith(keyPrefix)) {
        cacheStore.delete(key);
      }
    }
  }
}

// ==========================================
// DATA CONTRACTS
// ==========================================
export interface Material {
  id: string;
  title: string;
  file_url: string;
  file_size: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  order: number;
  video_provider_id?: string;
  duration_seconds: number;
  is_free_preview: boolean;
  stop_lesson_required: boolean;
  minimum_watch_percent: number;
  materials: Material[];
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Tariff {
  id: string;
  title: string;
  price_uzs: number;
  features: string[];
  is_popular: boolean;
}

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  status: string;
  has_drip_lock: boolean;
  thumbnail_url?: string;
  teacher: {
    id: string;
    full_name: string;
    avatar?: string;
    is_verified: boolean;
    specialization?: string;
  };
  tariffs: Tariff[];
  modules: Module[];
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  assignment_title: string;
  assignment_type: string;
  student: {
    id: string;
    full_name: string;
    avatar?: string;
    email?: string;
  };
  text_answer: string;
  audio_or_file_url?: string;
  status: 'PENDING' | 'AI_GRADED' | 'TEACHER_REVIEWED';
  ai_suggested_score?: number;
  ai_feedback_json?: {
    overall_band?: number;
    word_count?: number;
    criteria?: {
      task_response?: { score: number; comment: string };
      coherence_cohesion?: { score: number; comment: string };
      lexical_resource?: { score: number; comment: string };
      grammatical_range_accuracy?: { score: number; comment: string };
    };
    summary_feedback?: string;
    highlighted_corrections?: Array<{
      original: string;
      correction: string;
      category: string;
      explanation: string;
    }>;
  };
  final_score?: number;
  teacher_feedback?: string;
  submitted_at: string;
  updated_at: string;
}

export interface CRMStudent {
  student_id: string;
  student_name: string;
  phone_number?: string;
  course_id: string;
  course_title: string;
  current_lesson_title: string;
  current_lesson_id?: string;
  progress_percent: number;
  watched_seconds: number;
  total_seconds: number;
  last_active: string;
  is_stuck: boolean;
  stuck_reason?: string;
}

// ==========================================
// CACHED API METHODS
// ==========================================
export const fetchCourses = async (force: boolean = false): Promise<CourseDetail[]> => {
  return cachedRequest(
    'teacher-courses',
    async () => {
      try {
        const res = await apiClient.get('/courses/');
        return res.data;
      } catch (err) {
        return [];
      }
    },
    30000,
    force
  );
};

export const fetchCourseDetail = async (idOrSlug: string, force: boolean = false): Promise<CourseDetail> => {
  return cachedRequest(
    `course-detail-${idOrSlug}`,
    async () => {
      const res = await apiClient.get(`/courses/${idOrSlug}`);
      return res.data;
    },
    30000,
    force
  );
};

export const addModule = async (courseId: string, title: string) => {
  const res = (await apiClient.post(`/courses/${courseId}/modules`, { title })).data;
  invalidateCache('course-detail');
  invalidateCache('teacher-courses');
  return res;
};

export const addLesson = async (moduleId: string, payload: {
  title: string;
  duration_seconds: number;
  is_free_preview: boolean;
  stop_lesson_required: boolean;
  minimum_watch_percent: number;
  video_provider_id?: string;
}) => {
  const res = (await apiClient.post(`/courses/modules/${moduleId}/lessons`, payload)).data;
  invalidateCache('course-detail');
  return res;
};

export const simulateBunnyUpload = async () => {
  return (await apiClient.post('/courses/upload-simulation')).data;
};

export const fetchSubmissions = async (status?: string, force: boolean = false): Promise<Submission[]> => {
  return cachedRequest(
    `submissions-${status || 'ALL'}`,
    async () => {
      try {
        const res = await apiClient.get('/assignments/submissions', { params: { status } });
        return res.data;
      } catch (err) {
        return [];
      }
    },
    15000,
    force
  );
};

export const reviewSubmission = async (submissionId: string, final_score: number, teacher_feedback: string) => {
  const res = (await apiClient.post(`/assignments/submissions/${submissionId}/review`, { final_score, teacher_feedback })).data;
  invalidateCache('submissions');
  return res;
};

export const fetchCRMStudents = async (force: boolean = false): Promise<CRMStudent[]> => {
  return cachedRequest(
    'crm-students',
    async () => {
      try {
        const res = await apiClient.get('/analytics/crm-students');
        return res.data;
      } catch (err) {
        return [];
      }
    },
    20000,
    force
  );
};

export const sendTelegramReminder = async (studentId: string, message?: string) => {
  return (await apiClient.post('/analytics/send-telegram-reminder', { student_id: studentId, message })).data;
};

export const createPayout = async (amount_uzs: number, card_number: string, card_holder?: string) => {
  const res = (await apiClient.post('/billing/payouts', { amount_uzs, card_number, card_holder })).data;
  invalidateCache('payouts');
  return res;
};

export const formatUZS = (val: number) => {
  return new Intl.NumberFormat('uz-UZ').format(val) + " UZS";
};
