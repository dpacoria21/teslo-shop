'use server';
import prisma from '@/lib/prisma';
export const getStockBySlug = async(slug: string): Promise<number> => {

    try {
        const stock = await prisma?.product.findFirst({
            where: {
                slug
            },
            select: {
                inStock: true
            }
        });
        return stock?.inStock ?? 0;
    }catch (err) {
        console.log(err);
        throw new Error('No se encontro el product por el slug');
    }

};
