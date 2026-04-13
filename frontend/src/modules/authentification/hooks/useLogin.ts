import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { loginAction } from '../actions/auth.actions';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { isLoading, error: authError, isAuthenticated, otpRequired } = useSelector(
        (state: AppState) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (otpRequired) {
            navigate('/otp-verify');
        }
    }, [otpRequired, navigate]);

    const validate = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = "L'email est requis";
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            await dispatch(loginAction({
                email: formData.email,
                password: formData.password
            }));
        } catch {
            // Error handled by Redux state
        }
    };

    const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

    return {
        formData,
        errors,
        isLoading,
        authError,
        isFormValid,
        handleChange,
        handleSubmit
    };
};
