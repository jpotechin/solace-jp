'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { AdvocatesTable } from './components/advocates/table';
import { useAdvocatesQuery } from './hooks/useAdvocatesQuery';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { columns } from './components/advocates/columns';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading } = useAdvocatesQuery();

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';

  // Local state for the input field
  const [inputValue, setInputValue] = useState(search);

  // Debounced value for search
  const [debouncedSearchValue] = useDebounceValue(inputValue, 300);

  // Remove the useEffect that syncs inputValue with URL search param
  // This was causing characters to be lost during typing

  const updateQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      // Reset to page 1 when search or limit changes
      if (key === 'search' || key === 'limit') params.delete('page');
      router.push(`/?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Update search when debounced value changes
  useEffect(() => {
    if (debouncedSearchValue !== search) {
      updateQuery('search', debouncedSearchValue);
    }
  }, [debouncedSearchValue, search, updateQuery]);

  const handleClearSearch = () => {
    setInputValue(''); // Clear the input immediately
    updateQuery('search', ''); // Clear the URL param
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update input immediately for responsive UI
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100'>
      <div className='w-full px-4 sm:px-6 lg:px-8 py-8'>
        {/* Elegant Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-lg'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4'>
            Solace Advocates
          </h1>
          <p className='text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed'>
            Connect with experienced mental health professionals who understand
            your unique needs
          </p>
        </div>

        {/* Enhanced Search Section */}
        <div className='bg-gradient-to-r from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-200 p-8 mb-8 max-w-5xl mx-auto'>
          <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center'>
            <div className='flex-1 min-w-0'>
              <label
                htmlFor='search'
                className='block text-sm font-semibold text-gray-800 mb-3'
              >
                Find Your Advocate
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-indigo-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </div>
                <Input
                  id='search'
                  placeholder='Search by name, city, specialty, or experience...'
                  value={inputValue}
                  onChange={handleSearchChange}
                  className='w-full pl-10 h-14 text-base border-blue-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white/90'
                />
              </div>
              <p className='mt-3 text-sm text-slate-600'>
                Try searching for specific specialties like &ldquo;Trauma &
                PTSD&rdquo; or cities like &ldquo;New York&rdquo;
              </p>
            </div>

            <Button
              onClick={handleClearSearch}
              variant='outline'
              className='whitespace-nowrap h-14 px-8 border-indigo-400 hover:border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 [&:hover]:text-white'
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Clear Search
            </Button>
          </div>
        </div>

        {/* Table Container - Full Width */}
        <div className='bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-200 overflow-hidden'>
          <AdvocatesTable
            data={data?.data ?? []}
            total={data?.pagination?.total ?? 0}
            columns={columns}
            loading={isLoading}
            page={page}
            limit={limit}
            onPageChange={p => updateQuery('page', p.toString())}
            onLimitChange={newLimit =>
              updateQuery('limit', newLimit.toString())
            }
          />
        </div>
      </div>
    </div>
  );
}
