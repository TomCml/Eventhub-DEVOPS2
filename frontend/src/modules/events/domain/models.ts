export interface EventModel {
    id: string;
    title: string;
    description: string | null;
    startDate: string;
    venueId: string;
    capacity: number;
    price: number | null;
    organizerId: string;
    categoryId: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedResponse {
    data: EventModel[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
