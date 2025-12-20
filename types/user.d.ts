export type UserType = {
    id: number;
    email: string;
    password?: string | null;
    role: number;
    request: number;
    request_max: number;
    keygen_max: number;
    keygen: number;
    cost: number;
    email_active: number;
    key?: KeyType | null;
    googleId?: string | null;
    provider?: string | null;
    displayName?: string | null;
    avatar?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
};