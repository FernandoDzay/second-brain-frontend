import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { UserButton } from '@daveyplate/better-auth-ui';

export function NavUser() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <UserButton className="w-[100%]" />
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
