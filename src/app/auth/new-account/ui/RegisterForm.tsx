'use client';
import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
    name: string,
    email: string,
    password: string,
}

export const RegisterForm = () => {


    const [errorMessage, setErrorMessage] = useState('');
    const {handleSubmit, register, formState: {errors}} = useForm<FormInputs>();

    const onSubmit = async(data: FormInputs) => {
        
        setErrorMessage('');
        const {name, email, password} = data;
        const resp = await registerUser(name, email, password);

        if(!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLocaleLowerCase(), password);
        window.location.replace('/');

    };

    return (
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="name">Nombre Completo</label>
            <input
                className={
                    clsx(
                        'px-5 py-2 border bg-gray-200 rounded mb-5 ',
                        {
                            'border-red-600': !!errors['name']
                        }
                    )
                }
                type="text" 
                autoFocus
                {...register('name', {required: true})}
            />
            {/* {
                errors['name'] && <span className="-mt-2 mb-4 text-sm text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                El nombre es obligatorio
                </span>
            } */}


            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        'px-5 py-2 border bg-gray-200 rounded mb-5 ',
                        {
                            'border-red-600': !!errors['email']
                        }
                    )
                }
                type="email" 
                {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
            />


            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        'px-5 py-2 border bg-gray-200 rounded mb-5 ',
                        {
                            'border-red-600': !!errors['password']
                        }
                    )
                }
                type="password" 
                {...register('password', {required: true, minLength: 6})}
            />

            <span className="-mt-2 mb-4 text-sm text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {errorMessage}
            </span>

            <button
                type='submit'
                className="btn-primary"
            >
                    Ingresar
            </button>

        </form>
    );
};
