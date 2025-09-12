import { useState } from 'react';
import PaymentsTable from './PaymentsTable';
import { FindAllPaymentsDto, useGetPayments } from './payment-endpoints';

type Props = {};

const PaymentsPage: React.FC<Props> = () => {
    const [filters, setFilters] = useState<FindAllPaymentsDto>({});
    const { data, isFetching } = useGetPayments(filters);

    return (
        <>
            <PaymentsTable
                data={data}
                loading={isFetching}
                onFilter={(data) => setFilters(data)}
                onClear={() => setFilters({})}
            />
        </>
    );
};

export default PaymentsPage;
