import React, { useEffect } from 'react';
// FaEye is not used in grid hover, and now not in list hover either.
// It might still be used if you had a list item that was a direct link with FaEye.
// For now, let's assume it's not needed if the list item itself links to details.
// import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const ShopProducts = ({ products, styles }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    const { successMessage, errorMessage } = useSelector(state => state.card);

    const add_card_handler = (e, productId) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: productId
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist_handler = (e, product) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }));
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    if (!Array.isArray(products)) {
        return <div>Loading products...</div>;
    }

    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2' : 'grid-cols-1'} gap-3`}>
            {products.map((p, i) => {
                if (!p || !p.images || p.images.length === 0) {
                    console.warn("Skipping product due to missing data:", p);
                    return null;
                }

                if (styles === 'grid') {
                    return (
                        <Link
                            to={`/product/details/${p.slug}`}
                            key={p._id || i}
                            className='block border group transition-all duration-500 hover:shadow-xl hover:-mt-1 bg-white rounded-lg flex flex-col'
                            role="link"
                            aria-label={`View details for ${p.name}`}
                        >
                            <div className='relative overflow-hidden'>
                                {p.discount > 0 && (
                                    <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10'>
                                        {p.discount}%
                                    </div>
                                )}
                                <img className='sm:w-full w-full h-[210px] md:h-[240px] object-cover rounded-t-lg' src={p.images[0]} alt={p.name} />

                                <ul className='flex transition-all duration-700 -bottom-10 group-hover:bottom-3 justify-center items-center gap-2 absolute w-full z-20'>
                                    <li
                                        onClick={(e) => add_wishlist_handler(e, p)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                                        title="Add to Wishlist"
                                    >
                                        <FaRegHeart />
                                    </li>
                                    <li
                                        onClick={(e) => add_card_handler(e, p._id)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full shadow-md hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                                        title="Add to Cart"
                                    >
                                        <FiShoppingCart />
                                    </li>
                                </ul>
                            </div>
                            <div className='py-3 px-3 flex flex-col flex-grow'>
                                <h2 className='font-semibold text-md text-slate-700 mb-1 h-[44px] overflow-hidden line-clamp-2 group-hover:text-[#059473] transition-colors'>
                                    {p.name}
                                </h2>
                                <div className='mt-auto'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <span className='text-md font-semibold text-orange-500'>{p.price} DA</span>
                                        {p.discount > 0 && typeof p.price === 'number' && (
                                            <span className='line-through text-sm text-red-500'>
                                                {Math.floor(p.price / (1 - p.discount / 100))} DA
                                            </span>
                                        )}
                                    </div>
                                    <div className='flex mt-1'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                } else { // styles === 'list'
                    return (
                        <div key={p._id || i} className='border group transition-all duration-500 hover:shadow-xl bg-white rounded-lg flex w-full p-3 sm:p-4 gap-3 sm:gap-4'>
                            <div className='relative overflow-hidden w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] flex-shrink-0'>
                                {p.discount > 0 && (
                                    <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10'>
                                        {p.discount}%
                                    </div>
                                )}
                                <Link to={`/product/details/${p.slug}`}>
                                    <img className='w-full h-full object-cover rounded-md' src={p.images[0]} alt={p.name} />
                                </Link>
                                {/* Hover icons for list view (small screens) - ENTIRE UL REMOVED as per request */}
                                {/* 
                                <ul className='flex transition-all duration-500 opacity-0 group-hover:opacity-100 -bottom-10 group-hover:bottom-3 justify-center items-center gap-2 absolute w-full md:hidden'>
                                    // Wishlist and Cart icons were here, now removed
                                </ul>
                                */}
                            </div>
                            <div className='flex flex-col flex-grow justify-between'>
                                <div>
                                    <Link to={`/product/details/${p.slug}`}>
                                        <h2 className='font-bold text-lg sm:text-xl text-slate-700 hover:text-[#059473] mb-1 line-clamp-2'>
                                            {p.name}
                                        </h2>
                                    </Link>
                                    <div className='flex items-center gap-2 mb-1 sm:mb-2'>
                                        <Rating ratings={p.rating} />
                                    </div>
                                    <p className='text-xs sm:text-sm text-slate-500 mt-1 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3'>
                                        {p.description ? p.description : 'No description available.'}
                                    </p>
                                </div>
                                <div className='flex flex-col items-start mt-auto'>
                                    <div className='flex items-baseline gap-2 mb-2 sm:mb-3'>
                                        <span className='text-xl sm:text-2xl font-bold text-orange-500'>{p.price} DA</span>
                                        {p.discount > 0 && typeof p.price === 'number' && (
                                            <span className='line-through text-sm sm:text-md text-red-500'>
                                                {Math.floor(p.price / (1 - p.discount / 100))} DA
                                            </span>
                                        )}
                                    </div>
                                    {/* Explicit buttons in list view content area - THESE REMAIN */}
                                    <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
                                        <button onClick={(e) => add_card_handler(e, p._id)} className='px-4 py-2 text-sm sm:text-base bg-[#059473] text-white rounded-md hover:bg-[#047a60] transition-all flex items-center justify-center gap-2 w-full sm:w-auto'>
                                            <FiShoppingCart /> Add to Cart
                                        </button>
                                        <button onClick={(e) => add_wishlist_handler(e, p)} title="Add to Wishlist" className='p-2 sm:p-3 border border-slate-300 rounded-md hover:bg-slate-100 text-slate-600 hover:text-[#059473] transition-all flex items-center justify-center w-full sm:w-auto'>
                                            <FaRegHeart size={18}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ShopProducts;