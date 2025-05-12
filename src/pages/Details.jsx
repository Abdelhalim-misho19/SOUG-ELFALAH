import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart, FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { product_details, get_reviews } from '../store/reducers/homeReducer';
import { add_to_card, add_to_wishlist, messageClear } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTranslation } from 'react-i18next';

const Details = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { product, relatedProducts, moreProducts, totalReview } = useSelector((state) => state.home);
    const { userInfo } = useSelector((state) => state.auth);
    const { errorMessage, successMessage } = useSelector((state) => state.card);

    const [image, setImage] = useState('');
    const [state, setState] = useState('reviews');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(product_details(slug));
        dispatch(get_reviews({ productId: product?._id, pageNumber: 1 }));
        setIsLoading(true);
    }, [slug, dispatch, product?._id]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setImage(product.images[0]);
            setIsLoading(false);
        }
    }, [product]);

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

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
        smmobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
        xsmobile: { breakpoint: { max: 440, min: 0 }, items: 1 },
    };

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error(t('product_details.out_of_stock'));
        } else {
            setQuantity(quantity + 1);
        }
    };

    const dec = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id,
                name: product.name,
                price: product.discount ? product.price - Math.floor((product.price * product.discount) / 100) : product.price,
                image: product.images[0],
                discount: product.discount || 0,
                sellerId: product.sellerId,
                slug: product.slug
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount || 0,
                rating: product.rating,
                slug: product.slug
            }));
        } else {
            navigate('/login');
        }
    };

    const buynow = () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        let price = product.discount ? product.price - Math.floor((product.price * product.discount) / 100) : product.price;
        const obj = [{
            sellerId: product.sellerId,
            shopName: product.shopName,
            price: quantity * (price - Math.floor((price * 5) / 100)),
            products: [{ quantity, productInfo: product }]
        }];
        navigate('/shipping', {
            state: {
                products: obj,
                price: price * quantity,
                shipping_fee: (price*10)/100,
                items: 1
            }
        });
    };

    if (isLoading) return <div>{t('product_details.loading')}</div>;

    return (
        <div>
            <Header />
            <section className='bg-[url("http://localhost:3000/images/banner/products.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>{t('product_details.product_details')}</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>{t('product_details.home')}</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <span>{t('product_details.product_details')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='bg-slate-100 py-5 mb-5'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                            <Link to='/'>{t('product_details.home')}</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <Link to='/'>{product.category}</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <span>{product.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[400px] w-full object-cover' src={image || product.images[0]} alt={product.name} />
                            </div>
                            <div className='py-3'>
                                <Carousel autoPlay={true} infinite={true} responsive={responsive} transitionDuration={500}>
                                    {product.images.map((img, i) => (
                                        <div key={i} onClick={() => setImage(img)}>
                                            <img className='h-[120px] cursor-pointer' src={img} alt={`thumbnail-${i}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>

                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 font-bold'>
                                <h3>{product.name}</h3>
                            </div>
                            <div className='flex justify-start items-center gap-4'>
                                <Rating ratings={product.rating} />
                                <span className='text-green-500'>({totalReview} {t('product_details.reviews')})</span>
                            </div>
                            <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                {product.discount ? (
                                    <>
                                        {t('product_details.price')}: <h2 className='line-through'>{product.price} DA</h2>
                                        <h2>{product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%) DA</h2>
                                    </>
                                ) : (
                                    <h2>{t('product_details.price')}: {product.price} DA</h2>
                                )}
                            </div>
                            <div className='text-slate-600'>
                                <p>{product.description.slice(0, 150)}...</p>
                                <p className='text-slate-600 py-1 font-bold'>{t('product_details.shop_name')}: {product.shopName}</p>
                            </div>
                            <div className='flex gap-3 pb-10 border-b'>
                                {product.stock ? (
                                    <>
                                        <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                                            <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                            <div className='px-6'>{quantity}</div>
                                            <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                                        </div>
                                        <button onClick={add_card} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white'>
                                            {t('product_details.add_to_cart')}
                                        </button>
                                    </>
                                ) : ''}
                                <div onClick={add_wishlist} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'>
                                    <FaHeart />
                                </div>
                            </div>
                            <div className='flex py-5 gap-5'>
                                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                    <span>{t('product_details.availability')}</span>
                                    <span>{t('product_details.share_on')}</span>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                    {product.stock ? `In Stock(${product.stock})` : 'Out Of Stock'}
                                    </span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#232726] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href="#"><FaFacebookF /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#255e51] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href="#"><FaTwitter /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white' href="#"><FaLinkedin /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#"><FaGithub /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                {product.stock ? (
                                    <button onClick={buynow} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white'>
                                        {t('product_details.buy_now')}
                                    </button>
                                ) : ''}
                                <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white'>
                                    {t('product_details.chat_seller')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>
                        <div className='w-[72%] md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-2'>
                                    <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'reviews' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>
                                        {t('product_details.reviews')}
                                    </button>
                                    <button onClick={() => setState('description')} className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${state === 'description' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>
                                        {t('product_details.description')}
                                    </button>
                                </div>
                                <div>
                                    {state === 'reviews' ? <Reviews product={product} /> : <p className='py-5 text-slate-600'>{product.description}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='w-[28%] md-lg:w-full'>
                            <div className='pl-4 md-lg:pl-0'>
                                <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                                    <h2 className='font-bold'>{t('product_details.from_shop', { shopName: product.shopName })}</h2>
                                </div>
                                <div className='flex flex-col gap-5 mt-3 border p-3'>
                                    {moreProducts.map((p) => (
                                        <Link key={p._id} to={`/details/${p.slug}`} className='block'>
                                            <div className='relative h-[270px]'>
                                                <img className='w-full h-full object-cover' src={p.images[0]} alt={p.name} />
                                                {p.discount !== 0 && (
                                                    <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                        {p.discount}%
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className='text-slate-600 py-1 font-bold'>{p.name}</h2>
                                            <div className='flex gap-2'>
                                                <h2 className='text-lg font-bold text-slate-600'>{p.price} DA</h2>
                                                <Rating ratings={p.rating} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl py-8 text-slate-600'>{t('product_details.related_products')}</h2>
                    <Swiper
                        slidesPerView='auto'
                        breakpoints={{ 1280: { slidesPerView: 3 }, 565: { slidesPerView: 2 } }}
                        spaceBetween={25}
                        loop={true}
                        pagination={{ clickable: true, el: '.custom_bullet' }}
                        modules={[Pagination]}
                        className='mySwiper'
                    >
                        {relatedProducts.map((p) => (
                            <SwiperSlide key={p._id}>
                                <Link to={`/details/${p.slug}`} className='block'>
                                    <div className='relative h-[270px]'>
                                        <img className='w-full h-full object-cover' src={p.images[0]} alt={p.name} />
                                        <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
                                        {p.discount !== 0 && (
                                            <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                {p.discount}%
                                            </div>
                                        )}
                                    </div>
                                    <div className='p-4 flex flex-col gap-1'>
                                        <h2 className='text-slate-600 text-lg font-bold'>{p.name}</h2>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h2 className='text-lg font-bold text-slate-600'>{p.price} DA </h2>
                                            <Rating ratings={p.rating} />
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='w-full flex justify-center items-center py-8'>
                        <div className='custom_bullet justify-center gap-3 !w-auto'></div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Details;