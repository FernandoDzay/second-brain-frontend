import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
    label?: string;
} & React.ComponentProps<typeof Input>;

const TimeInput: React.FC<Props> = (props) => {
    const { label, ...inputProps } = props;

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className="px-1">
                {label}
            </Label>
            <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                {...inputProps}
            />
        </div>
    );
};

export default TimeInput;
