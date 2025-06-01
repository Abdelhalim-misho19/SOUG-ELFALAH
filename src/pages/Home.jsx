// src/pages/Home.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Heders from '../components/Header'; // Using Heders as per your target example
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import HomeAdBanners from '../components/HomeAdBanners'; // Re-added this import

// Import necessary actions from homeReducer
import {
    get_products,
    get_category, // Kept from your target example's imports
    get_active_ad_banners // Re-added this action
} from '../store/reducers/homeReducer'; // Ensure this path is correct

const Home = () => {
    const dispatch = useDispatch();

    // Select required state slices, including activeAdBanners
    const {
        products,
        latest_product,
        topRated_product,
        discount_product,
        activeAdBanners // Re-added for the HomeAdBanners component
    } = useSelector((state) => state.home);

    // Fetch initial data when the component mounts
    useEffect(() => {
        dispatch(get_products());
        // dispatch(get_category()); // Your target imported this but didn't dispatch it. Add if needed.
        dispatch(get_active_ad_banners()); // Re-added dispatch for ad banners
    }, []); // Using empty dependency array as per your target example

    return (
        <div className="w-full">
            {/* Header Section */}
            <Heders />

            {/* Main Product Banner Carousel */}
            <Banner />

            {/* Product/Service Categories Section - Styled as per your target */}
            <div className='my-4'>
                <Categorys />
            </div>

            {/* Admin Added Advertisement Banner Carousel - Re-added this section */}
            {/* Conditionally render only if there are active ad banners */}
            {activeAdBanners && activeAdBanners.length > 0 && (
                <div className="w-full bg-white"> {/* Optional: subtle background */}
                    <HomeAdBanners banners={activeAdBanners} />
                </div>
            )}

            {/* Featured Items Section - Styled as per your target */}
            <div className="py-[45px]">
                <FeatureProducts products={products} /> {/* Props as per your target */}
            </div>

            {/* Grid Section for Latest, Top Rated, Discount Products - Styled as per your target */}
            <div className="py-10">
                <div className="w-[85%] flex flex-wrap mx-auto">
                    {/* Grid classes and structure as per your target */}
                    <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                        {/* Latest Products */}
                        <div className="overflow-hidden">
                            <Products title="Latest Product" products={latest_product} />
                        </div>

                        {/* Top Rated Products */}
                        <div className="overflow-hidden">
                            <Products title="Top Rated Product" products={topRated_product} />
                        </div>

                        {/* Discount Products */}
                        <div className="overflow-hidden">
                            <Products title="Discount Product" products={discount_product} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Home;