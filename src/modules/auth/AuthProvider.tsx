import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { useNavigate, NavLink } from 'react-router-dom';
import { authClient } from './authClient';

type Props = {
    children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <AuthUIProvider
            authClient={authClient}
            signUp={false}
            credentials={{ forgotPassword: false }}
            localization={{}}
            navigate={navigate}
            // @ts-ignore
            Link={NavLink}
        >
            {children}
        </AuthUIProvider>
    );
};

export default AuthProvider;
