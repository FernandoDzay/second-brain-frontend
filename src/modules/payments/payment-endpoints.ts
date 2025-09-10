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
    date: z.iso.date(),
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

export const FindAllPaymentsSchema = z
    .object({
        description: z.coerce.string(),
        amountStart: z.coerce.number(),
        amountEnd: z.coerce.number(),
        itIsLoan: z.coerce.boolean(),
        createdAtStart: z.coerce.date(),
        createdAtEnd: z.coerce.date(),
        tags: z.array(z.coerce.number()),
    })
    .partial();
export type FindAllPaymentsDto = z.infer<typeof FindAllPaymentsSchema>;
export const useGetPayments = (filters?: FindAllPaymentsDto) => {
    return useQuery<Payment[], ApiError>({
        queryFn: () => apiCall({ url: '/payments', method: 'GET', data: filters }),
        queryKey: [paymentsQueryKey],
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

export const useRelatePayments = () => {
    const queryClient = useQueryClient();

    return useMutation<undefined, ApiError, number[]>({
        mutationFn: (data) => apiCall({ url: `/payments/relate-payments`, method: 'POST', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [paymentsQueryKey] });
            toast.success('Pagos relacionados correctamente');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const unrelatePaymentsSchema = z.object({
    paymentId_1: z.number(),
    paymentId_2: z.number(),
});
export type unrelatePaymentsDto = z.infer<typeof unrelatePaymentsSchema>;
export const useUnrelatePayments = () => {
    const queryClient = useQueryClient();

    return useMutation<undefined, ApiError, unrelatePaymentsDto>({
        mutationFn: (data) => apiCall({ url: `/payments/unrelate-payments`, method: 'POST', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [paymentsQueryKey] });
            toast.success('Relación eliminada correctamente');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useGetMonthPaymentsSummary = (date?: string) => {
    return useQuery<{ income: number; outgoing: number }, ApiError>({
        queryFn: () =>
            apiCall({ url: '/payments/get-month-payments-summary', method: 'GET', data: { date } }),
        queryKey: [paymentsQueryKey, 'getMonthPaymentsSummary'],
    });
};
