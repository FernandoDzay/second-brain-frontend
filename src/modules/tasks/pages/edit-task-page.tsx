import { FullCenteredSection } from '@/components/layout-helpers';
import TaskForm from '../task-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTask, useUpdateTask } from '../tasks-endpoints';

type Props = {};

const EditTaskPage: React.FC<Props> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isFetching } = useGetTask(id !== undefined ? +id : undefined);
    const { mutateAsync, isPending, error } = useUpdateTask();

    return (
        <>
            <h2 className="font-semibold">Editar tarea</h2>

            <FullCenteredSection>
                <Card loading={isFetching}>
                    <CardHeader>
                        <CardTitle>Formulario de tarea</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TaskForm
                            initialState={
                                data
                                    ? {
                                          description: data.description,
                                          priority: data.priority,
                                          startDate: data.startDate,
                                          endDate: data.endDate,
                                          startTime: data.startTime,
                                          endTime: data.endTime,
                                          title: data.title,
                                          done: data.done,
                                          tagIds: data.tags?.map((tag) => tag.id),
                                      }
                                    : undefined
                            }
                            onSubmit={async (newData) => {
                                await mutateAsync({ ...newData, id: Number(id) });
                                navigate('/tasks');
                            }}
                            loading={isPending}
                            error={error}
                        />
                    </CardContent>
                </Card>
            </FullCenteredSection>
        </>
    );
};

export default EditTaskPage;
