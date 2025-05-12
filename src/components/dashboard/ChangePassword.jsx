import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change_password, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const themeColors = {
    primary: 'green-700', primaryHover: 'green-800',
    inputBorder: 'gray-300', inputFocusBorder: 'green-600',
    textHeader: 'slate-700', textLabel: 'slate-600',
    errorColor: 'red-600',
};

const ChangePassword = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth);

    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = state;

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error(t('change_password.errors.fill_all_fields')); return;
        }
        if (newPassword.length < 6) {
            toast.error(t('change_password.errors.password_too_short')); return;
        }
        if (newPassword !== confirmPassword) {
            toast.error(t('change_password.errors.password_mismatch')); return;
        }
        if (oldPassword === newPassword) {
            toast.error(t('change_password.errors.same_password')); return;
        }

        dispatch(change_password(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(t('change_password.success_message'));
            dispatch(messageClear());
            setState({ oldPassword: '', newPassword: '', confirmPassword: '' });
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, t]);

    if (userInfo && userInfo.method !== 'manually') {
        return (
            <div className={`p-4 md:p-6 bg-white rounded-lg shadow`}>
                <h2 className={`text-xl font-semibold text-${themeColors.textHeader} mb-4`}>{t('change_password.title')}</h2>
                <p className={`text-${themeColors.textLabel}`}>
                    {t('change_password.social_login_message', { method: userInfo.method })}
                </p>
            </div>
        );
    }

    return (
        <div className={`p-4 md:p-6 bg-white rounded-lg shadow`}>
            {loader && (
                <div className='absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-20 rounded-lg'>
                    <FadeLoader color={themeColors.primary} />
                </div>
            )}
            <h2 className={`text-xl font-semibold text-${themeColors.textHeader} pb-4 mb-4 border-b border-gray-200`}>
                {t('change_password.title')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div className="relative">
                    <label htmlFor="oldPassword" className={`block text-sm font-medium text-${themeColors.textLabel} mb-1`}>
                        {t('change_password.form.current_password')}
                    </label>
                    <input
                        className={`w-full px-4 py-2 border border-${themeColors.inputBorder} rounded-md text-slate-700 outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition pr-10`}
                        type={showOld ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder={t('change_password.form.current_password_placeholder')}
                        value={state.oldPassword}
                        onChange={inputHandle}
                        required
                        autoComplete='current-password'
                    />
                    <button
                        type="button"
                        onClick={() => setShowOld(!showOld)}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label={t('change_password.form.toggle_current_password')}
                    >
                        {showOld ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>

                <div className="relative">
                    <label htmlFor="newPassword" className={`block text-sm font-medium text-${themeColors.textLabel} mb-1`}>
                        {t('change_password.form.new_password')}
                    </label>
                    <input
                        className={`w-full px-4 py-2 border border-${themeColors.inputBorder} rounded-md text-slate-700 outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition pr-10`}
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder={t('change_password.form.new_password_placeholder')}
                        value={state.newPassword}
                        onChange={inputHandle}
                        required
                        autoComplete='new-password'
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label={t('change_password.form.toggle_new_password')}
                    >
                        {showNew ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${themeColors.textLabel} mb-1`}>
                        {t('change_password.form.confirm_password')}
                    </label>
                    <input
                        className={`w-full px-4 py-2 border ${state.newPassword && state.confirmPassword && state.newPassword !== state.confirmPassword ? `border-${themeColors.errorColor}` : `border-${themeColors.inputBorder}`} rounded-md text-slate-700 outline-none focus:border-${themeColors.inputFocusBorder} focus:ring-1 focus:ring-${themeColors.inputFocusBorder} transition pr-10`}
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder={t('change_password.form.confirm_password_placeholder')}
                        value={state.confirmPassword}
                        onChange={inputHandle}
                        required
                        autoComplete='new-password'
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label={t('change_password.form.toggle_confirm_password')}
                    >
                        {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    {state.newPassword && state.confirmPassword && state.newPassword !== state.confirmPassword && (
                        <p className={`text-xs text-${themeColors.errorColor} mt-1`}>{t('change_password.errors.password_mismatch')}</p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loader}
                        className={`px-6 py-2.5 bg-${themeColors.primary} text-white font-semibold rounded-md shadow-md hover:bg-${themeColors.primaryHover} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColors.primary} transition duration-200 ease-in-out disabled:opacity-60`}
                    >
                        {loader ? t('change_password.form.updating') : t('change_password.form.update_password')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;