import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FullCenteredSection } from '@/components/layout-helpers';
import PaymentForm from './PaymentForm';
import { useGetPayment, useUpdatePayment } from './payment-endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';

type Props = {};

const EditPaymentPage: React.FC<Props> = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        isFetching,
        error: dataError,
    } = useGetPayment(id !== undefined ? +id : undefined);

    const { mutateAsync, isPending, error } = useUpdatePayment();

    if (isFetching) return 'Cargando pago...';
    if (dataError || !data) return <Alert variant="destructive">No encontramos el pago</Alert>;
    return (
        <>
            <h2 className="font-semibold">Editar pago</h2>

            <FullCenteredSection>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PaymentForm
                            initialState={data}
                            onSubmit={async (newData) => {
                                await mutateAsync({ ...newData, id: data.id });
                                navigate('/payments');
                            }}
                            loading={isPending}
                            error={error}
                        />
                    </CardContent>
                </Card>
            </FullCenteredSection>
        </>
    );
};

export default EditPaymentPage;
