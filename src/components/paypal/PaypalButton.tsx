'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
    orderId: string,
    amount: number,
}

export const PaypalButton = ({amount, orderId}: Props) => {

    const [{isPending}] = usePayPalScriptReducer();

    const roundedAmount = (Math.round(amount*100))/100;
    
    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmount}`,
                    }
                }
            ]
        });
 
        // Guardar el ID en la base de datos: setTransactinoId (/action/payments/set-transaction-id.ts)

        const {ok} = await setTransactionId(orderId, transactionId);

        if(!ok) {
            throw new Error('No se pudo realizar la transaccion');
        }


        return transactionId;
    };

    const onApprove = async(data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        const details = await actions.order?.capture();
        if(!details) return;
        
        await paypalCheckPayment(details.id!);
    };

    if(isPending) {
        return (
            <div className='animate-pulse'>
                <div className='h-10 bg-gray-300 rounded'/>
                <div className='h-10 bg-gray-300 rounded mt-3 mb-16'/>
            </div>
        );
    }

    return (
        <div className='relative z-0'>
            <PayPalButtons 
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    );
};
