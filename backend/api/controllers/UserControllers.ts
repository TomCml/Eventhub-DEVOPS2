import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/usecases';
import { UserRepositoryDatabase } from '../../infrastructure/repositories/UserRepositoryDatabase';
import { UserPayload } from '../../domain/entities/User';
import { getCookieOptions, clearCookieOptions } from '../../utility/cookie.utility';


const userRepository = new UserRepositoryDatabase();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const result = await registerUserUseCase.execute({
            username,
            email,
            password,
        });

        if (result.token) {
            res.cookie('token', result.token, getCookieOptions(24 * 60 * 60 * 1000));
        }

        const { token, ...responseData } = result;

        res.jsonSuccess(responseData, 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const result = await loginUserUseCase.execute({
            email,
            password,
        });

        if (result.token) {
            res.cookie('token', result.token, getCookieOptions(24 * 60 * 60 * 1000));
        }

        const { token, ...responseData } = result;

        res.jsonSuccess(responseData);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = (req as Request & { user?: UserPayload }).user;

        if (!user) {
            return res.status(401).jsonError('Not authenticated');
        }


        const fullUser = await userRepository.findById(user.id);
        if (!fullUser) {
            return res.status(404).jsonError('User not found');
        }

        res.jsonSuccess({
            id: fullUser.id,
            username: fullUser.username,
            email: fullUser.email,
            otp_enable: fullUser.otp_enable,
            createdAt: fullUser.createdAt,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token', clearCookieOptions());
        res.status(200).jsonSuccess({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};
