import type { AppDispatch, AppGetState } from "../../store/store";
import type { Dependencies } from "../../store/dependencies";
import {
    fetchProfilePending, fetchProfileSuccess, fetchProfileFailure,
    otpSetupPending, otpSetupSuccess, otpSetupFailure,
    otpVerifyPending, otpVerifySuccess, otpVerifyFailure,
    otpDisablePending, otpDisableSuccess, otpDisableFailure
} from "../store/user.slice";
import { hydrateAuth, logoutSuccess } from "../../authentification/store/auth.slice";

export const fetchProfileAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { userGateway }: Dependencies
) => {
    dispatch(fetchProfilePending());
    try {
        const profile = await userGateway.getProfile();
        dispatch(fetchProfileSuccess(profile));
        dispatch(hydrateAuth());
        return profile;
    } catch (error: any) {
        console.error("Hydration failed, logging out", error);
        const message = error.response?.data?.error?.message || error.message || 'Erreur lors du chargement du profil';
        dispatch(fetchProfileFailure(message));
        dispatch(logoutSuccess());
        throw new Error(message);
    }
};

export const generateOtpSecretAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { userGateway }: Dependencies
) => {
    dispatch(otpSetupPending());
    try {
        const result = await userGateway.generateOtpSecret();
        dispatch(otpSetupSuccess(result));
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Erreur lors de la génération OTP';
        dispatch(otpSetupFailure(message));
        throw new Error(message);
    }
};

export const verifyAndActivateOtpAction = (otpToken: string) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { userGateway }: Dependencies
) => {
    dispatch(otpVerifyPending());
    try {
        const result = await userGateway.verifyAndActivateOtp(otpToken);
        dispatch(otpVerifySuccess(result));
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Code OTP invalide';
        dispatch(otpVerifyFailure(message));
        throw new Error(message);
    }
};

export const disableOtpAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { userGateway }: Dependencies
) => {
    dispatch(otpDisablePending());
    try {
        await userGateway.disableOtp();
        dispatch(otpDisableSuccess());
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Erreur lors de la désactivation';
        dispatch(otpDisableFailure(message));
        throw new Error(message);
    }
};
