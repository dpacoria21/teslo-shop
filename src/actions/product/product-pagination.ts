'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
    page?: number,
    take?: number,
    gender?: Gender,
}
//Cargar products
export const getPaginatedProductsWithImages = async({page = 1, take = 12, gender}: PaginationOptions) => {
    
    if(isNaN(+page)) page = 1;
    if(page < 1) page = 1;

    try {
        const products = await prisma.product.findMany({
            take,
            skip: (page-1)*take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender
            }
        });

        //Obtener el total de paginas
        const totalCount = await prisma.product.count({
            where: {
                gender
            }
        });
        const totalPages = Math.ceil(totalCount/take);

        // console.log(products);
        return {
            currentPage: page,
            totalPages,
            products: products.map((product) => ({
                ...product,
                images: product.ProductImage.map(image => image.url),
            }))
        }; 

    } catch (error) {
        console.log(error);
        throw new Error('No se puedo cargar los objetos');
    }

};