import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Router from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import AuthProvider from '@/modules/auth/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import * as z from 'zod';
import { es } from 'zod/locales';

z.config(es());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </BrowserRouter>
            <Toaster />

            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}

export default App;
