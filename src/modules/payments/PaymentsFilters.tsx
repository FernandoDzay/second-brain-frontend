import FiltersBtn from '@/components/Filtersbtn';
import { FindAllPaymentsDto } from './payment-endpoints';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Input, Select, DatePicker } from '@/components/inputs';
import { useState } from 'react';
import { dateToString, stringToDate } from '@/common/formatters';
import { useGetTags } from '../tags/tags-endpoints';

type Props = {
    initialFilters?: FindAllPaymentsDto;
    onSubmit: (data: FindAllPaymentsDto) => void;
    onClear: () => void;
};

const PaymentsFilters: React.FC<Props> = ({ onSubmit, onClear, initialFilters }) => {
    const [filters, setFilters] = useState<FindAllPaymentsDto>(initialFilters || {});
    const { data: tags } = useGetTags();
    const tagsOptions = tags?.map((tag) => ({ value: tag.id.toString(), label: tag.name })) || [];

    return (
        <FiltersBtn>
            <form>
                <div className="flex flex-col gap-4">
                    <Input
                        value={filters.description}
                        onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                        name="description"
                        label="Descripción"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            name="amountStart"
                            type="number"
                            label="Cantidad desde"
                            value={filters.amountStart}
                            onChange={(e) =>
                                setFilters({ ...filters, amountStart: Number(e.target.value) })
                            }
                        />
                        <Input
                            name="amountEnd"
                            type="number"
                            label="Cantidad hasta"
                            value={filters.amountEnd}
                            onChange={(e) =>
                                setFilters({ ...filters, amountEnd: Number(e.target.value) })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Select
                            value={
                                filters.itIsLoan === undefined
                                    ? 'none'
                                    : filters.itIsLoan
                                      ? '1'
                                      : '0'
                            }
                            onValueChange={(val) => {
                                if (val === 'none') setFilters({ ...filters, itIsLoan: undefined });
                                else if (val === '1') setFilters({ ...filters, itIsLoan: true });
                                else if (val === '0') setFilters({ ...filters, itIsLoan: false });
                            }}
                            label="Es préstamo"
                            name="itIsLoan"
                            defaultValue="none"
                            options={[
                                { value: 'none', label: '- Ninunga opción -' },
                                { value: '1', label: 'Sí' },
                                { value: '0', label: 'No' },
                            ]}
                        />
                        <Select
                            label="Tags"
                            name="tags"
                            value={
                                filters.tags?.length && filters.tags?.length > 0
                                    ? filters.tags[0].toString()
                                    : 'none'
                            }
                            onValueChange={(val) => {
                                if (val === 'none') setFilters({ ...filters, tags: [] });
                                else setFilters({ ...filters, tags: [Number(val)] });
                            }}
                            options={[
                                { value: 'none', label: '- Ninunga opción -' },
                                ...tagsOptions,
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <DatePicker
                            value={filters.dateStart ? stringToDate(filters.dateStart) : null}
                            onChange={(date) =>
                                setFilters({
                                    ...filters,
                                    dateStart: date ? dateToString(date) : undefined,
                                })
                            }
                            name="dateStart"
                            label="Desde fecha"
                        />
                        <DatePicker
                            value={filters.dateEnd ? stringToDate(filters.dateEnd) : null}
                            onChange={(date) =>
                                setFilters({
                                    ...filters,
                                    dateEnd: date ? dateToString(date) : undefined,
                                })
                            }
                            name="dateEnd"
                            label="Hasta fecha"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setFilters({});
                                onClear();
                            }}
                        >
                            Limpiar
                        </Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <Button onClick={() => onSubmit(filters)}>Filtrar</Button>
                    </DialogTrigger>
                </div>
            </form>
        </FiltersBtn>
    );
};

export default PaymentsFilters;
