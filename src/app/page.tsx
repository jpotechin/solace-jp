'use client';

import { useEffect, useState } from 'react';
import { AdvocatesTable } from './components/advocates/table';
import { advocateData } from '@/db/seed/advocates';
import { columns } from './components/advocates/columns';
import { useAdvocatesQuery } from './hooks/useAdvocatesQuery';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading } = useAdvocatesQuery();

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className='max-w-[90vw] my-5 mx-auto bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-200 overflow-hidden'>
      <AdvocatesTable
        data={data?.data ?? []}
        total={data?.total ?? 0}
        columns={columns}
        loading={isLoading}
        page={page}
        limit={limit}
        onPageChange={p => updateQuery('page', p.toString())}
      />
    </div>
  );
}
