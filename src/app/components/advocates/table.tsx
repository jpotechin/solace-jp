'use client';

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import type { Advocate } from '@/types/advocate';

type Props<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  page: number;
  limit: number;
  total: number;
  loading: boolean;
  error?: Error | null;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onRetry?: () => void;
};

// Mobile Card Component
function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const phoneNumber = advocate.phoneNumber
    .toString()
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <div className='bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md hover:shadow-lg transition-shadow'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            {advocate.firstName} {advocate.lastName}
          </h3>
          <p className='text-gray-700'>{advocate.city}</p>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-300'>
            {advocate.degree}
          </span>
          <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-300'>
            {advocate.yearsOfExperience} years
          </span>
        </div>
      </div>

      <div className='mb-4'>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>Specialties</h4>
        <div className='flex flex-wrap gap-1.5'>
          {advocate.specialties?.map((specialty, index) => (
            <span
              key={index}
              className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-300'
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <a
          href={`tel:${advocate.phoneNumber}`}
          className='font-mono text-sm text-slate-700 hover:text-slate-900 hover:underline transition-colors cursor-pointer'
          title='Click to call'
        >
          {phoneNumber}
        </a>
      </div>
    </div>
  );
}

export function AdvocatesTable<TData>({
  data,
  columns,
  page,
  limit,
  total,
  loading,
  error,
  onPageChange,
  onLimitChange,
  onRetry,
}: Props<TData>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / limit),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <div className='w-full'>
        {/* Desktop Table Skeleton */}
        <div className='hidden xl:block'>
          <div className='overflow-x-auto rounded-xl border-0 bg-gradient-to-br from-white via-slate-50 to-gray-50'>
            <div className='min-w-[950px]'>
              {/* Header Skeleton */}
              <div className='bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border-b-2 border-slate-300'>
                <div className='grid grid-cols-7 gap-4 p-4'>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className='h-14 bg-slate-200 rounded animate-pulse'
                    ></div>
                  ))}
                </div>
              </div>

              {/* Rows Skeleton */}
              <div className='divide-y divide-slate-200'>
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                  <div key={rowIndex} className='grid grid-cols-7 gap-4 p-4'>
                    {Array.from({ length: 7 }).map((_, colIndex) => (
                      <div
                        key={colIndex}
                        className={`h-16 rounded animate-pulse ${
                          rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className='xl:hidden space-y-4 px-4 sm:px-6 py-4 sm:py-6'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-xl border-2 border-slate-200 p-6 shadow-md'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex-1'>
                  <div className='h-5 bg-slate-200 rounded animate-pulse mb-2 w-3/4'></div>
                  <div className='h-4 bg-slate-200 rounded animate-pulse w-1/2'></div>
                </div>
                <div className='flex flex-col items-end gap-2'>
                  <div className='h-5 w-16 bg-slate-200 rounded-full animate-pulse'></div>
                  <div className='h-5 w-20 bg-slate-200 rounded-full animate-pulse'></div>
                </div>
              </div>

              <div className='mb-4'>
                <div className='h-4 bg-slate-200 rounded animate-pulse mb-2 w-1/4'></div>
                <div className='flex flex-wrap gap-1.5'>
                  <div className='h-5 w-20 bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-5 w-24 bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-5 w-16 bg-slate-200 rounded animate-pulse'></div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='h-4 w-32 bg-slate-200 rounded animate-pulse'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    // Get user-friendly error message
    const getErrorMessage = (error: Error) => {
      if (error.message.includes('HTTP error! status: 5')) {
        return 'Server error - please try again later';
      }
      if (error.message.includes('HTTP error! status: 4')) {
        return 'Invalid request - please check your search';
      }
      if (error.message.includes('Failed to fetch')) {
        return 'Network error - please check your connection';
      }
      // For custom API errors, show the message
      if (error.message.includes('Test error')) {
        return 'Test error - this is for testing purposes';
      }
      // Default fallback
      return 'Something went wrong - please try again';
    };

    return (
      <div className='w-full'>
        <div className='bg-gradient-to-br from-white via-slate-50 to-gray-50 rounded-xl border border-slate-300 p-8 text-center'>
          <div className='flex flex-col items-center justify-center space-y-3'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center shadow-inner'>
              <svg
                className='w-8 h-8 text-red-600'
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
            <span className='text-slate-800 font-medium text-lg'>
              Error loading advocates
            </span>
            <span className='text-slate-700 text-base'>
              {getErrorMessage(error)}
            </span>
            {onRetry && (
              <Button
                onClick={onRetry}
                className='mt-4 bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white'
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
            )}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='w-full'>
        <div className='bg-gradient-to-br from-white via-slate-50 to-gray-50 rounded-xl border border-slate-300 p-8 text-center'>
          <div className='flex flex-col items-center justify-center space-y-3'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-gray-200 flex items-center justify-center shadow-inner'>
              <svg
                className='w-8 h-8 text-slate-700'
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
            <span className='text-slate-800 font-medium text-lg'>
              No advocates found
            </span>
            <span className='text-slate-700 text-base'>
              Try adjusting your search criteria
            </span>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <div className='w-full'>
      {/* Desktop Table - Hidden on mobile and small screens */}
      <div className='hidden xl:block'>
        <div className='overflow-x-auto rounded-xl border-0 bg-gradient-to-br from-white via-slate-50 to-gray-50'>
          <div className='min-w-[950px]'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow
                    key={headerGroup.id}
                    className='bg-gradient-to-r from-slate-100 via-gray-100 to-slate-200 border-b-2 border-slate-300'
                  >
                    {headerGroup.headers.map(header => (
                      <TableHead
                        key={header.id}
                        className='h-14 text-slate-800 font-semibold tracking-wide px-4'
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='divide-y divide-slate-200'>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className='py-4 px-4'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Cards - Hidden on xl screens and above */}
      <div className='xl:hidden space-y-4 px-4 sm:px-6 py-4 sm:py-6'>
        {data.map((advocate, index) => (
          <AdvocateCard key={index} advocate={advocate as Advocate} />
        ))}
      </div>

      {/* Enhanced pagination controls */}
      <div className='flex flex-col gap-4 mt-8 p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl'>
        {/* Single row with all controls - stack when too small */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='text-sm text-slate-700 text-center md:text-left'>
            <span className='font-semibold text-slate-800'>
              Showing {(page - 1) * limit + 1}
            </span>
            <span className='mx-2'>to</span>
            <span className='font-semibold text-slate-800'>
              {Math.min(page * limit, total)}
            </span>
            <span className='mx-2'>of</span>
            <span className='font-semibold text-slate-800'>
              {total.toLocaleString()}
            </span>
            <span className='ml-2 text-slate-600'>advocates</span>
          </div>

          {/* Pagination controls and row selector in one row */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Pagination controls */}
            <div className='flex items-center gap-2 sm:gap-3'>
              <Button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrevPage}
                variant='outline'
                size='sm'
                className='h-8 w-8 p-0 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 disabled:opacity-50'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </Button>

              <div className='flex items-center gap-2 px-3 sm:px-4 h-8 bg-white rounded-lg shadow-sm min-w-[100px] sm:min-w-[120px] justify-center'>
                <span className='text-xs sm:text-sm font-semibold text-slate-800'>
                  Page {page} of {totalPages}
                </span>
              </div>

              <Button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
                variant='outline'
                size='sm'
                className='h-8 w-8 p-0 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 disabled:opacity-50'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Button>
            </div>

            {/* Row Limit Selector */}
            <div className='flex items-center gap-2'>
              <Select
                value={limit.toString()}
                onValueChange={value => onLimitChange(Number(value))}
              >
                <SelectTrigger className='w-16 h-7 border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white rounded-md text-sm px-2'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='25'>25</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                  <SelectItem value='100'>100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
