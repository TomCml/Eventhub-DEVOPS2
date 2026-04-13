import type { AppDispatch, AppGetState } from "../../store/store";
import type { Dependencies } from "../../store/dependencies";
import {
    loginPending, loginSuccess, loginFailure,
    registerPending, registerSuccess, registerFailure,
    verifyOtpPending, verifyOtpSuccess, verifyOtpFailure,
    logoutSuccess, logoutFailure
} from "../store/auth.slice";

export const loginAction = (payload: { email: string; password: string }) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { authGateway }: Dependencies
) => {
    dispatch(loginPending());
    try {
        const result = await authGateway.login(payload.email, payload.password);
        dispatch(loginSuccess(result));
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Identifiants invalides';
        dispatch(loginFailure(message));
        throw new Error(message);
    }
};

export const registerAction = (payload: { username: string; email: string; password: string }) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { authGateway }: Dependencies
) => {
    dispatch(registerPending());
    try {
        const result = await authGateway.register(payload);
        dispatch(registerSuccess());
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || "Erreur lors de l'inscription";
        dispatch(registerFailure(message));
        throw new Error(message);
    }
};

export const verifyOtpLoginAction = (payload: { tempToken: string; otpToken: string }) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { authGateway }: Dependencies
) => {
    dispatch(verifyOtpPending());
    try {
        const result = await authGateway.verifyOtpLogin(payload.tempToken, payload.otpToken);
        dispatch(verifyOtpSuccess(result));
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Code OTP invalide';
        dispatch(verifyOtpFailure(message));
        throw new Error(message);
    }
};

export const verifyBackupCodeAction = (payload: { tempToken: string; backupCode: string }) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { authGateway }: Dependencies
) => {
    dispatch(verifyOtpPending());
    try {
        const result = await authGateway.verifyBackupCode(payload.tempToken, payload.backupCode);
        dispatch(verifyOtpSuccess(result));
        return result;
    } catch (error: any) {
        const message = error.response?.data?.error?.message || error.message || 'Code de secours invalide';
        dispatch(verifyOtpFailure(message));
        throw new Error(message);
    }
};

export const logoutAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { authGateway }: Dependencies
) => {
    try {
        await authGateway.logout();
        dispatch(logoutSuccess());
    } catch (error: any) {
        dispatch(logoutFailure(error.response?.data?.error?.message || error.message || 'Erreur lors de la déconnexion'));
        // Even if the server logout fails, we clear the local state
        dispatch(logoutSuccess());
    }
};
