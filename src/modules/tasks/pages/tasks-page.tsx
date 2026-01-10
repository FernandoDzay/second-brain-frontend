import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import TasksTable from '../tasks-table';
import { useGetTasks } from '../tasks-endpoints';
import QuickTaskModal from '../quick-task-modal';
import { useState } from 'react';

type Props = {};

const TasksPage: React.FC<Props> = () => {
    const { data, isFetching } = useGetTasks();
    const [openTaskModal, setOpenTaskModal] = useState(false);

    return (
        <>
            <div className="flex gap-2">
                <Button variant="success" onClick={() => setOpenTaskModal(true)}>
                    <Zap /> Tarea rápida
                </Button>
                <Link to="/tasks/create">
                    <Button variant="success">
                        <Plus /> Crear tarea
                    </Button>
                </Link>
            </div>

            <TasksTable data={data} loading={isFetching} />

            <QuickTaskModal open={openTaskModal} setOpen={setOpenTaskModal} />
        </>
    );
};

export default TasksPage;
