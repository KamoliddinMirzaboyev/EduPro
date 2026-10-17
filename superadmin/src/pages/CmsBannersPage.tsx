import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Sparkles, 
  Tag, 
  Award, 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  Image, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface HeroBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  targetCourseSlug: string;
  isActive: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  coursesCount: number;
  iconName: string;
}

interface FeaturedCourse {
  id: string;
  title: string;
  teacherName: string;
  category: string;
  isHeroFeatured: boolean;
  isWeeklyTop: boolean;
}

interface CmsBannersPageProps {
  onShowToast: (msg: string) => void;
}

export const CmsBannersPage: React.FC<CmsBannersPageProps> = ({ onShowToast }) => {
  const [banners, setBanners] = useState<HeroBanner[]>([
    {
      id: 'ban-1',
      badge: 'YANGI MASTERCLASS 2026',
      title: 'Full-Stack Next.js 15 & Django Ninja bilan Katta Loyihalar Quring',
      subtitle: 'Clean Architecture, WebRTC, Async ORM va Escrow to‘lov tizimlarini noldan ishlab chiqing.',
      ctaText: 'Kursga Yozilish',
      targetCourseSlug: 'full-stack-nextjs-django',
      isActive: true
    },
    {
      id: 'ban-2',
      badge: 'TOP IELTS INTENSIVE',
      title: 'IELTS Band 8.0: Writing & Speaking Shaxsiy AI Tyutor Bilan',
      subtitle: 'Har bir insho va ovozli javobingizni 5 soniya ichida grammatik va leksik tahlil qiling.',
      ctaText: 'Hoziroq Boshlang',
      targetCourseSlug: 'ielts-band-8',
      isActive: false
    }
  ]);

  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 'cat-1', name: 'Backend & IT', slug: 'backend-it', coursesCount: 14, iconName: 'Code' },
    { id: 'cat-2', name: 'Frontend & UI', slug: 'frontend-ui', coursesCount: 9, iconName: 'Layout' },
    { id: 'cat-3', name: 'IELTS & Tillar', slug: 'ielts-languages', coursesCount: 18, iconName: 'Languages' },
    { id: 'cat-4', name: 'Sun’iy Intellekt (AI)', slug: 'ai-data', coursesCount: 8, iconName: 'Sparkles' },
    { id: 'cat-5', name: 'SAT & Matematika', slug: 'sat-math', coursesCount: 6, iconName: 'Calculator' }
  ]);

  const [featuredCourses, setFeaturedCourses] = useState<FeaturedCourse[]>([
    {
      id: 'c-1',
      title: 'IELTS Band 8.0: Intensive Writing & Speaking',
      teacherName: 'Sardor Daminov',
      category: 'IELTS & Tillar',
      isHeroFeatured: true,
      isWeeklyTop: true
    },
    {
      id: 'c-2',
      title: 'Full-Stack Next.js 15 & Django Ninja Masterclass',
      teacherName: 'Ulug‘bek Samig‘jonov',
      category: 'Backend & IT',
      isHeroFeatured: true,
      isWeeklyTop: false
    }
  ]);

  const [weeklyTeacher, setWeeklyTeacher] = useState({
    name: 'Sardor Daminov',
    title: 'Senior IELTS Instructor (Band 8.5)',
    studentsTrained: 1420,
    avatar: 'SD',
    bio: 'Oxirgi 30 kun ichida talabalari o‘rtacha 7.5+ ball natijaga erishgan eng faol ustoz.'
  });

  const [showCatModal, setShowCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  const handleToggleBanner = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
    onShowToast("Banner ko'rsatish holati o'zgartirildi!");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-'),
      coursesCount: 0,
      iconName: 'Tag'
    };

    setCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatSlug('');
    setShowCatModal(false);
    onShowToast(`"${newCat.name}" kategoriyasi muvaffaqiyatli qo'shildi!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-1">
            <LayoutTemplate className="w-3.5 h-3.5" /> Marketplace Vitrinasi
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Vitrina va Marketing Boshqaruvi (CMS & Banners)</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Student portalidagi promo bannerlar, "Hafta Ustozi", "Top Kurslar" va kategoriyalarni boshqarish
          </p>
        </div>

        <button
          onClick={() => setShowCatModal(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" /> Yangi Kategoriya
        </button>
      </div>

      {/* Hero Banners Section */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Asosiy Promo Bannerlar (Hero Carousel)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Student bosh sahifasi yuqori qismida chiqadi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((ban) => (
            <div
              key={ban.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                ban.isActive
                  ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-white/10 bg-slate-50/40 dark:bg-white/[0.01] opacity-70'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white font-bold tracking-wider">
                    {ban.badge}
                  </span>
                  <button
                    onClick={() => handleToggleBanner(ban.id)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      ban.isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    {ban.isActive ? '✓ Faol' : 'Nofaol'}
                  </button>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {ban.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-2">
                  {ban.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">Target: /{ban.targetCourseSlug}</span>
                <button
                  onClick={() => onShowToast(`"${ban.title.slice(0, 20)}..." banneri tahrirlanmoqda`)}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hafta Ustozi & Top Kurslar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hafta Ustozi (Teacher of the Week) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Hafta Ustozi (Featured Instructor)
              </h3>
            </div>
            <button
              onClick={() => onShowToast("Hafta ustozini almashtirish oynasi ochildi")}
              className="text-blue-600 dark:text-blue-400 font-semibold text-[11px] hover:underline"
            >
              Almashtirish
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-base flex items-center justify-center shrink-0">
              {weeklyTeacher.avatar}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {weeklyTeacher.name}
              </h4>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {weeklyTeacher.title}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {weeklyTeacher.studentsTrained} nafar o'quvchi tahsil olgan
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-300 italic p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 leading-relaxed">
            "{weeklyTeacher.bio}"
          </p>
        </div>

        {/* Featured Courses Selection */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Tavsiya Etilgan Kurslar (Top Kurslar)
              </h3>
            </div>
          </div>

          <div className="space-y-2.5">
            {featuredCourses.map((fc) => (
              <div
                key={fc.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{fc.title}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{fc.teacherName} • {fc.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                    Bosh sahifada
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories & Tags Management */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Kategoriyalar va Yo'nalishlar ({categories.length} ta)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F111A] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">slug: {cat.slug}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px]">
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{cat.coursesCount} ta kurs</span>
                <button
                  onClick={() => onShowToast(`"${cat.name}" tahrirlanmoqda`)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Category */}
      {showCatModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0F111A] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yangi Kurs Kategoriyasi</h3>
            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">Kategoriya Nomi</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Sun'iy Intellekt va Prompt Engineering"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-1">URL Slug (avto to'ldiriladi)</label>
                <input
                  type="text"
                  placeholder="ai-prompt-engineering"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Kategoriyani Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
