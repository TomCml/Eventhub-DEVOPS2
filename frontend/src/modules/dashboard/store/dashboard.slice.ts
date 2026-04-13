import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventAnalyticItem } from '../domain/models';

interface DashboardState {
    topEvents: EventAnalyticItem[];
    isLoading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    topEvents: [],
    isLoading: false,
    error: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchDashboardPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchDashboardSuccess: (state, action: PayloadAction<EventAnalyticItem[]>) => {
            state.isLoading = false;
            state.topEvents = action.payload;
        },
        fetchDashboardFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDashboardPending, fetchDashboardSuccess, fetchDashboardFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;
