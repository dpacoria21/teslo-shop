'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async(orderId: string) => {

    const session = await auth();
    if(!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        };
    }

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                OrderItem: {
                    include: {
                        product: {
                            include: {
                                ProductImage: true
                            }
                        }
                    }
                },
                OrderAddress: {
                    include: {
                        country: true
                    }
                },
            }
        });
    
        const {OrderAddress, OrderItem, ...restOrder} = (order as any);
    
        if(session.user.role === 'user') {
            if(session.user.id !== restOrder.userId) {
                throw new Error(`${restOrder.id} no es de este usuario`);
            }
        }

        // console.log(OrderItem[0]);
        const orderItems = OrderItem.map(((ordenProduct: any) => {
            const {orderId, productId, product, ...rest} = ordenProduct;

            const {title, description, slug, ProductImage} = product;
            return {
                ...rest,
                title,
                description,
                slug,
                images: ProductImage.map((image: any) => image.url)
            };
        }));

        return {
            ok: true,
            orderAddress: OrderAddress,
            items: orderItems,
            order: restOrder
        };

    }catch(err) {
        return {
            ok: false,
            message: 'No se encontro ninguna orden'
        };
    }

    
};