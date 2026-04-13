import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { fetchProfileAction, disableOtpAction } from '../actions/user.actions';

export const useProfile = () => {
    const dispatch = useAppDispatch();

    const { profile, isLoading, error, isOtpLoading, otpError } = useSelector(
        (state: AppState) => state.user
    );

    const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, [dispatch]);

    const handleOpenTwoFactor = () => {
        setShowTwoFactorModal(true);
    };

    const handleCloseTwoFactor = () => {
        setShowTwoFactorModal(false);
        dispatch(fetchProfileAction());
    };

    const handleDisableOtp = async () => {
        try {
            await dispatch(disableOtpAction());
            dispatch(fetchProfileAction());
        } catch {
            // Error handled by Redux
        }
    };

    return {
        profile,
        isLoading,
        error,
        isOtpLoading,
        otpError,
        showTwoFactorModal,
        handleOpenTwoFactor,
        handleCloseTwoFactor,
        handleDisableOtp,
    };
};
