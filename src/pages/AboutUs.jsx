import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaSeedling, FaTruck, FaUsers, FaLeaf, FaTractor, FaHandsHelping } from 'react-icons/fa';
import { GiWheat, GiPlantRoots } from 'react-icons/gi';
import { MdOutlineAgriculture } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />

            <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-green-100 to-teal-100 py-20 md:py-32 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <GiWheat className="text-green-300 w-full h-full animate-pulse" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4 font-orbitron tracking-tight">
                            {t('about.hero.title')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-light">
                            {t('about.hero.description')}
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 bg-white relative">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                    <FaLeaf className="text-green-600 mr-3" /> {t('about.story.title')}
                                </h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {t('about.story.description1')}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('about.story.description2')}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative">
                                    <FaTractor className="text-green-500 text-[200px] opacity-50 animate-spin-slow" />
                                    <GiPlantRoots className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-700 text-[100px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="py-16 bg-green-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center flex justify-center items-center">
                            <MdOutlineAgriculture className="text-green-600 mr-3" /> {t('about.what_we_do.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                                <FaSeedling className="text-4xl text-green-600 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-xl font-semibold text-green-700 mb-3">{t('about.what_we_do.products.title')}</h3>
                                <p className="text-gray-600">
                                    {t('about.what_we_do.products.description')}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                                <FaUsers className="text-4xl text-green-600 mx-auto mb-4 animate-pulse" />
                                <h3 className="text-xl font-semibold text-green-700 mb-3">{t('about.what_we_do.services.title')}</h3>
                                <p className="text-gray-600">
                                    {t('about.what_we_do.services.description')}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                                <FaTruck className="text-4xl text-green-600 mx-auto mb-4 animate-wiggle" />
                                <h3 className="text-xl font-semibold text-green-700 mb-3">{t('about.what_we_do.delivery.title')}</h3>
                                <p className="text-gray-600">
                                    {t('about.what_we_do.delivery.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Roots & Vision Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="flex justify-center order-1 md:order-2">
                                <div className="relative">
                                    <GiWheat className="text-green-500 text-[180px] opacity-60 animate-pulse" />
                                    <FaHandsHelping className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 text-[80px]" />
                                </div>
                            </div>
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                                    <GiPlantRoots className="text-green-600 mr-3" /> {t('about.roots.title')}
                                </h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {t('about.roots.description1')}
                                </p>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {t('about.roots.description2')}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('about.roots.description3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-12 bg-green-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('about.why_choose_us.title')}</h2>
                        <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 list-none text-center">
                            <li className="bg-white p-4 rounded-lg shadow-md text-gray-700 transform hover:scale-105 transition-transform">
                                <strong className="text-green-700 block mb-1">{t('about.why_choose_us.agri_centric.title')}</strong> {t('about.why_choose_us.agri_centric.description')}
                            </li>
                            <li className="bg-white p-4 rounded-lg shadow-md text-gray-700 transform hover:scale-105 transition-transform">
                                <strong className="text-green-700 block mb-1">{t('about.why_choose_us.all_in_one.title')}</strong> {t('about.why_choose_us.all_in_one.description')}
                            </li>
                            <li className="bg-white p-4 rounded-lg shadow-md text-gray-700 transform hover:scale-105 transition-transform">
                                <strong className="text-green-700 block mb-1">{t('about.why_choose_us.dependable.title')}</strong> {t('about.why_choose_us.dependable.description')}
                            </li>
                            <li className="bg-white p-4 rounded-lg shadow-md text-gray-700 transform hover:scale-105 transition-transform">
                                <strong className="text-green-700 block mb-1">{t('about.why_choose_us.community.title')}</strong> {t('about.why_choose_us.community.description')}
                            </li>
                            <li className="bg-white p-4 rounded-lg shadow-md text-gray-700 transform hover:scale-105 transition-transform">
                                <strong className="text-green-700 block mb-1">{t('about.why_choose_us.innovative.title')}</strong> {t('about.why_choose_us.innovative.description')}
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <FaLeaf className="text-white w-full h-full animate-spin-slow" />
                    </div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl font-bold mb-6">{t('about.cta.title')}</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            {t('about.cta.description')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/shops"
                                className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg transform hover:-translate-y-1"
                            >
                                {t('about.cta.browse_products')}
                            </Link>
                            <Link
                                to="/services"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition duration-300 transform hover:-translate-y-1"
                            >
                                {t('about.cta.find_services')}
                            </Link>
                            <Link
                                to="/register"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition duration-300 transform hover:-translate-y-1"
                            >
                                {t('about.cta.join_soug')}
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

// Custom Tailwind animations
const styles = `
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  .animate-wiggle {
    animation: wiggle 1s ease-in-out infinite;
  }
`;

export default AboutUs;