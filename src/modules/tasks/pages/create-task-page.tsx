import { FullCenteredSection } from '@/components/layout-helpers';
import TaskForm from '../task-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCreateTask } from '../tasks-endpoints';

type Props = {};

const CreateTaskPage: React.FC<Props> = () => {
    const { mutateAsync, isPending, error } = useCreateTask();
    const navigate = useNavigate();

    return (
        <>
            <h2 className="font-semibold">Crear tarea</h2>

            <FullCenteredSection>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de tarea</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TaskForm
                            onSubmit={async (newData) => {
                                await mutateAsync(newData);
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

export default CreateTaskPage;
