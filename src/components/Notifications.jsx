// src/components/Notifications.jsx
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBell, FaRegBell } from 'react-icons/fa';
import io from 'socket.io-client';
import {
    toggleNotificationDropdown,
    fetchUnreadCount, // Fetches initial count
    updateUnreadCount, // Action for socket updates for count
    // Removed addNewNotification - handled by Header toast logic for now
} from '../store/reducers/notificationReducer'; // Adjust path if needed
import NotificationDropdown from './NotificationDropdown'; // Import the dropdown itself

const Notifications = () => {
    const dispatch = useDispatch();
    // Select state from the 'notifications' slice
    const { unreadCount, loading, isDropdownOpen } = useSelector(state => state.notifications);
    const { userInfo } = useSelector(state => state.auth);
    const socketRef = useRef(null);

    // Fetch initial unread count on mount if user is logged in
    useEffect(() => {
        if (userInfo?.id) {
            console.log('[Notifications Component] User detected, fetching initial unread count.');
            dispatch(fetchUnreadCount()).catch(err => console.error('[Notifications] Error fetching initial unread count:', err));
        }
    }, [dispatch, userInfo?.id]);

    // Effect for Socket.IO connection and listeners for COUNT updates
    useEffect(() => {
        if (userInfo?.id) {
            console.log('[Notifications Component] Setting up Socket.IO...');
             if (socketRef.current) socketRef.current.disconnect(); // Disconnect previous if user changes

            socketRef.current = io('http://localhost:5000'); // Connect to backend

             socketRef.current.on('connect', () => {
                console.log(`[Notifications Socket] Connected: ${socketRef.current.id}`);
                // Emit user info after connection
                if (userInfo.role === 'admin') socketRef.current.emit('add_admin', userInfo);
                else if (userInfo.role === 'seller') socketRef.current.emit('add_seller', userInfo.id, userInfo);
                else socketRef.current.emit('add_user', userInfo.id, userInfo);
            });

            // Listen ONLY for count updates here
            socketRef.current.on('unread_count_update', (data) => {
                console.log('[Notifications Socket] Received unread_count_update:', data);
                 const count = Number(data.unreadCount); // Backend sends { unreadCount: number }
                 if (!isNaN(count)) {
                    dispatch(updateUnreadCount(count)); // Dispatch the count number
                 } else { console.warn('[Notifications Socket] Received invalid unread count data:', data); }
            });

            socketRef.current.on('connect_error', (err) => console.error('[Notifications Socket] Connection Error:', err.message));
            socketRef.current.on('disconnect', (reason) => console.log('[Notifications Socket] Disconnected:', reason));

        } else {
            // Disconnect if user logs out
             if (socketRef.current) {
                 console.log('[Notifications Cleanup] User logged out, disconnecting socket.');
                 socketRef.current.disconnect();
                  socketRef.current = null;
             }
        }

        // Cleanup function
        return () => {
            if (socketRef.current) {
                console.log('[Notifications Cleanup] Disconnecting socket.');
                socketRef.current.disconnect();
                socketRef.current = null; // Clear ref
            }
        };
    }, [userInfo, dispatch]); // Depend on userInfo and dispatch

    const handleToggle = (event) => {
        event.stopPropagation();
        console.log('[Notifications Bell] Dispatching toggleNotificationDropdown.');
        dispatch(toggleNotificationDropdown());
    };

    return (
        // The button container needs relative positioning for the absolute dropdown
        <div id="notification-bell-button" className="relative">
            <button
                onClick={handleToggle}
                className="relative text-white text-xl hover:text-gray-300 dark:text-slate-300 dark:hover:text-white focus:outline-none p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/60 transition-colors duration-150"
                aria-label="Toggle Notifications"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                disabled={loading} // Disable button while initially fetching count?
            >
                {unreadCount > 0 ? (
                    <FaBell className="text-yellow-400 animate-swing" />
                ) : (
                    <FaRegBell />
                )}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/3 -translate-y-1/3 bg-red-600 rounded-full shadow-md animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

             {/* --- Render the Dropdown Component --- */}
             {/* It uses isDropdownOpen from Redux state to show/hide itself */}
             {/* No need to pass props, it selects state internally */}
             <NotificationDropdown />


             {/* Embedded CSS for bell swing and badge pulse animations */}
             <style jsx>{`
                @keyframes swing { 15% { transform: rotate(5deg); } 30% { transform: rotate(-5deg); } 40% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } 65% { transform: rotate(1deg); } 100% { transform: rotate(0deg); } }
                @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
                .animate-swing { display: inline-block; animation: swing ease-in-out 0.8s 1 alternate; }
                .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default Notifications;