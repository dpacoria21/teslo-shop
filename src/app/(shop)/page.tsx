export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductsGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string,
    }
}

export default async function Home({searchParams}: Props) {

    const page = searchParams.page ? +searchParams.page : 1;
    
    const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page});

    if(products.length===0) redirect('/');

    return (
        <>
            <Title 
                title='Tienda'
                subtitle='Todos los productos'
                className='mb-2'
            />

            <ProductsGrid 
                products={products}
            />

            <Pagination totalPages={totalPages}/>
            <div className='mb-8'/>
        </>
    );
}