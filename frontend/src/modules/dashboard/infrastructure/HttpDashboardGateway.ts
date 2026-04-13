import axios from 'axios';
import type { DashboardGateway } from '../gateway/dashboard.gateway';
import type { EventAnalyticItem } from '../domain/models';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpDashboardGateway implements DashboardGateway {
    async getTopEvents(limit: number = 10): Promise<EventAnalyticItem[]> {
        try {
            const response = await axios.get(`${API_BASE}/analytics`, {
                params: { limit },
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            throw error;
        }
    }
}
