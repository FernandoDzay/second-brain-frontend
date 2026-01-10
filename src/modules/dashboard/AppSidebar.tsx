import * as React from 'react';
import { IconBrain, IconLayoutDashboardFilled, IconReceiptDollar } from '@tabler/icons-react';
import { NavUser } from '@/components/example-dashboard/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, NotebookPen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type SideBarItem = {
    label: string;
    link?: string;
    icon?: React.ReactNode;
    children?: {
        label: string;
        link: string;
        icon?: React.ReactNode;
    }[];
}[];

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => {
    const { pathname } = useLocation();
    const sidebar = useSidebar();
    const mainLinks: SideBarItem = [
        {
            label: 'Dashboard',
            link: '/',
            icon: <IconLayoutDashboardFilled />,
        },
        {
            label: 'Pagos',
            link: '/payments',
            icon: <IconReceiptDollar />,
        },
        {
            label: 'Tareas',
            icon: <NotebookPen />,
            children: [
                {
                    label: 'Tareas para hoy',
                    link: '/tasks/for-today',
                    // icon: <IconLayoutDashboardFilled />,
                },
                {
                    label: 'Tareas semana',
                    link: '/tasks/for-week',
                    // icon: <IconLayoutDashboardFilled />,
                },
                {
                    label: 'Tareas Mes',
                    link: '/tasks/for-month',
                    // icon: <IconLayoutDashboardFilled />,
                },
                {
                    label: 'Todas las tareas',
                    link: '/tasks',
                    // icon: <IconLayoutDashboardFilled />,
                },
                {
                    label: 'Backlog',
                    link: '/tasks/backlog',
                    // icon: <IconLayoutDashboardFilled />,
                },
            ],
        },
    ];

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <IconBrain className="!size-5" />
                                <span className="text-base font-semibold">Second brain</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {mainLinks.map((item, key) =>
                                item.children ? (
                                    <Collapsible
                                        key={key}
                                        asChild
                                        // defaultOpen={item.isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.label}>
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.children?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.label}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                className={cn(item.link === pathname ? '!bg-primary !text-primary-foreground' : '')}
                                                            >
                                                                <Link to={subItem.link}>
                                                                    {subItem.icon}
                                                                    <span>{subItem.label}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={key}>
                                        <Link
                                            to={item.link || ''}
                                            onClick={() => {
                                                if (sidebar.isMobile) sidebar.setOpenMobile(false);
                                            }}
                                        >
                                            <SidebarMenuButton className={cn(item.link === pathname ? '!bg-primary !text-primary-foreground' : '')}>
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
