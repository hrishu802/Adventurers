import { Container, Typography, Box, Grid, Slider, FormControl, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import AdventureCard from '../components/AdventureCard';
import Button from '../components/Button';
import { Destination } from '../types';

// Dummy centralized data (merged for robust explore page)
const allData: Destination[] = [
  { id: 1, location: 'Bali', type: 'activity', title: 'Beach Paradise', price: 299, rating: 4.8, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800' },
  { id: 2, location: 'Bali', type: 'activity', title: 'Cultural Tour', price: 199, rating: 4.6, image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800' },
  { id: 3, location: 'Bali', type: 'package', title: 'Luxury Escape', price: 999, rating: 4.9, image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800' },
  { id: 4, location: 'Tokyo', type: 'activity', title: 'Food Tour', price: 149, rating: 4.8, image: 'https://images.unsplash.com/photo-1540822838183-1763ef8088ae?auto=format&fit=crop&w=800' },
  { id: 5, location: 'Tokyo', type: 'package', title: 'Premium Tokyo', price: 1299, rating: 4.9, image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800' },
  { id: 6, location: 'Paris', type: 'activity', title: 'Eiffel Tower Tour', price: 99, rating: 4.7, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800' },
  { id: 7, location: 'Paris', type: 'package', title: 'Romantic Paris', price: 1299, rating: 4.8, image: 'https://images.unsplash.com/photo-1502602859462-226d1da32407?auto=format&fit=crop&w=800' },
  { id: 8, location: 'New York', type: 'activity', title: 'Broadway Show', price: 149, rating: 4.9, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800' },
  { id: 9, location: 'New York', type: 'package', title: 'NYC Explorer', price: 1499, rating: 4.8, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800' },
  { id: 10, location: 'Rome', type: 'activity', title: 'Colosseum Tour', price: 79, rating: 4.7, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800' },
  { id: 11, location: 'Rome', type: 'package', title: 'Roman Holiday', price: 1199, rating: 4.9, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800' }
];

const locations = ['All', 'Bali', 'Tokyo', 'Paris', 'New York', 'Rome'];

const DestinationPackages: React.FC = () => {
  const { destination } = useParams<{ destination: string }>();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(4.0);
  const [sortBy, setSortBy] = useState<string>('popularity'); // popularity, priceAsc, priceDesc

  // Initialize selected location based on route param if exists
  useEffect(() => {
    if (destination) {
      const match = locations.find(loc => loc.toLowerCase().replace(/\s+/g, '-') === destination.toLowerCase());
      if (match) setSelectedLocation(match);
    }
  }, [destination]);

  // Derived filtered Data
  const filteredData = useMemo(() => {
    let result = allData.filter(item => {
      if (selectedLocation !== 'All' && item.location !== selectedLocation) return false;
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
      if (item.rating < minRating) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return b.rating - a.rating; // default popularity
    });

    return result;
  }, [priceRange, selectedLocation, minRating, sortBy]);

  const handleBuy = (item: Destination) => {
    navigate('/buy', { state: item });
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => setPriceRange(newValue as number[]);

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      {/* Top Banner */}
      <Box sx={{ bgcolor: 'secondary.main', color: '#fff', py: 8, textAlign: 'center' }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography variant="h1" fontSize={{ xs: '2.5rem', md: '3.5rem' }}>
              Explore Destinations
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2, fontSize: '1.2rem' }}>
              Find the perfect packages and activities matching your style.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Main Grid + Sidebar Layout */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* SIDEBAR FILTERS */}
          <Grid item xs={12} md={3}>
            <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.04)', position: 'sticky', top: 100 }}>
              <Typography variant="h3" mb={3} fontSize="1.4rem" color="secondary.main">Filters</Typography>

              <Box mb={4}>
                <Typography variant="body1" fontWeight={600} mb={1}>Location</Typography>
                <FormControl fullWidth size="small">
                  <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box mb={4}>
                <Typography variant="body1" fontWeight={600} mb={3}>Price Range</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="on"
                  min={0}
                  max={2000}
                  sx={{ color: 'primary.main', '& .MuiSlider-valueLabel': { bgcolor: 'primary.main' } }}
                />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="text.secondary">${priceRange[0]}</Typography>
                  <Typography variant="body2" color="text.secondary">${priceRange[1]}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box mb={4}>
                <Typography variant="body1" fontWeight={600} mb={2}>Minimum Rating</Typography>
                <FormControl fullWidth size="small">
                  <Select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                    <MenuItem value={0}>Any Rating</MenuItem>
                    <MenuItem value={4.0}>4.0 & Up</MenuItem>
                    <MenuItem value={4.5}>4.5 & Up</MenuItem>
                    <MenuItem value={4.8}>4.8 & Up</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button variant="accent" fullWidth onClick={() => { setPriceRange([0, 2000]); setSelectedLocation('All'); setMinRating(0); }}>
                Reset Filters
              </Button>
            </Box>
          </Grid>

          {/* MAIN CONTENT Area */}
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="body1" color="text.secondary" fontWeight={500}>
                Showing {filteredData.length} results
              </Typography>
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ bgcolor: '#fff', borderRadius: '8px' }}>
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {filteredData.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Typography variant="h5" color="text.secondary">No adventures found matching your criteria.</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredData.map((item, idx) => (
                  <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                      <AdventureCard
                        image={item.image}
                        title={item.title || item.name || 'Adventure'}
                        location={item.location || 'Unknown'}
                        price={item.price}
                        rating={item.rating}
                        onExplore={() => handleBuy(item)}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DestinationPackages;