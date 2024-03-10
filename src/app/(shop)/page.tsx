import { getPaginatedProductsWithImages } from '@/actions';
import { ProductsGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';

const products = initialData.products;

export default async function Home() {
    
    const productsServer = await getPaginatedProductsWithImages();

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
        </>
    );
}