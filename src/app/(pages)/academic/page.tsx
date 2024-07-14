import { auth } from '@/auth';
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select } from '@/components/academic/period-score';
import db from '@/lib/db';
import { getUserByEmail } from '@/services/user';
import { EnrollmentStatus } from '@prisma/client';

const AcademicPage = async () => {
  const session = await auth();

  const user = session?.user;

  const dbUser = await getUserByEmail(user?.email || '');

  return <div>Acadmic</div>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-col">
          <CardTitle>Portal Academico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="">
                <h2 className="text-normal">{user?.name}</h2>
                <Badge>Estudiante</Badge>
              </div>

              <Avatar>
                <AvatarImage src={user?.image || ''} />
                <AvatarFallback>WQ</AvatarFallback>
              </Avatar>
            </div>

            <Tabs defaultValue="tab1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tab1">Grado Actual</TabsTrigger>
                <TabsTrigger value="tab2">Historico</TabsTrigger>
              </TabsList>

              <TabsContent value="tab1">
                <Card>
                  <CardHeader>
                    <CardTitle>Notas</CardTitle>
                    <CardDescription>
                      En este modulo puede visualizar las notas de cada periodo
                      para el grado actual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select
                      calificaciones={data}
                      data={periods || []}
                      defaultLabel="Seleccionar Periodo"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicPage;
