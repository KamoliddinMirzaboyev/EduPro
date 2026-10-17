import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, Users, BookOpen, Layers } from 'lucide-react';
import { CourseDetail, formatUZS } from '../api/client';
import { CourseCardSkeletonGrid } from '../components/Skeletons';

interface CatalogPageProps {
  courses: CourseDetail[];
  loading: boolean;
  onOpenCheckoutModal: (course: CourseDetail) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  courses,
  loading,
  onOpenCheckoutModal,
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const safeCourses: CourseDetail[] = Array.isArray(courses) ? courses : [];

  const categories = [
    { label: 'Barchasi', count: safeCourses.length },
    { label: 'IELTS', count: safeCourses.filter(c => (c.category || '').toLowerCase().includes('ielts') || (c.title || '').toLowerCase().includes('ielts')).length },
    { label: 'SAT', count: safeCourses.filter(c => (c.category || '').toLowerCase().includes('sat') || (c.title || '').toLowerCase().includes('sat')).length },
    { label: 'Dasturlash', count: safeCourses.filter(c => (c.category || '').toLowerCase().includes('it') || (c.category || '').toLowerCase().includes('backend') || (c.title || '').toLowerCase().includes('python')).length },
  ];

  const filteredCourses = safeCourses.filter(c => {
    const matchCategory = selectedCategory === 'Barchasi' || 
      (selectedCategory === 'IELTS' && ((c.category || '').toLowerCase().includes('ielts') || (c.title || '').toLowerCase().includes('ielts'))) ||
      (selectedCategory === 'SAT' && ((c.category || '').toLowerCase().includes('sat') || (c.title || '').toLowerCase().includes('sat'))) ||
      (selectedCategory === 'Dasturlash' && ((c.category || '').toLowerCase().includes('it') || (c.category || '').toLowerCase().includes('backend') || (c.title || '').toLowerCase().includes('python')));
    
    const matchSearch = !searchQuery || 
      (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (c.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title Strip */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col md:flex-row md:items-end justify-between gap-4 shadow-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
            EDUPRO Kurslar Katalogi
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Barcha Professional Ta'lim Kurslari
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mt-1 leading-relaxed">
            IELTS, SAT va Dasturlash bo'yicha eng kuchli amaliy kurslar. Video darslar, AI auto-grader va Stop-dars intizomi.
          </p>
        </div>

        <div className="text-left md:text-right">
          <div className="text-xl font-bold font-mono text-slate-900">
            {safeCourses.length} ta kurs
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            Faol o'quv dasturlari
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Kurs yoki yo'nalish nomi bo'yicha qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.label
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-sm font-mono ${
                selectedCategory === cat.label
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <CourseCardSkeletonGrid count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((c) => (
            <div 
              key={c.id} 
              className="rounded-lg bg-white border border-slate-200 overflow-hidden hover:border-slate-400 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div 
                onClick={() => navigate(`/course/${c.slug || c.id}`)}
                className="relative h-44 bg-slate-100 cursor-pointer overflow-hidden"
              >
                <img 
                  src={c.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop'} 
                  alt={c.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                  {c.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 
                    onClick={() => navigate(`/course/${c.slug || c.id}`)}
                    className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.total_students ? `${c.total_students} ta talaba` : '1,420+ talaba'}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.total_modules ?? (c.modules?.length || 4)} ta modul</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Narxi</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {formatUZS(c.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => onOpenCheckoutModal(c)}
                        className="px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        Tariflar
                      </button>
                      <button 
                        onClick={() => navigate(`/classroom/${c.id}`)}
                        className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Sinfxona</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
