import { AuthPage } from '@/modules/auth';
import { Route, Routes } from 'react-router-dom';

type Props = {};

const Router: React.FC<Props> = () => {
    return (
        <Routes>
            <Route index element={'hola'} />
            <Route path="/auth/:pathname" element={<AuthPage />} />
        </Routes>
    );
};

export default Router;
