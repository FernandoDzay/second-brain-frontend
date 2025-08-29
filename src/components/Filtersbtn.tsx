import { FilterIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

type Props = {
    children?: React.ReactNode;
};

const FiltersBtn: React.FC<Props> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FilterIcon /> Filtros
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default FiltersBtn;
