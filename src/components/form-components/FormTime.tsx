import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    labelClassName?: string;
    undefinedDefaultValue?: boolean;
}

const FormTime: React.FC<InputElementProps> = ({
    name,
    label,
    placeholder,
    description,
    isOptional,
    labelClassName,
    inputClassName,
    undefinedDefaultValue,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <>
            <FormField
                control={control}
                name={name}
                defaultValue={undefinedDefaultValue ? undefined : ''}
                render={({ field }) => (
                    <FormItem className={cn('', props.className)}>
                        {label && (
                            <FormLabel className={cn('', labelClassName)}>
                                {label}
                                {isOptional && (
                                    <span className="text-neutral-400"> (optional)</span>
                                )}
                            </FormLabel>
                        )}
                        <FormControl>
                            <Input
                                {...field}
                                {...props}
                                placeholder={placeholder}
                                type="time"
                                // id="time-picker"
                                // step="1"
                                // defaultValue="10:30:00"
                                disabled={props.disabled}
                                autoComplete={props.autoComplete}
                                className={cn(
                                    'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
                                    inputClassName,
                                )}
                            />
                        </FormControl>
                        {description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div> */}
        </>
    );
};

export default FormTime;
