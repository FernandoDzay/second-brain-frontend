import { apiCall, ApiError } from '@/common/apiCall';
import { Tag } from '@/common/entity-types';

import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { availableTags, AvailableTagsType } from './tags-catalog';

export const tagsQueryKey = 'Tags';

export const CreateTagSchema = z.object({
    category: z.enum(availableTags),
    name: z.string().min(3),
    description: z.string(),
});
export type CreateTagDto = z.infer<typeof CreateTagSchema>;
export const useCreateTag = () => {
    const queryClient = useQueryClient();

    return useMutation<Tag, ApiError, CreateTagDto>({
        mutationFn: (data) => apiCall({ url: '/tags', method: 'POST', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tagsQueryKey] });
            toast.success('Creado');
        },
    });
};

export const useGetTags = (filters?: { category: AvailableTagsType }) => {
    return useQuery<Tag[], ApiError>({
        queryFn: () => apiCall({ url: '/tags', method: 'GET', data: filters }),
        queryKey: [tagsQueryKey, filters],
    });
};

export const useGetTag = (id?: number) => {
    return useQuery<Tag, ApiError>({
        queryFn: () => apiCall({ url: `/tags/${id}`, method: 'GET' }),
        queryKey: [tagsQueryKey, id],
        enabled: id !== undefined,
    });
};

export const UpdateTagSchema = CreateTagSchema.partial();
export type UpdateTagDto = z.infer<typeof UpdateTagSchema>;
export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    return useMutation<Tag, ApiError, UpdateTagDto & { id: number }>({
        mutationFn: (data) => apiCall({ url: `/tags/${data.id}`, method: 'PATCH', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tagsQueryKey] });
            toast.success('Tag updated');
        },
    });
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    return useMutation<undefined, ApiError, number>({
        mutationFn: (id) => apiCall({ url: `/tags/${id}`, method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tagsQueryKey] });
            toast.success('Tag eliminated');
        },
    });
};
