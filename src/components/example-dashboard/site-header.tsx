import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppTitleContext } from '@/modules/dashboard/HeaderLayout';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    hasSidebar?: boolean;
};

export function SiteHeader(props: Props) {
    const appTitle = useContext(AppTitleContext);

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 p-2">
                {props.hasSidebar && (
                    <>
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                    </>
                )}
                <h1 className="text-base font-medium">{appTitle}</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" asChild size="sm" className="sm:flex">
                        <Link to="/">Ir al dashboard</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
