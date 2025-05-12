import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_my_bookings, messageClear } from '../../store/reducers/bookingReducer';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MyBookings = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { myBookings, loading, errorMessage, successMessage } = useSelector(state => state.booking);

    useEffect(() => {
        if (userInfo?.id) {
            dispatch(get_my_bookings({ userId: userInfo.id }));
        }
    }, [dispatch, userInfo?.id]);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return t('bookings.na');
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (error) {
            console.warn("Error formatting date:", dateString, error);
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') return t('bookings.na');
        try {
            if (timeString.includes(':')) {
                const [hours, minutes] = timeString.split(':');
                const date = new Date();
                date.setHours(parseInt(hours, 10));
                date.setMinutes(parseInt(minutes, 10));
                return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
            }
            return timeString;
        } catch (error) {
            console.warn("Error formatting time:", timeString, error);
            return timeString;
        }
    };

    const getStatusClass = (status) => {
        const lowerStatus = status?.toLowerCase();
        switch (lowerStatus) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            pending: t('bookings.status.pending'),
            confirmed: t('bookings.status.confirmed'),
            cancelled: t('bookings.status.cancelled'),
            completed: t('bookings.status.completed')
        };
        return statusMap[status?.toLowerCase()] || status || t('bookings.na');
    };

    return (
        <div className='bg-white p-4 sm:p-6 rounded-md shadow-md'>
            <h2 className='text-xl font-semibold text-slate-700 mb-4'>{t('bookings.my_bookings')}</h2>

            {loading && (
                <div className="w-full flex justify-center items-center py-10 min-h-[200px]">
                    <ScaleLoader color="#059473" height={30} width={3} radius={3} margin={3} />
                </div>
            )}

            {!loading && myBookings.length === 0 && (
                <div className="text-center py-10 min-h-[200px] flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-slate-400 mb-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    <p className='text-slate-500'>{t('bookings.no_bookings')}</p>
                    <Link to="/services" className="mt-4 px-4 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors">
                        {t('bookings.book_service')}
                    </Link>
                </div>
            )}

            {!loading && myBookings.length > 0 && (
                <div className='relative overflow-x-auto rounded-md border border-gray-200'>
                    <table className='w-full text-sm text-left text-gray-600'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.service')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.provider')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.date')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.time')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.status')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.booked_on')}</th>
                                <th scope='col' className='px-4 py-3 sm:px-6'>{t('bookings.table.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBookings.map((booking) => (
                                <tr key={booking._id} className='bg-white border-b hover:bg-gray-50 transition-colors duration-150 align-middle'>
                                    <td className='px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap'>
                                        {booking?.serviceName || t('bookings.na')}
                                    </td>
                                    <td className='px-4 py-4 sm:px-6'>
                                        {booking?.providerName || t('bookings.na')}
                                    </td>
                                    <td className='px-4 py-4 sm:px-6 whitespace-nowrap'>
                                        {formatDate(booking?.date)}
                                    </td>
                                    <td className='px-4 py-4 sm:px-6 whitespace-nowrap'>
                                        {formatTime(booking?.time)}
                                    </td>
                                    <td className='px-4 py-4 sm:px-6'>
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusClass(booking?.status)}`}>
                                            {getStatusText(booking?.status)}
                                        </span>
                                    </td>
                                    <td className='px-4 py-4 sm:px-6 whitespace-nowrap'>
                                        {formatDate(booking?.createdAt)}
                                    </td>
                                    <td className='px-4 py-4 sm:px-6 whitespace-nowrap'>
                                        <Link
                                            to={`/dashboard/booking/details/${booking._id}`}
                                            className='text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center justify-center gap-1 text-xs font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded'
                                            title={t('bookings.table.view')}
                                        >
                                            <FaEye /> {t('bookings.table.view')}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookings;