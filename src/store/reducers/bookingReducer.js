// src/store/reducers/bookingReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; // Ensure this path is correct

// --- Action to fetch user's bookings ---
export const get_my_bookings = createAsyncThunk(
    'booking/get_my_bookings',
    async ({ userId }, { rejectWithValue, fulfillWithValue }) => {
        // --- Check if userId is provided ---
        if (!userId) {
            console.error("get_my_bookings: No userId provided.");
            return rejectWithValue({ message: "User ID is missing." });
        }

        try {
            // --- CORRECTED API ENDPOINT (Relative to baseURL) ---
            // baseURL is 'http://localhost:5000/api', so we need '/bookings/customer/:userId'
            const apiPath = `/bookings/customer/${userId}`; // <<< CORRECT PATH
            console.log("Attempting to fetch bookings from full path:", `${api.defaults.baseURL}${apiPath}`); // Log the full path

            const { data } = await api.get(apiPath); // Use the relative path

            console.log("Fetched bookings data:", data); // For debugging success case

            // --- Ensure backend returns expected structure ---
            if (!data || !Array.isArray(data.bookings)) {
                console.error("Received unexpected data structure from backend:", data);
                return rejectWithValue({ message: "Invalid data received from server." });
            }

            return fulfillWithValue(data); // Should contain { bookings: [...] }

        } catch (error) {
            console.error("Error fetching bookings:", error.response || error); // Log the full error

            // Provide more specific feedback if possible
            let errorMessage = 'Failed to fetch bookings.';
            if (error.response) {
                console.error("Backend responded with error:", error.response.status, error.response.data);
                errorMessage = error.response.data?.message || `Server error ${error.response.status}`;
            } else if (error.request) {
                console.error("No response received from server:", error.request);
                errorMessage = 'Could not connect to the server.';
            } else {
                console.error('Error setting up request:', error.message);
                errorMessage = 'An error occurred while setting up the request.';
            }
            return rejectWithValue({ message: errorMessage });
        }
    }
);
// *** NEW ACTION: Fetch single booking details ***
export const get_booking_details = createAsyncThunk(
    'booking/get_booking_details',
    async (bookingId, { rejectWithValue, fulfillWithValue }) => {
        if (!bookingId) {
            console.error("get_booking_details: No bookingId provided.");
            return rejectWithValue({ message: "Booking ID is missing." });
        }
        try {
            // Path relative to baseURL '/api' -> /bookings/:bookingId
            const apiPath = `/bookings/${bookingId}`;
            console.log("Attempting to fetch booking details from:", `${api.defaults.baseURL}${apiPath}`);

            const { data } = await api.get(apiPath);

            console.log("Fetched single booking data:", data); // Expects { booking: {...} }

            // Ensure backend returns expected structure
            if (!data || typeof data.booking !== 'object') {
                console.error("Received unexpected data structure for single booking:", data);
                return rejectWithValue({ message: "Invalid data received from server." });
            }
            return fulfillWithValue(data); // Pass the whole { booking: ... } payload

        } catch (error) {
            console.error("Error fetching booking details:", error.response || error);
            let errorMessage = 'Failed to fetch booking details.';
            if (error.response) {
                 errorMessage = error.response.data?.message || `Server error ${error.response.status}`;
            } else if (error.request) {
                 errorMessage = 'Could not connect to the server.';
            } else {
                 errorMessage = 'An error occurred while setting up the request.';
            }
            return rejectWithValue({ message: errorMessage });
        }
    }
);
// *** END OF NEW ACTION ***

// --- Add other actions like cancel_booking if needed ---
// export const cancel_booking = createAsyncThunk(...)

// --- Reducer Slice ---
export const bookingReducer = createSlice({
    name: 'booking',
    initialState: {
        myBookings: [],
        currentBooking: {},   // *** ADDED: Holds the details of the currently viewed booking ***
        loading: false,
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_my_bookings.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(get_my_bookings.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.myBookings = Array.isArray(payload?.bookings) ? payload.bookings : [];
            })
            .addCase(get_my_bookings.rejected, (state, { payload }) => {
                state.loading = false;
                state.myBookings = [];
                state.errorMessage = payload?.message || 'Could not fetch bookings.';
            })
             // *** ADDED: Cases for get_booking_details ***
             .addCase(get_booking_details.pending, (state) => {
                state.loading = true; // Use the same loading state for simplicity
                state.currentBooking = {}; // Clear previous details
                state.errorMessage = "";
            })
            .addCase(get_booking_details.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.currentBooking = payload.booking || {}; // Store the fetched booking object
            })
            .addCase(get_booking_details.rejected, (state, { payload }) => {
                state.loading = false;
                state.currentBooking = {}; // Clear on error
                state.errorMessage = payload?.message || 'Could not fetch booking details.';
            });
            // *** END OF ADDED CASES ***
    }
});

export const { messageClear } = bookingReducer.actions;
export default bookingReducer.reducer;