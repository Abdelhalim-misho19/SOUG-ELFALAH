import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const themeColors = {
    primary: 'green-700', primaryHover: 'green-800',
    secondaryBg: 'stone-100', cardBg: 'white',
    textPrimary: 'slate-800', textSecondary: 'slate-600',
    inputBorder: 'gray-300', inputFocusBorder: 'green-600',
    linkColor: 'green-700', linkHoverColor: 'green-800',
};

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const inputHandle = (e) => { setState({ ...state, [e.target.name]: e.target.value }); };
    const login = (e) => { e.preventDefault(); dispatch(customer_login(state)); };

    useEffect(() => {
        if (successMessage) { toast.success(successMessage); dispatch(messageClear()); }
        if (errorMessage) { toast.error(errorMessage); dispatch(messageClear()); }
        if (userInfo) { navigate('/'); }
    }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

    return (
        <div className={`bg-${themeColors.secondaryBg} min-h-screen flex flex-col`}>
            {loader && ( <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999] backdrop-blur-sm'><FadeLoader color={themeColors.primary} /></div> )}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-16 flex items-center justify-center">
                <div className={`w-full max-w-4xl bg-${themeColors.cardBg} rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2`}>
                    {/* Login Form Section */}
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        <h2 className={`text-2xl md:text-3xl font-bold text-${themeColors.textPrimary} text-center mb-6 md:mb-8`}>{t('login_page.title')}</h2>
                        <form onSubmit={login} className='space-y-5'>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>{t('login_page.form.email_label')}</label>
                                <input
                                    onChange={inputHandle}
                                    value={state.email}
                                    className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out`}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder={t('login_page.form.email_placeholder')}
                                    required
                                />
                            </div>
                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>{t('login_page.form.password_label')}</label>
                                <input
                                    onChange={inputHandle}
                                    value={state.password}
                                    className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out pr-10`}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder={t('login_page.form.password_placeholder')}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                    aria-label={t(showPassword ? 'login_page.form.hide_password' : 'login_page.form.show_password')}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            {/* Forgot Password Link */}
                            <div className="text-right -mt-2">
                                <Link to="/forgot-password" className={`text-sm font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline`}>
                                    {t('login_page.form.forgot_password')}
                                </Link>
                            </div>
                            {/* Submit Button */}
                            <button
                                disabled={loader}
                                className={`w-full mt-1 px-6 py-3 bg-${themeColors.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60`}
                            >
                                {loader ? t('login_page.form.logging_in') : t('login_page.form.login_button')}
                            </button>
                        </form>

                        {/* Divider & Social */}
                        <div className="my-6 flex items-center justify-center gap-3">
                            <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                            <span className={`text-xs uppercase text-${themeColors.textSecondary} font-medium`}>{t('login_page.social_divider')}</span>
                            <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                disabled={loader}
                                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex justify-center items-center gap-2 text-sm font-medium transition duration-200 disabled:opacity-60"
                            >
                                <FaFacebookF size={16} /> {t('login_page.social.facebook')}
                            </button>
                            <button
                                disabled={loader}
                                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 flex justify-center items-center gap-2 text-sm font-medium transition duration-200 disabled:opacity-60"
                            >
                                <FaGoogle size={16} /> {t('login_page.social.google')}
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className={`mt-6 text-center text-sm text-${themeColors.textSecondary}`}>
                            {t('login_page.register_prompt')} <Link to="/register" className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline`}>{t('login_page.register_link')}</Link>
                        </p>

                        {/* Seller Links */}
                        <div className="my-6 flex items-center justify-center gap-3">
                            <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                            <span className={`px-3 text-xs uppercase text-${themeColors.textSecondary} font-medium whitespace-nowrap`}>{t('login_page.seller_area')}</span>
                            <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 text-sm">
                            <a
                                target='_blank'
                                rel="noopener noreferrer"
                                href="http://localhost:3001/login"
                                className="flex-1 text-center py-2.5 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition duration-200 font-medium"
                            >
                                {t('login_page.seller_login')}
                            </a>
                            <a
                                target='_blank'
                                rel="noopener noreferrer"
                                href="http://localhost:3001/register"
                                className="flex-1 text-center py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-200 font-medium"
                            >
                                {t('login_page.seller_registration')}
                            </a>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className='hidden md:block w-full h-full'>
                        <img
                            src="/images/falah.png"
                            alt={t('login_page.image_alt')}
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;