'use client';

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Subject, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useTransition } from 'react';
import { SubjectEditForm } from './subject-form-edit';

export const SubjectColumns: ColumnDef<Subject>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => {
      return (
        <div className="flex justify-end">
          <p>Actions</p>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'sm'} onClick={() => console.log(data)}>
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px]">
              <DialogHeader>
                <DialogTitle>Editar asignatura</DialogTitle>
              </DialogHeader>
              <SubjectEditForm data={data} />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
