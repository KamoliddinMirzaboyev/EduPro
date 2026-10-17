import React from 'react';

export function CardSkeleton() {
  return (
    <div className="p-5 rounded-lg bg-white border border-border animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-zinc-200 rounded"></div>
        <div className="h-4 w-4 bg-zinc-200 rounded"></div>
      </div>
      <div className="h-7 w-36 bg-zinc-200 rounded"></div>
      <div className="h-3 w-24 bg-zinc-100 rounded"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-lg bg-white border border-border overflow-hidden animate-pulse">
      <div className="px-5 py-4 border-b border-border bg-zinc-50 flex items-center justify-between">
        <div className="h-4 w-40 bg-zinc-200 rounded"></div>
        <div className="h-3 w-16 bg-zinc-200 rounded"></div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-zinc-200"></div>
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 bg-zinc-200 rounded"></div>
                <div className="h-2.5 w-24 bg-zinc-100 rounded"></div>
              </div>
            </div>
            <div className="h-3 w-20 bg-zinc-100 rounded hidden sm:block"></div>
            <div className="h-3.5 w-28 bg-zinc-200 rounded"></div>
            <div className="h-5 w-16 bg-zinc-100 rounded-md"></div>
            <div className="h-6 w-20 bg-zinc-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CourseSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-5 rounded-lg bg-white border border-border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-start gap-4 w-full md:w-auto">
            <div className="w-24 h-16 rounded-md bg-zinc-200 shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-zinc-200 rounded"></div>
                <div className="h-4 w-20 bg-zinc-200 rounded"></div>
              </div>
              <div className="h-4 w-64 bg-zinc-200 rounded"></div>
              <div className="h-3 w-48 bg-zinc-100 rounded"></div>
            </div>
          </div>
          <div className="flex gap-2 self-end md:self-center">
            <div className="h-7 w-20 bg-zinc-200 rounded-md"></div>
            <div className="h-7 w-28 bg-zinc-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
