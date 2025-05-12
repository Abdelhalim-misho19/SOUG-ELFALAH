import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    send_otp,
    verify_otp_and_register,
    messageClear,
    resetOtpState
} from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import zxcvbn from 'zxcvbn';
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
    strengthBarBase: 'gray-200',
    strengthWeak: 'red-500',
    strengthFair: 'orange-500',
    strengthGood: 'yellow-500',
    strengthStrong: 'green-500',
    errorColor: 'red-600',
};

const strengthFeedbackText = [
    "register.strength.very_weak",
    "register.strength.weak",
    "register.strength.fair",
    "register.strength.good",
    "register.strength.strong"
];

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        loader,
        errorMessage,
        successMessage,
        userInfo,
        otpSent,
        registrationEmail
    } = useSelector(state => state.auth);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [otpValue, setOtpValue] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputHandle = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const otpInputHandle = (e) => {
        setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
            toast.error(t('register.form.password_mismatch'));
            return;
        }
        if (passwordStrength < 2 && state.password.length > 0) {
            toast.error(t('register.form.password_too_weak'), { duration: 4000 });
            return;
        }
        dispatch(send_otp({ name: state.name, email: state.email, password: state.password }));
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (!otpValue || otpValue.length !== 6) {
            toast.error(t('register.otp.invalid_otp'));
            return;
        }
        if (registrationEmail) {
            dispatch(verify_otp_and_register({ email: registrationEmail, otp: otpValue }));
        } else {
            toast.error(t('register.otp.session_error'));
            dispatch(resetOtpState());
        }
    };

    const handleResendOtp = useCallback(() => {
        if (registrationEmail && state.name && state.password) {
            toast.loading(t('register.otp.resending'));
            dispatch(send_otp({ email: registrationEmail, name: state.name, password: state.password }))
                .finally(() => toast.dismiss());
        } else {
            toast.error(t('register.otp.resend_error'));
            dispatch(resetOtpState());
        }
    }, [dispatch, registrationEmail, state.name, state.password]);

    useEffect(() => {
        if (state.password) {
            const result = zxcvbn(state.password);
            setPasswordStrength(result.score);
        } else {
            setPasswordStrength(0);
        }
    }, [state.password]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            if (userInfo && !otpSent) {
                navigate('/');
            }
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, navigate, dispatch, userInfo, otpSent]);

    useEffect(() => {
        return () => {
            if (otpSent && !userInfo) {
                dispatch(resetOtpState());
            }
        };
    }, [dispatch, otpSent, userInfo]);

    const getStrengthBarColor = (level) => {
        const score = passwordStrength;
        if (score >= level) {
            switch (level) {
                case 1: return themeColors.strengthWeak;
                case 2: return themeColors.strengthFair;
                case 3: return themeColors.strengthGood;
                case 4: return themeColors.strengthStrong;
                default: return themeColors.strengthBarBase;
            }
        }
        return themeColors.strengthBarBase;
    };

    const getStrengthTextColor = () => {
        switch (passwordStrength) {
            case 0: return themeColors.strengthWeak;
            case 1: return themeColors.strengthWeak;
            case 2: return themeColors.strengthFair;
            case 3: return themeColors.strengthGood;
            case 4: return themeColors.strengthStrong;
            default: return themeColors.textSecondary;
        }
    };

    return (
        <div className={`bg-${themeColors.secondaryBg} min-h-screen flex flex-col`}>
            {loader && (
                <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999] backdrop-blur-sm'>
                    <FadeLoader color={themeColors.primary} />
                </div>
            )}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-16 flex items-center justify-center">
                <div className={`w-full max-w-4xl bg-${themeColors.cardBg} rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2`}>
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                        {!otpSent ? (
                            <>
                                <h2 className={`text-2xl md:text-3xl font-bold text-${themeColors.textPrimary} text-center mb-6 md:mb-8`}>
                                    {t('register.title')}
                                </h2>
                                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                            {t('register.form.name_label')}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            placeholder={t('register.form.name_placeholder')}
                                            value={state.name}
                                            onChange={inputHandle}
                                            className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                            {t('register.form.email_label')}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder={t('register.form.email_placeholder')}
                                            value={state.email}
                                            onChange={inputHandle}
                                            className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out`}
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="password" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                            {t('register.form.password_label')}
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            required
                                            placeholder={t('register.form.password_placeholder')}
                                            value={state.password}
                                            onChange={inputHandle}
                                            className={`w-full px-4 py-2.5 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out pr-10`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                            aria-label={t(showPassword ? 'register.form.hide_password' : 'register.form.show_password')}
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    </div>
                                    {state.password && (
                                        <div className="mt-0 pt-0">
                                            <div className={`flex h-1.5 rounded-full overflow-hidden bg-${themeColors.strengthBarBase}`}>
                                                <div className={`transition-all duration-300 ease-in-out h-full rounded-l-full bg-${getStrengthBarColor(1)}`} style={{ width: passwordStrength >= 0 ? '25%' : '0%' }}></div>
                                                <div className={`transition-all duration-300 ease-in-out h-full bg-${getStrengthBarColor(2)}`} style={{ width: passwordStrength >= 1 ? '25%' : '0%' }}></div>
                                                <div className={`transition-all duration-300 ease-in-out h-full bg-${getStrengthBarColor(3)}`} style={{ width: passwordStrength >= 2 ? '25%' : '0%' }}></div>
                                                <div className={`transition-all duration-300 ease-in-out h-full rounded-r-full bg-${getStrengthBarColor(4)}`} style={{ width: passwordStrength >= 3 ? '25%' : '0%' }}></div>
                                            </div>
                                            <p className={`mt-1 text-xs font-medium text-${getStrengthTextColor()}`}>
                                                {t('register.form.password_strength')}: {t(strengthFeedbackText[passwordStrength])}
                                            </p>
                                        </div>
                                    )}
                                    <div className="relative">
                                        <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                            {t('register.form.confirm_password_label')}
                                        </label>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            required
                                            placeholder={t('register.form.confirm_password_placeholder')}
                                            value={state.confirmPassword}
                                            onChange={inputHandle}
                                            className={`w-full px-4 py-2.5 border ${state.password && state.confirmPassword && state.password !== state.confirmPassword ? `border-${themeColors.errorColor}` : `border-${themeColors.inputBorder}`} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out pr-10`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                                            aria-label={t(showConfirmPassword ? 'register.form.hide_confirm_password' : 'register.form.show_confirm_password')}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                        {state.password && state.confirmPassword && state.password !== state.confirmPassword && (
                                            <p className={`text-xs text-${themeColors.errorColor} mt-1`}>{t('register.form.password_mismatch')}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loader}
                                        className={`w-full mt-2 px-6 py-3 bg-${themeColors.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {loader ? t('register.form.processing') : t('register.form.submit_button')}
                                    </button>
                                </form>
                                <div className="my-6 flex items-center justify-center gap-3">
                                    <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                                    <span className={`text-xs uppercase text-${themeColors.textSecondary} font-medium`}>{t('register.social_divider')}</span>
                                    <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        disabled={loader}
                                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex justify-center items-center gap-2 text-sm font-medium transition duration-200 disabled:opacity-60"
                                    >
                                        <FaFacebookF size={16} /> {t('register.social.facebook')}
                                    </button>
                                    <button
                                        disabled={loader}
                                        className="flex-1 py-2.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 flex justify-center items-center gap-2 text-sm font-medium transition duration-200 disabled:opacity-60"
                                    >
                                        <FaGoogle size={16} /> {t('register.social.google')}
                                    </button>
                                </div>
                                <p className={`mt-6 text-center text-sm text-${themeColors.textSecondary}`}>
                                    {t('register.login_prompt')} <Link to="/login" className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline`}>{t('register.login_link')}</Link>
                                </p>
                                <div className="my-6 flex items-center justify-center gap-3">
                                    <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                                    <span className={`px-3 text-xs uppercase text-${themeColors.textSecondary} font-medium whitespace-nowrap`}>{t('register.seller_area')}</span>
                                    <div className={`h-px bg-${themeColors.inputBorder} flex-grow`}></div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                                    <a
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        href="http://localhost:3001/login"
                                        className="flex-1 text-center py-2.5 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition duration-200 font-medium"
                                    >
                                        {t('register.seller_login')}
                                    </a>
                                    <a
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        href="http://localhost:3001/register"
                                        className="flex-1 text-center py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-200 font-medium"
                                    >
                                        {t('register.seller_registration')}
                                    </a>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className={`text-2xl md:text-3xl font-bold text-${themeColors.textPrimary} text-center mb-4`}>
                                    {t('register.otp.title')}
                                </h2>
                                <p className={`text-center text-${themeColors.textSecondary} mb-6 text-sm px-2`}>
                                    {t('register.otp.description', { email: registrationEmail })}
                                </p>
                                <form onSubmit={handleOtpSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="otp" className={`block text-sm font-medium text-${themeColors.textSecondary} mb-1`}>
                                            {t('register.otp.label')}
                                        </label>
                                        <input
                                            type="text"
                                            name="otp"
                                            id="otp"
                                            required
                                            maxLength={6}
                                            inputMode="numeric"
                                            placeholder={t('register.otp.placeholder')}
                                            value={otpValue}
                                            onChange={otpInputHandle}
                                            className={`w-full px-4 py-3 border border-${themeColors.inputBorder} rounded-lg outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition duration-200 ease-in-out text-center text-xl font-semibold tracking-[0.3em]`}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loader}
                                        className={`w-full px-6 py-3 bg-${themeColors.primary} text-white font-semibold rounded-lg shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        {loader ? t('register.otp.verifying') : t('register.otp.submit_button')}
                                    </button>
                                </form>
                                <div className={`mt-5 text-center text-sm text-${themeColors.textSecondary} space-x-1`}>
                                    <span>{t('register.otp.no_code')}</span>
                                    <button
                                        type='button'
                                        onClick={handleResendOtp}
                                        disabled={loader}
                                        className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline disabled:text-gray-400 disabled:cursor-not-allowed`}
                                    >
                                        {t('register.otp.resend')}
                                    </button>
                                </div>
                                <div className="mt-2 text-center text-sm">
                                    <button
                                        type='button'
                                        onClick={() => dispatch(resetOtpState())}
                                        disabled={loader}
                                        className={`font-medium text-${themeColors.linkColor} hover:text-${themeColors.linkHoverColor} hover:underline disabled:text-gray-400 disabled:cursor-not-allowed`}
                                    >
                                        {t('register.otp.different_email')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="hidden md:block w-full h-full">
                        <img
                            src="/images/falah.png"
                            alt={t('register.image_alt')}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;