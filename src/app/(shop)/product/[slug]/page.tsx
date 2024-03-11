export const revalidate = 604800; // 7 dias

import { getProductBySlug } from '@/actions';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const slug = params.slug;
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`] 
        }
    };
}

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductPage({params}: Props) {

    const {slug} = params;

    const product = await getProductBySlug(slug);

    if(!product) notFound();

    return (
        <div className='mt-5 mb-10 grid grid-cols-1 md:grid-cols-3 gap-3'>


            <div className='col-span-1 md:col-span-2'>
                {/* Mobile slideshow */}
                <ProductMobileSlideshow 
                    title={product.title}
                    images={product.images}
                    className='block md:hidden'
                />

                {/* Slideshow */}
                <ProductSlideshow 
                    title={product.title}
                    images={product.images}
                    className='hidden md:block'
                />
            </div>

            {/* Details */}
            <div className='col-span-1 px-5'>
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
                <StockLabel slug={slug}/>
                <p className='text-lg mb-5'>${(product.price).toFixed(2)}</p>

                {/* Selector de Tallas */}
                <SizeSelector 
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />


                {/* Selector de cantidad */}

                <QuantitySelector 
                    quantity={0}
                />

                {/* Button */}
                <button className="btn-primary my-5">
                        Agregar al carrito
                </button>

                {/* description */}

                <h3 className='font-bold text-sm'>Description</h3>
                <p className='font-light'>
                    {product.description}
                </p>
                    
            </div>


        </div>
    );
}