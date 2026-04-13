export interface UserProfile {
    id: string;
    username: string;
    email: string;
    otp_enable: number;
    createdAt: string;
}

export interface OtpSetupData {
    qrCodeDataUrl: string;
    manualKey: string;
}

export interface OtpActivationResult {
    success: boolean;
    backupCodes: string[];
}
