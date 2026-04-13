import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavbar } from '../hooks/useNavbar';

export const NavBar: React.FC = () => {
    const { isAuthenticated, handleLogout } = useNavbar();

    return (
        <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                color: 'text.primary',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: 70 }}>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: 'primary.main',
                            textDecoration: 'none',
                            background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        EventHub
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', ml: 4, gap: 2 }}>
                        {isAuthenticated && (
                            <>
                                <Button
                                    component={Link}
                                    to="/profile"
                                    startIcon={<AccountCircleIcon />}
                                    sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                >
                                    Profil
                                </Button>
                                <Button
                                    component={Link}
                                    to="/events"
                                    startIcon={<MapIcon />}
                                    sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                >
                                    Évènements
                                </Button>
                                <Button
                                    component={Link}
                                    to="/stats"
                                    startIcon={<BarChartIcon />}
                                    sx={{ fontWeight: 600, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                >
                                    Statistiques
                                </Button>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? (
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={handleLogout}
                                sx={{ borderRadius: 2, fontWeight: 700 }}
                            >
                                Déconnexion
                            </Button>
                        ) : (
                            <Box sx={{ gap: 1, display: 'flex' }}>
                                <Button component={Link} to="/login" variant="text" sx={{ fontWeight: 700 }}>
                                    Connexion
                                </Button>
                                <Button component={Link} to="/register" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
                                    Inscription
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
