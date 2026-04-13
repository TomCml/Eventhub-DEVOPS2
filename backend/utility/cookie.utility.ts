import { CookieOptions } from 'express';

export const getCookieOptions = (maxAge?: number): CookieOptions => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || process.env.COOKIE_SECURE === 'true',
        sameSite: 'lax',
        maxAge: maxAge,
        path: '/',
    };
};

export const clearCookieOptions = (): CookieOptions => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || process.env.COOKIE_SECURE === 'true',
        sameSite: 'lax',
        path: '/',
    };
};
