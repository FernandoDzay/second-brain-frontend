import { Label } from '../ui/label';
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Select as ShadcnSelect,
} from '../ui/select';

type Props = {
    options: {
        value: string;
        label: string;
        props?: Omit<React.ComponentProps<typeof SelectItem>, 'value'>;
    }[];
    label?: string;
    placeholder?: string;
} & React.ComponentProps<typeof ShadcnSelect>;

const Select: React.FC<Props> = ({ options, label, placeholder, ...props }) => {
    return (
        <>
            <div>
                <Label className="mb-2" htmlFor={props.name}>
                    {label}
                </Label>
                <ShadcnSelect {...props}>
                    <SelectTrigger className="w-full" id={props.name}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={`${option.value}`}
                                {...option.props}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
            </div>
        </>
    );
};

export default Select;
