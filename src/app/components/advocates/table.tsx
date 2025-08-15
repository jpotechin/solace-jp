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
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

// Mobile Card Component
function AdvocateCard({ advocate }: { advocate: Advocate }) {
  const phoneNumber = advocate.phoneNumber
    .toString()
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <div className='bg-white rounded-xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            {advocate.firstName} {advocate.lastName}
          </h3>
          <p className='text-gray-600'>{advocate.city}</p>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200'>
            {advocate.degree}
          </span>
          <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200'>
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
              className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200'
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <a
          href={`tel:${advocate.phoneNumber}`}
          className='font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer'
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
  onPageChange,
  onLimitChange,
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
        <div className='bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 text-center'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='animate-spin rounded-full h-10 w-10 border-3 border-blue-300 border-t-indigo-600'></div>
            <span className='text-blue-700 font-medium text-lg'>
              Loading advocates...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='w-full'>
        <div className='bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 text-center'>
          <div className='flex flex-col items-center justify-center space-y-3'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center shadow-inner'>
              <svg
                className='w-8 h-8 text-blue-600'
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
            <span className='text-blue-700 font-medium text-lg'>
              No advocates found
            </span>
            <span className='text-blue-600 text-base'>
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
        <div className='overflow-x-auto rounded-xl border-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50'>
          <div className='min-w-[950px]'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow
                    key={headerGroup.id}
                    className='bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-b-2 border-blue-200'
                  >
                    {headerGroup.headers.map(header => (
                      <TableHead
                        key={header.id}
                        className='h-14 text-blue-900 font-semibold tracking-wide'
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
              <TableBody className='divide-y divide-blue-100'>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'
                    }`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className='py-4'>
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
      <div className='xl:hidden space-y-4'>
        {data.map((advocate, index) => (
          <AdvocateCard key={index} advocate={advocate as Advocate} />
        ))}
      </div>

      {/* Enhanced pagination controls */}
      <div className='flex flex-col gap-4 mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200'>
        {/* Top row - Data summary and row selector */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='text-sm text-blue-700 text-center sm:text-left'>
            <span className='font-semibold text-blue-900'>
              Showing {(page - 1) * limit + 1}
            </span>
            <span className='mx-2'>to</span>
            <span className='font-semibold text-blue-900'>
              {Math.min(page * limit, total)}
            </span>
            <span className='mx-2'>of</span>
            <span className='font-semibold text-blue-900'>
              {total.toLocaleString()}
            </span>
            <span className='ml-2 text-blue-600'>advocates</span>
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

        {/* Bottom row - Pagination controls */}
        <div className='flex items-center justify-center gap-2 sm:gap-3'>
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage}
            variant='outline'
            size='sm'
            className='px-3 sm:px-4 py-2 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm'
          >
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2'
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
            <span className='hidden sm:inline'>Previous</span>
            <span className='sm:hidden'>Prev</span>
          </Button>

          <div className='flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg border border-blue-200 shadow-sm min-w-[100px] sm:min-w-[120px] justify-center'>
            <span className='text-xs sm:text-sm font-semibold text-blue-700'>
              Page {page} of {totalPages}
            </span>
          </div>

          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            variant='outline'
            size='sm'
            className='px-3 sm:px-4 py-2 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 text-xs sm:text-sm'
          >
            <span className='hidden sm:inline'>Next</span>
            <span className='sm:hidden'>Next</span>
            <svg
              className='w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2'
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
      </div>
    </div>
  );
}
