import { Request, Response, NextFunction } from 'express';
import { RecordEventViewUseCase, GetEventAnalyticsUseCase } from '../../application/usecases';
import { UserPayload } from '../../domain/entities/User';
import { AnalyticsRepositoryDatabase } from '../../infrastructure/repositories/AnalyticsRepositoryDatabase';

const analyticsRepository = new AnalyticsRepositoryDatabase();
const recordEventViewUseCase = new RecordEventViewUseCase(analyticsRepository);
const getEventAnalyticsUseCase = new GetEventAnalyticsUseCase(analyticsRepository);

export const recordView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId } = req.body;
        const user = (req as Request & { user?: UserPayload }).user;
        const userId = user?.id;

        if (!userId) {
            return res.status(401).jsonError('Not authorized');
        }
        if (!eventId) {
            return res.status(400).jsonError('eventId is required');
        }

        await recordEventViewUseCase.execute({ eventId, userId });
        res.jsonSuccess({ recorded: true });
    } catch (error) {
        next(error);
    }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const analytics = await getEventAnalyticsUseCase.execute(limit);
        res.jsonSuccess(analytics);
    } catch (error) {
        next(error);
    }
};
