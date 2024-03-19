'use server';

import { PayPalOrderStatusResponse } from '@/interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async(transactionId: string) => {

    const authToken = await getPaypalBearerToken();

    if(!authToken) {
        return {
            ok: false,
            message: 'No se pudo obtener el token de verificacion'
        };
    }

    const resp = await verifyPayPalPayment(transactionId, authToken);
    if(!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        };
    }
    
    const {status, purchase_units} = resp;
    const {invoice_id: orderId} = purchase_units[0];
    
    if(status !== 'COMPLETED') { 
        return {
            ok: false,
            message: 'Aun no se ha pagado en Paypal'
        };
    }
    
    try{

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        });

        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true,
        };

        //TODO revalidar path
        

    }catch(err) {
        console.log(err);
        return {
            ok: false,
            message: '500- el pago no se puedo realizar'
        };
    }

};

const verifyPayPalPayment = async(transactionId: string, bearerToken: string): Promise<PayPalOrderStatusResponse | null> => {

    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${bearerToken}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    try{

        const resp = await (await fetch( paypalOrderUrl, requestOptions)).json();
        return resp;

    }catch(err) {
        console.log(err);
        return null;
    }
};

const getPaypalBearerToken = async(): Promise<string | null> => {
    
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET_ID = process.env.NEXT_PUBLIC_PAYPAL_SECRET_ID;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${ PAYPAL_CLIENT_ID }:${ PAYPAL_SECRET_ID }`,
        'utf-8'
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    try {

        const result = await (await fetch(oauth2Url, requestOptions)).json();
        return result.access_token;
            
            
    }catch(err) {
        console.log(err);
        return null;
    }

};