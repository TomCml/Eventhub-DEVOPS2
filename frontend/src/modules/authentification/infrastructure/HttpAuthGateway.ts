import axios from "axios";
import type { AuthGateway } from "../gateway/auth.gateway";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpAuthGateway implements AuthGateway {
    async login(email: string, password: string) {
        const response = await axios.post(`${API_BASE}/users/login`, { email, password }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async register(payload: any) {
        const response = await axios.post(`${API_BASE}/users/register`, payload, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyOtpLogin(tempToken: string, otpToken: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-login`, { tempToken, otpToken }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyBackupCode(tempToken: string, backupCode: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-backup`, { tempToken, backupCode }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async logout() {
        await axios.post(`${API_BASE}/users/logout`, {}, {
            withCredentials: true
        });
    }
}
