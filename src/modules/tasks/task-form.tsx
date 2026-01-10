import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormInput, FormCheckbox, FormDatePicker, FormSelect } from '@/components/form-components';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { TagsSelect } from '../tags';
import { Alert } from '@/components/ui/alert';
import { ApiError } from '@/common/apiCall';
import { CreateTaskDto, CreateTaskSchema } from './tasks-endpoints';

type Props = {
    onSubmit: (data: CreateTaskDto) => void;
    loading?: boolean;
    error: ApiError | null;
    initialState?: CreateTaskDto;
};

const TaskForm: React.FC<Props> = ({ onSubmit, loading, error, initialState }) => {
    const form = useForm({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: initialState
            ? {
                  ...initialState,
                  priority: initialState.priority,
              }
            : { priority: '1' },
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                    <FormInput label="Título" name="title" />
                    <FormInput label="Description" name="description" />

                    <div className="flex gap-4">
                        <FormDatePicker label="Fecha de inicio" name="startDate" />
                        <FormInput label="Hora de inicio" type="time" name="startTime" />
                    </div>

                    <div className="flex gap-4">
                        <FormDatePicker label="Fecha de finalización" name="endDate" />
                        <FormInput label="Hora de finalización" type="time" name="endTime" />
                    </div>

                    <div className="flex gap-4 justify-between items-center">
                        <FormCheckbox label="Done" name="done" />
                        <FormSelect
                            name="priority"
                            label="Prioridad"
                            placeholder="Prioridad"
                            defaultValue={'1'}
                            options={[
                                { value: '1', label: 'Baja' },
                                { value: '2', label: 'Media' },
                                { value: '3', label: 'Alta' },
                                { value: '4', label: 'ASAP' },
                            ]}
                        />
                    </div>

                    <TagsSelect category="tasks" name="tagIds" />

                    {error && <Alert variant="destructive">{error.message}</Alert>}

                    <Button type="submit" loading={loading}>
                        Guardar
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default TaskForm;
