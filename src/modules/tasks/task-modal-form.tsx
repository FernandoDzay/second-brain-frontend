import { Dialog, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import TaskForm from './task-form';
import { CreateTaskDto, useGetTask, useUpdateTask } from './tasks-endpoints';
import Loader from '@/components/Loader';
import { Alert } from '@/components/ui/alert';

type Props = {
    id: number | null;
    onOpenChange: (open: boolean) => void;
    onSubmit: (task: CreateTaskDto) => void;
};

const TaskModalForm: React.FC<Props> = (props) => {
    const { data, isFetching, isError } = useGetTask(props.id);
    const { mutate, isPending, error } = useUpdateTask();

    return (
        <Dialog open={props.id !== null} onOpenChange={props.onOpenChange}>
            <DialogPortal>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modificar tarea</DialogTitle>
                    </DialogHeader>

                    {isFetching ? (
                        <div className="w-full h-[500px]">
                            <Loader />
                        </div>
                    ) : isError ? (
                        <Alert variant="destructive">No se pudo obtener la tarea</Alert>
                    ) : (
                        <TaskForm
                            initialState={data}
                            loading={isPending}
                            error={error}
                            onSubmit={(task) => {
                                mutate({ ...task, id: props.id! });
                                props.onSubmit(task);
                                props.onOpenChange(false);
                            }}
                        />
                    )}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default TaskModalForm;
