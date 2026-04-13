export interface AuthGateway {
    login(email: string, password: string): Promise<any>;
    register(payload: any): Promise<any>;
    verifyOtpLogin(tempToken: string, otpToken: string): Promise<any>;
    verifyBackupCode(tempToken: string, backupCode: string): Promise<any>;
    logout(): Promise<void>;
}