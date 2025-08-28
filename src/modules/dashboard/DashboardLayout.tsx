import { Outlet } from 'react-router-dom';

type Props = {};

const DashboardLayout: React.FC<Props> = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default DashboardLayout;
