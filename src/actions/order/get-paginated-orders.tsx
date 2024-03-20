'use server';

import { auth } from '@/auth.config';

export const getPaginatedOrders = async() => {
    const session = await auth();
    if(session?.user.role!=='admin') {
        return  {
            ok: false,
            message: 'No tiene permisos para esta ventana'
        };
    }

    const orders = await prisma?.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    });

    return {
        ok: true,
        orders: orders,
    };
};