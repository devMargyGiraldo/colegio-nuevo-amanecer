import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

import db from '@/lib/db';
import { getUser } from '@/lib/utils';
import { EnrollmentStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

const NotesLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

  const studentEnrollment = await db.studentEnrollment.findFirst({
    where: {
      status: EnrollmentStatus.ACTIVE,
      studentId: user.id,
    },
  });

  const periods = await db.period.findMany({
    where: {
      gradeId: studentEnrollment?.gradeId || '',
    },
  });

  const handleChange = async (value: string) => {
    'use server';
    redirect(`/academic/notes/${value}`);
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={'Selecciona un periodo'} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Periodos</SelectLabel>
            {periods.map((period) => {
              return (
                <SelectItem key={period.id} value={period.id}>
                  {period.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {children}
    </div>
  );
};

export default NotesLayout;
