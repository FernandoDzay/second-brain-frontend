import { Task } from '@/common/entity-types';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import ActionsBtn from '@/components/ActionsBtn';
import { useDeleteTask } from './tasks-endpoints';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import TBodyWithLoader from '@/components/datagrid/TBodyWithLoader';
import { Check, X } from 'lucide-react';
import { DataTablePagination } from '@/components/datagrid/DataTablePagination';
import EmptyTable from '@/components/datagrid/EmptyTable';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Badge } from '@/components/ui/badge';
import { TagsGroup } from '../tags';

type Props = {
    data?: Task[];
    loading?: boolean;
    isBacklog?: boolean;
};

const TasksTable: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const emptyData = useMemo(() => [], []);
    const { mutateAsync: deleteTask, isPending: deleteTaskLoading } = useDeleteTask();
    const [confirmDeleteModal, setConfirmDeleteModal] = useState<number | null>(null);

    const columns = useMemo<ColumnDef<Task>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Descripción',
            },
            {
                accessorKey: 'description',
                header: 'Descripción',
            },
            {
                header: 'Fecha',
                accessorFn: (row) => {
                    if (!row.startDate) return ' --- ';
                    return row.startDate;
                },
            },
            {
                header: 'Hora',
                accessorFn: (row) => {
                    if (!row.startTime) return ' --- ';
                    return row.startTime;
                },
            },
            {
                header: 'Prioridad',
                cell: ({ row: { original: row } }) => {
                    const priorityName = {
                        '1': 'Baja',
                        '2': 'Media',
                        '3': 'Alta',
                        '4': 'ASAP',
                    };

                    const variant = ['3', '4'].includes(row.priority) ? 'destructive' : 'secondary';
                    return <Badge variant={variant}>{priorityName[row.priority]}</Badge>;
                },
            },
            {
                header: 'Done',
                cell: ({ row: { original: row } }) => (row.done ? <Check className="text-success" /> : <X className="text-destructive" />),
            },
            {
                header: 'Tags',
                cell: ({ row: { original: row } }) => <TagsGroup tags={row.tags} />,
            },
            {
                id: 'actions',
                header: '',
                maxSize: 36,
                cell: ({ row: { original: row } }) => (
                    <ActionsBtn
                        options={[
                            {
                                icon: 'edit',
                                label: 'Editar',
                                onClick: () => navigate(`/tasks/${row.id}`),
                            },
                            {
                                icon: 'delete',
                                label: 'Eliminar',
                                onClick: () => setConfirmDeleteModal(row.id),
                            },
                        ]}
                    />
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: props.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnVisibility: { date: !!props.isBacklog, time: !!props.isBacklog },
        },
    });

    return (
        <>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} colSpan={header.colSpan}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TBodyWithLoader loading={props.loading}>
                    {table.getPaginationRowModel().rows.length === 0 ? (
                        <EmptyTable table={table} />
                    ) : (
                        table.getPaginationRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TBodyWithLoader>
            </Table>
            <DataTablePagination table={table} />

            <ConfirmationModal
                open={confirmDeleteModal !== null}
                onOpenChange={() => setConfirmDeleteModal(null)}
                title="Borrar tarea"
                description="¿Confirmas eliminar la tarea?"
                loading={deleteTaskLoading}
                onConfirm={async () => {
                    await deleteTask(confirmDeleteModal!);
                    setConfirmDeleteModal(null);
                }}
            />
        </>
    );
};

export default TasksTable;
