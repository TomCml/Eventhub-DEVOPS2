import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsState {
    trackedEventIds: string[];
}

const initialState: AnalyticsState = {
    trackedEventIds: [],
};

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        markEventTracked: (state, action: PayloadAction<string>) => {
            if (!state.trackedEventIds.includes(action.payload)) {
                state.trackedEventIds.push(action.payload);
            }
        },
    },
});

export const { markEventTracked } = analyticsSlice.actions;
export default analyticsSlice.reducer;
