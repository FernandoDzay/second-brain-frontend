import { AuthGuard, AuthPage } from '@/modules/auth';
import { DashboardLayout, DashBoardPage } from '@/modules/dashboard';
import { PaymentsPage } from '@/modules/payments';
import CreatePaymentPage from '@/modules/payments/CreatePaymentPage';
import EditPaymentPage from '@/modules/payments/EditPaymentPage';
import { ShortcutsPage } from '@/modules/shortcuts';
import { CreateTaskPage, EditTaskPage, TasksPage } from '@/modules/tasks';
import BacklogPage from '@/modules/tasks/pages/backlog-page';
import MonthTasksPage from '@/modules/tasks/pages/mont-tasks-page';
import TodaysTasksPage from '@/modules/tasks/pages/todays-tasks-page';
import WeekTasksPage from '@/modules/tasks/pages/week-tasks-page';
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

                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/tasks/for-today" element={<TodaysTasksPage />} />
                    <Route path="/tasks/for-week" element={<WeekTasksPage />} />
                    <Route path="/tasks/for-month" element={<MonthTasksPage />} />
                    <Route path="/tasks/backlog" element={<BacklogPage />} />
                    <Route path="/tasks/create" element={<CreateTaskPage />} />
                    <Route path="/tasks/:id" element={<EditTaskPage />} />
                </Route>
            </Route>
            <Route path="/auth/:pathname" element={<AuthPage />} />
        </Routes>
    );
};

export default Router;
