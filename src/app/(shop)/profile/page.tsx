import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {

    const session = await auth();
    // if(!session?.user) redirect('/auth/login?returnTo=perfil');
    if(!session?.user) redirect('/auth/login');

    return (
        <div>
            <Title title="Perfil"/>
            <pre>
                {
                    JSON.stringify(session.user, null, 4)
                }
            </pre>
            <h3 className='text-3xl'>
                {session.user.role}
            </h3>
        </div>
    );
}