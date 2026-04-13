import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { clearError } from '../store/auth.slice';
import { verifyOtpLoginAction, verifyBackupCodeAction } from '../actions/auth.actions';

export const useOtpVerify = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, tempToken, isAuthenticated } = useSelector((state: AppState) => state.auth);

    const [otpCode, setOtpCode] = useState('');
    const [backupMode, setBackupMode] = useState(false);
    const [backupCodeValue, setBackupCodeValue] = useState('');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    // Redirect if no tempToken (user didn't go through login)
    useEffect(() => {
        if (!tempToken) {
            navigate('/login');
        }
    }, [tempToken, navigate]);

    const handleOtpChange = (value: string) => {
        setOtpCode(value.replace(/\D/g, '').slice(0, 6));
    };

    const handleBackupCodeChange = (value: string) => {
        setBackupCodeValue(value.toUpperCase());
    };

    const handleOtpSubmit = async () => {
        if (!tempToken || !otpCode) return;
        dispatch(clearError());
        try {
            await dispatch(verifyOtpLoginAction({ tempToken, otpToken: otpCode }));
        } catch {
            // Error handled by Redux
        }
    };

    const handleBackupSubmit = async () => {
        if (!tempToken || !backupCodeValue) return;
        dispatch(clearError());
        try {
            await dispatch(verifyBackupCodeAction({ tempToken, backupCode: backupCodeValue }));
        } catch {
            // Error handled by Redux
        }
    };

    const toggleBackupMode = () => {
        setBackupMode(!backupMode);
        dispatch(clearError());
    };

    return {
        isLoading,
        error,
        otpCode,
        backupMode,
        backupCodeValue,
        handleOtpChange,
        handleBackupCodeChange,
        handleOtpSubmit,
        handleBackupSubmit,
        toggleBackupMode
    };
};
