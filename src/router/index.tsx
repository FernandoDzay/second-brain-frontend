import { AuthGuard, AuthPage } from '@/modules/auth';
import { DashboardLayout, DashBoardPage } from '@/modules/dashboard';
import { PaymentsPage } from '@/modules/payments';
import CreatePaymentPage from '@/modules/payments/CreatePaymentPage';
import EditPaymentPage from '@/modules/payments/EditPaymentPage';
import { ShortcutsPage } from '@/modules/shortcuts';
import { Route, Routes } from 'react-router-dom';

type Props = {};

const Router: React.FC<Props> = () => {
    return (
        <Routes>
            <Route element={<AuthGuard />}>
                <Route element={<DashboardLayout />}>
                    <Route index element={<DashBoardPage />} />
                    <Route path="/shortcuts" element={<ShortcutsPage />} />

                    <Route path="/payments" element={<PaymentsPage />} />
                    <Route path="/payments/create" element={<CreatePaymentPage />} />
                    <Route path="/payments/:id" element={<EditPaymentPage />} />
                </Route>
            </Route>
            <Route path="/auth/:pathname" element={<AuthPage />} />
        </Routes>
    );
};

export default Router;
