import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateTagDto, CreateTagSchema } from './tags-endpoints';
import { FormInput, FormSelect } from '@/components/form-components';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/common/apiCall';
import { AvailableTagsType } from './tags-catalog';

type Props = {
    onSubmit: (data: CreateTagDto) => void;
    loading?: boolean;
    error?: ApiError | null;
    forcedCategory?: AvailableTagsType;
};

const TagForm: React.FC<Props> = ({ onSubmit, loading, error, forcedCategory }) => {
    const form = useForm({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: {
            category: forcedCategory,
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    void form.handleSubmit(onSubmit)(e);
                }}
                className="flex flex-col gap-4"
            >
                <FormSelect
                    name="category"
                    label="Categoría"
                    disabled={forcedCategory !== undefined}
                    options={[
                        { label: 'Pagos', value: 'payments' },
                        { label: 'Notas', value: 'notes' },
                    ]}
                />
                <FormInput name="name" label="Nombre" />
                <FormInput name="description" label="Descripción adicional" />

                {error && <p>{error.message}</p>}

                <Button type="submit" loading={loading}>
                    Guardar
                </Button>
            </form>
        </Form>
    );
};

export default TagForm;
