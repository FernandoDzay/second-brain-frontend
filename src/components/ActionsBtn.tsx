import { IconDotsVertical, IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Plus } from 'lucide-react';

type IconType = 'watch' | 'edit' | 'delete' | 'create';

type Props = {
    children?: React.ReactNode;
    options?: {
        label: string;
        icon?: IconType | Exclude<React.ReactNode, string>;
        destructive?: boolean;
        onClick?: () => void;
    }[];
};

const ActionsBtn: React.FC<Props> = ({ children, options }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="rounded-full">
                    <IconDotsVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {children}
                <DropdownMenuGroup>
                    {options?.map((item, key) => (
                        <DropdownMenuItem
                            key={key}
                            className="cursor-pointer"
                            variant={
                                item?.icon === 'delete' || item.destructive
                                    ? 'destructive'
                                    : 'default'
                            }
                            onClick={item.onClick}
                        >
                            {item.icon === 'watch' ? (
                                <IconSearch />
                            ) : item.icon === 'edit' ? (
                                <IconEdit />
                            ) : item.icon === 'delete' ? (
                                <IconTrash />
                            ) : item.icon === 'create' ? (
                                <Plus />
                            ) : (
                                item.icon
                            )}
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsBtn;
