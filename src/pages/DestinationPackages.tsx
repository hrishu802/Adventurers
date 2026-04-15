import { Container, Typography, Box, Grid, Slider, FormControl, Select, MenuItem, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import AdventureCard from '../components/AdventureCard';
import Button from '../components/Button';
import { DestinationRepository } from '../services/DestinationRepository';
import { DestinationFilter } from '../services/DestinationFilter';
import { SortContext, SortType } from '../strategies/SortStrategy';

const repository = DestinationRepository.getInstance();
const locations = repository.getLocations();

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

  // Derived filtered Data through repository and strategy objects
  const filteredData = useMemo(() => {
    const filter = new DestinationFilter()
      .setLocation(selectedLocation)
      .setPriceRange([priceRange[0], priceRange[1]])
      .setRating(minRating);

    const sortStrategy = SortContext.getStrategy(sortBy as SortType);

    return repository.getDestinations(filter, sortStrategy);
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