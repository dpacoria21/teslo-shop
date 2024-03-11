'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
    product: Product
}

export const AddToCart = ({product}: Props) => {

    const addProductToCart = useCartStore((state) => state.addProductToCart);

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = () => {
        setPosted(true);
        if(!size) return;

        const cartProduct:CartProduct = {
            id: product.id,
            image: product.images[0],
            price: product.price,
            title: product.title,
            quantity,
            size,
            slug: product.slug
        };

        addProductToCart(cartProduct);
        
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        // console.log({size, quantity});
    };

    return (
        <>

            {
                posted && !size  && (
                    <span className='text-red-500 font-medium fade-in'>
                    Debe de seleccionar una talla*
                    </span>
                )
            }


            <SizeSelector 
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />


            {/* Selector de cantidad */}

            <QuantitySelector 
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Button */}
            <button onClick={addToCart} className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    );
};
