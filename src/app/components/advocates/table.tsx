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
};

export function AdvocatesTable<TData>({
  data,
  columns,
  page,
  limit,
  total,
  loading,
  onPageChange,
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

  return (
    <div className='w-full'>
      <div className='block'>
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

      <div className='flex flex-col sm:flex-row justify-between items-center mt-8 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200'>
        <div className='text-sm text-blue-700'>
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

        <div className='flex items-center gap-3'>
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            variant='outline'
            size='sm'
            className='px-5 py-2 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200'
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
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Previous
          </Button>

          <div className='flex items-center gap-2 px-5 py-2 bg-white rounded-lg border border-blue-200 shadow-sm'>
            <span className='text-sm font-semibold text-blue-700'>
              Page {page} of {Math.ceil(total / limit)}
            </span>
          </div>

          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={page * limit >= total}
            variant='outline'
            size='sm'
            className='px-5 py-2 border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200'
          >
            Next
            <svg
              className='w-4 h-4 ml-2'
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
