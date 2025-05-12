// src/store/reducers/homeReducer.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// --- Product Related Thunks ---

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys');
            // Assuming data structure is { categorys: [...] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Category Error:", error.response?.data || error.message);
            return fulfillWithValue({ categorys: [] }); // Default empty array on error
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products');
            // Assuming data structure is { products: [], latest_product: [], topRated_product: [], discount_product: [] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Products Error:", error.response?.data || error.message);
            return fulfillWithValue({ products: [], latest_product: [], topRated_product: [], discount_product: [] }); // Defaults on error
        }
    }
);

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product');
            // Assuming data structure is { latest_product: [], priceRange: { low: number, high: number } }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Price Range Product Error:", error.response?.data || error.message);
            // Provide a sensible default price range
            return fulfillWithValue({ latest_product: [], priceRange: { low: 0, high: 1000 } });
        }
    }
);

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue }) => {
        // Ensure default values for query parameters if not provided
        const category = query.category || '';
        const rating = query.rating || '';
        const lowPrice = query.low || '';
        const highPrice = query.high || '';
        const sortPrice = query.sortPrice || '';
        const pageNumber = query.pageNumber || 1;
        const searchValue = query.searchValue || '';

        try {
            const { data } = await api.get(`/home/query-products?category=${category}&rating=${rating}&lowPrice=${lowPrice}&highPrice=${highPrice}&sortPrice=${sortPrice}&pageNumber=${pageNumber}&searchValue=${searchValue}`);
            // Assuming data structure is { products: [], totalProduct: number, parPage: number }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Query Products Error:", error.response?.data || error.message);
            return fulfillWithValue({ products: [], totalProduct: 0, parPage: 12 }); // Default parPage might vary
        }
    }
);

export const product_details = createAsyncThunk(
    'product/product_details',
    async (slug, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product-details/${slug}`);
             // Assuming data is { product: {}, relatedProducts: [], moreProducts: [] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Product Details Error:", error.response?.data || error.message);
            return fulfillWithValue({ product: {}, relatedProducts: [], moreProducts: [] }); // Defaults on error
        }
    }
);

// --- Service Related Thunks ---

export const get_service_categories = createAsyncThunk(
    'service/get_service_categories',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-service-categories');
             // Assuming data is { serviceCategories: [...] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Service Categories Error:", error.response?.data || error.message);
            return fulfillWithValue({ serviceCategories: [] });
        }
    }
);

export const price_range_service = createAsyncThunk(
    'service/price_range_service',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-service');
             // Assuming data is { latest_service: [], priceRange: { low: number, high: number } }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Price Range Service Error:", error.response?.data || error.message);
            return fulfillWithValue({ latest_service: [], priceRange: { low: 0, high: 1000 } });
        }
    }
);

export const query_services = createAsyncThunk(
    'service/query_services',
    async (query, { fulfillWithValue }) => {
         // Ensure default values
         const category = query.category || '';
         const rating = query.rating || '';
         const lowPrice = query.low || '';
         const highPrice = query.high || '';
         const sortPrice = query.sortPrice || '';
         const pageNumber = query.pageNumber || 1;
         // Add searchValue if your service query supports it
         // const searchValue = query.searchValue || '';

        try {
             // Adjust endpoint and params as needed for services
            const { data } = await api.get(`/home/query-services?category=${category}&rating=${rating}&lowPrice=${lowPrice}&highPrice=${highPrice}&sortPrice=${sortPrice}&pageNumber=${pageNumber}`);
            // Assuming data is { services: [], totalService: number, parPage: number }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Query Services Error:", error.response?.data || error.message);
            return fulfillWithValue({ services: [], totalService: 0, parPage: 12 });
        }
    }
);

export const service_details = createAsyncThunk(
    'service/service_details',
    async (slug, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/service-details/${slug}`);
            // Assuming data is { service: {}, relatedServices: [], moreServices: [] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Service Details Error:", error.response?.data || error.message);
            return fulfillWithValue({ service: {}, relatedServices: [], moreServices: [] });
        }
    }
);

