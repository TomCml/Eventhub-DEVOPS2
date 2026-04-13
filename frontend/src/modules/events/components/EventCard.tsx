import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import type { EventModel } from '../domain/models';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { useTrackEventView } from '../../analytics/hooks/useTrackEventView';

interface EventCardProps {
    event: EventModel;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { trackView } = useTrackEventView();
    const formattedDate = new Date(event.startDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardMedia
                component="img"
                height="160"
                image={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop'}
                alt={event.title}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    {event.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <CalendarMonthIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{formattedDate}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <LocationOnIcon fontSize="small" color="secondary" />
                    <Typography variant="body2">Salle {event.venueId}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.5,
                    minHeight: '4.5em'
                }}>
                    {event.description || "Aucune description fournie pour cet évènement."}
                </Typography>

                <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                        icon={<PeopleIcon />}
                        label={`${event.capacity} places`}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                    />
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
                        {event.price === 0 || !event.price ? 'Gratuit' : `${event.price}€`}
                    </Typography>
                </Box>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2, py: 1, fontWeight: 700 }}
                    onClick={() => trackView(event.id)}
                >
                    Voir le détail
                </Button>
            </Box>
        </Card>
    );
};
