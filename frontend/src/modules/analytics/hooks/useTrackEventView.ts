import { useAppDispatch } from '../../store/store';
import { sendEventViewAction } from '../actions/send-event-view.action';

export const useTrackEventView = () => {
    const dispatch = useAppDispatch();

    const trackView = (eventId: string) => {
        dispatch(sendEventViewAction(eventId));
    };

    return { trackView };
};
