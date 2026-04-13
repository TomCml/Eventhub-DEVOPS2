import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { fetchPaginatedEventsAction } from '../actions/fetch-events.action';
import { setPage } from '../store/events.slice';

export const useEvents = () => {
    const dispatch = useAppDispatch();
    const { events, isLoading, error, currentPage, totalPages, totalCount, limit } = useSelector(
        (state: AppState) => state.events
    );

    useEffect(() => {
        dispatch(fetchPaginatedEventsAction(currentPage, limit));
    }, [dispatch, currentPage, limit]);

    const goToPage = (page: number) => {
        dispatch(setPage(page));
    };

    return {
        events,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalCount,
        goToPage,
    };
};
