import { getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import prisma from '@/lib/prisma';

interface Props {
    params: {
        slug: string
    }
}


export default async function ProductPage({params}: Props) {
    
    const getCategories = async() => {
        'use server';
        const categories = await prisma.category.findMany();
        return categories;
    };

    const {slug} = params;

    const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

    // const categories = await getCategories();
    // const product = await getProductBySlug(slug);

    if(!product && slug!=='new') redirect('/admin/products');

    const title = (slug==='new') ? 'Nuevo product' : 'Editar product';

    
    return (
        <>
            <Title title={title}/>

            <ProductForm product={product ?? {}} categories={categories}/>
        </>
    );
}