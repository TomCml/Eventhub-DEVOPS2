import { Request, Response, NextFunction } from 'express';
import {
    CreateEventUseCase,
    GetAllEventsUseCase,
    GetEventByIdUseCase,
    GetPaginatedEventsUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase
} from '../../application/usecases';
import { EventRepositoryDatabase } from '../../infrastructure/repositories/EventRepositoryDatabase';


const eventRepository = new EventRepositoryDatabase();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const getAllEventsUseCase = new GetAllEventsUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const getPaginatedEventsUseCase = new GetPaginatedEventsUseCase(eventRepository);
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventData = {
            title: req.body.title,
            description: req.body.description,
            startDate: new Date(req.body.startDate),
            venueId: req.body.venueId,
            capacity: req.body.capacity,
            price: req.body.price,
            organizerId: req.body.organizerId,
            categoryId: req.body.categoryId,
            imageUrl: req.body.imageUrl,
        };

        const event = await createEventUseCase.execute(eventData);
        res.status(201).jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await getAllEventsUseCase.execute();
        res.jsonSuccess(events.map(e => e.props));
    } catch (error) {
        next(error);
    }
};

export const getPaginatedEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 3;
        const result = await getPaginatedEventsUseCase.execute(page, limit);
        res.jsonSuccess({
            ...result,
            data: result.data.map(e => e.props),
        });
    } catch (error) {
        next(error);
    }
};

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.page !== undefined || req.query.limit !== undefined) {
        return getPaginatedEvents(req, res, next);
    }
    return getAllEvents(req, res, next);
};

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const event = await getEventByIdUseCase.execute(id);

        if (!event) {
            return res.status(404).jsonError('Event not found');
        }

        res.jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).jsonError('Event ID is required');
        }

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            venueId: req.body.venueId,
            capacity: req.body.capacity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            imageUrl: req.body.imageUrl,
        };

        const event = await updateEventUseCase.execute(id, updateData);
        res.jsonSuccess(event.props);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        await deleteEventUseCase.execute(id);
        res.jsonSuccess({ message: 'Event deleted successfully' });
    } catch (error) {
        next(error);
    }
};
