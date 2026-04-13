import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Button from './Button';

export interface AdventureCardProps {
    image: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    onExplore: () => void;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ image, title, location, price, rating, onExplore }) => {
    return (
        <Card
            className="hover-lift"
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'surface.main'
            }}
        >
            <CardMedia
                component="img"
                height="220"
                image={image}
                alt={title}
            />
            <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>

                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Typography variant="h3" color="secondary.main" sx={{ fontSize: '1.25rem', fontWeight: 600, mb: 1 }}>
                        {title}
                    </Typography>
                    <Box display="flex" alignItems="center" bgcolor="rgba(255, 107, 53, 0.1)" px={1} py={0.5} borderRadius={1}>
                        <StarIcon sx={{ color: 'accent.main', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight={600} color="accent.main">{rating}</Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <LocationOnIcon sx={{ color: 'text.secondary', fontSize: '1rem', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">{location}</Typography>
                </Box>

                <Box mt="auto" pt={2} display="flex" justifyContent="space-between" alignItems="center" borderTop="1px solid" borderColor="divider">
                    <Box>
                        <Typography variant="caption" color="text.secondary">Starting from</Typography>
                        <Typography variant="h3" color="primary.main" fontSize="1.25rem">${price}</Typography>
                    </Box>
                    <Button variant="primary" onClick={onExplore}>Explore</Button>
                </Box>

            </CardContent>
        </Card>
    );
};

export default AdventureCard;
