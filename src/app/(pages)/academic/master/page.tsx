import { MasterCard } from '@/components/academic/master-card';
import db from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MasterPage() {
  const asignaturas = await db.subject.findMany();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tablas maestras</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-4">
          <MasterCard
            title="Asignaturas"
            description="En este modulo puedes visualizar las asignaturas"
            data={asignaturas}
          />
          <MasterCard
            title="Maestros"
            description="En este modulo puedes visualizar las asignaturas"
          />
          <MasterCard
            title="Estudiantes"
            description="En este modulo puedes visualizar las asignaturas"
          />
        </div>
      </CardContent>
    </Card>
  );
}
