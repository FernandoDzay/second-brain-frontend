import FullCalendar from '@fullcalendar/react';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useGetTasks } from '@/modules/tasks/tasks-endpoints';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import { getMonth, getYear } from 'date-fns';
import { stringToDate } from '@/common/formatters';
import { useState } from 'react';
import TaskModalForm from '@/modules/tasks/task-modal-form';

type Props = {};

const FullCalendarWeek: React.FC<Props> = () => {
    const [taskId, setTaskId] = useState<number | null>(null);

    const { data, isLoading, isError } = useGetTasks({ month: getMonth(new Date()), year: getYear(new Date()) });

    const events: EventSourceInput | undefined = data?.map((task) => {
        let date = undefined;
        let endDate = undefined;

        if (task.startDate) {
            let startDateString = task.startDate;
            if (task.startTime) startDateString += ` ${task.startTime}`;
            date = stringToDate(startDateString);
        }

        if (task.endDate) {
            let endDateString = task.endDate;
            if (task.endTime) endDateString += ` ${task.endTime}`;
            endDate = stringToDate(endDateString);
        }

        return {
            date,
            end: endDate,
            title: task.title,
            id: task.id.toString(),
        };
    });

    const handleEventClick = (taskId: number) => {
        setTaskId(taskId);
    };

    if (isLoading) return 'loading...';
    if (isError) return 'Error al cargar el calendario';
    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                locale={esLocale}
                events={events}
                eventClick={(event) => handleEventClick(Number(event.event.id))}
                initialView="dayGridWeek"
            />
            <TaskModalForm
                id={taskId}
                onSubmit={() => {}}
                onOpenChange={(open) => {
                    if (!open) setTaskId(null);
                }}
            />
        </>
    );
};

export default FullCalendarWeek;
