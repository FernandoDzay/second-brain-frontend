import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = React.ComponentProps<typeof Loader2> & {
    size?: 'small' | 'medium' | 'large';
};

const Loader: React.FC<Props> = (props) => {
    const size = props.size || 'medium';

    return (
        <>
            <Loader2
                className={cn(
                    'animate-spin absolute left-0 right-0 top-0 bottom-0 m-auto',
                    size === 'small' ? 'w-6 h-6' : size === 'medium' ? 'w-9 h-9' : 'w-14 h-14',
                    props.className,
                )}
            />
        </>
    );
};

export default Loader;
