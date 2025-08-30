import { useForm } from 'react-hook-form';
import { CreatePaymentDto, CreatePaymentSchema } from './payment-endpoints';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/form-components';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@/components/form-components/Checkbox';
import { TagsSelect } from '../tags';
import { Alert } from '@/components/ui/alert';
import Radio from '@/components/form-components/Radio';
import { ApiError } from '@/common/apiCall';
import { Payment } from '@/common/entity-types';
import DatePicker from '@/components/form-components/DatePicker';

type Props = {
    onSubmit: (data: CreatePaymentDto) => void;
    loading?: boolean;
    error: ApiError | null;
    initialState?: Payment;
};

const PaymentForm: React.FC<Props> = ({ onSubmit, loading, error, initialState }) => {
    const form = useForm({
        resolver: zodResolver(CreatePaymentSchema),
        defaultValues: initialState
            ? {
                  amount: Math.abs(initialState.amount),
                  amountType: initialState.amount > 0 ? 'income' : 'outgoing',
                  description: initialState.description,
                  itIsLoan: initialState.itIsLoan,
                  date: initialState.date,
                  tagIds: initialState.tags?.map((tag) => tag.id),
              }
            : undefined,
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                    <Input label="Descripción" name="description" />
                    <Input
                        label="Importe"
                        name="amount"
                        type="number"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (Number(val) < 0) return;
                            form.setValue('amount', val);
                        }}
                    />
                    <Radio
                        name="amountType"
                        options={[
                            { value: 'outgoing', label: 'Gasto' },
                            { value: 'income', label: 'Ingreso' },
                        ]}
                    />
                    <DatePicker name="date" defaultValue={new Date()} />
                    <TagsSelect category="payments" name="tagIds" />
                    <Checkbox label="Es préstamo?" name="itIsLoan" />
                    {error && <Alert variant="destructive">{error.message}</Alert>}
                    <Button type="submit" loading={loading}>
                        Guardar
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default PaymentForm;
