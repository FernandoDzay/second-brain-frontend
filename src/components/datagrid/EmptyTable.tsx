import { Table } from '@tanstack/react-table';
import { TableCell, TableRow } from '../ui/table';
import { Alert } from '../ui/alert';

type Props<T> = {
    table: Table<T>;
};

function EmptyTable<T>({ table }: Props<T>) {
    return (
        <TableRow>
            <TableCell colSpan={table.getAllColumns().length}>
                <Alert variant="info">Sin filas para mostrar</Alert>
            </TableCell>
        </TableRow>
    );
}

export default EmptyTable;
