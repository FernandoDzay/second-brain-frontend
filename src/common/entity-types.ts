import { AvailableTagsType } from '@/modules/tags/tags-catalog';

export type Payment = {
    id: number;
    userId: string;
    description: string;
    amount: number;
    itIsLoan: boolean;
    date: string;
    createdAt: string;
    updatedAt: string;

    user?: User;
    tags?: Tag[];
    payments?: Payment[];
};

export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;

    payments?: Payment[];
};

export type Tag = {
    id: number;
    userId: string;
    category: AvailableTagsType;
    name: string;
    description: string;

    user?: User | null;
};
