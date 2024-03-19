'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const setTransactionId = async(orderId: string, transactionId: string) => {

    const session = await auth();
    if(!session?.user) {
        return {
            ok: false,
            message: 'nadie esta autenticado'
        };
    }

    try {

        const order = await prisma.order.update({
            where: {
                id: orderId, 
            },
            data: {
                transactionId: transactionId,
            }
        });

        if(!order) {
            return {
                ok: false,
                message: `no se encontro una orden con el id ${orderId}`
            };
        }
        
        return {
            ok: true,
        };

    }catch(err) {
        return {
            ok: false,
            message: 'No se pudo guardar el transactionId'
        };
    }

};