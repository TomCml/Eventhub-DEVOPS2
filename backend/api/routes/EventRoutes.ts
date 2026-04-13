import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
} from "../controllers/EventControllers";

const router = Router();

router.get("/", AuthMiddleware, getEvents);

router.get("/:id", AuthMiddleware, getEventById);

router.post("/", AuthMiddleware, createEvent);

router.put("/:id", AuthMiddleware, updateEvent);

router.delete("/:id", AuthMiddleware, deleteEvent);

export default router;
