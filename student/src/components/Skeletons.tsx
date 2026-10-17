import React from 'react';

export function CourseCardSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg bg-white border border-border overflow-hidden space-y-4 p-0">
          <div className="h-44 bg-zinc-200 w-full"></div>
          <div className="p-5 space-y-3">
            <div className="flex gap-2">
              <div className="h-3 w-16 bg-zinc-200 rounded"></div>
              <div className="h-3 w-20 bg-zinc-100 rounded"></div>
            </div>
            <div className="h-4 w-full bg-zinc-200 rounded"></div>
            <div className="h-3 w-3/4 bg-zinc-100 rounded"></div>
            <div className="pt-3 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-zinc-200"></div>
                <div className="h-3 w-20 bg-zinc-100 rounded"></div>
              </div>
              <div className="h-4 w-20 bg-zinc-200 rounded"></div>
            </div>
            <div className="h-8 w-full bg-zinc-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ClassroomSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
      <div className="lg:col-span-8 space-y-4">
        <div className="rounded-lg bg-zinc-900 aspect-video w-full"></div>
        <div className="h-5 w-72 bg-zinc-200 rounded"></div>
        <div className="h-40 rounded-lg bg-white border border-border p-5"></div>
      </div>
      <div className="lg:col-span-4 rounded-lg bg-white border border-border p-4 space-y-3">
        <div className="h-4 w-32 bg-zinc-200 rounded"></div>
        {[1, 2, 3, 4].map(k => (
          <div key={k} className="h-10 w-full bg-zinc-100 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}
