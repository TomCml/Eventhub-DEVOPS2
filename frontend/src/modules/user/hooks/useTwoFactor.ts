import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { clearOtpSetup, clearOtpError } from '../store/user.slice';
import { generateOtpSecretAction, verifyAndActivateOtpAction, disableOtpAction } from '../actions/user.actions';

export const useTwoFactor = (onClose: () => void) => {
    const dispatch = useAppDispatch();
    const { otpSetup, otpActivationResult, isOtpLoading, otpError } = useSelector(
        (state: AppState) => state.user
    );

    const [otpCode, setOtpCode] = useState('');

    const handleGenerate = () => {
        dispatch(generateOtpSecretAction());
    };

    const handleVerify = async () => {
        if (!otpCode) return;
        try {
            await dispatch(verifyAndActivateOtpAction(otpCode));
        } catch {
            // Error handled by Redux
        }
    };

    const handleDeactivate = async () => {
        try {
            await dispatch(disableOtpAction());
            onClose();
        } catch {
            // Error handled by Redux
        }
    };

    const handleOtpChange = (value: string) => {
        setOtpCode(value.replace(/\D/g, '').slice(0, 6));
    };

    const handleClose = () => {
        dispatch(clearOtpSetup());
        dispatch(clearOtpError());
        setOtpCode('');
        onClose();
    };

    return {
        otpSetup,
        otpActivationResult,
        isOtpLoading,
        otpError,
        otpCode,
        handleGenerate,
        handleVerify,
        handleDeactivate,
        handleOtpChange,
        handleClose
    };
};
