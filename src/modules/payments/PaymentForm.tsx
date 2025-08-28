import { useForm } from 'react-hook-form';
import { CreatePaymentSchema, useCreatePayment } from './payment-endpoints';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/form-components';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@/components/form-components/Checkbox';
import { TagsSelect } from '../tags';
import { Alert } from '@/components/ui/alert';

type Props = {};

const PaymentForm: React.FC<Props> = () => {
    const { mutate, isPending, error } = useCreatePayment();

    const form = useForm({
        resolver: zodResolver(CreatePaymentSchema),
    });

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((payment) => mutate(payment))}
                    className="grid grid-cols-1 gap-4"
                >
                    <Input label="Descripción" name="description" />
                    <Input label="Importe" name="amount" type="number" min={0} />
                    <TagsSelect category="payments" name="tagIds" />
                    <Checkbox label="Es préstamo?" name="itIsLoan" />
                    {error && <Alert variant="destructive">{error.message}</Alert>}
                    <Button type="submit" loading={isPending}>
                        Guardar
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default PaymentForm;
