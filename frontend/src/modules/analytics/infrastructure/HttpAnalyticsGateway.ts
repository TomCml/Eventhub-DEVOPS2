import axios from 'axios';
import type { AnalyticsGateway } from '../gateway/analytics.gateway';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpAnalyticsGateway implements AnalyticsGateway {
    async recordEventView(eventId: string): Promise<void> {
        try {
            await axios.post(`${API_BASE}/analytics/view`, { eventId }, { withCredentials: true });
        } catch (error) {
            // Silent fail — le tracking ne doit jamais casser l'UX
            console.warn('Failed to record event view:', error);
        }
    }
}
