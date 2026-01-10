import { Dialog, DialogContent, DialogTitle, DialogPortal } from '@/components/ui/dialog';
import TagForm from './TagForm';
import { useCreateTag } from './tags-endpoints';
import { AvailableTagsType } from './tags-catalog';

type Props = {
    open?: boolean;
    onOpenChange: (open: boolean) => void;
    category?: AvailableTagsType;
};

const CreateTagModal: React.FC<Props> = (props) => {
    const { isPending, error, mutate } = useCreateTag();

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogPortal>
                <DialogContent>
                    <DialogTitle>Crear Tag</DialogTitle>
                    <TagForm
                        onSubmit={(data) => {
                            mutate(data);
                            props.onOpenChange(false);
                        }}
                        loading={isPending}
                        error={error}
                        forcedCategory={props.category}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default CreateTagModal;
