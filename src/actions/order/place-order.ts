'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { unknown } from 'zod';

interface ProductToOrder {
    productId: string,
    quantity: number,
    size: Size,

}

export const placeOrder = async(productIds: ProductToOrder[], address: Address) => {
    
    
    const session = await auth();
    const userId = session?.user.id;
    if(!userId) {
        return {
            ok: false,
            message: 'No hay sesion de usuario'
        };
    }
    
    console.log({productIds, address, userId});

    // Todo  recuerden que podemos llevar 2+ productos con el mismo Id

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });
    console.log({products});

    //Calcular los montos

    const itemsInOrder = productIds.reduce((acum, currProduct) => acum+currProduct.quantity, 0);
    console.log({itemsInOrder});

    //Totales de Tax, subtotal y total

    const {subTotal, tax, total} = productIds.reduce( (acum, curr) => {
        
        const productQuantity = curr.quantity;
        const product = products.find( p => p.id === curr.productId );

        if(!product) throw new Error(`${curr.productId} no existe - 500`);

        const subTotal = product.price*productQuantity;
        acum.subTotal += subTotal;
        acum.tax +=  subTotal*0.15;
        acum.total +=  subTotal*1.15;

        return acum;
    }, {subTotal: 0, tax: 0, total: 0});

    console.log({subTotal, tax, total});


    // Crear la transacccion de base de datos

    try{

        const prismaTx = await prisma.$transaction( async(tx) => {

            // actualizar el stock de los productos
            const updatedProductsPromises = products.map(async(product) => {
    
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce( (acum, curr) => curr.quantity+acum, 0 );
    
                if(productQuantity <= 0) {
                    throw new Error(`${product.id}, no tiene cantidad definida`);
                }
    
                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        // inStock: product.inStock - productQuantity (no se debe de hacer)
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
    
            });
    
            const updatedProducts = await Promise.all(updatedProductsPromises);
            // verificar valores negativos en las existencias = no hay stock
            updatedProducts.forEach(product => {
                if(product.inStock < 0) {
                    throw new Error(`${product.title} no tiene stock suficiente`);
                }
            });
    
            // crear la orden - encabezado - detalle
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id===p.productId)?.price ?? 0,
                            })),
                        }
                    }
                }
            });
    
            // validar, si el price es 0, lanzar un error
    
            
            // crear la direccion de la orden
            const {country, ...restAddress} = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            });
            
            return {
                order,
                orderAddress,
                updatedProducts
            };
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx
        };

    }catch(err: any) {
        return {
            ok: false,
            message: err.message
        };
    }

    

};