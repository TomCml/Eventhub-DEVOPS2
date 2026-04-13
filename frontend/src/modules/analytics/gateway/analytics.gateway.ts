export interface AnalyticsGateway {
    recordEventView(eventId: string): Promise<void>;
}
