import { Payment } from '@/common/entity-types';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import ActionsBtn from '@/components/ActionsBtn';
import { useDeletePayment, useRelatePayments, useUnrelatePayments } from './payment-endpoints';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import TBodyWithLoader from '@/components/datagrid/TBodyWithLoader';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import FiltersBtn from '@/components/Filtersbtn';
import { Plus, Unlink } from 'lucide-react';
import { MotionEffect } from '@/components/animate-ui/effects/motion-effect';
import { DataTablePagination } from '@/components/datagrid/DataTablePagination';
import EmptyTable from '@/components/datagrid/EmptyTable';
import ConfirmationModal from '@/components/ConfirmationModal';

type Props = {
    data?: Payment[];
    loading?: boolean;
    isSimpleTable?: boolean;
    parentPaymentId?: number;
};

const PaymentsTable: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    const { mutateAsync: deletePayment, isPending: deletePagoLoading } = useDeletePayment();
    const [rowSelection, setRowSelection] = useState({});
    const relatePaymentsMutation = useRelatePayments();
    const unrelatePaymentsMutation = useUnrelatePayments();
    const [confirmDeleteModal, setConfirmDeleteModal] = useState<number | null>(null);
    const [confirmRelateModal, setConfirmRelateModal] = useState(false);
    const [confirmUnRelateModal, setConfirmUnRelateModal] = useState<number | null>(null);

    const columns = useMemo<ColumnDef<Payment>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && 'indeterminate')
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
            },
            {
                accessorKey: 'description',
                header: 'Descripción',
            },
            {
                accessorKey: 'date',
                header: 'Fecha',
            },
            {
                header: 'Tipo',
                accessorFn: (row) => (row.amount > 0 ? 'Ingreso' : 'Gasto'),
            },
            {
                header: 'Cantidad',
                accessorFn: (row) => Math.abs(row.amount),
            },
            {
                header: 'Es préstamo',
                accessorFn: (row) => (row.itIsLoan ? 'Sí' : 'No'),
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
                                onClick: () => navigate(`/payments/${row.id}`),
                            },
                            {
                                icon: 'delete',
                                label: 'Eliminar',
                                onClick: () => setConfirmDeleteModal(row.id),
                                hidden: props.isSimpleTable,
                            },
                            {
                                icon: <Unlink />,
                                label: 'Eliminar relación',
                                onClick: () => setConfirmUnRelateModal(row.id),
                                hidden: !props.isSimpleTable || !props.parentPaymentId,
                                destructive: true,
                            },
                        ]}
                    />
                ),
            },
        ],
        [],
    );

    const table = useReactTable({
        data: props.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
            columnVisibility: { select: !props.isSimpleTable },
        },
    });

    return (
        <>
            {!props.isSimpleTable && (
                <div className="flex justify-between flex-wrap gap-2">
                    <div className="flex gap-2">
                        <Link to="/payments/create">
                            <Button variant="success">
                                <Plus /> Crear nuevo pago
                            </Button>
                        </Link>
                        <FiltersBtn></FiltersBtn>
                    </div>
                    {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
                        <div className="flex gap-2 justify-end">
                            <MotionEffect slide inView>
                                <Button
                                    loading={
                                        relatePaymentsMutation.isPending ||
                                        unrelatePaymentsMutation.isPending
                                    }
                                    disabled={table.getSelectedRowModel().rows.length < 2}
                                    onClick={() => setConfirmRelateModal(true)}
                                >
                                    Relacionar pagos
                                </Button>
                            </MotionEffect>
                        </div>
                    )}
                </div>
            )}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} colSpan={header.colSpan}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
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
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TBodyWithLoader>
            </Table>
            {!props.isSimpleTable && <DataTablePagination table={table} />}

            <ConfirmationModal
                open={confirmDeleteModal !== null}
                onOpenChange={() => setConfirmDeleteModal(null)}
                title="Borrar pago"
                description="¿Confirmas eliminar el pago?"
                loading={deletePagoLoading}
                onConfirm={async () => {
                    await deletePayment(confirmDeleteModal!);
                    setConfirmDeleteModal(null);
                }}
            />
            <ConfirmationModal
                open={confirmRelateModal}
                onOpenChange={setConfirmRelateModal}
                title="Relacionar pagos"
                description="¿Confirmas relacionar todos los pagos seleccionados?"
                loading={relatePaymentsMutation.isPending}
                onConfirm={async () => {
                    await relatePaymentsMutation.mutateAsync(
                        table.getSelectedRowModel().rows.map((row) => row.original.id),
                    );
                    table.setRowSelection({});
                    setConfirmRelateModal(false);
                }}
            />
            <ConfirmationModal
                open={confirmUnRelateModal !== null}
                onOpenChange={() => setConfirmUnRelateModal(null)}
                title="Relacionar pagos"
                description="¿Confirmas deshacer la relación del pago?"
                loading={unrelatePaymentsMutation.isPending}
                onConfirm={async () => {
                    await unrelatePaymentsMutation.mutateAsync({
                        paymentId_1: confirmUnRelateModal!,
                        paymentId_2: props.parentPaymentId!,
                    });
                    setConfirmUnRelateModal(null);
                }}
            />
        </>
    );
};

export default PaymentsTable;
