// src/store/reducers/authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; // Ensure path is correct
import { jwtDecode } from "jwt-decode";

// --- Existing Actions ---
export const send_otp = createAsyncThunk(
    'auth/send_otp', async (info, { rejectWithValue, fulfillWithValue }) => { try { const { data } = await api.post('/customer/send-otp', info); return fulfillWithValue({ message: data.message, email: info.email }); } catch (error) { return rejectWithValue(error.response?.data || { error: 'Failed to send OTP.' }); } }
);
export const verify_otp_and_register = createAsyncThunk(
    'auth/verify_otp_and_register', async (info, { rejectWithValue, fulfillWithValue }) => { try { const { data } = await api.post('/customer/verify-otp', info); localStorage.setItem('customerToken', data.token); return fulfillWithValue(data); } catch (error) { return rejectWithValue(error.response?.data || { error: 'Failed to verify OTP.' }); } }
);
export const customer_login = createAsyncThunk(
    'auth/customer_login', async(info, { rejectWithValue,fulfillWithValue }) => { try { const {data} = await api.post('/customer/customer-login',info); localStorage.setItem('customerToken',data.token); return fulfillWithValue(data); } catch (error) { return rejectWithValue(error.response?.data || { error: 'Login failed.' }); } }
);
export const forgot_password_request = createAsyncThunk(
    'auth/forgot_password_request', async (payload, { rejectWithValue, fulfillWithValue }) => { try { const { data } = await api.post('/customer/forgot-password', payload); return fulfillWithValue(data); } catch (error) { return rejectWithValue(error.response?.data || { error: 'Failed to send reset link.' }); } }
);
export const reset_password_request = createAsyncThunk(
    'auth/reset_password_request', async (payload, { rejectWithValue, fulfillWithValue }) => { const { token, password, confirmPassword } = payload; try { const { data } = await api.patch(`/customer/reset-password/${token}`, { password, confirmPassword }); return fulfillWithValue(data); } catch (error) { return rejectWithValue(error.response?.data || { error: 'Failed to reset password.' }); } }
);
// --- End Existing Actions ---


// --- NEW: Change Password Action ---
export const change_password = createAsyncThunk(
    'auth/change_password',
    async (payload, { rejectWithValue, fulfillWithValue }) => {
        // payload = { oldPassword, newPassword, confirmPassword }
        try {
            // API instance with 'withCredentials: true' should send the token cookie
            const { data } = await api.patch('/customer/change-password', payload);
            // Returns { message: '...' } on success
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Change Password API error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { error: 'Failed to change password. Please check your current password.' });
        }
    }
);
// --- End New Action ---


// --- Helper Function (Keep existing) ---
const decodeToken = (token) => {
    if (!token) return '';
    try { const d = jwtDecode(token); if (d.exp * 1000 < Date.now()) { localStorage.removeItem('customerToken'); return ''; } return d; }
    catch (error) { console.error("Invalid token:", error); localStorage.removeItem('customerToken'); return ''; }
};
// --- End Helper Function ---


// --- Slice Definition ---
export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        loader: false,
        userInfo: decodeToken(localStorage.getItem('customerToken')),
        errorMessage: '',
        successMessage: '',
        otpSent: false,
        registrationEmail: '',
    },
    reducers : {
        messageClear : (state) => { state.errorMessage = ""; state.successMessage = ""; },
        user_reset: (state) => { state.loader = false; state.userInfo = ""; state.errorMessage = ''; state.successMessage = ''; state.otpSent = false; state.registrationEmail = ''; localStorage.removeItem('customerToken'); },
        resetOtpState: (state) => { state.otpSent = false; state.registrationEmail = ''; }
    },
    extraReducers: (builder) => {
        builder
            // --- Existing Reducers (Keep ALL - OTP, Login, Forgot/Reset Password) ---
            .addCase(send_otp.pending, (state) => { state.loader = true; state.errorMessage=''; state.successMessage=''; state.otpSent = false; })
            .addCase(send_otp.rejected, (state, { payload }) => { state.loader = false; state.errorMessage = payload?.error || 'Failed.'; state.otpSent = false;})
            .addCase(send_otp.fulfilled, (state, { payload }) => { state.loader = false; state.successMessage = payload.message; state.otpSent = true; state.registrationEmail = payload.email;})
            .addCase(verify_otp_and_register.pending, (state) => { state.loader = true; state.errorMessage=''; state.successMessage='';})
            .addCase(verify_otp_and_register.rejected, (state, { payload }) => { state.loader = false; state.errorMessage = payload?.error || 'Failed.';})
            .addCase(verify_otp_and_register.fulfilled, (state, { payload }) => { const u = decodeToken(payload.token); state.loader=false; state.successMessage=payload.message; state.userInfo=u; state.otpSent=false; state.registrationEmail='';})
            .addCase(customer_login.pending, (state) => { state.loader = true; state.errorMessage = ''; state.successMessage = ''; })
            .addCase(customer_login.rejected, (state, { payload }) => { state.loader=false; state.errorMessage = payload?.error || 'Failed.'; })
            .addCase(customer_login.fulfilled, (state, { payload }) => { const u = decodeToken(payload.token); state.loader=false; state.successMessage=payload.message; state.userInfo=u; state.otpSent=false; state.registrationEmail='';})
            .addCase(forgot_password_request.pending, (state) => { state.loader = true; state.errorMessage = ''; state.successMessage = ''; })
            .addCase(forgot_password_request.rejected, (state, { payload }) => { state.loader = false; state.errorMessage = payload?.error || 'Failed.'; state.successMessage = ''; })
            .addCase(forgot_password_request.fulfilled, (state, { payload }) => { state.loader = false; state.successMessage = payload.message; state.errorMessage = ''; })
            .addCase(reset_password_request.pending, (state) => { state.loader = true; state.errorMessage = ''; state.successMessage = ''; })
            .addCase(reset_password_request.rejected, (state, { payload }) => { state.loader = false; state.errorMessage = payload?.error || 'Failed.'; state.successMessage = ''; })
            .addCase(reset_password_request.fulfilled, (state, { payload }) => { state.loader = false; state.successMessage = payload.message; state.errorMessage = ''; })

            // --- Change Password Reducers (NEW) ---
            .addCase(change_password.pending, (state) => {
                state.loader = true;
                state.errorMessage = '';
                state.successMessage = '';
            })
            .addCase(change_password.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload?.error || 'Failed to update password.'; // Use error from payload
                state.successMessage = '';
            })
            .addCase(change_password.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message; // Show success message
                state.errorMessage = '';
                // No need to update userInfo unless token is re-issued
            });
    }
});

// Export actions and reducer
export const { messageClear, user_reset, resetOtpState } = authSlice.actions;
export default authSlice.reducer;