import { AnalyticsRepositoryInterface, EventViewInput } from '../../../domain/interfaces/AnalyticsRepositoryInterface';

export class RecordEventViewUseCase {
    constructor(private readonly analyticsRepository: AnalyticsRepositoryInterface) {}

    async execute(input: EventViewInput): Promise<void> {
        if (!input.eventId) throw new Error('eventId is required');
        if (!input.userId) throw new Error('userId is required');
        await this.analyticsRepository.recordView(input);
    }
}
