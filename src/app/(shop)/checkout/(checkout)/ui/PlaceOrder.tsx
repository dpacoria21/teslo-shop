'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSummaryInformation());


    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if(!loaded) {
        return <p>Cargando ...</p>;
    }

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }));

        const resp = await placeOrder(productsToOrder, address);
        if(!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        clearCart();
        router.replace('/orders/'+resp.order?.id);

    };

    return (
        <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>

            <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
            <div className='mb-5'>
                <p className='text-xl'>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-5'/>

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
                <span>No. Productos</span>
                <span className='text-right'>{itemsInCart} articulos</span>

                <span>Subtotal</span>
                <span className='text-right'>{currencyFormat(subTotal)}</span>

                <span>Impuestos</span>
                <span className='text-right'>{currencyFormat(tax)}</span>

                <span className='mt-5 text-2xl'>Total</span>
                <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>

            </div>
            <div className='mt-5 mb-2 w-full'>

                <p className="mb-5">
                    <span className="text-xs">
                                    Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros  <a href="#" className='underline'>terminos y condiciones</a> y <a href="#" className='underline'>politicas de privacidad</a>
                    </span>
                </p>

                <button
                    onClick={onPlaceOrder}
                    // href={'/orders/123'}
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    }
                >
                    Colocar orden
                </button>
            </div>

        </div>
    );
};
