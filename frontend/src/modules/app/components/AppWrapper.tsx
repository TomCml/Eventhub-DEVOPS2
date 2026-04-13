import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { app } from "../main";

import { Hydrater } from "./Hydrater";

// Premium theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#6366f1', // Indigo
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ec4899', // Pink
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Outfit", "Quicksand", "Roboto", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 800 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '8px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                    },
                },
            },
        },
    },
});

export const AppWrapper: React.FC<{ children: React.ReactNode }> =
    ({ children }) => {
        return (
            <Provider store={app.store}>
                <ThemeProvider theme={theme}>
                    <Hydrater>
                        {children}
                    </Hydrater>
                </ThemeProvider>
            </Provider>
        );
    };