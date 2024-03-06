
export const metadata = {
    title: 'Auth Layout',
    description: 'Auth Layout',
};

export default function AuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return(
        <main className="min-h-screen min-w-screen bg-slate-700">
            {children}
        </main>
    );
}