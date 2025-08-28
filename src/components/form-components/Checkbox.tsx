import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

interface CheckboxElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    onCheckedChange?: (val: string | boolean) => void;
}

const Checkbox: React.FC<CheckboxElementProps> = ({
    name,
    label,
    description,
    isOptional,
    inputClassName,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={false}
            render={({ field }) => (
                <FormItem className={cn('flex items-end gap-x-2', props.className)}>
                    <FormControl>
                        <ShadcnCheckbox
                            {...field}
                            className={cn('cursor-pointer', inputClassName)}
                            disabled={props.disabled}
                            value={field.value}
                            checked={props.checked || field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    {label && (
                        <FormLabel className="h-fit cursor-pointer">
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}

                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default Checkbox;
