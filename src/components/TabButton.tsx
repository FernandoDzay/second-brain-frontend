import { Button } from './ui/button';

type Props = {
    active?: boolean;
    label?: string;
    onClick?: () => void;
};

const TabButton: React.FC<Props> = (props) => {
    return (
        <Button
            variant={props.active ? 'default' : 'outline'}
            className="rounded-full"
            onClick={props.onClick}
        >
            {props.label}
        </Button>
    );
};

export default TabButton;
