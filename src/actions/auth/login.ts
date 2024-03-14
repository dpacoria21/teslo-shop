'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        
        console.log(Object.fromEntries(formData));
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });
        return 'Success';

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credentials invalid!';
                default:
                    return 'Something went wrong.';
            }
        }
        // throw error;
    }
}


export const login = async(email: string, password: string) => {
    try{
        await signIn('credentials', {email, password});
        return {
            ok: true
        };
    }catch(err) {
        console.log(err);
        return {
            ok: false,
            message: 'No se puedo iniciar sesion'
        };
    }
};