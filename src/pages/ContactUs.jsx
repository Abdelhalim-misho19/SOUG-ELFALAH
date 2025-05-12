import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isVerified, setIsVerified] = useState(false);
    const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_V2_CHECKBOX_SITE_KEY";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRecaptchaChange = (value) => {
        setIsVerified(!!value);
        console.log("Captcha value:", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isVerified) {
            toast.error(t('contact.form.recaptcha_error'));
            return;
        }

        if (!formData.email || !formData.name || !formData.subject || !formData.message) {
            toast.error(t('contact.form.required_fields_error'));
            return;
        }

        console.log("Form Data Submitted:", formData);
        toast.success(t('contact.form.success_message'));

        setFormData({ email: '', name: '', phone: '', subject: '', message: '' });
        setIsVerified(false);
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 py-10">
                <div className="container mx-auto px-4">
                    {/* Top Section: Title and Contact Info */}
                    <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('contact.title')}</h1>
                        <p className="text-gray-600 mb-6">
                            {t('contact.description')}
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <p className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-[#059473] text-xl" />
                                <span className="font-semibold">{t('contact.info.address_label')}:</span> {t('contact.info.address')}
                            </p>
                            <p className="flex items-center gap-3">
                                <MdEmail className="text-[#059473] text-xl" />
                                <span className="font-semibold">{t('contact.info.email_label')}:</span> soug.elfalah@gmail.com
                            </p>
                            <p className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#059473] text-xl" />
                                <span className="font-semibold">{t('contact.info.phone_label')}:</span> +(213) 0776771666
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Form and Map */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Contact Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.form.title')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.form.email_placeholder')}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473] focus:border-transparent"
                                    />
                                </div>
                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.form.name_placeholder')}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473] focus:border-transparent"
                                    />
                                </div>
                                {/* Phone Number */}
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.form.phone_placeholder')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473] focus:border-transparent"
                                    />
                                </div>
                                {/* Object (Subject) */}
                                <div>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#059473] focus:border-transparent appearance-none"
                                    >
                                        <option value="" disabled>{t('contact.form.subject_placeholder')}</option>
                                        <option value="General Inquiry">{t('contact.form.subject_options.general_inquiry')}</option>
                                        <option value="Partnership Proposal">{t('contact.form.subject_options.partnership_proposal')}</option>
                                        <option value="Technical Support">{t('contact.form.subject_options.technical_support')}</option>
                                        <option value="Feedback/Suggestion">{t('contact.form.subject_options.feedback_suggestion')}</option>
                                        <option value="Advertising">{t('contact.form.subject_options.advertising')}</option>
                                        <option value="Other">{t('contact.form.subject_options.other')}</option>
                                    </select>
                                </div>
                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.form.message_placeholder')}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#059473] focus:border-transparent"
                                    ></textarea>
                                </div>
                                {/* reCAPTCHA */}
                                <div className="flex justify-center md:justify-start">
                                    <ReCAPTCHA
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={handleRecaptchaChange}
                                    />
                                </div>
                                {/* Send Button */}
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={!isVerified}
                                        className={`px-6 py-2 rounded-md font-semibold text-white transition-colors duration-200 ${
                                            isVerified
                                                ? 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
                                                : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {t('contact.form.submit_button')}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Map */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12871.96950719701!2d5.368988897236615!3d36.21894173868977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f315795a01261b%3A0x796f6b77098916b3!2sUniversit%C3%A9%20Ferhat%20Abbas%20S%C3%A9tif%201%20-%20Campus%20El%20Bez!5e0!3m2!1sen!2sdz!4v1678886400000!5m2!1sen!2sdz"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={t('contact.map_title')}
                                className='min-h-[450px] md:min-h-full'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;