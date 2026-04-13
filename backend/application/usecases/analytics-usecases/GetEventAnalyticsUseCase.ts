import { AnalyticsRepositoryInterface, EventAnalyticItem } from '../../../domain/interfaces/AnalyticsRepositoryInterface';

export class GetEventAnalyticsUseCase {
    constructor(private readonly analyticsRepository: AnalyticsRepositoryInterface) {}

    async execute(limit: number = 10): Promise<EventAnalyticItem[]> {
        return this.analyticsRepository.getTopEvents(limit);
    }
}
