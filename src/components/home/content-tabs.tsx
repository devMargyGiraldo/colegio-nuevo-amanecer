import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ContentTabs() {
  return (
    <Tabs defaultValue="mision" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mision">Misión</TabsTrigger>
        <TabsTrigger value="vision">Visión</TabsTrigger>
      </TabsList>
      <TabsContent value="mision">
        <Card>
          <CardHeader>
            <CardTitle>Misión</CardTitle>
            <CardDescription>
              Formar ciudadanos íntegros, competentes y comprometidos con el
              desarrollo sostenible de su entorno.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="vision">
        <Card>
          <CardHeader>
            <CardTitle>Visión</CardTitle>
            <CardDescription>
              Formar estudiantes líderes, creativos y comprometidos con la
              excelencia académica y el servicio a la comunidad.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
