import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { fetchDashboardDataAction } from '../actions/fetch-dashboard-data.action';

export const useDashboard = () => {
    const dispatch = useAppDispatch();
    const { topEvents, isLoading, error } = useSelector((state: AppState) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardDataAction(10));
    }, [dispatch]);

    return { topEvents, isLoading, error };
};
