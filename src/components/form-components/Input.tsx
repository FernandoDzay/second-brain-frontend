import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
    isOptional?: boolean;
    inputClassName?: string;
    labelClassName?: string;
}

const Input: React.FC<InputElementProps> = ({
    name,
    label,
    placeholder,
    description,
    isOptional,
    labelClassName,
    inputClassName,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <FormItem className={cn('', props.className)}>
                    {label && (
                        <FormLabel className={cn('', labelClassName)}>
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <ShadcnInput
                            {...field}
                            placeholder={placeholder}
                            className={cn('', inputClassName)}
                            type={props.type || 'text'}
                            disabled={props.disabled}
                            autoComplete={props.autoComplete}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default Input;
