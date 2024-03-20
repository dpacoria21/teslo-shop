'use client';

import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props{
    product: Product
}
export const ProductGridItem = ({product}: Props) => {

    let initialSrc = '';
    if(product?.images[0]) {
        if(product?.images[0].startsWith('http')) {
            initialSrc = (product.images[0]);
        }else {
            initialSrc = (`/products/${product?.images[0]}`);
        }
    }else{
        initialSrc = ('/imgs/placeholder.jpg');
    }

    const [displayImage, setDisplayImage] = useState(initialSrc);

    const onChangeImage = (image: number) => {
        // console.log(product.images[image]);
        if(product?.images[image]) {
            if(product?.images[image].startsWith('http')) {
                setDisplayImage(product.images[image]);
            }else {
                setDisplayImage(`/products/${product?.images[image]}`);
            }
        }else{
            setDisplayImage('/imgs/placeholder.jpg');
        }
    };

    console.log(displayImage);

    return (
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={`/product/${product.slug}`}>
                <Image 
                    onMouseEnter={() => onChangeImage(1)}
                    onMouseLeave={() => onChangeImage(0)}
                    src={displayImage}
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
