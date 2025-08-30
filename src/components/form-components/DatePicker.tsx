import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface Props {
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    defaultValue?: Date;
    isOptional?: boolean;
    className?: string;
}

const DatePicker: React.FC<Props> = ({
    name,
    label,
    description,
    className,
    placeholder,
    defaultValue,
    isOptional,
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue ? format(defaultValue, 'y-MM-dd') : undefined}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {label && (
                        <FormLabel>
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !field.value && 'text-muted-foreground',
                                        className,
                                    )}
                                >
                                    {field.value ? (
                                        field.value
                                    ) : (
                                        <span>{placeholder || 'Elige una fecha'}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ? parseISO(field.value) : new Date()}
                                onSelect={(newValue) =>
                                    newValue
                                        ? field.onChange(format(newValue, 'y-MM-dd'))
                                        : field.onChange(
                                              format(defaultValue || new Date(), 'y-MM-dd'),
                                          )
                                }
                                disabled={(date) =>
                                    date > new Date() || date < new Date('1900-01-01')
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DatePicker;
