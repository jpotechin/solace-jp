'use client';

import { Suspense } from 'react';
import { HomePageContent } from './components/home-page-content';

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-50'>
      <div className='w-full px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header Skeleton */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-3xl mb-6 animate-pulse'></div>
          <div className='h-12 bg-slate-200 rounded mb-4 animate-pulse max-w-3xl mx-auto'></div>
          <div className='h-6 bg-slate-200 rounded animate-pulse max-w-2xl mx-auto'></div>
        </div>

        {/* Search Section Skeleton */}
        <div className='bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8 max-w-5xl mx-auto'>
          <div className='h-14 bg-slate-200 rounded animate-pulse mb-4'></div>
          <div className='h-4 bg-slate-200 rounded animate-pulse w-1/3'></div>
        </div>

        {/* Table Skeleton */}
        <div className='bg-white rounded-3xl shadow-xl border border-slate-200 p-8'>
          <div className='space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className='h-16 bg-slate-200 rounded animate-pulse'
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
