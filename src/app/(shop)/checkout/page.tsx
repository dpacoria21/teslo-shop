import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title 
                    title="Verificar orden"
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                    <div className='flex flex-col mt-5'>
                        <span className='text-xl'>Ajustar elementos</span>
                        <Link href={'/'} className='underline mb-5'>
                            Editar  carrito
                        </Link>

                        {/* Items */}
                        {
                            productsInCart.map((product) => (
                                <div 
                                    className='flex mb-5'
                                    key={product.slug}
                                >
                                    <Image 
                                        src={`/products/${product.images[0]}`}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        className='mr-5 rounded'
                                    />

                                    <div>
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3</p>
                                        <p className='font-bold'>Subtotal: ${product.price*3}</p>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                    {/* Checkout - Resumen de la compra */}
                    <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>

                        <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
                        <div className='mb-5'>
                            <p className='text-xl'>Diego Pacori</p>
                            <p>Av. Francisco Pizarro 123</p>
                            <p>Col. Viva</p>
                            <p>Jose Luis Bustamante y Rivero</p>
                            <p>CP 20123</p>
                            <p>123123123</p>
                        </div>

                        <div className='w-full h-0.5 rounded bg-gray-200 mb-5'/>

                        <h2 className='text-2xl mb-2'>Resumen de orden</h2>

                        <div className='grid grid-cols-2'>
                            <span>No. Productos</span>
                            <span className='text-right'>3 articulos</span>

                            <span>Subtotal</span>
                            <span className='text-right'>$ 100</span>

                            <span>Impuestos</span>
                            <span className='text-right'>$ 100</span>

                            <span className='mt-5 text-2xl'>Total</span>
                            <span className='mt-5 text-2xl text-right'>$ 100</span>

                        </div>
                        <div className='mt-5 mb-2 w-full'>

                            <p className="mb-5">
                                <span className="text-xs">
                                    Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros  <a href="#" className='underline'>terminos y condiciones</a> y <a href="#" className='underline'>politicas de privacidad</a>
                                </span>
                            </p>

                            <Link 
                                className='flex btn-primary justify-center'
                                href={'/orders/123'}
                            >
                                Colocar orden
                            </Link>
                        </div>

                    </div>          
                </div>


            </div>
        </div>
    );
}