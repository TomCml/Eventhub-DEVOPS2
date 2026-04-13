import { EventRepositoryInterface, PaginatedResult } from '../../../domain/interfaces/EventRepositoryInterface';
import { Event } from '../../../domain/entities/Event';

export class GetPaginatedEventsUseCase {
    constructor(private readonly eventRepository: EventRepositoryInterface) {}

    async execute(page: number, limit: number): Promise<PaginatedResult<Event>> {
        if (page < 1) throw new Error('Page must be >= 1');
        if (limit < 1 || limit > 100) throw new Error('Limit must be between 1 and 100');
        return this.eventRepository.findPaginated(page, limit);
    }
}
