import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSetAppTitle } from '../dashboard/HeaderLayout';
import { FullCenteredSection } from '@/components/layout-helpers';
import PaymentForm from './PaymentForm';

type Props = {};

const PaymentsPage: React.FC<Props> = () => {
    useSetAppTitle('Crear pago');

    return (
        <FullCenteredSection>
            <Card>
                <CardHeader>
                    <CardTitle>Formulario de pago</CardTitle>
                </CardHeader>
                <CardContent>
                    <PaymentForm />
                </CardContent>
            </Card>
        </FullCenteredSection>
    );
};

export default PaymentsPage;
