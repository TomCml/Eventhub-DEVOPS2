import { Router } from "express";
import { AuthMiddleware } from "../middlewares";
import { register, login, getProfile, logout } from "../controllers/UserControllers";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", AuthMiddleware, getProfile);

router.post("/logout", AuthMiddleware, logout);

export default router as Router;
