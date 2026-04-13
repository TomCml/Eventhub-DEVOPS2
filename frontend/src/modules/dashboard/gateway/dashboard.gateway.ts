import type { EventAnalyticItem } from "../domain/models";

export interface DashboardGateway {
    getTopEvents(limit?: number): Promise<EventAnalyticItem[]>;
}
