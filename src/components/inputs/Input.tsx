import { cn } from '@/lib/utils';
import { Input as ShadcnInput } from '../ui/input';
import { Label } from '../ui/label';
import React, { HTMLAttributes } from 'react';

type Props = {
    label?: string;
    labelClassName?: string;
    formItemClassName?: string;
    messageSlot?: React.ReactNode;
    labelProps?: React.ComponentProps<typeof Label>;
    containerProps?: HTMLAttributes<HTMLDivElement>;
} & React.ComponentProps<typeof ShadcnInput>;

const Input: React.FC<Props> = ({
    label,
    labelClassName,
    formItemClassName,
    messageSlot,
    labelProps,
    containerProps,
    ...props
}) => {
    return (
        <div className={cn('', props.className)} {...containerProps}>
            {label && (
                <Label
                    data-slot="form-label"
                    className={cn('mb-2', labelClassName)}
                    htmlFor={props.name}
                    {...labelProps}
                >
                    {label}
                </Label>
            )}
            <ShadcnInput
                id={props.name}
                {...props}
                value={props.value || ''}
                type={props.type || 'text'}
            />
            {messageSlot}
        </div>
    );
};

export default Input;
