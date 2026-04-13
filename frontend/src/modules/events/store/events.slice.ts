import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventModel, PaginatedResponse } from '../domain/models';

interface EventsState {
    events: EventModel[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 3,
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEventsPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action: PayloadAction<EventModel[]>) => {
            state.isLoading = false;
            state.events = action.payload;
        },
        fetchEventsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        fetchPaginatedEventsPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPaginatedEventsSuccess: (state, action: PayloadAction<PaginatedResponse>) => {
            state.isLoading = false;
            state.events = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.totalCount = action.payload.total;
        },
        fetchPaginatedEventsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const {
    fetchEventsPending,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchPaginatedEventsPending,
    fetchPaginatedEventsSuccess,
    fetchPaginatedEventsFailure,
    setPage,
} = eventsSlice.actions;

export default eventsSlice.reducer;
