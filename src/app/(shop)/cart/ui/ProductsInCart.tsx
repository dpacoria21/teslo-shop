'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const onDeleteProduct = useCartStore(state => state.deleteProduct);

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
                            <Link className='hover:underline cursor-pointer' href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector 
                                quantity={product.quantity}
                                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                            />
                            <button 
                                onClick={() => onDeleteProduct(product)}
                                className='underline mt-3'
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    );
};
