import {
    IconCreditCard,
    IconDotsVertical,
    IconLogout,
    IconNotification,
    IconUserCircle,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserButton } from '@daveyplate/better-auth-ui';

export function NavUser() {
    const { isMobile } = useSidebar();
    // session

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <UserButton className="w-[100%]" />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
