import axios from "axios";
import type { EventGateway } from "../gateway/event.gateway";
import type { EventModel, PaginatedResponse } from "../domain/models";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpEventGateway implements EventGateway {
    async findAll(): Promise<EventModel[]> {
        try {
            const response = await axios.get(`${API_BASE}/events`, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch events:", error);
            throw error;
        }
    }

    async findById(id: string): Promise<EventModel | null> {
        try {
            const response = await axios.get(`${API_BASE}/events/${id}`, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            console.error(`Failed to fetch event ${id}:`, error);
            throw error;
        }
    }

    async findPaginated(page: number, limit: number): Promise<PaginatedResponse> {
        try {
            const response = await axios.get(`${API_BASE}/events`, {
                params: { page, limit },
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch paginated events:", error);
            throw error;
        }
    }
}
