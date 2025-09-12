import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useGetMonthPaymentsSummary } from '../payments/payment-endpoints';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/common/formatters';
import FormDatePicker from '@/components/form-components/FormDatePicker';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

type Props = {};

const DashBoardPage: React.FC<Props> = () => {
    const form = useForm();
    const date = form.watch('date');
    const getMonthPaymentsSummaryQuery = useGetMonthPaymentsSummary(date);

    return (
        <>
            <div className="flex justify-end">
                <Form {...form}>
                    <FormDatePicker name="date" placeholder="Selecciona algún día de mes" />
                </Form>
            </div>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total gastado del mes</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {getMonthPaymentsSummaryQuery.isFetching ? (
                                <Skeleton className="h-[36px]" />
                            ) : getMonthPaymentsSummaryQuery.isError ? (
                                'Error'
                            ) : (
                                formatMoney(getMonthPaymentsSummaryQuery.data?.outgoing, {
                                    withDollarSign: true,
                                })
                            )}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                Gastos <IconTrendingDown className="size-4" />
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Total ingresos del mes</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {getMonthPaymentsSummaryQuery.isFetching ? (
                                <Skeleton className="h-[36px]" />
                            ) : getMonthPaymentsSummaryQuery.isError ? (
                                'Error'
                            ) : (
                                formatMoney(getMonthPaymentsSummaryQuery.data?.income, {
                                    withDollarSign: true,
                                })
                            )}
                        </CardTitle>
                        <CardAction>
                            <Badge variant="outline">
                                Ingresos <IconTrendingUp className="size-4" />
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
            </div>
        </>
    );
};

export default DashBoardPage;
