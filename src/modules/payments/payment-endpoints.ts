import { apiCall, ApiError } from '@/common/apiCall';
import { Payment } from '@/common/entity-types';

import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paymentsQueryKey = 'Payments';

export const CreatePaymentSchema = z.object({
    description: z.string().min(3),
    amount: z.coerce
        .number()
        .refine((n) => n !== 0 && !Object.is(n, -0), { message: 'Debe ser distinto de 0' }),
    amountType: z.enum(['income', 'outgoing']),
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

export const useGetPayments = (filters?: any) => {
    return useQuery<Payment[], ApiError>({
        queryFn: () => apiCall({ url: '/payments', method: 'GET', data: filters }),
        queryKey: [paymentsQueryKey, filters],
    });
};

export const useGetPayment = (id?: number) => {
    return useQuery<Payment, ApiError>({
        queryFn: () => apiCall({ url: `/payments/${id}`, method: 'GET' }),
        queryKey: [paymentsQueryKey, id],
        enabled: id !== undefined,
    });
};

export const UpdatePaymentSchema = CreatePaymentSchema.partial();
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentSchema>;
export const useUpdatePayment = () => {
    const queryClient = useQueryClient();

    return useMutation<Payment, ApiError, UpdatePaymentDto & { id: number }>({
        mutationFn: (data) => apiCall({ url: `/payments/${data.id}`, method: 'PATCH', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [paymentsQueryKey] });
            toast.success('Se actualizó correctamente');
        },
    });
};

export const useDeletePayment = () => {
    const queryClient = useQueryClient();

    return useMutation<undefined, ApiError, number>({
        mutationFn: (id) => apiCall({ url: `/payments/${id}`, method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [paymentsQueryKey] });
            toast.success('Se eliminó correctamente');
        },
    });
};
