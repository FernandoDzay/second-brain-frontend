import { apiCall, ApiError } from '@/common/apiCall';
import { Task } from '@/common/entity-types';

import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { taskPriority } from './task-priority';

export const tasksQueryKey = 'Tasks';

export const CreateTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    startDate: z.iso.date().nullish(),
    startTime: z.iso.time().nullish(),
    endDate: z.iso.date().nullish(),
    endTime: z.iso.time().nullish(),
    priority: z.enum(taskPriority),
    done: z.coerce.boolean(),
    tagIds: z.array(z.coerce.number()).optional(),
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Task, ApiError, CreateTaskDto>({
        mutationFn: (data) => apiCall({ url: '/tasks', method: 'POST', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tasksQueryKey] });
            toast.success('Creado');
        },
    });
};

export const FindAllTasksSchema = z
    .object({
        priority: z.enum(taskPriority),
        done: z.coerce.boolean(),
        year: z.number(),
        month: z.number(),
    })
    .partial();
export type FindAllTasksDto = z.infer<typeof FindAllTasksSchema>;
export const useGetTasks = (filters?: FindAllTasksDto) => {
    return useQuery<Task[], ApiError>({
        queryFn: () => apiCall({ url: '/tasks', method: 'GET', params: filters }),
        queryKey: [tasksQueryKey, filters],
    });
};

export const useGetTask = (id?: number | null) => {
    return useQuery<Task, ApiError>({
        queryFn: () => apiCall({ url: `/tasks/${id}`, method: 'GET' }),
        queryKey: [tasksQueryKey, id],
        enabled: !!id,
    });
};

export const UpdateTaskSchema = CreateTaskSchema.partial();
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Task, ApiError, UpdateTaskDto & { id: number }>({
        mutationFn: (data) => apiCall({ url: `/tasks/${data.id}`, method: 'PATCH', data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tasksQueryKey] });
            toast.success('Task updated');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation<undefined, ApiError, number>({
        mutationFn: (id) => apiCall({ url: `/tasks/${id}`, method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [tasksQueryKey] });
            toast.success('Task eliminated');
        },
    });
};
