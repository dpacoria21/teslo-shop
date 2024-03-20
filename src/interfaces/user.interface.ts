import { Role } from '@prisma/client';

export interface User {
    id: string,
    name: string,
    email: string,
    emailVerified?: Date | null,
    password: string,
    role: Role,
    image?: string | null,
}