import 'dotenv/config';
import { EventRepositoryInterface, PaginatedResult } from '../../domain/interfaces/EventRepositoryInterface';
import { Event, EventProps } from '../../domain/entities/Event';
import { prisma } from '../database/db';

export class EventRepositoryDatabase implements EventRepositoryInterface {

    async create(event: Event): Promise<Event> {
        const created = await prisma.event.create({
            data: {
                id: event.id,
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                venueId: event.venueId,
                capacity: event.capacity,
                price: event.price,
                organizerId: event.organizerId,
                categoryId: event.categoryId,
                imageUrl: event.imageUrl,
            },
        });

        return new Event(created as EventProps);
    }

    async findAll(): Promise<Event[]> {
        const events = await prisma.event.findMany();
        return events.map((e) => new Event(e as EventProps));
    }

    async findPaginated(page: number, limit: number): Promise<PaginatedResult<Event>> {
        const skip = (page - 1) * limit;
        const [events, total] = await prisma.$transaction([
            prisma.event.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.event.count(),
        ]);
        return {
            data: events.map((e) => new Event(e as EventProps)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findById(id: string): Promise<Event | null> {
        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (!event) return null;
        return new Event(event as EventProps);
    }

    async delete(id: string): Promise<void> {
        await prisma.event.delete({
            where: { id },
        });
    }

    async update(id: string, event: Event): Promise<Event> {
        const updated = await prisma.event.update({
            where: { id },
            data: {
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                venueId: event.venueId,
                capacity: event.capacity,
                price: event.price,
                organizerId: event.organizerId,
                categoryId: event.categoryId,
                imageUrl: event.imageUrl,
            },
        });

        return new Event(updated as EventProps);
    }
}
