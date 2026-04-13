import { Event } from '../entities/Event';

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface EventRepositoryInterface {
    create(event: Event): Promise<Event>;

    findAll(): Promise<Event[]>;

    findPaginated(page: number, limit: number): Promise<PaginatedResult<Event>>;

    findById(id: string): Promise<Event | null>;

    delete(id: string): Promise<void>;

    update(id: string, event: Event): Promise<Event>;
}
