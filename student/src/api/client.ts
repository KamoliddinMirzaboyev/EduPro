import axios from 'axios';

export const API_BASE = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('edupro_token') || 'demo-student';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// SWR Cache & Deduplication
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
  total_modules?: number;
  total_lessons?: number;
  total_students?: number;
  created_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  course_title: string;
  tariff_title?: string;
  progress_percent: number;
  is_active: boolean;
  enrolled_at: string;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  type: string;
  instructions: string;
  max_score: number;
  ai_grading_enabled: boolean;
}

export interface Submission {
  id: string;
  assignment_id: string;
  assignment_title: string;
  assignment_type: string;
  text_answer: string;
  status: string;
  ai_suggested_score?: number;
  ai_feedback_json?: any;
  final_score?: number;
  teacher_feedback?: string;
  submitted_at: string;
}

export const fetchCourses = async (category?: string, force: boolean = false): Promise<CourseDetail[]> => {
  return cachedRequest(
    `courses-catalog-${category || 'ALL'}`,
    async () => {
      try {
        const res = await apiClient.get('/courses/', { params: { category } });
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

export const fetchMyEnrollments = async (force: boolean = false): Promise<Enrollment[]> => {
  return cachedRequest(
    'my-enrollments',
    async () => {
      try {
        const res = await apiClient.get('/billing/my-enrollments');
        return res.data;
      } catch (err) {
        return [];
      }
    },
    20000,
    force
  );
};

export const processCheckout = async (courseId: string, tariffId?: string, paymentMethod: string = 'PAYME') => {
  const res = (await apiClient.post('/billing/checkout', {
    course_id: courseId,
    tariff_id: tariffId,
    payment_method: paymentMethod
  })).data;
  invalidateCache('my-enrollments');
  return res;
};

export const sendHeartbeat = async (lessonId: string, positionSeconds: number, durationSeconds: number) => {
  try {
    const res = await apiClient.post('/analytics/heartbeat', {
      lesson_id: lessonId,
      position_seconds: positionSeconds,
      duration_seconds: durationSeconds
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const fetchLessonAssignments = async (lessonId: string): Promise<Assignment[]> => {
  return cachedRequest(
    `assignments-${lessonId}`,
    async () => {
      try {
        const res = await apiClient.get(`/assignments/lesson/${lessonId}`);
        return res.data;
      } catch (err) {
        return [];
      }
    },
    30000
  );
};

export const submitAssignment = async (assignmentId: string, textAnswer: string) => {
  const res = (await apiClient.post('/assignments/submissions', {
    assignment_id: assignmentId,
    text_answer: textAnswer
  })).data;
  invalidateCache('my-submissions');
  return res;
};

export const fetchMySubmissions = async (force: boolean = false): Promise<Submission[]> => {
  return cachedRequest(
    'my-submissions',
    async () => {
      try {
        const res = await apiClient.get('/assignments/submissions');
        return res.data;
      } catch (err) {
        return [];
      }
    },
    15000,
    force
  );
};

export const formatUZS = (val: number) => {
  return new Intl.NumberFormat('uz-UZ').format(val) + " UZS";
};
