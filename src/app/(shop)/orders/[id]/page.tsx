import { OrderStatus, PaypalButton, Title } from '@/components';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';
import { redirect } from 'next/navigation';

import Image from 'next/image';

interface Props {
    params: {
        id: string
    }
}

export default async function OrderPageById({params}: Props) {

    const {id} = params;

    const {ok, orderAddress, order, items} = await getOrderById(id);

    if(!ok) redirect('/');

    // TODO: verificar => hacer el redirect()

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title 
                    title={`Orden #${id.slice(24)}`}
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                    <div className='flex flex-col mt-5'>

                        <OrderStatus isPaid={order.isPaid}/>

                        {/* Items */}
                        {
                            items.map((item: any, i: number) => (
                                <div 
                                    className='flex mb-5'
                                    key={item.slug+i}
                                >
                                    <Image 
                                        src={`/products/${item.images[0]}`}
                                        alt={item.title}
                                        width={100}
                                        height={100}
                                        className='mr-5 rounded'
                                    />

                                    <div>
                                        <p>{item.title}</p>
                                        <p>${item.price} x ${item.quantity}</p>
                                        <p className='font-bold'>Subtotal: ${item.price*item.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                    {/* Checkout - Resumen de la compra */}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>

                        <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
                        <div className='mb-5'>
                            <p className='text-xl'>{orderAddress.firstName} {orderAddress.lastName}</p>
                            <p>{orderAddress.address}</p>
                            <p>{orderAddress.address2}</p>
                            <p>CP {orderAddress.postalCode}</p>
                            <p>{orderAddress.phone}</p>
                            <p>{orderAddress.country.name} - {orderAddress.city}</p>
                        </div>

                        <div className='w-full h-0.5 rounded bg-gray-200 mb-5'/>

                        <h2 className='text-2xl mb-2'>Resumen de orden</h2>

                        <div className='grid grid-cols-2'>
                            <span>No. Productos</span>
                            <span className='text-right'>{order.itemsInOrder} articulos</span>

                            <span>Subtotal</span>
                            <span className='text-right'>{currencyFormat(order.subTotal)}</span>

                            <span>Impuestos</span>
                            <span className='text-right'>{currencyFormat(order.tax)}</span>

                            <span className='mt-5 text-2xl'>Total</span>
                            <span className='mt-5 text-2xl text-right'>{currencyFormat(order.total)}</span>

                        </div>
                        <div className='mt-5 mb-2 w-full'>

                            {/* <div className={
                                clsx(
                                    'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                                    {
                                        'bg-red-500': !order.isPaid,
                                        'bg-green-700': order.isPaid,
                                    }
                                )
                            }>
                                <IoCardOutline size={30}/>

                                {
                                    order.isPaid 
                                        ? (<span className='mx-2'>Orden pagada</span>)
                                        : (<span className='mx-2'>Pendiente de pago</span>) 
                                }

                            </div> */}

                            {
                                order.isPaid
                                    ? (
                                        <OrderStatus isPaid={order.isPaid}/>
                                    ) : (
                                        <PaypalButton 
                                            amount={order.total}
                                            orderId={order.id}
                                        />
                                    )
                            }

                        </div>

                    </div>          
                </div>


            </div>
        </div>
    );
}