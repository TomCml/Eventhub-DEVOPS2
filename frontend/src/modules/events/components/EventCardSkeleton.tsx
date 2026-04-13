import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';

export const EventCardSkeleton: React.FC = () => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {/* CardMedia — image 160px */}
            <Skeleton variant="rectangular" height={160} animation="wave" />

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* Titre h6 */}
                <Skeleton variant="text" width="75%" height={32} animation="wave" />

                {/* Date row — icône + texte */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} animation="wave" />
                    <Skeleton variant="text" width="55%" height={20} animation="wave" />
                </Box>

                {/* Lieu row — icône + texte */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="circular" width={20} height={20} animation="wave" />
                    <Skeleton variant="text" width="40%" height={20} animation="wave" />
                </Box>

                {/* Description — 3 lignes, minHeight: 4.5em */}
                <Box sx={{ minHeight: '4.5em' }}>
                    <Skeleton variant="text" width="100%" height={20} animation="wave" />
                    <Skeleton variant="text" width="100%" height={20} animation="wave" />
                    <Skeleton variant="text" width="65%" height={20} animation="wave" />
                </Box>

                {/* Bas — chip capacité + prix */}
                <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton variant="rounded" width={110} height={28} animation="wave" />
                    <Skeleton variant="text" width={55} height={32} animation="wave" />
                </Box>
            </CardContent>

            {/* Bouton */}
            <Box sx={{ p: 2, pt: 0 }}>
                <Skeleton variant="rounded" height={42} animation="wave" />
            </Box>
        </Card>
    );
};
