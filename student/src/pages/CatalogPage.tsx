import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, Users, BookOpen } from 'lucide-react';
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

  const categories = [
    { label: 'Barchasi', count: courses.length },
    { label: 'Backend', count: courses.filter(c => c.category.toLowerCase().includes('backend') || c.category.toLowerCase().includes('it')).length },
    { label: 'Frontend', count: courses.filter(c => c.category.toLowerCase().includes('frontend')).length },
    { label: 'AI', count: courses.filter(c => c.title.toLowerCase().includes('ai') || c.description.toLowerCase().includes('ai')).length },
    { label: 'IELTS', count: courses.filter(c => c.category.toLowerCase().includes('ielts')).length },
  ];

  const filteredCourses = courses.filter(c => {
    const matchCategory = selectedCategory === 'Barchasi' || 
      (selectedCategory === 'Backend' && (c.category.toLowerCase().includes('it') || c.category.toLowerCase().includes('backend'))) ||
      (selectedCategory === 'Frontend' && (c.category.toLowerCase().includes('frontend'))) ||
      (selectedCategory === 'AI' && (c.title.toLowerCase().includes('ai') || c.description.toLowerCase().includes('ai'))) ||
      (selectedCategory === 'IELTS' && c.category.toLowerCase().includes('ielts'));
    
    const matchSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto w-full space-y-8">
      {/* Hero Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mavjud Professional Kurslar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            EDUPRO platformasidagi barcha professional kurslar. Video darslar, AI auto-grader bahosi va to'liq amaliyot.
          </p>
        </div>

        <div className="text-left md:text-right">
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            84 189
          </div>
          <div className="text-xs text-slate-500 dark:text-zinc-500 font-mono mt-0.5">
            o'quvchi platformamizda ta'lim olmoqda
          </div>
        </div>
      </div>

      {/* Search Bar & Category Count Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
          <input 
            type="text"
            placeholder="Kurs yoki texnologiya nomi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-600 transition-colors shadow-xs"
          />
        </div>

        {/* Category Count Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shadow-xs ${
                selectedCategory === cat.label
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:border-slate-300'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.label
                  ? 'bg-white text-blue-700 font-bold'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div 
              key={c.id} 
              className="rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 overflow-hidden hover:border-blue-500 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div 
                onClick={() => navigate(`/course/${c.slug || c.id}`)}
                className="relative h-44 bg-slate-100 dark:bg-[#151824] cursor-pointer overflow-hidden"
              >
                <img 
                  src={c.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop'} 
                  alt={c.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                  {c.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 
                    onClick={() => navigate(`/course/${c.slug || c.id}`)}
                    className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> 12 562 o'quvchi
                    </span>
                    <span>{c.modules.length} ta modul</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/classroom/${c.id}`)}
                      className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Darsni boshlash
                    </button>
                    <button 
                      onClick={() => onOpenCheckoutModal(c)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white text-xs font-semibold transition-colors"
                    >
                      Tariflar
                    </button>
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
