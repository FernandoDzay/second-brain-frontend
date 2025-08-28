import { apiCall, ApiError } from '@/common/apiCall';
import { Payment } from '@/common/entity-types';

import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paymentsQueryKey = 'Payments';

export const CreatePaymentSchema = z.object({
    description: z.string().min(3),
    amount: z.coerce.number().gt(0).or(z.coerce.number().lt(0)),
    itIsLoan: z.coerce.boolean(),
    tagIds: z.array(z.coerce.number()).optional(),
});
export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
export const useCreatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation<Payment, ApiError, CreatePaymentDto>({
        mutationFn: (data) => apiCall({ url: '/payments', method: 'POST', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [paymentsQueryKey] });
            toast.success('Creado exitosamente');
        },
    });
};
