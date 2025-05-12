import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password_request, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
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
};

const ForgotPassword = () => {
    const { t } = useTranslation();
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            dispatch(forgot_password_request({ email }));
        } else {
            toast.error(t('forgot_password.form.email_required'));
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage, { duration: 6000 });
            dispatch(messageClear());
            setEmail('');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, t]);

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
                        {t('forgot_password.title')}
                    </h2>
                    <p className={`text-center text-${themeColors.textSecondary} mb-8 text-sm`}>
                        {t('forgot_password.description')}
                    </p>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                {t('forgot_password.form.email_label')}
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder={t('forgot_password.form.email_placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out`}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            className={`w-full px-6 py-3 bg-${themeColors.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60`}
                        >
                            {loader ? t('forgot_password.form.sending') : t('forgot_password.form.submit_button')}
                        </button>
                    </form>
                    <p className={`mt-6 text-center text-sm text-${themeColors.textSecondary}`}>
                        {t('forgot_password.login_prompt')}{' '}
                        <Link to="/login" className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline`}>
                            {t('forgot_password.login_link')}
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ForgotPassword;