import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = useSelector((state: AppState) => state.auth);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
