import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui';

import { Navigate, Outlet } from 'react-router-dom';

type Props = {
    children?: React.ReactNode;
};

const AuthGuard: React.FC<Props> = ({ children }) => {
    return (
        <>
            <SignedIn>
                <Outlet />
                {children}
            </SignedIn>
            <SignedOut>
                <Navigate to="/auth/login" />
            </SignedOut>
        </>
    );
};

export default AuthGuard;
