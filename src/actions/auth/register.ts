'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async( name: string, email: string, password: string ) => {
    try {

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLocaleLowerCase(),
                password: bcryptjs.hashSync(password)
            }
        });

        const {password: _, ...rest} = user;

        return {
            ok: true,
            user: rest,
            message: 'Usuario creado'
        };

    }catch(err) {
        console.log(err);
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        };
    }
};