'use client';

import { useEffect } from 'react';
import { Button } from '@/app/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error);
  }, [error]);

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
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>

        <h2 className='text-xl font-semibold text-slate-800 mb-2'>
          Something went wrong
        </h2>
        <p className='text-slate-700 mb-4'>
          An unexpected error occurred. Please try refreshing the page or
          contact support if the problem persists.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button
            onClick={reset}
            className='bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white'
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
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
            Try Again
          </Button>

          <Button
            variant='outline'
            onClick={() => window.location.reload()}
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
                d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z'
              />
            </svg>
            Refresh Page
          </Button>
        </div>

        {error.digest && (
          <div className='mt-4 text-xs text-slate-500'>
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
