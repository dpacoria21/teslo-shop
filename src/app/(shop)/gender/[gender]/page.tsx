export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductsGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        gender: string
    },
    searchParams: {
        page?: string
    }
}

const categories: String[] = ['men','women', 'kid', 'unisex'];

const seedProducts = initialData.products;

export default async function CategoryIdPage({params, searchParams}: Props) {

    const {gender} = params;

    const page = searchParams.page ? +searchParams.page : 1;

    const labels: Record<string, string> = {
        'men': 'hombres',
        'women': 'mujeres',
        'kid': 'niños',
        'unisex': 'todos',
    };

    // if(!categories.includes(gender)) {
    //     notFound();
    // }

    const {currentPage, totalPages, products} = await getPaginatedProductsWithImages({gender: gender as Gender, page});


    if(products.length===0) {
        redirect(`/gender/${gender}`);
    }

    return (
        <>
            <Title 
                title={`Prendas para ${labels[`${gender}`]}`}
            />
            <ProductsGrid 
                products={products}
            />

            <Pagination 
                totalPages={totalPages}
            />
        </>
    );
}