'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DataTableDemo } from './score-table';

interface SelectProps {
  data: { value: string; label: string }[];
  calificaciones: {
    id: string;
    asignatura: string;
    teacherName: string;
    score: number;
  }[];
  defaultLabel: string;
}

export function Select({ data, calificaciones, defaultLabel }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.find((field) => field.value === value)?.label
              : defaultLabel}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Buscar periodo..." className="h-9" />
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {data &&
                  data.map((field) => (
                    <CommandItem
                      key={field.value}
                      value={field.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {field.label}

                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === field.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DataTableDemo data={calificaciones} />
    </>
  );
}
