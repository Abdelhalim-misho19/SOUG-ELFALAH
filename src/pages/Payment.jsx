import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Stripe from '../components/Stripe';

const Payment = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { state } = useLocation();

    const price = state?.price;
    const items = state?.items;
    const orderId = state?.orderId;

    const [paymentMethod, setPaymentMethod] = useState('stripe');

    if (price === undefined || price === null || !items || !orderId) {
        return (
            <div>
                <Header />
                <section className='bg-[#eeeeee] min-h-[70vh] flex items-center justify-center'>
                    <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 text-center'>
                        <h2 className='text-red-600 font-semibold text-2xl mb-4'>{t('payment.error_order_details_missing')}</h2>
                        <p className='text-slate-700 text-lg mb-6'>
                            {t('payment.error_message')}
                        </p>
                        <button
                            onClick={() => navigate('/cart')}
                            className='px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition duration-200'
                        >
                            {t('payment.return_to_cart')}
                        </button>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    const handleCodOrder = () => {
        console.log(`COD method chosen for order ${orderId}. Navigating user...`);
        navigate('/orders');
    };

    return (
        <div>
            <Header />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap border-b border-slate-300'>
                                    <div
                                        onClick={() => setPaymentMethod('stripe')}
                                        className={`flex-1 md:flex-initial md:w-[50%] border-r border-slate-300 cursor-pointer py-6 px-4 md:px-8 text-center ${
                                            paymentMethod === 'stripe' ? 'bg-white scale-[1.03] shadow-md z-10' : 'bg-slate-100 hover:bg-slate-200'
                                        } transition-all duration-200 ease-in-out`}
                                    >
                                        <div className='flex flex-col gap-1 justify-center items-center'>
                                            <img className='h-8 w-auto object-contain mb-1' src="http://localhost:3000/images/payment/stripe.png" alt="Stripe" />
                                            <span className='text-slate-700 font-medium text-sm'>{t('payment.stripe')}</span>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`flex-1 md:flex-initial md:w-[50%] cursor-pointer py-6 px-4 md:px-8 text-center ${
                                            paymentMethod === 'cod' ? 'bg-white scale-[1.03] shadow-md z-10' : 'bg-slate-100 hover:bg-slate-200'
                                        } transition-all duration-200 ease-in-out`}
                                    >
                                        <div className='flex flex-col gap-1 justify-center items-center'>
                                            <img className='h-8 w-auto object-contain mb-1' src="http://localhost:3000/images/payment/cod.jpg" alt="Cash on Delivery" />
                                            <span className='text-slate-700 font-medium text-sm'>{t('payment.cash_on_delivery')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    {paymentMethod === 'stripe' && (
                                        <div className='bg-white p-6 shadow rounded'>
                                            <h3 className="text-lg font-semibold text-slate-700 mb-4">{t('payment.pay_with_stripe')}</h3>
                                            <Stripe orderId={orderId} price={price} />
                                        </div>
                                    )}
                                    {paymentMethod === 'cod' && (
                                        <div className='w-full px-6 py-8 bg-white shadow rounded'>
                                            <h3 className="text-lg font-semibold text-slate-700 mb-4">{t('payment.confirm_cash_on_delivery')}</h3>
                                            <p className='mb-6 text-sm text-slate-600'>
                                                {t('payment.cod_message')}
                                            </p>
                                            <button
                                                onClick={handleCodOrder}
                                                className='w-full sm:w-auto px-10 py-3 rounded-md hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white font-semibold transition duration-200 ease-in-out transform hover:scale-105'
                                            >
                                                {t('payment.confirm_cod_order')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-6'>
                                <div className='bg-white shadow-lg rounded-lg p-5 text-slate-600 flex flex-col gap-4'>
                                    <h2 className='font-bold text-xl border-b pb-2 border-slate-200'>{t('payment.order_summary')}</h2>
                                    <div className='flex justify-between items-center text-sm'>
                                        <span>{  items } {t('payment.items_and_shipping')} </span>
                                        <span className='font-medium'>{price ? `${price} DA` : 'N/A'}</span>
                                    </div>
                                    <div className='border-t pt-3 mt-2 border-slate-200 flex justify-between items-center font-semibold'>
                                        <span className='text-base'>{t('payment.total_amount')}</span>
                                        <span className='text-lg text-green-600'>{price ? `${price} DA` : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Payment;