// src/pages/Booking.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Adjust path if needed
import Footer from '../components/Footer'; // Adjust path if needed
import { FaPhoneAlt, FaStore, FaCalendarAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import api from '../api/api'; // Ensure this path is correct for your api helper
import { ClipLoader } from 'react-spinners'; // For loading state

const Booking = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useSelector(reduxState => reduxState.auth);

    // --- Receive providerId from location.state ---
    const {
        serviceId = null,
        name = 'Service',
        price = 0,
        image = '/path/to/default-image.jpg',
        provider = 'Provider Name', // This is likely the Shop Name or Seller Name
        phoneNumber: providerPhoneNumber = 'N/A', // Seller's phone, if available
        providerId = null // <<< Receive the Seller's ID here
    } = state || {};

    const [bookingDetails, setBookingDetails] = useState({
        userName: '',
        userPhone: '',
        date: '',
        time: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true); // For checking state on load

    useEffect(() => {
        // Check if essential state is present on initial load
        if (!state || !serviceId || !providerId) {
             console.warn("Booking page loaded without complete state:", state);
             // Give a brief moment for state to potentially arrive if it's slightly delayed
             const timer = setTimeout(() => {
                // Re-check after delay
                if (!state || !serviceId || !providerId) {
                    setIsInitialLoading(false); // Stop loading, state is missing
                }
             }, 200);
             return () => clearTimeout(timer); // Cleanup timer
        } else {
             setIsInitialLoading(false); // State is present, stop loading check
        }

        // Pre-fill user details if logged in
        if (userInfo) {
            setBookingDetails(prev => ({
                ...prev,
                userName: userInfo.name || '',
                // Make sure 'userInfo.phoneNumber' is the correct field for the user's phone
                userPhone: userInfo.phoneNumber || userInfo.phone || ''
            }));
        }
    }, [userInfo, state, serviceId, providerId]); // Dependencies for effect

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        // --- Validation ---
        if (!userInfo?.id) {
             toast.error('You must be logged in to make a booking.');
             navigate('/login');
             return;
        }

        // --- Add validation for providerId ---
        if (!serviceId || !providerId) {
             toast.error('Booking cannot be completed. Service or Provider information is missing.');
             console.error("handleSubmit Error: Missing serviceId or providerId:", { serviceId, providerId });
             return; // Stop submission
        }

        if (!bookingDetails.userName || !bookingDetails.userPhone || !bookingDetails.date || !bookingDetails.time) {
            toast.error('Please fill in your name, phone, desired date, and time.');
            return;
        }
        const selectedDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}:00`); // Add seconds for Date object
        const now = new Date();
         // Allow booking for today but not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's date to the beginning of the day

        if (selectedDateTime < now) {
             toast.error('Please select a date and time in the future.');
             return;
        }


        setIsSubmitting(true);
        const toastId = toast.loading('Submitting booking request...');

        // --- Prepare data for backend, including providerId ---
        const bookingData = {
            userId: userInfo.id,
            userName: bookingDetails.userName,
            userPhone: bookingDetails.userPhone,
            serviceId: serviceId,
            serviceName: name,
            servicePrice: price,
            providerId: providerId, // <<< Include providerId here
            providerName: provider,
            providerPhone: providerPhoneNumber,
            date: bookingDetails.date,
            time: bookingDetails.time,
            notes: bookingDetails.notes,
            status: 'Pending'
        };

        console.log("Submitting Booking Data:", bookingData);

        try {
            const response = await api.post('/bookings/create', bookingData);
            console.log('Booking API Response:', response.data);

            if (response.data && response.status === 201) {
                 toast.success(response.data.message || 'Booking request submitted successfully!', { id: toastId });
                 navigate('/dashboard/my-bookings'); // Redirect on success
            } else {
                 throw new Error(response.data?.message || "Unexpected response from server.");
            }

        } catch (error) {
            console.error("Booking submission failed:", error);
            console.error("Error Response Data:", error.response?.data);
            toast.error(error.response?.data?.message || 'Booking failed. Please try again.', { id: toastId });
            setIsSubmitting(false); // Re-enable button ONLY on error
        }
    };

    // --- Render loading indicator while checking initial state ---
     if (isInitialLoading) {
        return (
            <div>
                <Header />
                <div className="flex justify-center items-center min-h-[calc(100vh-300px)]">
                    <ClipLoader color="#059473" size={50} />
                </div>
                <Footer />
            </div>
        );
    }

    // --- Render error/redirect if essential state is missing ---
    if (!state || !serviceId || !providerId) {
        return (
            <div>
                <Header />
                <div className='container mx-auto text-center py-20 px-4'>
                    <h2 className='text-2xl font-semibold text-red-600 mb-4'>Booking Information Missing</h2>
                    <p className='text-slate-600 mb-6'>
                        Required service or provider details were not found. Please go back and select a service again.
                    </p>
                    <button
                        onClick={() => navigate(-1)} // Go back one step
                        className='px-6 py-2 bg-[#059473] text-white font-semibold rounded-md hover:bg-[#047a60] transition duration-200 ease-in-out shadow hover:shadow-lg'
                    >
                        Go Back
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // --- Render the booking form if state is valid ---
    return (
        <div>
            <Header />
            <section className='bg-slate-100 py-10 md:py-16'>
                <div className='w-[90%] lg:w-[85%] xl:w-[75%] mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl'>
                    <h2 className='text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8'>Confirm Your Booking</h2>
                    <div className='flex flex-col lg:flex-row gap-8 xl:gap-12'>

                        {/* Service Details Section (Left Side) */}
                        <div className='lg:w-2/5 w-full border border-slate-200 rounded-lg p-4'>
                            <img
                                className='w-full h-auto max-h-[300px] object-cover rounded-md mb-4 shadow-md'
                                src={image || '/path/to/default-image.jpg'}
                                alt={name || 'Service Image'}
                                onError={(e) => { e.target.onerror = null; e.target.src='/path/to/default-image.jpg'; }}
                            />
                            <h3 className='text-xl md:text-2xl font-bold text-slate-800 mb-2'>{name}</h3>
                            <p className='text-2xl text-[#059473] font-bold mb-4'>
                                {price !== undefined ? `${Number(price).toFixed(2)} DA` : 'Price not available'}
                            </p>
                            <div className='space-y-2 text-slate-600 text-sm'> {/* Adjusted text size */}
                                <p className='flex items-center gap-2'><FaStore className="text-slate-500" /> {provider || 'Provider details unavailable'}</p>
                                <p className='flex items-center gap-2'><FaPhoneAlt className="text-slate-500" /> {providerPhoneNumber || 'N/A'}</p>
                                <p className='pt-2 text-xs text-slate-500'>Service ID: {serviceId?.slice(-6) || 'N/A'}</p>
                                <p className='text-xs text-slate-500'>Provider ID: {providerId?.slice(-6) || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Booking Form Section (Right Side) */}
                        <div className='lg:w-3/5 w-full'>
                            <h2 className='text-xl md:text-2xl font-semibold text-slate-700 mb-5 border-b border-slate-300 pb-3'>Enter Your Details</h2>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                {/* User Name */}
                                <div>
                                    <label htmlFor='userName' className='block text-sm font-medium text-slate-700 mb-1.5'>Your Name *</label>
                                    <input
                                        type='text'
                                        id='userName'
                                        name='userName'
                                        value={bookingDetails.userName}
                                        onChange={handleInputChange}
                                        className='w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#059473]/50 focus:border-[#059473] transition duration-150'
                                        placeholder='Enter your full name'
                                        required aria-required="true"
                                    />
                                </div>
                                {/* User Phone */}
                                <div>
                                    <label htmlFor='userPhone' className='block text-sm font-medium text-slate-700 mb-1.5'>Your Phone Number *</label>
                                    <input
                                        type='tel'
                                        id='userPhone'
                                        name='userPhone'
                                        value={bookingDetails.userPhone}
                                        onChange={handleInputChange}
                                        className='w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#059473]/50 focus:border-[#059473] transition duration-150'
                                        placeholder='+1 123 456 7890'
                                        required aria-required="true"
                                    />
                                </div>
                                {/* Date & Time Row */}
                                <div className='flex flex-col sm:flex-row gap-5'>
                                    <div className='flex-1'>
                                        <label htmlFor='date' className='block text-sm font-medium text-slate-700 mb-1.5'>
                                            <FaCalendarAlt className='inline mr-1.5 mb-0.5'/> Date *
                                        </label>
                                        <input
                                            type='date'
                                            id='date'
                                            name='date'
                                            value={bookingDetails.date}
                                            onChange={handleInputChange}
                                            className='w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#059473]/50 focus:border-[#059473] transition duration-150'
                                            min={new Date().toISOString().split('T')[0]}
                                            required aria-required="true"
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <label htmlFor='time' className='block text-sm font-medium text-slate-700 mb-1.5'>
                                            <FaClock className='inline mr-1.5 mb-0.5'/> Time *
                                        </label>
                                        <input
                                            type='time'
                                            id='time'
                                            name='time'
                                            value={bookingDetails.time}
                                            onChange={handleInputChange}
                                            className='w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#059473]/50 focus:border-[#059473] transition duration-150'
                                            required aria-required="true"
                                        />
                                    </div>
                                </div>
                                {/* Additional Notes */}
                                <div>
                                    <label htmlFor='notes' className='block text-sm font-medium text-slate-700 mb-1.5'>Additional Notes (Optional)</label>
                                    <textarea
                                        id='notes'
                                        name='notes'
                                        value={bookingDetails.notes}
                                        onChange={handleInputChange}
                                        className='w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#059473]/50 focus:border-[#059473] transition duration-150'
                                        rows='3'
                                        placeholder='Any specific requests or instructions...'
                                    />
                                </div>
                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-6 bg-[#059473] text-white font-semibold rounded-md transition duration-200 ease-in-out hover:bg-[#047a60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#059473] disabled:opacity-50 disabled:cursor-not-allowed ${!isSubmitting ? 'hover:shadow-lg' : ''}`}
                                >
                                    {isSubmitting ? (
                                         <div className="flex justify-center items-center gap-2">
                                            <ClipLoader color="#fff" size={20} />
                                            <span>Submitting...</span>
                                         </div>
                                    ) : 'Confirm Booking Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Booking;