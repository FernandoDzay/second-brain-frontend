import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { cn } from '@/lib/utils';

type Props = {
    orientation?: 'vertical' | 'horizontal';
    name: string;
    label?: string;
    description?: string;
    className?: string;
    labelClassName?: string;
    isOptional?: boolean;
    options?: {
        value: string;
        label: string;
    }[];
};

const Radio: React.FC<Props> = ({
    orientation = 'horizontal',
    name,
    className,
    isOptional,
    labelClassName,
    description,
    label,
    options,
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={options?.[0].value || undefined}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && (
                        <FormLabel className={cn('', labelClassName)}>
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <RadioGroup
                            defaultValue={options?.[0].value || undefined}
                            className={cn(orientation === 'horizontal' ? 'flex' : '')}
                            name={field.name}
                            onValueChange={(val) => field.onChange(val)}
                        >
                            {options?.map((option) => (
                                <div key={option.value} className="flex items-center gap-3">
                                    <RadioGroupItem
                                        {...field}
                                        value={option.value}
                                        id={option.value}
                                        className="cursor-pointer"
                                    />
                                    <FormLabel className="cursor-pointer" htmlFor={option.value}>
                                        {option.label}
                                    </FormLabel>
                                </div>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default Radio;
