import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { useNavigate, Link } from 'react-router-dom';
import { authClient } from './authClient';

type Props = {
    children: React.ReactNode;
};

const AuthLink: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
}> = (props: { href: string; className?: string; children: React.ReactNode }) => {
    return (
        <Link to={props.href} className={props.className}>
            {props.children}
        </Link>
    );
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
            Link={AuthLink}
        >
            {children}
        </AuthUIProvider>
    );
};

export default AuthProvider;
