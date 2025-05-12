import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_booking_details, messageClear } from '../../store/reducers/bookingReducer';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaRegCalendarAlt, FaClock, FaStickyNote, FaUser, FaPhoneAlt, FaStore, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const BookingDetails = () => {
    const { t } = useTranslation();
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { currentBooking, loading, errorMessage } = useSelector(state => state.booking);

    useEffect(() => {
        if (bookingId) {
            dispatch(get_booking_details(bookingId));
        }
    }, [dispatch, bookingId]);

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return t('booking_details.na');
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (error) {
            return dateString;
        }
    };

    const formatTime = (timeString) => {
        if (!timeString || typeof timeString !== 'string') return t('booking_details.na');
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
            pending: t('booking_details.status.pending'),
            confirmed: t('booking_details.status.confirmed'),
            cancelled: t('booking_details.status.cancelled'),
            completed: t('booking_details.status.completed')
        };
        return statusMap[status?.toLowerCase()] || status || t('booking_details.na');
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center min-h-[300px]">
                <ScaleLoader color="#059473" />
            </div>
        );
    }

    if (!loading && !errorMessage && (!currentBooking || Object.keys(currentBooking).length === 0)) {
        return <div className='bg-white p-5 text-center text-red-600 font-semibold'>{t('booking_details.not_found')}</div>;
    }

    return (
        <div className='bg-white p-5 rounded-md shadow-md'>
            <div className="border-b pb-3 mb-4">
                <h2 className='text-xl text-slate-700 font-semibold'>
                    {t('booking_details.title')}: <span className="font-mono text-slate-500">#{currentBooking._id}</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    {t('booking_details.booked_on')}: {formatDate(currentBooking.createdAt)}
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-3'>
                    <h3 className="text-lg font-semibold text-slate-600 border-b pb-1 mb-2">{t('booking_details.service_provider.title')}</h3>
                    <p className="flex items-center gap-2">
                        <FaInfoCircle className="text-blue-500" />
                        <span className="font-medium">{t('booking_details.service_provider.service')}:</span> {currentBooking.serviceName || t('booking_details.na')}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaDollarSign className="text-green-600" />
                        <span className="font-medium">{t('booking_details.service_provider.price')}:</span> {currentBooking.servicePrice !== undefined ? currentBooking.servicePrice : t('booking_details.na')} DA
                    </p>
                    <p className="flex items-center gap-2">
                        <FaStore className="text-purple-500" />
                        <span className="font-medium">{t('booking_details.service_provider.provider')}:</span> {currentBooking.providerName || t('booking_details.na')}
                    </p>
                    {currentBooking.providerPhone && (
                        <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-gray-500" />
                            <span className="font-medium">{t('booking_details.service_provider.provider_contact')}:</span> {currentBooking.providerPhone}
                        </p>
                    )}
                </div>

                <div className='space-y-3'>
                    <h3 className="text-lg font-semibold text-slate-600 border-b pb-1 mb-2">{t('booking_details.booking_info.title')}</h3>
                    <p className="flex items-center gap-2">
                        <FaRegCalendarAlt className="text-indigo-500" />
                        <span className="font-medium">{t('booking_details.booking_info.requested_date')}:</span> {formatDate(currentBooking.date)}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock className="text-orange-500" />
                        <span className="font-medium">{t('booking_details.booking_info.requested_time')}:</span> {formatTime(currentBooking.time)}
                    </p>
                    <p className='flex items-center gap-2'>
                        <span className="font-medium">{t('booking_details.booking_info.status')}:</span>
                        <span className={`py-0.5 px-2.5 text-xs rounded-full ${getStatusClass(currentBooking.status)}`}>
                            {getStatusText(currentBooking.status)}
                        </span>
                    </p>
                    <h3 className="text-lg font-semibold text-slate-600 border-b pb-1 mb-2 pt-3">{t('booking_details.user_info.title')}</h3>
                    <p className="flex items-center gap-2">
                        <FaUser className="text-cyan-500" />
                        <span className="font-medium">{t('booking_details.user_info.name')}:</span> {currentBooking.userName || t('booking_details.na')}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-gray-500" />
                        <span className="font-medium">{t('booking_details.user_info.phone')}:</span> {currentBooking.userPhone || t('booking_details.na')}
                    </p>
                </div>
            </div>

            {currentBooking.notes && (
                <div className='mt-6 pt-4 border-t'>
                    <h3 className='text-lg font-semibold text-slate-600 mb-2 flex items-center gap-2'>
                        <FaStickyNote className="text-yellow-500" /> {t('booking_details.notes.title')}
                    </h3>
                    <p className='text-slate-600 text-sm bg-slate-50 p-3 rounded border'>
                        {currentBooking.notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;