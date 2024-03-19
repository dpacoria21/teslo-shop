'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if(!loaded) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            {
                productsInCart.map((product, i) => (
                    <div 
                        className='flex mb-5'
                        key={product.slug+i}
                    >
                        <Image 
                            src={`/products/${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            className='mr-5 rounded'
                        />

                        <div>
                            <span className='hover:underline'>
                                {product.size} - {product.title}
                            </span>
                            <p className='font-bold'>{currencyFormat(product.price*product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </>
    );
};
