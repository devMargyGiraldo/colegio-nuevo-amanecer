import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUser } from '@/lib/utils';
import { NavigationMenu } from '@/components/academic/navigation-menu';

const AcademicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();

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
                <h2 className="text-normal">{user.name}</h2>
                <Badge>{user.role}</Badge>
              </div>
              <div>
                <NavigationMenu userRole={user.role} />
              </div>
            </div>
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicLayout;
