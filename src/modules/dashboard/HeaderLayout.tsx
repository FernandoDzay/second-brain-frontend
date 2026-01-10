import { SiteHeader } from '@/components/example-dashboard/site-header';
import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

export const AppTitleContext = createContext<string>('');
export const SetAppTitleContext = createContext<(appTitle: string) => void>(() => {});

export const useSetAppTitle = (appTitle: string) => {
    const setAppTitle = useContext(SetAppTitleContext);
    useEffect(() => {
        setAppTitle(appTitle);
    }, [appTitle]);
};

const HeaderLayout: React.FC<Props> = () => {
    const [appTitleState, setAppTitleState] = useState('');

    return (
        <>
            <AppTitleContext.Provider value={appTitleState}>
                <SetAppTitleContext.Provider value={(newAppTitle) => setAppTitleState(newAppTitle)}>
                    <SiteHeader />
                    <Outlet />
                </SetAppTitleContext.Provider>
            </AppTitleContext.Provider>
        </>
    );
};

export default HeaderLayout;
