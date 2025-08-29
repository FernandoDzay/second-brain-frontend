import { useFormContext } from 'react-hook-form';
import { BaseMultiSelect } from '../ui/BaseMultiSelect';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';

interface MultiSelectProps
    extends Omit<React.ComponentProps<typeof BaseMultiSelect>, 'onValueChange'> {
    name: string;
    label?: string;
    description?: string;
    isOptional?: boolean;
    options: {
        label: string;
        value: string;
    }[];
    triggerClassName?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    name,
    label,
    placeholder,
    description,
    isOptional,
    options,
    triggerClassName,
    ...props
}) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('', props.className)}>
                    {label && (
                        <FormLabel>
                            {label}
                            {isOptional && <span className="text-neutral-400"> (optional)</span>}
                        </FormLabel>
                    )}
                    <BaseMultiSelect
                        options={options}
                        name={name}
                        placeholder={placeholder}
                        value={field.value?.map((value: string[]) => value.toString())}
                        {...props}
                        defaultValue={field.value?.map((value: string[]) => value.toString())}
                        onValueChange={(value) => field.onChange(value)}
                    />
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default MultiSelect;
