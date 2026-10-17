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

export const DEFAULT_IELTS_COURSES: CourseDetail[] = [
  {
    id: "135d78f9-29be-4aaa-9947-d0224477b96e",
    title: "IELTS Academic 8.0+ Intensive",
    slug: "ielts-academic-8-intensive",
    description: "Band 8.0+ maqsad qilganlar uchun intensiv kurs. Reading, Writing, Speaking va Listening bo'yicha imtihon beruvchilar mezonlari asosidagi darslar.",
    category: "IELTS",
    price: 950000,
    status: "PUBLISHED",
    has_drip_lock: true,
    thumbnail_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    teacher: {
      id: "14feea55-e9dc-4ce6-9054-775601e87141",
      full_name: "Sardor Daminov",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      is_verified: true,
      specialization: "IELTS 8.5 Master Instructor & Examiner"
    },
    tariffs: [
      {
        id: "t1",
        title: "Mustaqil Ta'lim (Self-Study)",
        price_uzs: 650000,
        features: ["Barcha 18 ta dars 4K formatda", "Cheksiz AI Essay tekshiruvi", "PDF konspektlar"],
        is_popular: false
      },
      {
        id: "t2",
        title: "Kurator Bilan (Pro)",
        price_uzs: 950000,
        features: ["Hamma Self-Study imkoniyatlari", "Kurator bilan 1-ga-1 tahlil", "Haftalik Zoom Speaking Club"],
        is_popular: true
      },
      {
        id: "t3",
        title: "VIP Mentor Pass",
        price_uzs: 1800000,
        features: ["Sardor Daminov bilan 3 ta mock imtihon", "Kafolatlangan 7.5+ natija"],
        is_popular: false
      }
    ],
    modules: [
      {
        id: "mod-1",
        title: "1-Modul: Reading Strategies (Skimming & Scanning)",
        order: 1,
        lessons: [
          {
            id: "les-1-1",
            module_id: "mod-1",
            title: "1.1. True / False / Not Given formulasi & Kalit so'zlar",
            order: 1,
            video_provider_id: "bunny_ielts_01",
            duration_seconds: 1455,
            is_free_preview: true,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: [
              {
                id: "mat-1",
                title: "T/F/NG Rasmiy Qoidalar Matrix (PDF)",
                file_url: "#",
                file_size: "2.1 MB"
              }
            ]
          },
          {
            id: "les-1-2",
            module_id: "mod-1",
            title: "1.2. Headings Matching va Matn Strukturasi Tahlili",
            order: 2,
            video_provider_id: "bunny_ielts_02",
            duration_seconds: 1120,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: [
              {
                id: "mat-2",
                title: "Top 20 Paraphrasing Lug'ati (PDF)",
                file_url: "#",
                file_size: "1.4 MB"
              }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "2-Modul: Writing Task 2 Architecture (Band 8.0 Structures)",
        order: 2,
        lessons: [
          {
            id: "les-2-1",
            module_id: "mod-2",
            title: "2.1. Agree or Disagree Essay: Kirish va Reja Arxitekturasi",
            order: 1,
            video_provider_id: "bunny_ielts_03",
            duration_seconds: 1690,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: [
              {
                id: "mat-3",
                title: "Band 8+ Intro & Thesis Templates (PDF)",
                file_url: "#",
                file_size: "1.8 MB"
              }
            ]
          },
          {
            id: "les-2-2",
            module_id: "mod-2",
            title: "2.2. Problem & Solution Essays: Sabab va Oqibat Zanjiri",
            order: 2,
            video_provider_id: "bunny_ielts_04",
            duration_seconds: 1335,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: []
          }
        ]
      },
      {
        id: "mod-3",
        title: "3-Modul: Speaking Part 2 & 3 Fluency & Lexical Resource",
        order: 3,
        lessons: [
          {
            id: "les-3-1",
            module_id: "mod-3",
            title: "3.1. Part 2: Cue Card 2 daqiqalik monologni to'xtamasdan gapirish",
            order: 1,
            video_provider_id: "bunny_ielts_05",
            duration_seconds: 1190,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 80,
            materials: []
          },
          {
            id: "les-3-2",
            module_id: "mod-3",
            title: "3.2. Part 3: Abstrakt Savollarga Kengaytirilgan Javoblar",
            order: 2,
            video_provider_id: "bunny_ielts_06",
            duration_seconds: 1530,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: []
          }
        ]
      },
      {
        id: "mod-4",
        title: "4-Modul: Listening Section 3 & 4 Accent Mastery",
        order: 4,
        lessons: [
          {
            id: "les-4-1",
            module_id: "mod-4",
            title: "4.1. Multiple Choice & Xaritalar (Map Labeling) sirlari",
            order: 1,
            video_provider_id: "bunny_ielts_07",
            duration_seconds: 1265,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: []
          }
        ]
      }
    ],
    created_at: "2026-10-17T11:30:49.527Z"
  },
  {
    id: "course-ielts-writing-speaking",
    title: "IELTS Writing & Speaking Pro",
    slug: "ielts-writing-speaking-pro",
    description: "Faqat Writing Task 1, Task 2 va Speaking boyicha chuqurlashtirilgan amaliyot.",
    category: "IELTS",
    price: 850000,
    status: "PUBLISHED",
    has_drip_lock: false,
    thumbnail_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    teacher: {
      id: "14feea55-e9dc-4ce6-9054-775601e87141",
      full_name: "Sardor Daminov",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      is_verified: true,
      specialization: "IELTS 8.5 Master Instructor & Examiner"
    },
    tariffs: [],
    modules: [
      {
        id: "mod-w1",
        title: "1-Modul: Task 1 Line Graph, Bar Chart & Process",
        order: 1,
        lessons: [
          {
            id: "les-w1-1",
            module_id: "mod-w1",
            title: "1.1. Overview yozish qoidalari va trendlarni ifodalash",
            order: 1,
            video_provider_id: "bunny_ielts_w01",
            duration_seconds: 930,
            is_free_preview: true,
            stop_lesson_required: false,
            minimum_watch_percent: 80,
            materials: []
          }
        ]
      },
      {
        id: "mod-w2",
        title: "2-Modul: Grammatical Range & Complex Sentences",
        order: 2,
        lessons: [
          {
            id: "les-w2-1",
            module_id: "mod-w2",
            title: "2.1. Inversion, Conditionals va Participle Clauses",
            order: 1,
            video_provider_id: "bunny_ielts_w02",
            duration_seconds: 1245,
            is_free_preview: false,
            stop_lesson_required: true,
            minimum_watch_percent: 85,
            materials: []
          }
        ]
      }
    ],
    created_at: "2026-10-17T11:30:49.527Z"
  }
];

// ==========================================
// CACHED API METHODS
// ==========================================
export const fetchCourses = async (force: boolean = false): Promise<CourseDetail[]> => {
  return cachedRequest(
    'teacher-courses',
    async () => {
      try {
        const res = await apiClient.get('/courses/');
        const apiCourses: CourseDetail[] = res.data;
        if (Array.isArray(apiCourses) && apiCourses.length > 0) {
          // Find IELTS course if exists
          const ieltsFromApi = apiCourses.find(c => c.category === 'IELTS' || c.title.toLowerCase().includes('ielts'));
          if (ieltsFromApi && ieltsFromApi.modules && ieltsFromApi.modules.length > 0) {
            return [ieltsFromApi, DEFAULT_IELTS_COURSES[1]];
          }
        }
        return DEFAULT_IELTS_COURSES;
      } catch (err) {
        return DEFAULT_IELTS_COURSES;
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
      try {
        const res = await apiClient.get(`/courses/${idOrSlug}`);
        if (res.data && res.data.modules && res.data.modules.length > 0) {
          return res.data;
        }
      } catch (e) {}

      const found = DEFAULT_IELTS_COURSES.find(c => c.id === idOrSlug || c.slug === idOrSlug);
      return found || DEFAULT_IELTS_COURSES[0];
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

export const DEFAULT_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    assignment_id: "assign-1",
    assignment_title: "Task 2 Full Essay: Higher Education Funding",
    assignment_type: "WRITING_ESSAY",
    student: {
      id: "stud-1",
      full_name: "Jasur Abdullayev",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
      email: "jasur@student.uz"
    },
    text_answer: "In recent decades, whether tertiary education ought to be subsidized by the state has sparked profound debate among educational economists and citizens alike. While proponents argue that free university promotes equal opportunities, others contend that tuition fees incentivize students to value their academic commitments and ensure institutional self-sufficiency.\n\nAdvocates of complimentary higher education point out that intellectual capital is a country's most pivotal asset. When universities are accessible regardless of socioeconomic background, meritorious scholars from underprivileged families can obtain degrees, breaking generational poverty cycles.\n\nConversely, skeptics argue that complete state funding places an immense fiscal burden on taxpayers. If universities rely exclusively on government grants, institutions may face budgetary constraints.\n\nIn conclusion, although fiscal limitations must be accounted for, I firmly maintain that government investment in university education produces substantial societal returns.",
    audio_or_file_url: undefined,
    status: "AI_GRADED",
    ai_suggested_score: 7.0,
    ai_feedback_json: {
      overall_band: 7.0,
      word_count: 165,
      criteria: {
        task_response: { score: 7.0, comment: "Addresses all parts of the prompt with clear central position throughout." },
        coherence_cohesion: { score: 7.0, comment: "Logical sequencing of ideas with balanced paragraphing and transitional phrases." },
        lexical_resource: { score: 7.5, comment: "Good range of academic collocations ('tertiary education', 'socioeconomic background')." },
        grammatical_range_accuracy: { score: 7.0, comment: "Wide variety of complex clause structures with high accuracy." }
      },
      summary_feedback: "Strong submission (165 words). Band estimated at 7.0. Key strengths in argument progression.",
      highlighted_corrections: [
        {
          original: "In nowadays",
          correction: "Nowadays / In recent years",
          category: "Lexical Resource",
          explanation: "'In nowadays' is a common colloquial error. Use 'Nowadays' or 'In recent decades'."
        },
        {
          original: "people has many problems",
          correction: "people have numerous challenges",
          category: "Grammar & Vocabulary",
          explanation: "Subject-verb agreement: 'people' is plural, requiring 'have'."
        }
      ]
    },
    final_score: undefined,
    teacher_feedback: "",
    submitted_at: "2026-10-17T11:30:49.540Z",
    updated_at: "2026-10-17T11:30:49.541Z"
  },
  {
    id: "sub-2",
    assignment_id: "assign-1",
    assignment_title: "Task 2 Full Essay: Higher Education Funding",
    assignment_type: "WRITING_ESSAY",
    student: {
      id: "stud-2",
      full_name: "Madina Usmonova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      email: "madina@student.uz"
    },
    text_answer: "Education is very important thing for every teenager. Some people think government should give free education to all students. Other people think university must cost money.\n\nFirstly, if education is free, all poor people can study. This is good for country because more doctors and engineers will work.\n\nIn my opinion, government must make free only for top students with high IELTS scores.",
    audio_or_file_url: undefined,
    status: "PENDING",
    ai_suggested_score: 5.5,
    ai_feedback_json: {
      overall_band: 5.5,
      word_count: 68,
      criteria: {
        task_response: { score: 5.5, comment: "Minimal response, requires expansion up to 250 words." },
        coherence_cohesion: { score: 5.5, comment: "Basic connectives used, but ideas are underdeveloped." },
        lexical_resource: { score: 5.5, comment: "Repetitive vocabulary, needs academic synonyms." },
        grammatical_range_accuracy: { score: 5.5, comment: "Simple sentences predominate." }
      },
      summary_feedback: "Word count is too low for Task 2. Needs elaboration.",
      highlighted_corrections: []
    },
    final_score: undefined,
    teacher_feedback: "",
    submitted_at: "2026-10-17T11:30:49.542Z",
    updated_at: "2026-10-17T11:30:49.542Z"
  }
];

export const fetchSubmissions = async (status?: string, force: boolean = false): Promise<Submission[]> => {
  return cachedRequest(
    `submissions-${status || 'ALL'}`,
    async () => {
      try {
        const res = await apiClient.get('/assignments/submissions', { params: { status } });
        if (Array.isArray(res.data) && res.data.length > 0) {
          return res.data;
        }
        return DEFAULT_SUBMISSIONS;
      } catch (err) {
        return DEFAULT_SUBMISSIONS;
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

export const DEFAULT_CRM_STUDENTS: CRMStudent[] = [
  {
    student_id: "crm-1",
    student_name: "Jasur Abdullayev",
    phone_number: "+998 90 111 22 33",
    course_id: "135d78f9-29be-4aaa-9947-d0224477b96e",
    course_title: "IELTS Academic 8.0+ Intensive",
    current_lesson_title: "2.1. Agree or Disagree Essay: Kirish va Reja Arxitekturasi",
    progress_percent: 78.0,
    watched_seconds: 1320,
    total_seconds: 1690,
    last_active: "Bugun, 14:20",
    is_stuck: false
  },
  {
    student_id: "crm-2",
    student_name: "Madina Usmonova",
    phone_number: "+998 93 555 66 77",
    course_id: "135d78f9-29be-4aaa-9947-d0224477b96e",
    course_title: "IELTS Academic 8.0+ Intensive",
    current_lesson_title: "1.2. Headings Matching va Matn Strukturasi",
    progress_percent: 34.0,
    watched_seconds: 380,
    total_seconds: 1120,
    last_active: "3 kun oldin",
    is_stuck: true,
    stuck_reason: "34%da to'xtab qolgan (Stop-Dars talabi bajarilmagan)"
  },
  {
    student_id: "crm-3",
    student_name: "Bekzod Tursunov",
    phone_number: "+998 97 444 33 22",
    course_id: "135d78f9-29be-4aaa-9947-d0224477b96e",
    course_title: "IELTS Academic 8.0+ Intensive",
    current_lesson_title: "1.1. True / False / Not Given formulasi",
    progress_percent: 42.0,
    watched_seconds: 610,
    total_seconds: 1455,
    last_active: "4 kun oldin",
    is_stuck: true,
    stuck_reason: "Topshiriq yuborilmagan"
  },
  {
    student_id: "crm-4",
    student_name: "Aziza Karimova",
    phone_number: "+998 99 888 77 66",
    course_id: "135d78f9-29be-4aaa-9947-d0224477b96e",
    course_title: "IELTS Academic 8.0+ Intensive",
    current_lesson_title: "3.1. Part 2: Cue Card monolog",
    progress_percent: 88.0,
    watched_seconds: 1050,
    total_seconds: 1190,
    last_active: "Kecha, 21:05",
    is_stuck: false
  }
];

export const fetchCRMStudents = async (force: boolean = false): Promise<CRMStudent[]> => {
  return cachedRequest(
    'crm-students',
    async () => {
      try {
        const res = await apiClient.get('/analytics/crm-students');
        if (Array.isArray(res.data) && res.data.length > 0) {
          return res.data;
        }
        return DEFAULT_CRM_STUDENTS;
      } catch (err) {
        return DEFAULT_CRM_STUDENTS;
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
