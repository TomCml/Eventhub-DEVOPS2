import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse } from '../domain/models';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    otpRequired: boolean;
    tempToken: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    otpRequired: false,
    tempToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.isLoading = false;
            if (action.payload.otpRequired) {
                state.otpRequired = true;
                state.tempToken = action.payload.tempToken || null;
            } else {
                state.isAuthenticated = true;
                state.otpRequired = false;
                state.tempToken = null;
            }
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        verifyOtpPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        verifyOtpSuccess: (state, _action: PayloadAction<LoginResponse>) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.otpRequired = false;
            state.tempToken = null;
        },
        verifyOtpFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.otpRequired = false;
            state.tempToken = null;
            state.error = null;
        },
        logoutFailure: (state, _action: PayloadAction<string>) => {
            // Even on logout error, we typically clear the state
            state.isAuthenticated = false;
            state.otpRequired = false;
            state.tempToken = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        hydrateAuth: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = true;
        }
    }
});

export const {
    loginPending, loginSuccess, loginFailure,
    registerPending, registerSuccess, registerFailure,
    verifyOtpPending, verifyOtpSuccess, verifyOtpFailure,
    logoutSuccess, logoutFailure,
    clearError, hydrateAuth
} = authSlice.actions;

export default authSlice.reducer;