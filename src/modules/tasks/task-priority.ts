export const taskPriority = ['1', '2', '3', '4'] as const;
export type TaskPriorityType = (typeof taskPriority)[number];

export const taskColor = {
    '1': 'secondary',
    '2': 'secondary',
    '3': 'destructive',
    '4': 'destructive',
};
