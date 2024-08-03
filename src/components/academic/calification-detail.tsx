import {
  DialogHeader,
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { getSubjectScoresRecordsByStudentId } from '@/actions/academic';
import { Badge } from '../ui/badge';

export const CalificationDetail = async ({ data }: { data: any }) => {
  const calificationDetail = await getSubjectScoresRecordsByStudentId(
    data.userId,
    data.archivements,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{data.subject}</DialogTitle>
          <DialogDescription>Detalle de las calificaciones</DialogDescription>
        </DialogHeader>
        <div className="w-[350px] md:w-full">
          <div className="rounded-md border">
            <Table>
              <TableCaption>Detalle de las calificaciones</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-normal text-center font-bold">
                    Logro
                  </TableHead>
                  <TableHead className="text-nowrap">Profesor</TableHead>
                  <TableHead className="text-nowrap">Calificacion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calificationDetail.map((calification) => (
                  <TableRow key={calification.id} className="">
                    <TableCell className="truncate">
                      <span>{calification.achievement}</span>
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {calification.teacher}
                    </TableCell>
                    <TableCell className="text-nowrap text-center">
                      <Badge>{calification.score}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
