import type { AppDispatch, AppGetState } from '../../store/store';
import type { Dependencies } from '../../store/dependencies';
import { fetchDashboardPending, fetchDashboardSuccess, fetchDashboardFailure } from '../store/dashboard.slice';

export const fetchDashboardDataAction = (limit: number = 10) => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { dashboardGateway }: Dependencies
) => {
    dispatch(fetchDashboardPending());
    try {
        const topEvents = await dashboardGateway.getTopEvents(limit);
        dispatch(fetchDashboardSuccess(topEvents));
    } catch (error: any) {
        const errorMessage = error.response?.data?.error?.message || error.message || 'Erreur lors du chargement du tableau de bord';
        dispatch(fetchDashboardFailure(errorMessage));
    }
};
