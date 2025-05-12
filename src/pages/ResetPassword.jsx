import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password_request, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const themeColors = {
    primary: 'green-700',
    primaryHover: 'green-800',
    secondaryBg: 'stone-100',
    cardBg: 'white',
    textPrimary: 'slate-800',
    textSecondary: 'slate-600',
    inputBorder: 'gray-300',
    inputFocusBorder: 'green-600',
    linkColor: 'green-700',
    linkHoverColor: 'green-800',
    errorColor: 'red-600',
};

const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { token } = useParams();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error(t('reset_password.form.fields_required'));
            return;
        }
        if (password.length < 6) {
            toast.error(t('reset_password.form.password_too_short'));
            return;
        }
        if (password !== confirmPassword) {
            toast.error(t('reset_password.form.password_mismatch'));
            return;
        }
        if (!token) {
            toast.error(t('reset_password.form.invalid_token'));
            navigate('/login');
            return;
        }
        dispatch(reset_password_request({ token, password, confirmPassword }));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setTimeout(() => navigate('/login'), 2500);
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    useEffect(() => {
        if (!token) {
            toast.error(t('reset_password.form.invalid_link'), { duration: 4000 });
            navigate('/login');
        }
    }, [token, navigate, t]);

    return (
        <div className={`bg-${themeColors.secondaryBg} min-h-screen flex flex-col`}>
            {loader && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999] backdrop-blur-sm'>
                    <FadeLoader color={themeColors.primary} />
                </div>
            )}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
                <div className={`w-full max-w-md bg-${themeColors.cardBg} rounded-xl shadow-2xl p-8 md:p-10`}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-${themeColors.textPrimary} text-center mb-6`}>
                        {t('reset_password.title')}
                    </h2>
                    <p className={`text-center text-${themeColors.textSecondary} mb-8 text-sm`}>
                        {t('reset_password.description')}
                    </p>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div className="relative">
                            <label htmlFor="password" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                {t('reset_password.form.password_label')}
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                placeholder={t('reset_password.form.password_placeholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                aria-label={t(showPassword ? 'reset_password.form.hide_password' : 'reset_password.form.show_password')}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                        <div className="relative">
                            <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                {t('reset_password.form.confirm_password_label')}
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                placeholder={t('reset_password.form.confirm_password_placeholder')}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-2.5 border ${password && confirmPassword && password !== confirmPassword ? `border-${themeColors.errorColor}` : `border-${themeColors.inputBorder}`} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                aria-label={t(showConfirmPassword ? 'reset_password.form.hide_confirm_password' : 'reset_password.form.show_confirm_password')}
                            >
                                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                            {password && confirmPassword && password !== confirmPassword && (
                                <p className={`text-xs text-${themeColors.errorColor} mt-1`}>{t('reset_password.form.password_mismatch')}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full px-6 py-3 bg-${themeColors.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60`}
                        >
                            {loader ? t('reset_password.form.resetting') : t('reset_password.form.submit_button')}
                        </button>
                    </form>
                    <p className={`mt-6 text-center text-sm text-${themeColors.textSecondary}`}>
                        {t('reset_password.login_prompt')}{' '}
                        <Link to="/login" className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline`}>
                            {t('reset_password.login_link')}
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ResetPassword;