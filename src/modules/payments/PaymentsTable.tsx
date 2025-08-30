import { Payment } from '@/common/entity-types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import ActionsBtn from '@/components/ActionsBtn';
import { useDeletePayment } from './payment-endpoints';

type Props = {
    data?: Payment[];
};

const PaymentsTable: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const { mutate: deletePayment } = useDeletePayment();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Es préstamo</TableHead>
                    <TableHead className="w-[30px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.data?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.amount > 0 ? 'Ingreso' : 'Gasto'}</TableCell>
                        <TableCell>{Math.abs(item.amount)}</TableCell>
                        <TableCell>{item.itIsLoan ? 'Sí' : 'No'}</TableCell>
                        <TableCell>
                            <ActionsBtn
                                options={[
                                    {
                                        icon: 'edit',
                                        label: 'Editar',
                                        onClick: () => navigate(`/payments/${item.id}`),
                                    },
                                    {
                                        icon: 'delete',
                                        label: 'Eliminar',
                                        onClick: () => deletePayment(item.id),
                                    },
                                ]}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PaymentsTable;
