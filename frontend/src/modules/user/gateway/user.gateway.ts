import type { UserProfile } from "../domain/models";

export interface UserGateway {
    getProfile(): Promise<UserProfile>;
    generateOtpSecret(): Promise<any>;
    verifyAndActivateOtp(otpToken: string): Promise<any>;
    disableOtp(): Promise<any>;
}
