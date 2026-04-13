import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthMiddleware } from "../middlewares";
import {
    generateOtpSecret,
    verifyAndActivateOtp,
    verifyOtpLogin,
    verifyBackupCode,
    disableOtp,
} from "../controllers/OtpControllers";

const router = Router();

// Rate limiter pour les endpoints de vérification OTP (max 4 tentatives par minute)
const otpVerifyLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 4,
    message: { success: false, error: 'Too many OTP attempts. Please try again in a minute.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/generate", AuthMiddleware, generateOtpSecret);

router.post("/verify-activation", AuthMiddleware, otpVerifyLimiter, verifyAndActivateOtp);

router.post("/verify-login", otpVerifyLimiter, verifyOtpLogin);
router.post("/verify-backup", otpVerifyLimiter, verifyBackupCode);
router.post("/disable", AuthMiddleware, disableOtp);

export default router as Router;
