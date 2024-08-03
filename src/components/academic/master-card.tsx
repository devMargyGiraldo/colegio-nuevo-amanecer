'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Subject, User } from '@prisma/client';
import { MasterTable } from './master-table';
import { SubjectColumns } from '@/components/academic/columns';

interface MasterCardProps {
  title: string;
  description: string;
  data: Subject[] | User[];
}

export const MasterCard = ({ title, description, data }: MasterCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-end justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ver</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="w-[350px] md:w-full">
              {data && <MasterTable data={data} columns={SubjectColumns} />}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
