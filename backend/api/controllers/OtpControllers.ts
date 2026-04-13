import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getEnvVariable } from '../../utility/index';
import {
    GenerateOtpSecretUseCase,
    VerifyAndActivateOtpUseCase,
    VerifyOtpLoginUseCase,
    VerifyBackupCodeUseCase,
    DisableOtpUseCase,
} from '../../application/usecases';
import { UserRepositoryDatabase } from '../../infrastructure/repositories/UserRepositoryDatabase';
import { OtpBackupCodeRepositoryDatabase } from '../../infrastructure/repositories/OtpBackupCodeRepositoryDatabase';
import { UserPayload } from '../../domain/entities/User';
import { getCookieOptions } from '../../utility/cookie.utility';


const userRepository = new UserRepositoryDatabase();
const backupCodeRepository = new OtpBackupCodeRepositoryDatabase();

const generateOtpSecretUseCase = new GenerateOtpSecretUseCase(userRepository);
const verifyAndActivateOtpUseCase = new VerifyAndActivateOtpUseCase(userRepository, backupCodeRepository);
const verifyOtpLoginUseCase = new VerifyOtpLoginUseCase(userRepository);
const verifyBackupCodeUseCase = new VerifyBackupCodeUseCase(userRepository, backupCodeRepository);
const disableOtpUseCase = new DisableOtpUseCase(userRepository, backupCodeRepository);


export const generateOtpSecret = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as Request & { user?: UserPayload }).user;
        if (!user) {
            return res.status(401).jsonError('Not authenticated');
        }

        const result = await generateOtpSecretUseCase.execute({ userId: user.id });
        res.jsonSuccess(result);
    } catch (error) {
        next(error);
    }
};


export const verifyAndActivateOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as Request & { user?: UserPayload }).user;
        if (!user) {
            return res.status(401).jsonError('Not authenticated');
        }

        const { otpToken } = req.body;
        if (!otpToken) {
            return res.status(400).jsonError('OTP token is required');
        }

        const result = await verifyAndActivateOtpUseCase.execute({
            userId: user.id,
            otpToken,
        });
        res.jsonSuccess(result);
    } catch (error) {
        next(error);
    }
};


export const verifyOtpLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tempToken, otpToken } = req.body;

        if (!tempToken || !otpToken) {
            return res.status(400).jsonError('tempToken and otpToken are required');
        }


        const SECRET_KEY = getEnvVariable("JWT_SECRET");
        const decoded = jwt.verify(tempToken, SECRET_KEY) as { id: string; purpose: string };

        if (decoded.purpose !== 'otp-verification') {
            return res.status(401).jsonError('Not Authorized');
        }

        const result = await verifyOtpLoginUseCase.execute({
            userId: decoded.id,
            otpToken,
        });

        if (result.token) {
            res.cookie('token', result.token, getCookieOptions(24 * 60 * 60 * 1000));
        }

        const { token, ...responseData } = result;

        res.jsonSuccess(responseData);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).jsonError('Invalid or expired session');
        }
        next(error);
    }
};


export const verifyBackupCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tempToken, backupCode } = req.body;

        if (!tempToken || !backupCode) {
            return res.status(400).jsonError('tempToken and backupCode are required');
        }


        const SECRET_KEY = getEnvVariable("JWT_SECRET");
        const decoded = jwt.verify(tempToken, SECRET_KEY) as { id: string; purpose: string };

        if (decoded.purpose !== 'otp-verification') {
            return res.status(401).jsonError('Not Authorized');
        }

        const result = await verifyBackupCodeUseCase.execute({
            userId: decoded.id,
            backupCode,
        });

        if (result.token) {
            res.cookie('token', result.token, getCookieOptions(24 * 60 * 60 * 1000));
        }

        const { token, ...responseData } = result;

        res.jsonSuccess(responseData);
    } catch (error: any) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).jsonError('Invalid or expired session');
        }
        next(error);
    }
};


export const disableOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as Request & { user?: UserPayload }).user;
        if (!user) {
            return res.status(401).jsonError('Not authenticated');
        }

        const result = await disableOtpUseCase.execute({ userId: user.id });
        res.jsonSuccess(result);
    } catch (error) {
        next(error);
    }
};
