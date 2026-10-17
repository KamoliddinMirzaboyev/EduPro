import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Clock,
  PlayCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchMyEnrollments, Enrollment } from '../api/client';

export const MyLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const data = await fetchMyEnrollments();
      setEnrollments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((enr) => {
    const matchesSearch = enr.course_title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'in_progress') return enr.progress_percent < 100;
    if (filter === 'completed') return enr.progress_percent >= 100;
    return true;
  });

  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.progress_percent >= 100).length;
  const avgProgress = totalCourses > 0
    ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progress_percent, 0) / totalCourses)
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/60 border border-blue-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Shaxsiy Talaba Kabineti
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Mening Ta'lim Jarayonim
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Siz obuna bo'lgan barcha kurslar, progress ko'rsatkichlari va topshiriqlar holatini shu yerdan kuzatishingiz mumkin.
          </p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 dark:bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Faol Kurslar
            </div>
            <div className="text-2xl font-bold text-white">
              {totalCourses} ta
            </div>
            <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Barcha yozilgan kurslar
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 dark:bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              Tugatilgan Kurslar
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              {completedCourses} ta
            </div>
            <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sertifikat olishga tayyor
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900/70 dark:bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
              O'rtacha O'zlashtirish
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {avgProgress}%
            </div>
            <div className="text-xs text-amber-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> O'quv faolligi darajasi
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kurs nomi bo'yicha qidiruv..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Hammasi ({totalCourses})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'in_progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Jarayonda ({enrollments.filter(e => e.progress_percent < 100).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'completed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Tugatilgan ({completedCourses})
          </button>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-1/3"></div>
              <div className="h-6 bg-slate-800 rounded w-4/5"></div>
              <div className="h-3 bg-slate-800 rounded w-full"></div>
              <div className="h-10 bg-slate-800 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-200 mb-1">
            {searchQuery ? "Hech qanday kurs topilmadi" : "Siz hali kurslarga yozilmagansiz"}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            {searchQuery
              ? "Qidiruv so'zini o'zgartirib qayta urinib ko'ring."
              : "EDUPRO katalogidagi IT, dasturlash va kasbiy kurslardan birini tanlang va o'rganishni boshlang!"}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all"
          >
            Katalogga o'tish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollments.map((enr) => {
            const isFinished = enr.progress_percent >= 100;
            return (
              <div
                key={enr.id}
                className="group bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {enr.tariff_title || 'Standart'}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      isFinished
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {isFinished ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Tugatildi
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" /> O'rganilmoqda
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-4">
                    {enr.course_title}
                  </h3>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">Progress</span>
                      <span className="text-slate-200 font-semibold">{enr.progress_percent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFinished
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-500'
                        }`}
                        style={{ width: `${Math.min(100, enr.progress_percent)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/classroom/${enr.course_id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-600/20"
                  >
                    <PlayCircle className="w-4 h-4" /> Darsni Davom Ettirish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
