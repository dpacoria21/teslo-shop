'use client';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';
import { SidebarLinkItem } from './SidebarLinkItem';
import { useUIStore } from '@/store';
import clsx from 'clsx';

export const Sidebar = () => {

    const {isSideMenuOpen, openSideMenu, closeSideMenu} = useUIStore(state => state); 

    return (
        <div>

            {/* Background black */}

            {
                isSideMenuOpen && (
                    <div 
                        className="fixed top-0 w-screen h-screen z-10 bg-black opacity-30"
                    />
                )
            }

            {/* Blur */}

            {
                isSideMenuOpen && (
                    <div 
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />
                )
            }

            <nav 
                // Efecto de slide
                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                        {
                            'translate-x-full': !isSideMenuOpen
                        }
                    )
                }
            >

                <IoCloseOutline 
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={() => closeSideMenu()}
                />

                {/* Input */}
                <div className='relative mt-14'>
                    <IoSearchOutline 
                        size={20}
                        className='absolute top-2 left-2'
                    />
                    <input 
                        type='text'
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                    />

                </div>

                {/* Menu */}

                <SidebarLinkItem 
                    path='/'
                    icon={<IoPersonOutline size={30}/>}
                    label='Perfil'
                />
                <SidebarLinkItem 
                    path='/'
                    icon={<IoTicketOutline size={30}/>}
                    label='Ordenes'
                />
                <SidebarLinkItem 
                    path='/'
                    icon={<IoLogInOutline size={30}/>}
                    label='Ingresar'
                />
                <SidebarLinkItem 
                    path='/'
                    icon={<IoLogOutOutline size={30}/>}
                    label='Salir'
                />

                {/* Line Separator */}
                <div className='w-full h-px bg-gray-200 my-10' />

                <SidebarLinkItem 
                    path='/'
                    icon={<IoShirtOutline size={30}/>}
                    label='Productos'
                />
                <SidebarLinkItem 
                    path='/'
                    icon={<IoTicketOutline size={30}/>}
                    label='Ordenes'
                />
                <SidebarLinkItem 
                    path='/'
                    icon={<IoPeopleOutline size={30}/>}
                    label='Usuarios'
                />

                

            </nav>

        </div>
    );
};
