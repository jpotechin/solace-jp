import { type ColumnDef } from '@tanstack/react-table';
import { type Advocate } from '@/types/advocate';

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 110,
    cell: ({ row }) => (
      <div className='font-semibold text-gray-900'>
        {row.getValue('firstName')}
      </div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 110,
    cell: ({ row }) => (
      <div className='font-semibold text-gray-900'>
        {row.getValue('lastName')}
      </div>
    ),
  },
  {
    accessorKey: 'city',
    header: 'City',
    size: 120,
    cell: ({ row }) => (
      <div className='text-gray-700'>{row.getValue('city')}</div>
    ),
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
    size: 90,
    cell: ({ row }) => (
      <div className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200'>
        {row.getValue('degree')}
      </div>
    ),
  },
  {
    accessorKey: 'specialties',
    header: 'Specialties',
    size: 280,
    cell: ({ row }) => {
      const specialties = row.getValue('specialties') as string[];
      return (
        <div className='flex flex-wrap gap-1.5 w-full'>
          {specialties?.map((specialty, index) => (
            <span
              key={index}
              className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors'
            >
              {specialty}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'yearsOfExperience',
    header: 'Experience',
    size: 100,
    cell: ({ row }) => (
      <div className='text-center'>
        <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200'>
          {row.getValue('yearsOfExperience')} years
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    size: 140,
    cell: ({ row }) => {
      const phone = row.getValue('phoneNumber') as number;
      const formattedPhone = phone
        .toString()
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      return (
        <a
          href={`tel:${phone}`}
          className='font-mono text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer whitespace-nowrap'
          title='Click to call'
        >
          {formattedPhone}
        </a>
      );
    },
  },
];
