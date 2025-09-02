import { cn } from '@/lib/utils';
import Loader from './Loader';

type Props = { children?: React.ReactNode; className?: string; childrenWrapperClassName?: string };

const WrapperLoader: React.FC<Props> = ({ children, className, childrenWrapperClassName }) => {
    return (
        <div className={cn('relative', className)}>
            <Loader />
            <div className={cn('opacity-50 pointer-events-none', childrenWrapperClassName)}>
                {children}
            </div>
        </div>
    );
};

export default WrapperLoader;
