import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    cart: CartProduct[],

    addProductToCart: (product:CartProduct) => void,
    getTotalItems: () => number,
    updateProductQuantity: (product: CartProduct, quantity: number) => void,
    deleteProduct: (product: CartProduct) => void,
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    },
    clearCart: () => void,
}

export const useCartStore = create<State>()(
    // tenemos nuestro store y luego el nombre con el que queremos que sea persistente en el localStorage
    persist( 

        (set, get) => ({

            cart: [],
    
            addProductToCart: (product: CartProduct) => {
                
                const {cart} = get();
                const productInCart = cart.some((prod) => prod.id===product.id && prod.size===product.size);
                
                if(!productInCart) {
                    set({cart: [...cart, product]});
                    return;
                }
                
                set({cart: cart.map((prod) => {
                    if(prod.id===product.id && prod.size===product.size) {
                        prod.quantity+=product.quantity;
                    }
                    return prod;
                })});
            },
            getTotalItems: () => {
                const {cart} = get();
                return cart.reduce((acum, curr) => acum+curr.quantity, 0);
            },
            updateProductQuantity: (product, quantity) => {
                const {cart} = get();
                set({cart: cart.map((prod) => {
                    if(prod.id === product.id && prod.size === product.size) {
                        prod.quantity = quantity;
                    }
                    return prod;
                })});
            },
            deleteProduct: (product) => {
                const {cart} = get();
                set({cart: cart.filter((prod) => {
                    if(prod.id===product.id && prod.size===product.size) {
                        return false;
                    }
                    return true;
                })});
            },
            getSummaryInformation: () => {
                const {cart} = get();
                const subTotal = cart.reduce((acum, curr) => acum+curr.price*curr.quantity, 0);
                const tax = subTotal*0.15;
                const total = subTotal+tax;
                const itemsInCart = cart.reduce((acum, curr) => acum+curr.quantity, 0);
                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart
                };
            },
            clearCart: () => {
                set({cart: []});
            }
    
        }),

        {
            name: 'shopping-cart',
        }
    )

);