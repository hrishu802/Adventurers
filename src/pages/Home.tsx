import { Box, Typography, Container, Grid, Autocomplete, TextField, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeadset, FaStar, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/Button';
import AdventureCard from '../components/AdventureCard';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  const heroImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2940',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2940',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2940'
  ];

  const packagesRef = useRef<HTMLDivElement | null>(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const localCountries = [
    { name: 'Paris', capital: 'France', flag: '🇫🇷' },
    { name: 'Tokyo', capital: 'Japan', flag: '🇯🇵' },
    { name: 'Bali', capital: 'Indonesia', flag: '🇮🇩' },
    { name: 'New York', capital: 'USA', flag: '🇺🇸' },
    { name: 'Rome', capital: 'Italy', flag: '🇮🇹' }
  ];

  const handleSearchChange = (event: any, newValue: string) => {
    setSearchValue(newValue);
    if (newValue) {
      const filtered = localCountries.filter(country =>
        country.name.toLowerCase().includes(newValue.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleDestinationClick = (destination: string) => {
    navigate(`/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const featuredDestinations = [
    { name: 'Paris', location: 'France', rating: 4.8, price: 899, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800' },
    { name: 'Tokyo', location: 'Japan', rating: 4.9, price: 1200, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800' },
    { name: 'Bali', location: 'Indonesia', rating: 4.7, price: 499, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800' },
  ];

  const popularPackages = [
    { name: 'Swiss Alps Hiking', location: 'Switzerland', rating: 4.9, price: 1099, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800' },
    { name: 'Maldives Retreat', location: 'Maldives', rating: 4.8, price: 1599, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800' },
    { name: 'Dubai City Tours', location: 'UAE', rating: 4.7, price: 699, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800' },
  ];

  const whyChooseUs = [
    { icon: <FaShieldAlt size={32} color="#FF6B35" />, title: 'Secure Bookings', desc: 'Your payments and data are fully safe.' },
    { icon: <FaStar size={32} color="#FF6B35" />, title: 'Premium Service', desc: 'We offer curated luxury experiences.' },
    { icon: <FaHeadset size={32} color="#FF6B35" />, title: '24/7 Support', desc: 'Always available to help on your trip.' },
  ];

  const testimonials = [
    { name: 'Amit Sharma', review: 'Flawless travel experience!' },
    { name: 'Sara Lee', review: 'Incredible destinations and support.' },
    { name: 'John Doe', review: 'The best packages available.' },
  ];

  const scrollToPackages = () => packagesRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleBookNow = (pkg: any) => navigate('/buy', { state: pkg });

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2000);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${heroImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, rgba(30,58,95,0.7) 0%, rgba(30,58,95,0.3) 100%)',
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h1" align="center" sx={{ color: '#fff', fontSize: { xs: '3rem', md: '4.5rem' }, textShadow: '0 4px 12px rgba(0,0,0,0.3)', mb: 2 }}>
              Explore the World <br /> with Token of Memento
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: '#E5E7EB', fontSize: { xs: '1.2rem', md: '1.4rem' }, mb: 4, fontWeight: 500 }}>
              Curated experiences, spectacular destinations, unforgettable memories.
            </Typography>

            <Box sx={{ maxWidth: 800, mx: 'auto', display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
              <Autocomplete
                freeSolo
                fullWidth
                options={suggestions}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                renderOption={(props, option: any) => (
                  <Box component="li" {...props} gap={2}>
                    <Typography fontSize="1.2rem">{option.flag}</Typography>
                    <Typography>{option.name} ({option.capital})</Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <Box ref={params.InputProps.ref} sx={{ width: '100%' }}>
                    <TextField
                      {...params}
                      placeholder="Start searching (e.g. Paris, Japan)..."
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: '50px',
                        '& .MuiOutlinedInput-root': { borderRadius: '50px', pl: 3 },
                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                      }}
                    />
                  </Box>
                )}
                onInputChange={handleSearchChange}
              />
              <Button variant="accent" onClick={scrollToPackages} sx={{ py: 2, px: 4, borderRadius: '50px', minWidth: 'fit-content', fontSize: '1.1rem' }}>
                Start Planning
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Destinations */}
      <Container className="section">
        <Typography variant="h2" align="center" color="secondary.main" mb={6}>
          Featured Destinations
        </Typography>
        <Grid container spacing={4}>
          {featuredDestinations.map((dest, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <AdventureCard
                  image={dest.image}
                  title={dest.name}
                  location={dest.location}
                  price={dest.price}
                  rating={dest.rating}
                  onExplore={() => handleDestinationClick(dest.name)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Box bgcolor="background.paper" className="section">
        <Container>
          <Typography variant="h2" align="center" color="secondary.main" mb={6}>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {whyChooseUs.map((feature, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Box textAlign="center" p={3}>
                    <Box sx={{ mb: 2, display: 'inline-block', p: 2, bgcolor: '#FFF3E0', borderRadius: '50%' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" color="secondary.main" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Packages */}
      <Container className="section" ref={packagesRef}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Typography variant="h2" color="secondary.main">
            Popular Packages
          </Typography>
          <Button variant="primary">View All</Button>
        </Box>
        <Grid container spacing={4}>
          {popularPackages.map((pkg, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <AdventureCard
                  image={pkg.image}
                  title={pkg.name}
                  location={pkg.location}
                  price={pkg.price}
                  rating={pkg.rating}
                  onExplore={() => handleBookNow(pkg)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box bgcolor="secondary.main" color="#fff" className="section">
        <Container>
          <Typography variant="h2" align="center" mb={6} sx={{ color: '#fff' }}>
            What Our Travelers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((t, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box bgcolor="rgba(255,255,255,0.05)" p={4} borderRadius={3} sx={{ height: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 50, height: 50, fontWeight: 'bold' }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="h6" fontWeight="600">{t.name}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
                    "{t.review}"
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter */}
      <Container className="section">
        <Box sx={{
          bgcolor: 'accent.main',
          borderRadius: 4,
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          color: '#fff',
          boxShadow: '0 20px 40px rgba(255, 107, 53, 0.2)'
        }}>
          <Typography variant="h2" sx={{ color: '#fff' }} mb={2}>
            Get Exclusive Travel Deals
          </Typography>
          <Typography mb={4} fontSize="1.1rem">
            Subscribe to our newsletter for the best travel updates.
          </Typography>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <input type="email" placeholder="Your email address" required style={{ width: '100%', padding: '16px 24px', borderRadius: '50px', border: 'none', fontSize: '1rem', outline: 'none' }} />
            </Box>
            <Button variant="outlined" type="submit" sx={{ bgcolor: 'secondary.main', color: '#fff', '&:hover': { bgcolor: '#112233' }, borderRadius: '50px', px: 4 }}>
              Subscribe
            </Button>
          </form>
          <AnimatePresence>
            {newsletterSuccess && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: 16, fontWeight: 600 }}>
                Thank you for subscribing!
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;