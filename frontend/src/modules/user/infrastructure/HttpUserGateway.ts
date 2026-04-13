import axios from "axios";
import type { UserGateway } from "../gateway/user.gateway";
import type { UserProfile } from "../domain/models";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpUserGateway implements UserGateway {
    async getProfile(): Promise<UserProfile> {
        const response = await axios.get(`${API_BASE}/users/profile`, {
            withCredentials: true
        });
        return response.data.data;
    }

    async generateOtpSecret() {
        const response = await axios.post(`${API_BASE}/otp/generate`, {}, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyAndActivateOtp(otpToken: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-activation`, { otpToken }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async disableOtp() {
        const response = await axios.post(`${API_BASE}/otp/disable`, {}, {
            withCredentials: true
        });
        return response.data.data;
    }
}
