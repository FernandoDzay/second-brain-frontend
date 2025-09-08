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
    useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => {
    const { pathname } = useLocation();
    const sidebar = useSidebar();
    const mainLinks = [
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
    ];

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
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
                            {mainLinks.map((item, key) => (
                                <SidebarMenuItem key={key}>
                                    <Link
                                        to={item.link}
                                        onClick={() => {
                                            if (sidebar.isMobile) sidebar.setOpenMobile(false);
                                        }}
                                    >
                                        <SidebarMenuButton
                                            className={cn(
                                                item.link === pathname
                                                    ? '!bg-primary !text-primary-foreground'
                                                    : '',
                                            )}
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
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
