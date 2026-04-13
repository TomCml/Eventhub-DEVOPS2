export interface LoginResponse {
    otpRequired?: boolean;
    tempToken?: string;
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
}

export interface RegisterResponse {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
}
