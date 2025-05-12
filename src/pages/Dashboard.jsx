import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// --- Icon Imports ---
import { FaList, FaBorderAll, FaHeart, FaRegCalendarAlt } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp, IoLogOutOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
// --- Router Imports ---
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// --- Redux Imports ---
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cardReducer';
// --- API ---
import api from '../api/api';
import toast from 'react-hot-toast';
// --- Translation ---
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const [filterShow, setFilterShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- Logout Handler ---
    const logout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await api.get('/customer/logout');
            localStorage.removeItem('customerToken');
            dispatch(user_reset());
            dispatch(reset_count());
            toast.success('Logged out successfully', { id: toastId });
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Logout failed.', { id: toastId });
        }
    };

    // --- Link Styles for LEFT BORDER ACTIVE STATE ---
    const baseLinkStyle = 'flex items-center gap-3 py-2 pr-3 pl-3 rounded-r-md transition-colors duration-150 border-l-4 border-transparent';
    const inactiveLinkStyle = `${baseLinkStyle} text-slate-600 hover:bg-slate-100 hover:text-slate-800`;
    const activeLinkStyle = `${baseLinkStyle} border-green-600 text-green-700 font-medium bg-green-50`;

    const handleLinkClick = () => {
        setFilterShow(false);
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {/* Main Content Area */}
            <div className='flex-grow bg-slate-100 mt-5'>

                {/* Mobile Toggle Button */}
                <div className='w-[90%] mx-auto pt-4 lg:hidden'>
                    <button
                        onClick={() => setFilterShow(!filterShow)}
                        className='p-2 bg-white text-slate-700 border rounded shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400'
                        aria-label="Toggle Navigation Menu"
                    >
                        <FaList size={20} />
                    </button>
                </div>

                {/* Dashboard Container */}
                <div className='w-[90%] lg:w-[95%] xl:w-[90%] mx-auto py-5 flex relative'>

                    {/* Sidebar Navigation - LIGHT THEME / LEFT BORDER */}
                    <aside className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto lg:top-5 w-[270px] bg-white rounded-md shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${filterShow ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:mr-6 self-start`}>
                        {/* Close button for mobile */}
                        <button
                            onClick={() => setFilterShow(false)}
                            className='absolute top-3 right-3 lg:hidden text-slate-500 hover:text-red-500'
                            aria-label="Close Navigation Menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Links List */}
                        <nav className='py-4 px-0 mt-10 lg:mt-4'>
                            <ul className='space-y-1'>
                                <li>
                                    <NavLink to='/dashboard' end className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <IoIosHome size={20} className="ml-1" />
                                        <span>{t('dashboard_menu.dashboard')}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-orders' className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <FaBorderAll size={18} className="ml-1" />
                                        <span>{t('dashboard_menu.my_orders')}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-bookings' className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <FaRegCalendarAlt size={18} className="ml-1" />
                                        <span>{t('dashboard_menu.my_bookings')}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-wishlist' className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <FaHeart size={18} className="ml-1" />
                                        <span>{t('dashboard_menu.wishlist')}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/chat' className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <IoChatbubbleEllipsesSharp size={20} className="ml-1" />
                                        <span>{t('dashboard_menu.chat')}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/change-password' className={({ isActive }) => isActive ? activeLinkStyle : inactiveLinkStyle} onClick={handleLinkClick}>
                                        <RiLockPasswordLine size={20} className="ml-1" />
                                        <span>{t('dashboard_menu.change_password')}</span>
                                    </NavLink>
                                </li>
                                <li className="pt-4 mx-3">
                                     <div className="border-t border-slate-200"></div>
                                 </li>
                                <li className="px-3">
                                    <button onClick={logout} className={`${inactiveLinkStyle} w-full group border-l-4 border-transparent`}>
                                        <IoLogOutOutline size={22} className="text-slate-500 group-hover:text-red-500" />
                                        <span className="group-hover:text-red-500">{t('dashboard_menu.logout')}</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content Outlet */}
                    <main className='w-full lg:w-[calc(100%-270px)]'>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;