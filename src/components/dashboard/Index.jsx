import React, { useEffect } from 'react';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer';
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { recentOrders, totalOrder, pendingOrder, cancelledOrder } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo.id));
    }, []);

    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
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

    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                        <span>{t('dashboard.total_orders')}</span>
                    </div>
                </div>

                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{pendingOrder}</h2>
                        <span>{t('dashboard.pending_orders')}</span>
                    </div>
                </div>

                <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl'>
                        <span className='text-xl text-green-800'><RiShoppingCart2Fill /></span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{cancelledOrder}</h2>
                        <span>{t('dashboard.cancelled_orders')}</span>
                    </div>
                </div>
            </div>

            <div className='bg-white p-5 mt-5 rounded-md'>
                <h2>{t('dashboard.recent_orders')}</h2>
                <div className='pt-4'>
                    <div className='relative overflow-x-auto rounded-md'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>{t('dashboard.table.order_id')}</th>
                                    <th scope='col' className='px-6 py-3'>{t('dashboard.table.price')}</th>
                                    <th scope='col' className='px-6 py-3'>{t('dashboard.table.payment_status')}</th>
                                    <th scope='col' className='px-6 py-3'>{t('dashboard.table.order_status')}</th>
                                    <th scope='col' className='px-6 py-3'>{t('dashboard.table.action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((o, i) => (
                                    <tr className='bg-white border-b' key={i}>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>#{o._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.price} DA</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.payment_status}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                                            <Link to={`/dashboard/order/details/${o._id}`}>
                                                <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                                                    {t('dashboard.table.view')}
                                                </span>
                                            </Link>
                                            {o.payment_status !== 'paid' && (
                                                <span
                                                    onClick={() => redirect(o)}
                                                    className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer'
                                                >
                                                    {t('dashboard.table.pay_now')}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;