import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FullCenteredSection } from '@/components/layout-helpers';
import PaymentForm from './PaymentForm';
import { useCreatePayment } from './payment-endpoints';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CreatePaymentPage: React.FC<Props> = () => {
    const { mutateAsync, isPending, error } = useCreatePayment();
    const navigate = useNavigate();

    return (
        <>
            <h2 className="font-semibold">Crear pago</h2>

            <FullCenteredSection>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PaymentForm
                            onSubmit={async (newData) => {
                                await mutateAsync(newData);
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

export default CreatePaymentPage;
