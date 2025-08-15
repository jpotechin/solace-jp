'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import type { Advocate } from '@/types/advocate'

type AdvocateApiResponse = {
  data: Advocate[]
  total: number
}

export function useAdvocatesQuery() {
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  const query = useQuery<AdvocateApiResponse>({
    queryKey: ['advocates', queryString],
    queryFn: async () => {
      const res = await fetch(`/api/advocates?${queryString}`, {
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch advocates')
      return res.json()
    },
    placeholderData: (previousData) => previousData, // ✅ keeps previous data visible while fetching new
    staleTime: 1000 * 5
  })

  return query
}