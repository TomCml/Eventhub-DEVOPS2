import { AnalyticsRepositoryInterface, EventAnalyticItem, EventViewInput } from '../../domain/interfaces/AnalyticsRepositoryInterface';
import { prisma } from '../database/db';

export class AnalyticsRepositoryDatabase implements AnalyticsRepositoryInterface {

    async recordView(input: EventViewInput): Promise<void> {
        await prisma.eventView.create({
            data: {
                eventId: input.eventId,
                userId: input.userId,
            },
        });
    }

    async getTopEvents(limit: number): Promise<EventAnalyticItem[]> {
        const grouped = await prisma.eventView.groupBy({
            by: ['eventId'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: limit,
        });

        if (grouped.length === 0) return [];

        const eventIds = grouped.map((g) => g.eventId);
        const events = await prisma.event.findMany({
            where: { id: { in: eventIds } },
            select: { id: true, title: true },
        });

        const titleMap = new Map(events.map((e) => [e.id, e.title]));

        return grouped.map((g) => ({
            eventId: g.eventId,
            eventTitle: titleMap.get(g.eventId) ?? 'Évènement inconnu',
            viewCount: g._count.id,
        }));
    }
}