// --- Review Related Thunks ---

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, { fulfillWithValue, rejectWithValue }) => { // Added rejectWithValue
        try {
            const { data } = await api.post('/home/customer/submit-review', info);
            // Assuming data includes { message: '...' } on success
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Submit Review Error:", error.response?.data || error.message);
             // Pass error message to state
            return rejectWithValue(error.response?.data || { message: 'Failed to submit review' });
        }
    }
);

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({ productId, pageNumber }, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`);
            // Assuming data is { reviews: [], totalReview: number, rating_review: [] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Reviews Error:", error.response?.data || error.message);
            return fulfillWithValue({ reviews: [], totalReview: 0, rating_review: [] });
        }
    }
);

// Note: Delete review might need adjustments based on how you want to re-fetch or update state
export const delete_review = createAsyncThunk(
    'review/delete_review',
    async ({ reviewId, productId, pageNumber }, { fulfillWithValue, rejectWithValue }) => {
        try {
            // Ensure reviewId and productId are sent
            if (!reviewId || !productId) {
                throw new Error("Review ID and Product ID are required for deletion.");
            }
            const { data } = await api.post('/home/customer/delete-review', { reviewId, productId });
            // Pass back necessary info to update state correctly
            return fulfillWithValue({ ...data, reviewId, productId, pageNumber });
        } catch (error) {
            console.error("Delete Review Error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: 'Failed to delete review' });
        }
    }
);

// --- Banner Related Thunks ---

// Existing Thunk for Product Banners
export const get_banners = createAsyncThunk(
    'banner/get_banners', // Action type for product banners
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/banners'); // Endpoint for product banners
            // Assuming data is { banners: [...] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Product Banners Error:", error.response?.data || error.message);
            return fulfillWithValue({ banners: [] });
        }
    }
);

// New Thunk for Admin Ad Banners
export const get_active_ad_banners = createAsyncThunk(
    'adBanner/get_active_ad_banners', // Distinct action type for admin ad banners
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/ad-banners/active'); // Endpoint for active admin ad banners
            // Assuming data is { activeAdBanners: [...] }
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Get Active Ad Banners Error:", error.response?.data || error.message);
            return fulfillWithValue({ activeAdBanners: [] }); // Default on error
        }
    }
);

// --- Slice Definition ---

export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        serviceCategories: [],
        products: [],
        services: [],
        totalProduct: 0,
        totalService: 0,
        parPage: 12, // Default items per page (adjust as needed)
        latest_product: [],
        latest_service: [],
        topRated_product: [],
        discount_product: [],
        priceRange: { low: 0, high: 1000 }, // Default price range
        product: {},
        service: {},
        relatedProducts: [],
        relatedServices: [],
        moreProducts: [],
        moreServices: [],
        errorMessage: '',
        successMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews: [],
        banners: [], // For Product Banners
        activeAdBanners: [] // For Admin Ad Banners
    },
    reducers: {
        // Action to clear success/error messages
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Product Category
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.categorys = payload.categorys;
            })
            // Products General
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.latest_product = payload.latest_product;
                state.topRated_product = payload.topRated_product;
                state.discount_product = payload.discount_product;
            })
            // Product Price Range
            .addCase(price_range_product.fulfilled, (state, { payload }) => {
                // state.latest_product = payload.latest_product; // Usually not needed to update here again
                state.priceRange = payload.priceRange;
            })
            // Queried Products
            .addCase(query_products.fulfilled, (state, { payload }) => {
                state.products = payload.products;
                state.totalProduct = payload.totalProduct;
                state.parPage = payload.parPage;
            })
            // Product Details
            .addCase(product_details.fulfilled, (state, { payload }) => {
                state.product = payload.product;
                state.relatedProducts = payload.relatedProducts;
                state.moreProducts = payload.moreProducts;
            })
            // Service Category
            .addCase(get_service_categories.fulfilled, (state, { payload }) => {
                state.serviceCategories = payload.serviceCategories;
            })
            // Service Price Range
            .addCase(price_range_service.fulfilled, (state, { payload }) => {
                // state.latest_service = payload.latest_service; // Usually not needed
                state.priceRange = payload.priceRange; // Assuming same price range state is used
            })
            // Queried Services
            .addCase(query_services.fulfilled, (state, { payload }) => {
                state.services = payload.services;
                state.totalService = payload.totalService;
                state.parPage = payload.parPage; // Assuming same parPage state is used
            })
            // Service Details
            .addCase(service_details.fulfilled, (state, { payload }) => {
                state.service = payload.service;
                state.relatedServices = payload.relatedServices;
                state.moreServices = payload.moreServices;
            })
            // Customer Review Submission
            .addCase(customer_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(customer_review.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || 'Failed to submit review.'; // Use message from rejected payload
            })
            // Get Reviews
            .addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.reviews = payload.reviews;
                state.totalReview = payload.totalReview;
                state.rating_review = payload.rating_review;
            })
            // Delete Review
            .addCase(delete_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                // Remove the review directly from the state if present
                state.reviews = state.reviews.filter(r => r._id !== payload.reviewId);
                // Decrement total count if needed (consider pagination effects)
                if (state.reviews.length < state.totalReview) {
                     state.totalReview -= 1; // Adjust count cautiously
                }
                // Optionally: Trigger a re-fetch of reviews for the current page
            })
             .addCase(delete_review.rejected, (state, { payload }) => {
                state.errorMessage = payload?.message || 'Failed to delete review.';
            })
            // Product Banners
            .addCase(get_banners.fulfilled, (state, { payload }) => {
                state.banners = payload.banners;
            })
            // Admin Ad Banners
            .addCase(get_active_ad_banners.fulfilled, (state, { payload }) => {
                state.activeAdBanners = payload.activeAdBanners;
            });
    }
});

// Export the clear message action
export const { messageClear } = homeReducer.actions;

// Export the reducer itself
export default homeReducer.reducer;