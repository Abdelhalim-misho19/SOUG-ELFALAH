import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating';
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, delete_review, get_reviews, messageClear, product_details, service_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';

const Reviews = ({ product }) => {
    const dispatch = useDispatch();
    const [parPage, setParPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    
    const { userInfo } = useSelector(state => state.auth);
    const { successMessage, reviews, rating_review, totalReview } = useSelector(state => state.home);

    const [rat, setRat] = useState('');
    const [re, setRe] = useState('');

    console.log('Reviews product:', product);
    console.log('Rating to display:', product?.rating);

    const isProduct = product?.hasOwnProperty('category') && !product?.hasOwnProperty('serviceCategory');
    const itemId = product?._id;
    const itemSlug = product?.slug;

    const review_submit = (e) => {
        e.preventDefault();
        if (!itemId || !userInfo) return;
        const obj = {
            name: userInfo.name,
            review: re,
            rating: rat,
            productId: itemId
        };
        dispatch(customer_review(obj));
    };

    const handleDeleteReview = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            dispatch(delete_review({ reviewId, productId: itemId, pageNumber }));
        }
    };

    useEffect(() => { 
        if (successMessage && itemId && itemSlug) {
            toast.success(successMessage);
            dispatch(get_reviews({
                productId: itemId,
                pageNumber
            }));
            if (isProduct) {
                dispatch(product_details(itemSlug));
            } else {
                dispatch(service_details(itemSlug));
            }
            setRat('');
            setRe('');
            dispatch(messageClear());
        }  
    }, [successMessage, itemId, itemSlug, isProduct, dispatch, pageNumber]);

    useEffect(() => {
        if (itemId) {
            dispatch(get_reviews({
                productId: itemId,
                pageNumber
            }));
        }
    }, [pageNumber, itemId, dispatch]);

    if (!product || !itemId) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div className='mt-8'>
            <div className='flex gap-10 md-lg:flex-col'>
                <div className='flex flex-col gap-2 justify-start items-start py-4'>
                    <div>
                        <span className='text-6xl font-semibold'>{product.rating || 0}</span>
                        <span className='text-3xl font-semibold text-slate-600'>/5</span>
                    </div>
                    <div className='flex text-3xl'>
                        <Rating ratings={product.rating || 0} />
                    </div>
                    <p className='text-sm text-slate-600'>({totalReview}) Reviews</p>
                </div>

                <div className='flex gap-2 flex-col py-4'>
                    {[5, 4, 3, 2, 1, 0].map((rating) => (
                        <div key={rating} className='flex justify-start items-center gap-5'>
                            <div className='text-md flex gap-1 w-[93px]'>
                                <RatingTemp rating={rating} />
                            </div>
                            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review[5 - rating]?.sum || 0)) / totalReview) || 0}%` }} 
                                    className='h-full bg-[#Edbb0E]'
                                ></div>
                            </div>
                            <p className='text-sm text-slate-600 w-[0%]'>{rating_review[5 - rating]?.sum || 0}</p>
                        </div>
                    ))}
                </div> 
            </div> 

            <h2 className='text-slate-600 text-xl font-bold py-5'>{isProduct ? 'Product' : 'Service'} Review ({totalReview})</h2>

            <div className='flex flex-col gap-8 pb-10 pt-4'>
                {reviews.map((r, i) => (
                    <div key={i} className='flex flex-col gap-1'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1 text-xl'>
                                <RatingTemp rating={r.rating} />
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='text-slate-600 text-sm'>{r.date}</span>
                                {userInfo && userInfo.name === r.name && (
                                    <button 
                                        onClick={() => handleDeleteReview(r._id)} 
                                        className='text-red-500 text-sm hover:underline'
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                        <span className='text-slate-600 text-md'>{r.name}</span>
                        <p className='text-slate-600 text-sm'>{r.review}</p>
                    </div>
                ))}
                <div className='flex justify-end'>
                    {totalReview > 5 && (
                        <Pagination 
                            pageNumber={pageNumber} 
                            setPageNumber={setPageNumber} 
                            totalItem={totalReview} 
                            parPage={parPage} 
                            showItem={Math.floor(totalReview / 3)} 
                        />
                    )}
                </div> 
            </div>

            <div> 
                {userInfo ? (
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-1'>
                            <RatingReact 
                                onChange={(e) => setRat(e)}
                                initialRating={rat}
                                emptySymbol={<span className='text-slate-600 text-4xl'><CiStar/></span>}
                                fullSymbol={<span className='text-[#Edbb0E] text-4xl'><FaStar/></span>} 
                            /> 
                        </div> 
                        <form onSubmit={review_submit}>
                            <textarea 
                                value={re} 
                                onChange={(e) => setRe(e.target.value)} 
                                required 
                                className='border outline-0 p-3 w-full' 
                                name="" 
                                id="" 
                                cols="30" 
                                rows="5"
                            ></textarea>
                            <div className='mt-2'>
                                <button className='py-1 px-5 bg-indigo-500 text-white rounded-sm'>Submit</button>
                            </div> 
                        </form>
                    </div>
                ) : (
                    <div>
                        <Link to='/login' className='py-1 px-5 bg-red-500 text-white rounded-sm'> Login First </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reviews;