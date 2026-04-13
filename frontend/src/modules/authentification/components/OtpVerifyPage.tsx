import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Divider,
    Link as MuiLink,
} from '@mui/material';
import { useOtpVerify } from '../hooks/useOtpVerify';

export const OtpVerifyPage: React.FC = () => {
    const {
        isLoading,
        error,
        otpCode,
        backupMode,
        backupCodeValue,
        handleOtpChange,
        handleBackupCodeChange,
        handleOtpSubmit,
        handleBackupSubmit,
        toggleBackupMode
    } = useOtpVerify();

    return (
        <Paper sx={{ maxWidth: 420, mx: 'auto', mt: 6, p: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Vérification en deux étapes
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {!backupMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Entrez le code à 6 chiffres de votre application authenticator.
                    </Typography>
                    <TextField
                        label="Code OTP"
                        variant="outlined"
                        fullWidth
                        value={otpCode}
                        onChange={(e) => handleOtpChange(e.target.value)}
                        disabled={isLoading}
                        inputProps={{ maxLength: 6, inputMode: 'numeric' }}
                        placeholder="000000"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={otpCode.length !== 6 || isLoading}
                        onClick={handleOtpSubmit}
                        sx={{ position: 'relative' }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Vérifier'
                        )}
                    </Button>
                    <MuiLink
                        component="button"
                        variant="body2"
                        onClick={toggleBackupMode}
                        sx={{ mt: 1, textAlign: 'center' }}
                    >
                        Utiliser un code de secours
                    </MuiLink>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Entrez un de vos codes de secours.
                    </Typography>
                    <TextField
                        label="Code de secours"
                        variant="outlined"
                        fullWidth
                        value={backupCodeValue}
                        onChange={(e) => handleBackupCodeChange(e.target.value)}
                        disabled={isLoading}
                        placeholder="ABCD1234"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!backupCodeValue.trim() || isLoading}
                        onClick={handleBackupSubmit}
                        sx={{ position: 'relative' }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Vérifier le code de secours'
                        )}
                    </Button>
                    <MuiLink
                        component="button"
                        variant="body2"
                        onClick={toggleBackupMode}
                        sx={{ mt: 1, textAlign: 'center' }}
                    >
                        Utiliser le code OTP
                    </MuiLink>
                </Box>
            )}
        </Paper>
    );
};
