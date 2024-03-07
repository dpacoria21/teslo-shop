'use client';

import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props{
    product: Product
}
export const ProductGridItem = ({product}: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    const onChangeImage = (image: number) => {
        setDisplayImage(product.images[image]);
    };

    return (
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={`/product/${product.slug}`}>
                <Image 
                    onMouseEnter={() => onChangeImage(1)}
                    onMouseLeave={() => onChangeImage(0)}
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className='w-full object-cover rounded'
                    width={500}
                    height={500}
                />
            </Link>

            <div className='p-4 flex flex-col'>
                <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <span className='font-bold'>${product.price}</span>

            </div>
        </div>
    );
};