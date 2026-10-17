import React from 'react';

export function CurriculumSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-lg bg-white border border-border overflow-hidden">
          <div className="px-5 py-3.5 bg-zinc-50 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-zinc-200"></div>
              <div className="h-4 w-64 bg-zinc-200 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-zinc-200 rounded-md"></div>
          </div>
          <div className="divide-y divide-border">
            {[1, 2, 3].map((j) => (
              <div key={j} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-4 bg-zinc-200 rounded"></div>
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-72 bg-zinc-200 rounded"></div>
                    <div className="h-2.5 w-40 bg-zinc-100 rounded"></div>
                  </div>
                </div>
                <div className="h-3 w-16 bg-zinc-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SideBySideSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
      {/* Left Essay */}
      <div className="lg:col-span-6 space-y-4">
        <div className="rounded-lg bg-white border border-border p-3 flex gap-2">
          <div className="h-9 w-28 bg-zinc-200 rounded-md"></div>
          <div className="h-9 w-28 bg-zinc-100 rounded-md"></div>
        </div>
        <div className="rounded-lg bg-white border border-border p-5 space-y-4">
          <div className="flex justify-between pb-3 border-b border-border">
            <div className="space-y-1.5">
              <div className="h-3 w-20 bg-zinc-200 rounded"></div>
              <div className="h-4 w-48 bg-zinc-200 rounded"></div>
            </div>
            <div className="h-6 w-16 bg-zinc-100 rounded"></div>
          </div>
          <div className="space-y-2 p-4 bg-zinc-50 rounded-md">
            <div className="h-3 w-full bg-zinc-200 rounded"></div>
            <div className="h-3 w-5/6 bg-zinc-200 rounded"></div>
            <div className="h-3 w-4/6 bg-zinc-200 rounded"></div>
            <div className="h-3 w-full bg-zinc-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right AI Auto-Grader */}
      <div className="lg:col-span-6 space-y-4">
        <div className="rounded-lg bg-white border border-border p-5 space-y-5">
          <div className="flex justify-between pb-3 border-b border-border">
            <div className="h-4 w-44 bg-zinc-200 rounded"></div>
            <div className="h-6 w-12 bg-blue-100 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(k => (
              <div key={k} className="p-3 rounded-md bg-zinc-50 border border-border space-y-2">
                <div className="h-3.5 w-24 bg-zinc-200 rounded"></div>
                <div className="h-2.5 w-full bg-zinc-100 rounded"></div>
              </div>
            ))}
          </div>
          <div className="h-20 bg-zinc-100 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export function CRMSkeleton() {
  return (
    <div className="rounded-lg bg-white border border-border overflow-hidden animate-pulse">
      <div className="px-5 py-3.5 bg-zinc-50 border-b border-border flex justify-between">
        <div className="h-4 w-32 bg-zinc-200 rounded"></div>
        <div className="h-3 w-16 bg-zinc-100 rounded"></div>
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-4">
            <div className="h-3.5 w-28 bg-zinc-200 rounded"></div>
            <div className="h-3 w-28 bg-zinc-100 rounded"></div>
            <div className="h-3 w-40 bg-zinc-200 rounded"></div>
            <div className="h-3 w-20 bg-zinc-100 rounded"></div>
            <div className="h-6 w-24 bg-zinc-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
