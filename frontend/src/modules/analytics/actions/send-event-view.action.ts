import type { AppDispatch, AppGetState } from '../../store/store';
import type { Dependencies } from '../../store/dependencies';
import { markEventTracked } from '../store/analytics.slice';

export const sendEventViewAction = (eventId: string) => async (
    dispatch: AppDispatch,
    getState: AppGetState,
    { analyticsGateway }: Dependencies
) => {
    const alreadyTracked = getState().analytics.trackedEventIds.includes(eventId);
    if (alreadyTracked) return;

    await analyticsGateway.recordEventView(eventId);
    dispatch(markEventTracked(eventId));
};
