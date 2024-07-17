import { getPartialScoresByStudentId } from '@/actions/academic';
import { CalificationDetail } from '@/components/academic/calification-detail';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUser } from '@/lib/utils';
interface PeriodPageProps {
  params: {
    id: string;
  };
}

const PeriodPage = async ({ params }: PeriodPageProps) => {
  const periodId = params.id;
  const user = await getUser();
  const partialScores = await getPartialScoresByStudentId(user.id, periodId);

  return (
    <div className="mt-4">
      <Table>
        <TableCaption>
          Lista con la calificacion parcial por asignatura
        </TableCaption>
        <TableHeader className="text-center">
          <TableRow>
            <TableHead>Asignatura</TableHead>
            <TableHead className="text-nowrap">Profesor</TableHead>
            <TableHead className="text-nowrap">Calificacion Parcial</TableHead>
            <TableHead> Detalle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partialScores.map((partialScore) => (
            <TableRow key={partialScore.subject} className="text-center">
              <TableCell>{partialScore.subject}</TableCell>
              <TableCell className="text-nowrap">
                {partialScore.teacher}
              </TableCell>
              <TableCell className="text-nowrap">
                <Badge>{partialScore.partialScore}</Badge>
              </TableCell>
              <TableCell>
                <CalificationDetail
                  data={{
                    userId: user.id,
                    archivements: partialScore.id,
                    subject: partialScore.subject,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PeriodPage;
