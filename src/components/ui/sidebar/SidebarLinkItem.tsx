import Link from 'next/link';

interface Props {
    path: string,
    icon: React.ReactElement,
    label: string,
}

export const SidebarLinkItem = ({path, icon, label}: Props) => {
    return (
        <Link
            href={path}
            className='flex gap-4 items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};
