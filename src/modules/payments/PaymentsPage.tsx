import PaymentsTable from './PaymentsTable';
import { useGetPayments } from './payment-endpoints';

type Props = {};

const PaymentsPage: React.FC<Props> = () => {
    const { data, isFetching } = useGetPayments();

    return (
        <>
            <PaymentsTable data={data} loading={isFetching} />
        </>
    );
};

export default PaymentsPage;
