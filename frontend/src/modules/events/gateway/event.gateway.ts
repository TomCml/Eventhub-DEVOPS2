import type { EventModel, PaginatedResponse } from "../domain/models";

export interface EventGateway {
    findAll(): Promise<EventModel[]>;
    findById(id: string): Promise<EventModel | null>;
    findPaginated(page: number, limit: number): Promise<PaginatedResponse>;
}
