import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { markNotificationAsRead, toggleNotificationDropdown } from '../store/reducers/notificationReducer';

const NotificationDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notifications, isDropdownOpen } = useSelector((state) => state.notification);
    const dropdownRef = useRef(null);

    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return <FaShoppingCart className="text-[#059473] text-lg" />;
            case 'message':
                return <FaEnvelope className="text-[#059473] text-lg" />;
            default:
                return <FaShoppingCart className="text-[#059473] text-lg" />;
        }
    };

    const handleClick = (notification) => {
        if (notification.status === 'unread') {
            dispatch(markNotificationAsRead(notification._id));
        }
        navigate(notification.link);
        dispatch(toggleNotificationDropdown());
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            dispatch(toggleNotificationDropdown());
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen, handleClickOutside]);

    return (
        <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isDropdownOpen ? 1 : 0, y: isDropdownOpen ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-12 right-0 w-80 bg-white text-slate-600 rounded-md shadow-md z-50 overflow-hidden ${
                isDropdownOpen ? 'block' : 'hidden'
            } border border-gray-200`}
        >
            <div className="p-3 border-b border-gray-200">
                <h3 className="text-base font-medium text-slate-800">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="p-3 text-slate-500 text-center text-sm">No notifications</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
                            onClick={() => handleClick(notification)}
                            className={`flex items-center p-3 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer ${
                                notification.status === 'unread' ? 'bg-gray-50' : ''
                            }`}
                        >
                            <div className="mr-2">{getIcon(notification.type)}</div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-600">
                                    {notification.message}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default NotificationDropdown;