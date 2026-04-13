import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, OtpSetupData, OtpActivationResult } from '../domain/models';

interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    otpSetup: OtpSetupData | null;
    otpActivationResult: OtpActivationResult | null;
    isOtpLoading: boolean;
    otpError: string | null;
}

const initialState: UserState = {
    profile: null,
    isLoading: false,
    error: null,
    otpSetup: null,
    otpActivationResult: null,
    isOtpLoading: false,
    otpError: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchProfilePending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
            state.isLoading = false;
            state.profile = action.payload;
        },
        fetchProfileFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        otpSetupPending: (state) => {
            state.isOtpLoading = true;
            state.otpError = null;
        },
        otpSetupSuccess: (state, action: PayloadAction<OtpSetupData>) => {
            state.isOtpLoading = false;
            state.otpSetup = action.payload;
        },
        otpSetupFailure: (state, action: PayloadAction<string>) => {
            state.isOtpLoading = false;
            state.otpError = action.payload;
        },
        otpVerifyPending: (state) => {
            state.isOtpLoading = true;
            state.otpError = null;
        },
        otpVerifySuccess: (state, action: PayloadAction<OtpActivationResult>) => {
            state.isOtpLoading = false;
            state.otpActivationResult = action.payload;
            if (state.profile) {
                state.profile.otp_enable = 1;
            }
        },
        otpVerifyFailure: (state, action: PayloadAction<string>) => {
            state.isOtpLoading = false;
            state.otpError = action.payload;
        },
        otpDisablePending: (state) => {
            state.isOtpLoading = true;
            state.otpError = null;
        },
        otpDisableSuccess: (state) => {
            state.isOtpLoading = false;
            if (state.profile) {
                state.profile.otp_enable = 0;
            }
            state.otpSetup = null;
            state.otpActivationResult = null;
        },
        otpDisableFailure: (state, action: PayloadAction<string>) => {
            state.isOtpLoading = false;
            state.otpError = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
        clearOtpSetup: (state) => {
            state.otpSetup = null;
            state.otpActivationResult = null;
            state.otpError = null;
        },
        clearOtpError: (state) => {
            state.otpError = null;
        },
        hydrateProfile: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    }
});

export const {
    fetchProfilePending, fetchProfileSuccess, fetchProfileFailure,
    otpSetupPending, otpSetupSuccess, otpSetupFailure,
    otpVerifyPending, otpVerifySuccess, otpVerifyFailure,
    otpDisablePending, otpDisableSuccess, otpDisableFailure,
    clearProfile, clearOtpSetup, clearOtpError, hydrateProfile
} = userSlice.actions;

export default userSlice.reducer;
