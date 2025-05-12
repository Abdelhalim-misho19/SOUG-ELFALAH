import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { query_services } from '../store/reducers/homeReducer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceProducts from '../components/services/ServiceProducts';

const SearchServices = () => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('searchValue');
    const { services, totalService, parPage } = useSelector(state => state.home);

    useEffect(() => {
        dispatch(query_services({ searchValue: query, pageNumber: 1 }));
    }, [dispatch, query]);

    return (
        <div>
            <Header />
            <section className='py-16'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] mx-auto'>
                    <h2 className='text-2xl font-bold mb-6'>Search Results for "{query}"</h2>
                    <ServiceProducts services={services} styles='grid' />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SearchServices;