import FiltersBtn from '@/components/Filtersbtn';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentsTable from './PaymentsTable';
import { useGetPayments } from './payment-endpoints';

type Props = {};

const PaymentsPage: React.FC<Props> = () => {
    const { data } = useGetPayments();

    return (
        <>
            <div className="flex gap-2">
                <Link to="/payments/create">
                    <Button variant="success">
                        <Plus /> Crear nuevo pago
                    </Button>
                </Link>
                <FiltersBtn></FiltersBtn>
            </div>
            <PaymentsTable data={data} />
        </>
    );
};

export default PaymentsPage;
