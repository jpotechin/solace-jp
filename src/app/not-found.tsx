'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl border border-slate-200 p-8 max-w-md text-center'>
        <div className='w-16 h-16 bg-gradient-to-br from-slate-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <svg
            className='w-8 h-8 text-slate-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33'
            />
          </svg>
        </div>

        <h2 className='text-xl font-semibold text-slate-800 mb-2'>
          Page Not Found
        </h2>
        <p className='text-slate-700 mb-6'>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button asChild>
            <Link href='/'>
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Go Home
            </Link>
          </Button>

          <Button
            variant='outline'
            onClick={() => window.history.back()}
            className='border-slate-300 text-slate-700 hover:bg-slate-50'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
