import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaFacebookF, FaList, FaLock, FaUser, FaBell, FaPhoneAlt } from "react-icons/fa";
import { FaTwitter, FaLinkedin, FaGithub, FaHeart, FaCartShopping, FaGlobe } from "react-icons/fa6";
import { IoMdArrowDropdown, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer';
import { fetchNotifications, toggleNotificationDropdown, updateNotifications, updateUnreadCount } from '../store/reducers/notificationReducer';
import NotificationDropdown from './NotificationDropdown';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { categorys } = useSelector(state => state.home);
    const { userInfo } = useSelector(state => state.auth);
    const { card_product_count, wishlist_count } = useSelector(state => state.card);
    const { unreadCount } = useSelector(state => state.notification);
    const { pathname } = useLocation();

    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`);
    };

    const redirect_card_page = () => {
        if (userInfo) {
            navigate('/card');
        } else {
            navigate('/login');
        }
    };

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setLanguage(lng);
        localStorage.setItem('language', lng);
        setShowLanguageDropdown(false);
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id));
            dispatch(get_wishlist_products(userInfo.id));
            dispatch(fetchNotifications(userInfo.id));

            const socket = io('http://localhost:5000'); // Ensure this is configurable for deployment
            socket.emit('add_user', userInfo.id);
            console.log(`Header: Emitted add_user for ${userInfo.id}`);

            socket.on('new_notification', (notification) => {
                if (notification.recipientId === userInfo.id) {
                    console.log('Header: Received new_notification', notification);
                    toast(
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(notification.link)}
                            className="cursor-pointer"
                        >
                            {notification.message}
                        </motion.div>,
                        {
                            style: {
                                background: 'rgba(17, 24, 39, 0.9)',
                                color: '#fff',
                                border: '1px solid rgba(34, 211, 238, 0.5)',
                                fontFamily: "'Orbitron', sans-serif",
                                boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                            },
                            duration: 5000,
                        }
                    );
                    dispatch(updateNotifications(notification));
                }
            });

            socket.on('unread_count_update', (data) => {
                console.log('Header: Received unread_count_update', data);
                dispatch(updateUnreadCount(data));
            });

            return () => {
                socket.disconnect();
                console.log('Header: Socket disconnected');
            };
        }
    }, [userInfo, dispatch, navigate]);

    return (
        <div className='w-full bg-white'>
            {/* Header Top */}
            <div className='header-top bg-gradient-to-r from-[#e6f0ff] to-[#caddff] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-700'>
                        <ul className='flex justify-start items-center gap-8 font-medium text-sm text-slate-800'>
                            <li className='flex relative justify-center items-center gap-2 after:absolute after:h-[18px] after:w-[1px] after:bg-slate-300 after:-right-[16px]'>
                                <MdEmail className='text-[#059473]' />
                                <span>soug.elfalah@gmail.com</span>
                            </li>
                            <li className='flex relative justify-center items-center gap-2'>
                                <IoMdPhonePortrait className='text-[#059473]' />
                                <span>+(213) 0776771666</span>
                            </li>
                        </ul>
                        <div className='flex items-center gap-6'>
                            <div className='flex gap-4 text-slate-600'>
                                <a href="#" className='hover:text-[#059473] transition-colors'><FaFacebookF /></a>
                                <a href="#" className='hover:text-[#059473] transition-colors'><FaTwitter /></a>
                                <a href="#" className='hover:text-[#059473] transition-colors'><FaLinkedin /></a>
                            </div>
                            <div className='relative'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className='flex items-center gap-2 text-sm text-slate-800 bg-gradient-to-r from-[#e6f0ff] to-[#caddff] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all'
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    aria-label="Select language"
                                >
                                    <FaGlobe className='text-[#059473] text-lg' />
                                    <span className='font-medium'>{language.toUpperCase()}</span>
                                    <IoMdArrowDropdown className='text-lg' />
                                </motion.button>
                                {showLanguageDropdown && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className='absolute top-12 right-0 bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-3 w-36 text-slate-600 z-10 border border-gray-100/50'
                                    >
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('en')}
                                        >
                                            <span>🇬🇧</span>
                                            <span>English</span>
                                        </motion.li>
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('ar')}
                                        >
                                            <span>🇸🇦</span>
                                            <span>Arabic</span>
                                        </motion.li>
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('fr')}
                                        >
                                            <span>🇫🇷</span>
                                            <span>French</span>
                                        </motion.li>
                                    </motion.ul>
                                )}
                            </div>
                            {userInfo ? (
                                <Link to='/dashboard' className='flex items-center gap-2 text-sm text-slate-800 hover:text-[#059473] transition-colors'>
                                    <FaUser />
                                    <span>{userInfo.name}</span>
                                </Link>
                            ) : (
                                <Link to='/login' className='flex items-center gap-2 text-sm text-slate-800 hover:text-[#059473] transition-colors'>
                                    <FaLock />
                                    <span>{t('login')}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                    <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                        <div className='flex justify-between items-center'>
                            <Link to='/'>
                                <img src="/images/logo-elfalah.png" alt="Soug El Falah Logo" className='w-[375px] h-[80px]'/>
                            </Link>
                            <div onClick={() => setShowShidebar(false)} className='lg:hidden md-lg:flex xl:hidden hidden p-2 bg-white text-slate-600 border border-slate-300 rounded-md cursor-pointer'>
                                <FaList />
                            </div>
                        </div>
                    </div>
                    <div className='md-lg:w-full w-9/12'>
                        <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                            <ul className='flex justify-start items-start gap-8 text-sm font-medium uppercase md-lg:hidden'>
                                <li>
                                    <Link to='/' className={`p-2 block ${pathname === '/' ? 'text-[#059473] border-b-2 border-[#059473]' : 'text-slate-600 hover:text-[#059473] transition-colors'}`}>{t('home')}</Link>
                                </li>
                                <li>
                                    <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#059473] border-b-2 border-[#059473]' : 'text-slate-600 hover:text-[#059473] transition-colors'}`}>{t('products')}</Link>
                                </li>
                                <li>
                                    <Link to='/services' className={`p-2 block ${pathname === '/services' ? 'text-[#059473] border-b-2 border-[#059473]' : 'text-slate-600 hover:text-[#059473] transition-colors'}`}>{t('services')}</Link>
                                </li>
                                <li>
                                    <Link to='/about' className={`p-2 block ${pathname === '/about' ? 'text-[#059473] border-b-2 border-[#059473]' : 'text-slate-600 hover:text-[#059473] transition-colors'}`}>{t('about_us')}</Link>
                                </li>
                                <li>
                                    <Link to='/contact' className={`p-2 block ${pathname === '/contact' ? 'text-[#059473] border-b-2 border-[#059473]' : 'text-slate-600 hover:text-[#059473] transition-colors'}`}>{t('contact_us')}</Link>
                                </li>
                            </ul>
                            <div className='flex md-lg:hidden justify-center items-center gap-5 relative'>
                                <div className='flex justify-center gap-5'>
                                    <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                                        <FaHeart className='text-xl text-[#059473]' />
                                        {wishlist_count !== 0 && (
                                            <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>
                                                {wishlist_count}
                                            </div>
                                        )}
                                    </div>
                                    <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                                        <FaCartShopping className='text-xl text-[#059473]' />
                                        {card_product_count !== 0 && (
                                            <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>
                                                {card_product_count}
                                            </div>
                                        )}
                                    </div>
                                    {userInfo && (
                                        <div onClick={() => dispatch(toggleNotificationDropdown())} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                                            <FaBell className='text-xl text-[#059473]' />
                                            {unreadCount > 0 && (
                                                <div className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>
                                                    {unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {userInfo && <NotificationDropdown />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowShidebar(true)} className={`fixed duration-200 transition-all ${showShidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}></div>
                <div className={`w-[300px] z-[300] transition-all duration-300 fixed ${showShidebar ? '-left-[300px]' : 'left-0 top-0'} overflow-y-auto bg-white h-screen py-6 px-8 shadow-lg`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="/images/logo-elfalah.png" alt="Soug El Falah Logo" className='h-10' />
                        </Link>
                        <div className='flex justify-start items-center gap-10'>
                            <div className='relative cursor-pointer text-slate-800 text-sm'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className='flex items-center gap-2 text-slate-800 bg-gradient-to-r from-[#e6f0ff] to-[#caddff] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all'
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    aria-label="Select language"
                                >
                                    <FaGlobe className='text-[#059473] text-lg' />
                                    <span className='font-medium'>{language.toUpperCase()}</span>
                                    <IoMdArrowDropdown className='text-lg' />
                                </motion.button>
                                {showLanguageDropdown && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className='absolute top-12 left-0 bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-3 w-36 text-slate-600 z-10 border border-gray-100/50'
                                    >
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('en')}
                                        >
                                            <span>🇬🇧</span>
                                            <span>English</span>
                                        </motion.li>
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('ar')}
                                        >
                                            <span>🇸🇦</span>
                                            <span>Arabic</span>
                                        </motion.li>
                                        <motion.li
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100/50 hover:text-[#059473] cursor-pointer rounded-md transition-colors font-semibold'
                                            onClick={() => changeLanguage('fr')}
                                        >
                                            <span>🇫🇷</span>
                                            <span>French</span>
                                        </motion.li>
                                    </motion.ul>
                                )}
                            </div>
                            {userInfo ? (
                                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-slate-800 hover:text-[#059473] transition-colors' to='/dashboard'>
                                    <FaUser />
                                    <span>{userInfo.name}</span>
                                </Link>
                            ) : (
                                <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm text-slate-800 hover:text-[#059473] transition-colors' to='/login'>
                                    <FaLock />
                                    <span>{t('login')}</span>
                                </Link>
                            )}
                        </div>
                        <ul className='flex flex-col justify-start items-start text-sm font-medium uppercase'>
                            <li>
                                <Link to='/' className={`py-2 block ${pathname === '/' ? 'text-[#059473]' : 'text-slate-600 hover:text-[#059473]'}`}>{t('home')}</Link>
                            </li>
                            <li>
                                <Link to='/shops' className={`py-2 block ${pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600 hover:text-[#059473]'}`}>{t('products')}</Link>
                            </li>
                            <li>
                                <Link to='/services' className={`py-2 block ${pathname === '/services' ? 'text-[#059473]' : 'text-slate-600 hover:text-[#059473]'}`}>{t('services')}</Link>
                            </li>
                            <li>
                                <Link to='/about' className={`py-2 block ${pathname === '/about' ? 'text-[#059473]' : 'text-slate-600 hover:text-[#059473]'}`}>{t('about_us')}</Link>
                            </li>
                            <li>
                                <Link to='/contact' className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]' : 'text-slate-600 hover:text-[#059473]'}`}>{t('contact_us')}</Link>
                            </li>
                        </ul>
                        <div className='flex gap-4 text-slate-600'>
                            <a href="https://facebook.com" className='hover:text-[#059473]'><FaFacebookF /></a>
                            <a href="https://twitter.com" className='hover:text-[#059473]'><FaTwitter /></a>
                            <a href="https://linkedin.com" className='hover:text-[#059473]'><FaLinkedin /></a>
                            <a href="https://github.com" className='hover:text-[#059473]'><FaGithub /></a>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-[#059473]'>
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <h2 className='text-sm font-medium text-slate-700'>+213 0776771666</h2>
                                <span className='text-xs text-slate-500'>{t('support_24_7')}</span>
                            </div>
                        </div>
                        <ul className='flex flex-col justify-start items-start gap-3 text-slate-600'>
                            <li className='flex justify-start items-center gap-2 text-sm'>
                                <MdEmail className='text-[#059473]' />
                                <span>soug.elfalah@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Category and Search Section */}
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap md-lg:gap-8'>
                    <div className='w-3/12 md-lg:w-full'>
                        <div className='bg-white relative'>
                            <div onClick={() => setCategoryShow(!categoryShow)} className='h-[50px] bg-[#059473] text-white flex justify-between items-center px-6 cursor-pointer'>
                                <div className='flex items-center gap-3'>
                                    <FaList />
                                    <span className='font-medium'>{t('all_category')}</span>
                                </div>
                                <IoIosArrowDown className={`transition-transform ${categoryShow ? 'rotate-0' : 'rotate-180'}`} />
                            </div>
                            <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-hidden transition-all duration-300 absolute z-50 bg-white shadow-lg w-full`}>
                                <ul className='py-2 text-slate-600'>
                                    {categorys.map((c, i) => (
                                        <li key={i} className='flex items-center gap-3 px-6 py-2 hover:bg-gray-100 transition-colors'>
                                            <img src={c.image} className='w-8 h-8 rounded-full' alt={c.name} />
                                            <Link to={`/products?category=${c.name}`} className='text-sm font-medium'>{c.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
                        <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                            <div className='w-8/12 md-lg:w-full'>
                                <div className='flex border h-[50px] items-center relative gap-6 bg-white rounded-md shadow-sm'>
                                    <select onChange={(e) => setCategory(e.target.value)} className='w-[150px] text-slate-600 font-medium bg-transparent px-3 h-full outline-none border-r border-gray-200 md:hidden'>
                                        <option value="">{t('select_category')}</option>
                                        {categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                                    </select>
                                    <input
                                        className='w-full bg-transparent text-slate-600 outline-none px-3 h-full'
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        type="text"
                                        placeholder={t('search_placeholder')}
                                    />
                                    <button onClick={search} className='bg-[#059473] text-white px-6 h-full rounded-r-md hover:bg-[#046a56] transition-colors'>{t('search')}</button>
                                </div>
                            </div>
                            <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
                                <div className='flex justify-end md-lg:justify-start gap-3 items-center'>
                                    <div className='w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-[#059473]'>
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <h2 className='text-sm font-medium text-slate-700'>+213-0776771666</h2>
                                        <span className='text-xs text-slate-500'>{t('support_24_7')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;