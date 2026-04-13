import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../domain/entities/User";
import { getEnvVariable } from "./utils";

export const generateSalt = async () => {
    return bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return bcrypt.hash(password, salt)
}


export const isValidPassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
) => {
    return await hashPassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = (payload: UserPayload) => {
    const SECRET_KEY = getEnvVariable("JWT_SECRET");
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export const validateSignature = (req: any) => {
    const signature = req.cookies?.token;
    
    if (signature) {
        try {
            const payload = jwt.verify(signature, getEnvVariable("JWT_SECRET")) as any;
            if (payload.purpose === 'otp-verification') {
                return false;
            }
            req.user = payload as UserPayload;
            return true;
        } catch (error) {
            console.error("Token verification failed:", error);
            return false;
        }
    }
    return false;
}


//Merci Bocar