import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { logoutAction } from '../../authentification/actions/auth.actions';

export const useNavbar = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/login');
    };

    return {
        isAuthenticated,
        handleLogout
    };
};
