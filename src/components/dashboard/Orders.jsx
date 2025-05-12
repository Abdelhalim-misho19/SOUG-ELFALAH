import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';
import { useTranslation } from 'react-i18next';

const Orders = () => {
    const { t } = useTranslation();
    const [state, setState] = useState('all');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { myOrders } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(get_orders({ status: state, customerId: userInfo?.id }));
    }, [state, userInfo?.id]);

    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord?.products?.length; i++) {
            items = ord.products[i].quantity + items;
        }
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        });
    };

    // Map server status values to translated text
    const getPaymentStatusText = (status) => {
        const statusMap = {
            paid: t('orders.status.paid'),
            unpaid: t('orders.status.unpaid')
        };
        return statusMap[status] || status;
    };

    const getDeliveryStatusText = (status) => {
        const statusMap = {
            placed: t('orders.status.placed'),
            pending: t('orders.status.pending'),
            cancelled: t('orders.status.cancelled'),
            warehouse: t('orders.status.warehouse')
        };
        return statusMap[status] || status;
    };

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>{t('orders.my_orders')}</h2>
                <select
                    className='outline-none px-3 py-1 border rounded-md text-slate-600'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="all">{t('orders.order_status')}</option>
                    <option value="placed">{t('orders.status.placed')}</option>
                    <option value="pending">{t('orders.status.pending')}</option>
                    <option value="cancelled">{t('orders.status.cancelled')}</option>
                    <option value="warehouse">{t('orders.status.warehouse')}</option>
                </select>
            </div>

            <div className='pt-4'>
                <div className='relative overflow-x-auto rounded-md'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>{t('orders.table.order_id')}</th>
                                <th scope='col' className='px-6 py-3'>{t('orders.table.price')}</th>
                                <th scope='col' className='px-6 py-3'>{t('orders.table.payment_status')}</th>
                                <th scope='col' className='px-6 py-3'>{t('orders.table.order_status')}</th>
                                <th scope='col' className='px-6 py-3'>{t('orders.table.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders?.length > 0 ? (
                                myOrders.map((o, i) => (
                                    <tr key={i} className='bg-white border-b'>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>#{o._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} DA</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                            {getPaymentStatusText(o.payment_status)}
                                        </td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                            {getDeliveryStatusText(o.delivery_status)}
                                        </td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                            <Link to={`/dashboard/order/details/${o._id}`}>
                                                <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                                                    {t('orders.table.view')}
                                                </span>
                                            </Link>
                                            {o.payment_status !== 'paid' && (
                                                <span
                                                    onClick={() => redirect(o)}
                                                    className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer'
                                                >
                                                    {t('orders.table.pay_now')}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className='px-6 py-4 text-center'>
                                        {t('orders.no_orders')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;