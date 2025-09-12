import { useState } from 'react';
import PaymentsTable from './PaymentsTable';
import { FindAllPaymentsDto, useGetPayments } from './payment-endpoints';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/common/formatters';

type Props = {};

const PaymentsPage: React.FC<Props> = () => {
    const [filters, setFilters] = useState<FindAllPaymentsDto>({ tags: [] });
    const { data, isFetching } = useGetPayments(filters);

    return (
        <>
            <PaymentsTable
                data={data}
                loading={isFetching}
                filters={filters}
                onFiltersChange={(filters) => setFilters(filters)}
            />
            <div className="mt-4 flex gap-4 flex-wrap">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total Gastos</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            $
                            {formatMoney(
                                Math.abs(
                                    data
                                        ?.filter((payment) => payment.amount < 0)
                                        .map((payment) => payment.amount)
                                        .reduce((a, b) => a + b, 0) || 0,
                                ),
                            )}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total Ingresos</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            $
                            {formatMoney(
                                data
                                    ?.filter((payment) => payment.amount > 0)
                                    .map((payment) => payment.amount)
                                    .reduce((a, b) => a + b, 0) || 0,
                            )}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
};

export default PaymentsPage;
