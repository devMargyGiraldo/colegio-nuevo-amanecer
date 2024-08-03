'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IdentificationIcon,
  DevicePhoneMobileIcon,
  BuildingLibraryIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '../ui/card';
import { useForm, useWatch } from 'react-hook-form';
import { useState, useTransition } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { RegisterSchema } from '@/schemas';
import { register } from '@/actions/register';
import { UserRole } from '@prisma/client';

export const Register = () => {
  const [activeTab, setActiveTab] = useState('basic-information');
  const [disabledContact, setDisabledContact] = useState(true);
  const [disabledStudent, setDisabledStudent] = useState(true);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      documentId: '',
      name: '',
      email: '',
      role: undefined,
      phoneNumber: '',
    },
  });

  const { control, handleSubmit, trigger } = form;

  const nextTab = async () => {
    let valid = false;

    if (activeTab === 'basic-information') {
      valid = await trigger(['documentId', 'name', 'email', 'role']);
      if (valid) {
        setDisabledContact(false);
        setActiveTab('contact-information');
      } else {
        toast.error('Por favor completa los campos requeridos');
      }
    } else if (
      activeTab === 'contact-information' &&
      role === UserRole.STUDENT
    ) {
      valid = await trigger(['phoneNumber']);
      if (valid) {
        setDisabledStudent(false);
        setActiveTab('student-information');
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const role = useWatch({
    control,
    name: 'role',
    defaultValue: undefined,
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(data).then((response) => {
        if (response?.error) {
          toast.error(response.error);
        } else if (response?.message) {
          toast.success(response.message, {
            description: response.description,
          });
        }
      });
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Formulario de registro de usuarios</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              value={activeTab}
              defaultValue="basic-information"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList
                className={clsx(
                  'grid w-full',
                  role === UserRole.STUDENT ? 'grid-cols-3' : 'grid-cols-2',
                )}
              >
                <TabsTrigger value="basic-information">
                  <IdentificationIcon className="h-6 w-6" />
                </TabsTrigger>
                <TabsTrigger
                  value="contact-information"
                  disabled={disabledContact}
                >
                  <DevicePhoneMobileIcon className="h-6 w-6" />
                </TabsTrigger>
                {role === UserRole.STUDENT && (
                  <TabsTrigger
                    value="student-information"
                    disabled={disabledStudent}
                  >
                    <BuildingLibraryIcon className="h-6 w-6" />
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="basic-information">
                <div className="mt-4 flex flex-col space-y-6">
                  <h1 className="self-center font-semibold">
                    Informacion Basica
                  </h1>
                  <FormField
                    control={control}
                    name="documentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Documento de identidad</FormLabel>
                        <FormControl className="md:text-normal text-[16px]">
                          <Input {...field} placeholder="123456789" />
                        </FormControl>
                        <FormDescription>
                          El número de documento de identidad del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl className="md:text-normal text-[16px]">
                          <Input {...field} placeholder="Jonh Doe" />
                        </FormControl>
                        <FormDescription>
                          Nombre completo del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electronico</FormLabel>
                        <FormControl className="md:text-normal text-[16px]">
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormDescription>
                          Correo electronico del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={role}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar el rol del usuario" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.STUDENT}>
                              Estudiante
                            </SelectItem>
                            <SelectItem value={UserRole.TEACHER}>
                              Profesor
                            </SelectItem>
                            <SelectItem value={UserRole.ADMIN}>
                              Admin
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Rol del usuario</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant={'ghost'}
                    className="self-end"
                    onClick={nextTab}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="contact-information">
                <div className="mt-4 flex flex-col space-y-6">
                  <h1 className="self-center font-semibold">
                    Informacion Basica
                  </h1>
                  <FormField
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl className="md:text-normal text-[16px]">
                          <Input {...field} placeholder="3002341234" />
                        </FormControl>
                        <FormDescription>
                          Numero de contacto del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Direccion</FormLabel>
                        <FormControl className="md:text-normal text-[16px]">
                          <Input {...field} placeholder="Calle ..." />
                        </FormControl>
                        <FormDescription>
                          Direccion de residencia del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type={role === UserRole.STUDENT ? 'button' : 'submit'}
                    variant={role === UserRole.STUDENT ? 'ghost' : 'default'}
                    className={clsx(role === UserRole.STUDENT && 'self-end')}
                    onClick={role === UserRole.STUDENT ? nextTab : () => null}
                    disabled={isPending}
                  >
                    {role === UserRole.STUDENT ? (
                      <ChevronRightIcon className="h-6 w-6" />
                    ) : (
                      'Registrar'
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
