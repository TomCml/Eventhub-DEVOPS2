export interface EventViewInput {
    eventId: string;
    userId: string;
}

export interface EventAnalyticItem {
    eventId: string;
    eventTitle: string;
    viewCount: number;
}

export interface AnalyticsRepositoryInterface {
    recordView(input: EventViewInput): Promise<void>;
    getTopEvents(limit: number): Promise<EventAnalyticItem[]>;
}
