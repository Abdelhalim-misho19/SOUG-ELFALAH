import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifications = createAsyncThunk(
    'notification/fetchNotifications',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/notifications`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data.notifications;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch notifications');
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notification/markNotificationAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            await axios.patch(`http://localhost:5000/notifications/${notificationId}/read`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to mark notification as read');
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        unreadCount: 0,
        isDropdownOpen: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        toggleNotificationDropdown: (state) => {
            state.isDropdownOpen = !state.isDropdownOpen;
        },
        updateNotifications: (state, action) => {
            const notification = action.payload;
            if (!state.notifications.find((n) => n._id === notification._id)) {
                state.notifications = [notification, ...state.notifications];
                if (notification.status === 'unread') {
                    state.unreadCount += 1;
                }
                state.isDropdownOpen = true; // Auto-open on new notification
            }
        },
        updateUnreadCount: (state, action) => {
            state.unreadCount = action.payload.unreadCount;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
                state.unreadCount = action.payload.filter((n) => n.status === 'unread').length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notificationId = action.payload;
                const notification = state.notifications.find((n) => n._id === notificationId);
                if (notification && notification.status === 'unread') {
                    notification.status = 'read';
                    state.unreadCount -= 1;
                }
            });
    },
});

export const { toggleNotificationDropdown, updateNotifications, updateUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;