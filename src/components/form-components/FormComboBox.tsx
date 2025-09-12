import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useFormContext } from 'react-hook-form';

interface ComboBoxProps {
    name: string;
    value?: string;
    description?: string;
    loading?: boolean;
    label?: string;
    isOptional?: boolean;
    placeholder?: string;
    className?: string;
    options: {
        label: string;
        value: string;
    }[];
}

const FormComboBox: React.FC<ComboBoxProps> = ({
    name,
    value,
    label,
    loading,
    description,
    placeholder,
    isOptional,
    options,
    className,
}) => {
    const { control } = useFormContext();
    const [open, setOpen] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('', className)}>
                    {label && (
                        <FormLabel>
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                loading={loading}
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value || field.value
                                    ? options.find(
                                          (option) => option.value === (value || field.value),
                                      )?.label
                                    : placeholder || 'Selecciona una opción'}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={placeholder || 'Selecciona una opción'}
                                />
                                <CommandList>
                                    <CommandEmpty>Sin resultados...</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={(currentValue) => {
                                                    field.onChange(
                                                        currentValue === (value || field.value)
                                                            ? ''
                                                            : currentValue,
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        value === option.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormComboBox;
