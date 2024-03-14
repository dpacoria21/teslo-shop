'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationCircleOutline } from 'react-icons/io5';

export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if(state === 'Success') {
            window.location.replace('/');
        }
    }, [state]);

    console.log({state});

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" 
                name='email'
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" 
                name='password'
            />


            <LoginButton />
            {/* <button
                type='submit'
                className="btn-primary"
            >
                Ingresar
            </button> */}

            <div
                className="flex h-8 space-x-1 justify-center items-center mt-5"
                aria-live="polite"
                aria-atomic="true"
            >
                {state==='Credentials invalid!' && (
                    <>
                        <IoInformationCircleOutline className="h-8 w-8 text-red-500" />
                        <p className="text-md text-red-500">{state}</p>
                    </>
                )}
            </div>

        </form>
    );
};

function LoginButton() {
    const {pending} = useFormStatus();
    return (
        <button
            type='submit'
            className={clsx(
                '', //estilos que no son dinamicos
                {
                    'btn-disabled': pending,
                    'btn-primary': !pending
                }
            )}
            disabled={pending}
        >
                Ingresar
        </button>
    );
}
