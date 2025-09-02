import { TableBody } from '../ui/table';
import { cn } from '@/lib/utils';
import s from './styles.module.css';
import Loader from '../Loader';

type Props = React.ComponentProps<typeof TableBody> & {
    loading?: boolean;
};

const TBodyWithLoader: React.FC<Props> = ({ loading, ...props }) => {
    return (
        <>
            <TableBody
                {...props}
                className={cn(loading ? s.tbodyWithLoading : '', 'relative', props.className)}
            >
                {loading && (
                    <tr className="!opacity-100">
                        <td>
                            <Loader />
                        </td>
                    </tr>
                )}
                {props.children}
            </TableBody>
        </>
    );
};

export default TBodyWithLoader;
