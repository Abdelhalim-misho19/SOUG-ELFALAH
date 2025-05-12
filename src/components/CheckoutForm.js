import React, { useState, useEffect } from 'react';
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

// This component receives the orderId as a prop from its parent (likely the Stripe component)
const CheckoutForm = ({ orderId }) => {

    // Hooks from Stripe to interact with Stripe Elements and Stripe API
    const stripe = useStripe();
    const elements = useElements();

    // State for handling loading status and feedback messages
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Use effect to store the orderId in localStorage when the component mounts or orderId changes.
    // This ID is retrieved later on the confirmation page to update the order status in the backend.
    useEffect(() => {
        if (orderId) {
            console.log("CheckoutForm: Setting orderId in localStorage:", orderId);
            localStorage.setItem('orderId', orderId);
        } else {
            // Log an error if orderId prop is missing, as it's crucial for confirmation
            console.error("CheckoutForm: orderId prop is missing! Payment confirmation might fail.");
            setMessage("Error: Missing order information. Cannot proceed."); // Inform user
        }
        // Optional cleanup: Remove the item if the component unmounts *before* submission?
        // Usually, ConfirmOrder handles removal after successful confirmation.
        // return () => { localStorage.removeItem('orderId'); }
    }, [orderId]); // Dependency array ensures this runs if orderId changes

    // Configuration options for the Payment Element (visual layout)
    const paymentElementOptions = {
        layout: 'tabs' // Other options: 'accordion'
    };

    // Function to handle the form submission (clicking "Pay Now")
    const submit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission

        // Basic validation: Ensure orderId was successfully set in localStorage before proceeding
        const storedOrderId = localStorage.getItem('orderId');
        if (!storedOrderId || storedOrderId !== orderId) {
            console.error("Order ID mismatch or missing in localStorage before payment confirmation.");
            setMessage("Error preparing payment. Please refresh and try again.");
            return; // Stop the submission
        }

        // Don't proceed if Stripe.js hasn't loaded yet or Elements are not available
        if (!stripe || !elements) {
            console.log("Stripe.js or Elements not loaded yet.");
            // Optionally disable the button if stripe or elements are null
            return;
        }

        // Start loading state and clear previous messages
        setIsLoading(true);
        setMessage(null);

        // --- DYNAMIC RETURN URL ---
        // Get the current origin (e.g., 'http://localhost:3001')
        const currentOrigin = window.location.origin;
        // Construct the full URL for the confirmation page on the frontend
        const returnUrl = `${currentOrigin}/order/confirm`;
        console.log("Using dynamic return_url for Stripe:", returnUrl); // Log for debugging
        // --- END DYNAMIC RETURN URL ---


        // Trigger the payment confirmation process with Stripe
        const { error } = await stripe.confirmPayment({
            elements, // Pass the Elements instance containing card details, etc.
            confirmParams: {
                // Redirect URL Stripe will send the user back to after payment attempt
                return_url: returnUrl,
            }
            // Note: By default, confirmPayment redirects immediately if successful or if further action is needed.
            // If you want to handle the result here *without* immediate redirect (less common for card payments),
            // you can add `redirect: 'if_required'` to confirmParams.
        });

        // Handle potential immediate errors (e.g., card declined, validation error)
        // This code block might not be reached if a redirect happens successfully.
        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message || "Invalid card details or validation failed.");
            } else {
                console.error("Stripe confirmPayment unexpected error:", error);
                setMessage('An unexpected error occurred. Please try again.');
            }
        } else {
            // This might be reached if confirmPayment doesn't immediately redirect (e.g., using redirect: 'if_required')
            // Or if there's a slight delay before redirect.
            setMessage('Processing payment...'); // Provide feedback if needed
        }

        // Stop the loading indicator regardless of immediate error or redirect start
        setIsLoading(false);
    };

    // Render the form with Stripe Elements and the submit button
    return (
        <form onSubmit={submit} id='payment-form' className="space-y-5 p-1"> {/* Added padding and spacing */}
            {/* LinkAuthenticationElement allows quick login/signup via Stripe Link */}
            <LinkAuthenticationElement
                id='link-authentication-element'
                // Styling can be customized via Stripe Appearance API or basic classes
                className="w-full p-3 border border-gray-600/50 rounded-lg bg-[#1a1a2e]/70 text-gray-200 focus-within:border-purple-500 focus-within:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all"
            />
            {/* PaymentElement collects all necessary payment details (card, address, etc.) */}
            <PaymentElement
                id='payment-element'
                options={paymentElementOptions}
                // Styling can be customized via Stripe Appearance API or basic classes
                className="p-3 border border-gray-600/50 rounded-lg bg-[#1a1a2e]/70 focus-within:border-purple-500 focus-within:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all"
            />

            {/* Submit Button */}
            <button
                // Disable button while loading or if Stripe isn't ready
                disabled={isLoading || !stripe || !elements}
                id='submit'
                // Enhanced styling consistent with the theme
                className='w-full mt-5 px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] focus:ring-emerald-500 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700'
            >
                <span id='button-text'>
                    {/* Show loading text or "Pay Now" */}
                    {isLoading ? "Processing..." : "Pay Now"}
                </span>
            </button>

            {/* Display error or informational messages to the user */}
            {message && (
                <div id="payment-message" className="mt-4 text-sm text-red-400 text-center font-medium">
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;