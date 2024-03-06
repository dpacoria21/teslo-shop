import { titleFont } from '@/config/fonts';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p className="text-slate-800 font-bold text-5xl">Teslo Shop</p>
            <h1 className={`${titleFont.className} font-bold`}>Hola a todos bebecitas</h1>
        </main>
    );
}