// src/pages/Home.js

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner'; // Original product banner carousel
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import HomeAdBanners from '../components/HomeAdBanners'; // Admin ad banner carousel
import { useDispatch, useSelector } from 'react-redux';
// Import ALL necessary actions from homeReducer
import {
    get_products,
    query_services,
    get_active_ad_banners // Make sure this is exported from homeReducer.js
} from '../store/reducers/homeReducer'; // Ensure this path is correct

const Home = () => {
    const dispatch = useDispatch();

    // Select all required state slices from the 'home' reducer state
    const {
        products,        // For FeatureProducts (potentially)
        latest_product,  // For Latest Product section
        topRated_product,// For Top Rated Product section
        discount_product,// For Discount Product section
        services,        // For FeatureProducts (potentially)
        activeAdBanners  // For the HomeAdBanners component
    } = useSelector((state) => state.home); // Select directly from the 'home' slice

    // Fetch initial data when the component mounts
    useEffect(() => {
        // Dispatch action to get initial products (latest, top rated, discount)
        dispatch(get_products());

        // Dispatch action to get initial services (if needed immediately, adjust params)
        // If services are only loaded on demand (e.g., in FeatureProducts),
        // you might not need to dispatch this here.
        dispatch(
            query_services({ // Fetch initial set of services or adjust query
                category: '',
                rating: '',
                lowPrice: '',
                highPrice: '',
                sortPrice: '',
                pageNumber: 1,
                // searchValue: '', // Add if applicable
            })
        );

        // Dispatch action to get active admin-added advertisement banners
        dispatch(get_active_ad_banners());

    }, [dispatch]); // Dependency array includes dispatch

    return (
        <div className="w-full">
            {/* Header Section */}
            <Header />

            {/* Main Product Banner Carousel */}
            <Banner />

            {/* Product/Service Categories Section */}
            <Categorys />

            {/* Admin Added Advertisement Banner Carousel */}
            {/* Conditionally render only if there are active ad banners */}
            {activeAdBanners && activeAdBanners.length > 0 && (
                <div className="w-full bg-white"> {/* Optional: subtle background */}
                    <HomeAdBanners banners={activeAdBanners} />
                </div>
            )}


            {/* Featured Items Section (Can combine Products and Services) */}
            <div className="py-[45px]">
                {/* Ensure FeatureProducts component can handle both products and services props */}
                <FeatureProducts products={products} services={services} />
            </div>

            {/* Grid Section for Latest, Top Rated, Discount Products */}
            <div className="py-10">
                <div className="w-[85%] flex flex-wrap mx-auto">
                    <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2 md-lg:grid-cols-3">
                        {/* Latest Products */}
                        {latest_product && latest_product.length > 0 && (
                             <div className="overflow-hidden">
                                <Products title="Latest Products" products={latest_product} />
                            </div>
                        )}

                        {/* Top Rated Products */}
                         {topRated_product && topRated_product.length > 0 && (
                             <div className="overflow-hidden">
                                <Products title="Top Rated Products" products={topRated_product} />
                             </div>
                         )}

                        {/* Discount Products */}
                        {discount_product && discount_product.length > 0 && (
                             <div className="overflow-hidden">
                                <Products title="Discount Products" products={discount_product} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Home;