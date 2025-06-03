// src/components/Stripe.js

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import axios from 'axios'; // We will use the configured 'api' instance instead (ESLint warning fixed by removing or commenting out)
import api from '../api/api'; // <<<<<<----- ADD THIS IMPORT STATEMENT
import CheckoutForm from './CheckoutForm';

// Stripe Publishable Key - For this focused change, we keep it as is.
const stripePromise = loadStripe('pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp');

const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState('');

    const apperance = { // Original spelling
        theme: 'stripe'
    };
    const options = {
        apperance, // Original spelling
        clientSecret
    };

    const create_payment = async () => {
        // Add the console logs for debugging if you still need them, then remove for production
        console.log('Attempting to create payment. Price:', price);
        if (!price || price <= 0) {
            console.error('Invalid price for payment:', price);
            return;
        }
        try {
            console.log('Calling api.post("/order/create-payment")');
            // Now 'api' is correctly imported and defined
            const { data } = await api.post('/order/create-payment', { price });
            console.log('Payment intent creation response data:', data);

            if (data && data.clientSecret) {
                console.log('Client Secret received:', data.clientSecret);
                setClientSecret(data.clientSecret);
            } else {
                console.error('Client Secret NOT found in response data:', data);
            }
        } catch (error) {
            console.error('Error during create_payment API call:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : (
                    <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                        Start Payment
                    </button>
                )
            }
        </div>
    );
};

export default Stripe;