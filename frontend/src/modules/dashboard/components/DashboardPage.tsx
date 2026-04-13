import React from 'react';
import { Box, Typography, Alert, Container, CircularProgress, Paper } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useDashboard } from '../hooks/useDashboard';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

export const DashboardPage: React.FC = () => {
    const { topEvents, isLoading, error } = useDashboard();

    if (isLoading) {
        return (
            <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    const chartData = topEvents.map((e) => ({
        name: e.eventTitle.length > 28 ? e.eventTitle.slice(0, 25) + '...' : e.eventTitle,
        vues: e.viewCount,
    }));

    return (
        <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 900,
                        background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Statistiques
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Les évènements les plus visités
                </Typography>
            </Box>

            {topEvents.length === 0 ? (
                <Alert severity="info">
                    Aucune donnée de visite disponible. Cliquez sur "Voir le détail" d'un évènement pour commencer à enregistrer des visites.
                </Alert>
            ) : (
                <Paper elevation={0} sx={{ borderRadius: 3, p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                        Top {topEvents.length} évènements
                    </Typography>
                    <ResponsiveContainer width="100%" height={Math.max(300, topEvents.length * 60)}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis
                                type="number"
                                allowDecimals={false}
                                label={{ value: 'Nombre de vues', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 13 }} />
                            <Tooltip
                                formatter={(value: any) => [`${value} vue${value > 1 ? 's' : ''}`, 'Vues']}
                                cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
                            />
                            <Bar dataKey="vues" radius={[0, 6, 6, 0]} maxBarSize={40}>
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            )}
        </Box>
    );
};
