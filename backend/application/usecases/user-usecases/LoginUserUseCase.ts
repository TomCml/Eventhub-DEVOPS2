import { UserRepositoryInterface } from "../../../domain/interfaces/UserRepositoryInterface";
import { generateSignature } from "../../../utility/password.utility";
import jwt from "jsonwebtoken";
import { getEnvVariable } from "../../../utility/index";

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface LoginUserOutput {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    token: string;
    otpRequired?: boolean;
    tempToken?: string;
}

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {

        if (!input.email || input.email.trim() === '') {
            throw new Error('Email is required');
        }

        if (!input.password) {
            throw new Error('Password is required');
        }


        const user = await this.userRepository.login(input.email, input.password);

        if (!user) {
            throw new Error('Invalid email or password');
        }


        if (user.otp_enable === 1) {
            const SECRET_KEY = getEnvVariable("JWT_SECRET");
            const tempToken = jwt.sign(
                { id: user.id, purpose: 'otp-verification' },
                SECRET_KEY,
                { expiresIn: '5m' }
            );

            return {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token: '',
                otpRequired: true,
                tempToken,
            };
        }


        const token = generateSignature({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
            token,
        };
    }
}
