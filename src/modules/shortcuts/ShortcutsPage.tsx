import { Button } from '@/components/ui/button';
import { useSetAppTitle } from '../dashboard/HeaderLayout';
import { Link } from 'react-router-dom';

type Props = {};

const ShortcutsPage: React.FC<Props> = () => {
    useSetAppTitle('Shortcuts');

    return (
        <>
            <div className="flex flex-col h-[100%] justify-center items-center">
                <div className="flex flex-col gap-4">
                    <Button size="lg">
                        <Link to="/payments/create">Registrar pago</Link>
                    </Button>
                    <Button size="lg">
                        <Link to="#">Registrar fecha</Link>
                    </Button>
                    <Button size="lg">
                        <Link to="#">Tomar foto</Link>
                    </Button>
                    <Button size="lg">
                        <Link to="#">Otro...</Link>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ShortcutsPage;
