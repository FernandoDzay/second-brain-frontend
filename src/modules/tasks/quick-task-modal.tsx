import { Input, Select } from '@/components/inputs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, DialogContent, DialogPortal, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { useCreateTask } from './tasks-endpoints';
import { TaskPriorityType } from './task-priority';
import { toast } from 'sonner';

type Props = { open: boolean; setOpen: (open: boolean) => void };

const QuickTaskModal: React.FC<Props> = ({ open, setOpen }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<TaskPriorityType>('1');
    const { isPending, mutateAsync } = useCreateTask();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <DialogContent>
                    <DialogTitle>Nueva tarea</DialogTitle>

                    <form className="grid gap-4">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} label="Tarea" />
                        <Select
                            label="Prioridad"
                            value={priority}
                            onValueChange={(e: TaskPriorityType) => setPriority(e)}
                            options={[
                                { value: '1', label: 'Baja' },
                                { value: '2', label: 'Media' },
                                { value: '3', label: 'Alta' },
                                { value: '4', label: 'ASAP' },
                            ]}
                        />
                    </form>

                    <DialogFooter>
                        <Button
                            onClick={async (e) => {
                                e.preventDefault();
                                if (title.length < 1) return toast('Escribe una tarea');
                                await mutateAsync({ title, priority, description: '', done: false });
                                setOpen(false);
                            }}
                            loading={isPending}
                        >
                            Guardar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default QuickTaskModal;
