import { ProductsGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: Category
    }
}

const categories: String[] = ['men','women', 'kid', 'unisex'];

const seedProducts = initialData.products;

export default function CategoryIdPage({params}: Props) {

    const {id} = params;

    const labels: Record<Category, string> = {
        'men': 'hombres',
        'women': 'mujeres',
        'kid': 'niños',
        'unisex': 'todos',
    };

    if(!categories.includes(id)) {
        notFound();
    }

    const productsByCategory = seedProducts.filter((product) => product.gender === id);

    return (
        <>
            <Title 
                title={`Prendas para ${labels[`${id}`]}`}
            />
            <ProductsGrid 
                products={productsByCategory}
            />
        </>
    );
}