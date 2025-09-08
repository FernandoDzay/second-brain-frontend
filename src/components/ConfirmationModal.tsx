import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPortal,
    DialogTitle,
} from './ui/dialog';

type Props = {
    title: string;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    loading?: boolean;
    onConfirm: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
    description,
    onOpenChange,
    open,
    title,
    loading,
    onConfirm,
}) => {
    return (
        <Dialog open={open || loading} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{description}</DialogDescription>
                    <DialogFooter>
                        <Button variant="outline">Cancelar</Button>
                        <Button loading={loading} onClick={onConfirm}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default ConfirmationModal;
