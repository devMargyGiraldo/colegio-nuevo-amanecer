'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodObject } from 'zod';
import {
  Form as CForm,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FieldData = {
  name: string;
  label: string;
  defaultValue: string;
  placeholder: string;
  type: string;
  description: string;
  pending: boolean;
};

type DefaultValues = {
  [key: string]: string;
};

interface FormProps {
  zodSchema: ZodObject<any>;
  onSubmit: (data: any) => void;
  fields: FieldData[];
  buttonLabel: string;
  buttonStatus?: boolean;
}

export const Form = ({
  zodSchema,
  fields,
  onSubmit,
  buttonLabel,
  buttonStatus = false,
}: FormProps) => {
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: fields.reduce<DefaultValues>((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {}),
  });

  return (
    <CForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {fields.map((fieldData) => (
          <FormField
            key={fieldData.name}
            control={form.control}
            name={fieldData.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{fieldData.label}</FormLabel>
                <FormControl className="md:text-normal text-[16px]">
                  <Input
                    {...field}
                    placeholder={fieldData.placeholder}
                    type={fieldData.type}
                    disabled={fieldData.pending}
                  />
                </FormControl>
                <FormDescription>{fieldData.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full" disabled={buttonStatus}>
          {buttonLabel}
        </Button>
      </form>
    </CForm>
  );
};
