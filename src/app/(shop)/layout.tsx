

export const metadata = {
    title: 'Teslo-Shop',
    description: 'Teslo Shop Layout',
};

export default function ShopLayout ({children}: Readonly<{children: React.ReactNode;}>) {
    return(
        <main className="min-h-screen bg-slate-500">
            {children}
        </main>
    );
}