import { AuthGuard, AuthPage } from '@/modules/auth';
import { DashboardLayout, DashBoardPage, HeaderLayout } from '@/modules/dashboard';
import { PaymentsPage } from '@/modules/payments';
import { ShortcutsPage } from '@/modules/shortcuts';
import { Route, Routes } from 'react-router-dom';

type Props = {};

const Router: React.FC<Props> = () => {
    return (
        <Routes>
            <Route element={<AuthGuard />}>
                <Route element={<DashboardLayout />}>
                    <Route index element={<DashBoardPage />} />
                </Route>
                <Route element={<HeaderLayout />}>
                    <Route path="/shortcuts" element={<ShortcutsPage />} />
                    <Route path="/payments/create" element={<PaymentsPage />} />
                </Route>
            </Route>
            <Route path="/auth/:pathname" element={<AuthPage />} />
        </Routes>
    );
};

export default Router;
