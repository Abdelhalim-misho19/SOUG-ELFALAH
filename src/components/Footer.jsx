import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    const { card_product_count, wishlist_count } = useSelector(state => state.card);

    return (
        <footer className='bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b border-gray-200 py-16 md-lg:pb-10 sm:pb-6'>
                {/* Logo and Contact Info */}
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex flex-col gap-4'>
                        <img className="w-auto h-[210px] object-contain transition-all duration-300 ease-out group-hover:scale-105 filter brightness-110 group-hover:brightness-125" src="http://localhost:3000/images/logo2.png" alt="logo" />
                    </div>
                </div>

                {/* Useful Links */}
                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                            <h2 className='font-semibold text-xl text-gray-800 mb-4'>{t('footer.useful_links')}</h2>
                            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                <ul className='flex flex-col gap-3 text-gray-600 text-sm'>
                                    <li>
                                        <Link to='/about' className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.about_us')}</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.about_our_shop')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.delivery_information')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.privacy_policy')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.services')}</Link>
                                    </li>
                                </ul>
                                <ul className='flex flex-col gap-3 text-gray-600 text-sm'>
                                    <li>
                                        <Link to='/services' className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.our_service')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.company_profile')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.delivery_information')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.privacy_policy')}</Link>
                                    </li>
                                    <li>
                                        <Link className='hover:text-[#059473] transition-colors duration-200'>{t('footer.links.services')}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className='w-4/12 lg:w-full lg:mt-6'>
                    <div className='w-full flex flex-col justify-start gap-5'>
                        <div className='w-3/12 lg:w-4/12 sm:w-full'>
                            <div className='flex flex-col gap-4'>
                                <h2 className='font-semibold text-xl text-gray-800 mb-4'>{t('footer.contact.title')}</h2>
                                <ul className='flex flex-col gap-3 text-gray-600'>
                                    <li className='text-sm'>{t('footer.contact.address')}</li>
                                    <li className='text-sm'>{t('footer.contact.phone')}</li>
                                    <li className='text-sm'>{t('footer.contact.email')}</li>
                                </ul>
                            </div>
                        </div>
                        <ul className='flex justify-start items-center gap-3'>
                            <li>
                                <a className='w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md text-gray-600 hover:bg-[#059473] hover:text-white transition-all duration-200' href="#">
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li>
                                <a className='w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md text-gray-600 hover:bg-[#059473] hover:text-white transition-all duration-200' href="#">
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a className='w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md text-gray-600 hover:bg-[#059473] hover:text-white transition-all duration-200' href="#">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a className='w-10 h-10 flex justify-center items-center bg-white rounded-full shadow-md text-gray-600 hover:bg-[#059473] hover:text-white transition-all duration-200' href="#">
                                    <FaGithub />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className='w-[90%] flex flex-wrap justify-center items-center text-gray-600 mx-auto py-5 text-center text-sm'>
                <span>{t('footer.copyright')}</span>
            </div>

            {/* Floating Cart/Wishlist (Mobile) */}
            <div className='hidden fixed md-lg:block w-[50px] h-[120px] bottom-6 right-4 bg-white rounded-full p-3 shadow-lg'>
                <div className='w-full h-full flex gap-4 flex-col justify-center items-center'>
                    <div onClick={() => navigate(userInfo ? '/card' : '/login')} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                        <FaCartShopping className='text-xl text-[#059473]' />
                        {card_product_count !== 0 && (
                            <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-1 -right-1'>
                                {card_product_count}
                            </div>
                        )}
                    </div>
                    <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                        <FaHeart className='text-xl text-[#059473]' />
                        {wishlist_count !== 0 && (
                            <div className='w-5 h-5 absolute bg-red-500 rounded-full text-white flex justify-center items-center text-xs -top-1 -right-1'>
                                {wishlist_count}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;