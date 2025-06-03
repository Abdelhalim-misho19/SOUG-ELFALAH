import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import errorImg from '../assets/error.png'; // Renamed import for clarity, ensure path is correct
import successImg from '../assets/success.png'; // Renamed import for clarity, ensure path is correct
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
// import axios from 'axios'; // We will use the configured 'api' instance
import api from '../api/api'; // <--- IMPORT YOUR CONFIGURED API INSTANCE (adjust path if needed)

const load = async () => {
    // Ideally, this key would also be an environment variable for test vs. live
    return await loadStripe('pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp');
};

const ConfirmOrder = () => {
    const [loader, setLoader] = useState(true);
    const [stripe, setStripe] = useState(null); // Initialize with null
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
        if (!clientSecret) {
            console.log("ConfirmOrder: No client_secret found in URL.");
            // Optionally set a message or redirect if clientSecret is crucial and missing
            setMessage('failed'); // Or a more specific "invalid_link"
            setLoader(false);
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) {
                console.error("ConfirmOrder: Failed to retrieve payment intent.");
                setMessage('failed');
                setLoader(false);
                return;
            }
            console.log("ConfirmOrder: Retrieved PaymentIntent status:", paymentIntent.status);
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage('succeeded');
                    break;
                case "processing":
                    setMessage('processing');
                    setLoader(false); // Stop loader if it's just processing
                    break;
                case "requires_payment_method":
                    setMessage('failed');
                    setLoader(false);
                    break;
                default:
                    setMessage('failed');
                    setLoader(false);
            }
        }).catch(err => {
            console.error("ConfirmOrder: Error retrieving PaymentIntent:", err);
            setMessage('failed');
            setLoader(false);
        });
    }, [stripe]);

    const get_load = async () => {
        try {
            const tempStripe = await load();
            setStripe(tempStripe);
        } catch (error) {
            console.error("ConfirmOrder: Failed to load Stripe.js", error);
            // Handle Stripe.js loading failure, maybe show an error to the user
            setLoader(false);
            setMessage('config_error'); // Custom message state for this
        }
    };

    useEffect(() => {
        get_load();
    }, []);

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId');
        if (orderId) {
            console.log("ConfirmOrder: Attempting to confirm order with ID:", orderId);
            try {
                // Use the 'api' instance here
                await api.get(`/order/confirm/${orderId}`); // Path relative to baseURL in api.js
                console.log("ConfirmOrder: Payment update API call successful for orderId:", orderId);
                localStorage.removeItem('orderId');
                setLoader(false);
            } catch (error) {
                console.error("ConfirmOrder: Error calling update_payment API:", error.response ? error.response.data : error.message);
                // Optionally handle this error, maybe retry or inform the user
                // For now, we'll still set loader to false if it fails here after success from Stripe
                setLoader(false);
            }
        } else {
            console.warn("ConfirmOrder: orderId not found in localStorage for update_payment.");
            // This is a potential issue if Stripe succeeded but we can't find the orderId
            setLoader(false); // Still stop loading
        }
    };

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment();
        }
    }, [message]);

    // Handle config error separately if Stripe.js fails to load
    if (message === 'config_error') {
        return (
            <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
                <img src={errorImg} alt="Error" />
                <p className='text-red-500 font-semibold'>Payment system configuration error.</p>
                <Link className='px-5 py-2 bg-blue-500 rounded-sm text-white' to="/">Go to Homepage</Link>
            </div>
        )
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                loader && message !== 'processing' ? <FadeLoader color="#36d7b7" /> : // Show loader only if truly loading and not just 'processing'
                (message === 'failed' || message === 'processing') ? (
                    <>
                        <img src={errorImg} alt="Error" />
                        {message === 'processing' && <p className='text-orange-500 font-semibold'>Your payment is processing.</p>}
                        {message === 'failed' && <p className='text-red-500 font-semibold'>Payment Failed.</p>}
                        <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard</Link>
                    </>
                ) : message === 'succeeded' ? ( // No need for loader check here as it's handled in update_payment
                    <>
                        <img src={successImg} alt="Success" />
                        <p className='text-green-500 font-semibold'>Payment Successful!</p>
                        <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard</Link>
                    </>
                ) : (
                    // Fallback loader if message is null initially before Stripe check
                    <FadeLoader color="#36d7b7" />
                )
            }
        </div>
    );
};

export default ConfirmOrder;