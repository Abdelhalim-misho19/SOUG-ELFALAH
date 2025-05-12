// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io'; // Removed IoMdTime as it wasn't used
import { FaHeart, FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaPhoneAlt, FaMapMarkerAlt, FaStore } from 'react-icons/fa';
// Removed BsStarFill, BsCalendarCheck as Rating component likely handles stars
import Header from '../components/Header';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { service_details, get_reviews } from '../store/reducers/homeReducer';
import { add_to_wishlist, messageClear } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ClipLoader } from 'react-spinners'; // Added loader for better UX

const ServiceDetails = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { service, relatedServices, moreServices, totalReview } = useSelector((state) => state.home);
    const { userInfo } = useSelector((state) => state.auth);
    const { errorMessage, successMessage } = useSelector((state) => state.card);

    const [image, setImage] = useState('');
    const [displayState, setDisplayState] = useState('reviews'); // Renamed state to avoid conflict
    const [isLoading, setIsLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    useEffect(() => {
        // Reset loading state on slug change
        setIsLoading(true);
        setImage(''); // Reset image
        dispatch(service_details(slug));
    }, [slug, dispatch]);

    useEffect(() => {
        // Fetch reviews only when service._id is available
        if (service?._id) {
            setReviewsLoading(true); // Start reviews loading indicator
            dispatch(get_reviews({ productId: service._id, pageNumber: 1 }))
                .finally(() => setReviewsLoading(false)); // Stop indicator when done
        }
    }, [service?._id, dispatch]);

    useEffect(() => {
        // Set image and stop main loading when service data arrives
        if (service?.images?.length > 0) {
            setImage(service.images[0]);
            setIsLoading(false);
        } else if (service && !service.images) {
            // Handle case where service loads but has no images
             setIsLoading(false);
        }
        // Keep loading if service hasn't arrived yet
    }, [service]);

    useEffect(() => {
        // Handle wishlist success/error messages
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    // Carousel responsiveness configuration
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 4 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
        smmobile: { breakpoint: { max: 640, min: 0 }, items: 2 },
        xsmobile: { breakpoint: { max: 440, min: 0 }, items: 1 },
    };

    // Add item to wishlist handler
    const add_wishlist = () => {
        if (userInfo) {
             if (!service?._id) {
                 toast.error("Service details not fully loaded.");
                 return;
             }
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: service._id, // Use service._id instead of productId for clarity if applicable
                name: service.name,
                price: service.price,
                image: service.images?.[0] || '/path/to/default-image.jpg', // Use optional chaining and fallback
                discount: service.discount || 0,
                rating: service.rating,
                slug: service.slug
            }));
        } else {
            toast.error("Please log in to add items to your wishlist.");
            navigate('/login');
        }
    };

    // --- CORRECTED bookNow function ---
    const bookNow = () => {
        if (!userInfo) {
            toast.error("Please log in to book a service.");
            navigate('/login');
            return;
        }

        // --- Add check for essential service data including sellerId ---
        if (!service || !service._id || !service.sellerId) {
             toast.error("Service details are incomplete. Cannot proceed with booking.");
             console.error("Error in bookNow: Missing service data or sellerId", service);
             return;
        }
        // --- End of check ---

        // Calculate final price considering discount
        let price = service.discount ? service.price - Math.floor((service.price * service.discount) / 100) : service.price;

        // Navigate to booking page with ALL required state, including providerId
        navigate('/booking', {
            state: {
                // Existing properties with fallbacks
                serviceId: service._id,
                name: service.name || 'Service Name Unavailable',
                price: price,
                image: service.images?.[0] || '/path/to/default-image.jpg',
                provider: service.shopName || 'Provider Name Unavailable', // Seller's shop name
                phoneNumber: service.phoneNumber || 'N/A', // Seller's phone

                // *** ADDED providerId (using service.sellerId) ***
                providerId: service.sellerId
            }
        });
    };
    // --- END OF CORRECTED bookNow function ---


    // Loading State UI
    if (isLoading) {
         return (
             <div>
                 <Header />
                 <div className="flex justify-center items-center min-h-[calc(100vh-400px)]"> {/* Adjust height as needed */}
                     <ClipLoader color="#059473" size={50} />
                 </div>
                 <Footer />
             </div>
         );
    }

    // Service Not Found UI
    if (!isLoading && !service?._id) {
         return (
             <div>
                 <Header />
                 <div className="container mx-auto text-center py-20 px-4">
                     <h2 className="text-2xl font-semibold text-red-600 mb-4">Service Not Found</h2>
                     <p className="text-slate-600 mb-6">
                         Sorry, the service you are looking for could not be found or is unavailable.
                     </p>
                     <Link
                         to='/services'
                         className='px-6 py-2 bg-[#059473] text-white font-semibold rounded-md hover:bg-[#047a60] transition duration-200 ease-in-out shadow hover:shadow-lg'
                     >
                         Browse Other Services
                     </Link>
                 </div>
                 <Footer />
             </div>
         );
    }


    // Main component render when service is loaded
    return (
        <div>
            <Header />
            {/* Banner Section */}
            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Service Details</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <span>Service Details</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Breadcrumb Section */}
            <section>
                <div className='bg-slate-100 py-5 mb-5'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                            <Link to='/'>Home</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            {service.category && (
                                <>
                                <Link to='/services'>{service.category}</Link> {/* Assuming '/services' lists all services */}
                                <span className='pt-1'><IoIosArrowForward /></span>
                                </>
                            )}
                            <span>{service.name}</span>
                        </div>
                    </div>
                </div>
            </section>

             {/* Main Details Section */}
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-1 md-lg:grid-cols-2 gap-8'> {/* Changed grid for better layout */}
                        {/* Image Gallery */}
                        <div className='md-lg:order-1'>
                            <div className='p-4 border rounded-lg shadow'>
                                <img
                                    className='h-[350px] md:h-[450px] w-full object-cover rounded'
                                    src={image || service.images?.[0] || '/images/banner/shop.png'} // Primary image with fallback
                                    alt={service.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src='/images/banner/shop.png'; }}
                                 />
                            </div>
                             {/* Thumbnails Carousel */}
                            {service.images && service.images.length > 1 && (
                                <div className='py-3'>
                                    <Carousel
                                        autoPlay={false} // Usually no autoplay for thumbs
                                        infinite={false}
                                        responsive={responsive}
                                        transitionDuration={300}
                                        containerClass="carousel-container"
                                        itemClass="carousel-item-padding-40-px px-1" // Add some padding
                                    >
                                        {service.images.map((img, i) => (
                                            <div key={i} onClick={() => setImage(img)} className={`border-2 rounded ${image === img ? 'border-[#059473]' : 'border-transparent'} p-1`}>
                                                <img className='h-[100px] md:h-[120px] w-full object-cover cursor-pointer rounded-sm' src={img} alt={`thumbnail-${i}`} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>

                         {/* Service Info and Actions */}
                        <div className='flex flex-col gap-5 md-lg:order-2'>
                            <h3 className='text-3xl text-slate-700 font-bold'>{service.name}</h3>
                             {/* Rating */}
                            <div className='flex justify-start items-center gap-4'>
                                {service.rating !== undefined && <Rating ratings={service.rating} />}
                                <span className='text-[#059473]'>({totalReview || 0} reviews)</span>
                            </div>
                             {/* Price */}
                            <div className='text-2xl text-red-600 font-bold flex items-baseline gap-3'>
                                {service.discount ? (
                                    <>
                                        <span className='text-slate-500 line-through text-xl'>${service.price?.toFixed(2)}</span>
                                        <span>${(service.price - Math.floor((service.price * service.discount) / 100)).toFixed(2)}</span>
                                        <span className='text-sm text-white bg-red-500 px-2 py-0.5 rounded'>-{service.discount}%</span>
                                    </>
                                ) : (
                                    <span>{service.price?.toFixed(2)} DA</span>
                                )}
                            </div>
                            {/* Short Description and Provider Info */}
                            <div className='text-slate-600 space-y-2'>
                                <p>{service.description?.slice(0, 200)}{service.description?.length > 200 ? '...' : ''}</p>
                                <p className='flex items-center gap-2 pt-2'><FaStore className="text-slate-500" /> {service.shopName || 'Provider Name N/A'}</p>
                                <p className='flex items-center gap-2'><FaPhoneAlt className="text-slate-500" /> {service.phoneNumber || 'Phone N/A'}</p>
                                {(service.municipality || service.province) && (
                                    <p className='flex items-center gap-2'><FaMapMarkerAlt className="text-slate-500" /> {service.municipality}{service.municipality && service.province && ', '}{service.province}</p>
                                )}
                            </div>
                             {/* Action Buttons */}
                            <div className='flex flex-wrap gap-3 pb-5 border-b border-slate-300'>
                                <button onClick={bookNow} className='px-8 py-3 min-w-[150px] text-center cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white rounded transition-shadow duration-300'>
                                    Book Now
                                </button>
                                <button onClick={add_wishlist} title="Add to Wishlist" className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white rounded transition-shadow duration-300'>
                                    <FaHeart />
                                </button>
                                 {/* Chat Button */}
                                {service.sellerId && userInfo?.id !== service.sellerId && ( // Show chat only if sellerId exists and user is not the seller
                                    <Link to={`/dashboard/chat/${service.sellerId}`} className='px-8 py-3 min-w-[150px] text-center cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white rounded transition-shadow duration-300'>
                                        Chat Provider
                                    </Link>
                                )}
                            </div>
                             {/* Availability and Sharing */}
                            <div className='flex flex-col sm:flex-row py-5 gap-5 text-sm'>
                                <div className='w-full sm:w-[150px] text-black font-semibold flex flex-col gap-5'>
                                    <span>Availability:</span>
                                    <span>Share On:</span>
                                </div>
                                <div className='flex flex-col gap-5 flex-1'>
                                    {/* You might fetch real availability later */}
                                    <span className='text-green-600 font-medium'>Available</span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        {/* Add actual sharing links later */}
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white transition-colors duration-300' href="#"><FaFacebookF /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white transition-colors duration-300' href="#"><FaTwitter /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white transition-colors duration-300' href="#"><FaLinkedin /></a></li>
                                        <li><a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white transition-colors duration-300' href="#"><FaGithub /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Description and Reviews Section */}
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>
                        {/* Left side: Reviews/Description */}
                        <div className='w-full lg:w-[72%]'>
                            <div className='pr-0 lg:pr-4'>
                                <div className='grid grid-cols-2 gap-2 mb-4'>
                                    <button onClick={() => setDisplayState('reviews')} className={`py-2 px-5 text-center font-medium rounded-t-md transition-colors duration-300 ${displayState === 'reviews' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                                        Reviews ({totalReview || 0})
                                    </button>
                                    <button onClick={() => setDisplayState('description')} className={`py-2 px-5 text-center font-medium rounded-t-md transition-colors duration-300 ${displayState === 'description' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                                        Description
                                    </button>
                                </div>
                                <div className='border border-t-0 p-4 rounded-b-md min-h-[200px]'>
                                    {displayState === 'reviews' ? (
                                         reviewsLoading ? <div className="flex justify-center p-4"><ClipLoader color="#059473" size={30} /></div> : <Reviews product={service} />
                                    ) : (
                                        <p className='py-5 text-slate-700 whitespace-pre-wrap'>{service.description || 'No description available.'}</p> // Use pre-wrap for formatting
                                    )}
                                </div>
                            </div>
                        </div>
                         {/* Right side: More from provider */}
                        <div className='w-full lg:w-[28%] mt-8 lg:mt-0'>
                            <div className='pl-0 lg:pl-4'>
                                <div className='px-3 py-2 text-slate-700 bg-slate-200 rounded-t-md'>
                                    <h2 className='font-semibold'>More from {service.shopName || 'this Provider'}</h2>
                                </div>
                                <div className='flex flex-col gap-5 mt-0 border border-t-0 p-3 rounded-b-md'>
                                     {moreServices && moreServices.length > 0 ? (
                                        moreServices.map((s) => (
                                            <Link key={s._id} to={`/service/details/${s.slug}`} className='block group'>
                                                <div className='relative h-[180px] overflow-hidden rounded'> {/* Adjusted height */}
                                                    <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                                         src={s.images?.[0] || '/images/banner/shop.png'} alt={s.name}
                                                         onError={(e) => { e.target.onerror = null; e.target.src='/images/banner/shop.png'; }}
                                                    />
                                                    {s.discount !== 0 && (
                                                        <div className='flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 shadow'>
                                                            {s.discount}%
                                                        </div>
                                                    )}
                                                </div>
                                                <h2 className='text-slate-700 py-1 font-semibold group-hover:text-[#059473] transition-colors'>{s.name}</h2>
                                                <div className='flex items-center gap-2'>
                                                    <h2 className='text-md font-bold text-slate-700'>${s.price?.toFixed(2)}</h2>
                                                    {s.rating !== undefined && <Rating ratings={s.rating} size={14} />} {/* Smaller rating */}
                                                </div>
                                            </Link>
                                        ))
                                     ) : (
                                        <p className="text-slate-500 text-sm">No other services found from this provider.</p>
                                     )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Related Services Section */}
            <section className="bg-slate-50 py-10"> {/* Added background */}
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl font-semibold pb-8 text-slate-700'>Related Services</h2>
                    {relatedServices && relatedServices.length > 0 ? (
                        <>
                            <Swiper
                                slidesPerView={1} // Start with 1 on mobile
                                spaceBetween={25}
                                pagination={{ clickable: true, el: '.custom_bullet_related' }} // Use unique class
                                modules={[Pagination]}
                                className='mySwiperRelated' // Use unique class
                                breakpoints={{ // Responsive breakpoints
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 }
                                }}
                            >
                                {relatedServices.map((s) => (
                                    <SwiperSlide key={s._id}>
                                        <Link to={`/service/details/${s.slug}`} className='block group border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300'>
                                            <div className='relative h-[200px]'> {/* Adjusted height */}
                                                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                                     src={s.images?.[0] || '/images/banner/shop.png'} alt={s.name}
                                                     onError={(e) => { e.target.onerror = null; e.target.src='/images/banner/shop.png'; }}
                                                />
                                                {s.discount !== 0 && (
                                                    <div className='flex justify-center items-center absolute text-white w-[35px] h-[35px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 shadow'>
                                                        {s.discount}%
                                                    </div>
                                                )}
                                            </div>
                                            <div className='p-3 flex flex-col gap-1'>
                                                <h2 className='text-slate-700 text-md font-semibold group-hover:text-[#059473] transition-colors truncate'>{s.name}</h2> {/* Added truncate */}
                                                <div className='flex justify-start items-center gap-3'>
                                                    <h2 className='text-md font-bold text-slate-700'>${s.price?.toFixed(2)}</h2>
                                                    {s.rating !== undefined && <Rating ratings={s.rating} size={14}/>}
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className='w-full flex justify-center items-center pt-8'> {/* Adjusted padding */}
                                <div className='custom_bullet_related justify-center gap-3 !w-auto'></div> {/* Unique class */}
                            </div>
                        </>
                    ) : (
                       <p className="text-slate-500 text-center py-4">No related services found.</p>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServiceDetails;