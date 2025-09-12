import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { dateToString } from '@/common/formatters';
import { Label } from '../ui/label';

type Props = {
    label?: string;
    name?: string;
    value?: Date | null;
    placeholder?: string;
    onChange?: (value: Date | null) => void;
} & Omit<React.ComponentProps<typeof Calendar>, 'selected' | 'onSelect' | 'mode'>;

const DatePicker: React.FC<Props> = ({
    value,
    name,
    className,
    placeholder,
    onChange,
    label,
    ...props
}) => {
    return (
        <div>
            <Label className="mb-2" htmlFor={name}>
                {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={name}
                        variant={'outline'}
                        className={cn(
                            'w-full pl-3 text-left font-normal',
                            !value && 'text-muted-foreground',
                            className,
                        )}
                    >
                        {value ? (
                            dateToString(value)
                        ) : (
                            <span>{placeholder || 'Elige una fecha'}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value || new Date()}
                        onSelect={(newValue) => onChange!(newValue || null)}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        captionLayout="dropdown"
                        {...props}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
