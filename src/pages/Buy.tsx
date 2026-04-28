import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Card, Divider, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Button from '../components/Button';
import { BookingService } from '../services/BookingService';
import { PaymentContext, PaymentType } from '../strategies/PaymentStrategy';

const Buy: React.FC = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentType, setPaymentType] = useState<PaymentType>('card');
  const bookingService = new BookingService();
  const paymentStrategy = PaymentContext.getStrategy(paymentType);

  if (!data) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" color="text.secondary" mb={4}>No package selected.</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  const imageUrl = data.image || data.img || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200';

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(bookingService.submitDetails());
  };

  const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => setStep(bookingService.submitPayment()), 1000);
  };

  return (
    <Box bgcolor="background.default" minHeight="100vh" pb={8}>
      {/* Gallery Header */}
      <Box sx={{ width: '100%', height: { xs: 300, md: 500 }, position: 'relative' }}>
        <img src={imageUrl} alt={data.title || data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', pt: 10, pb: 4, px: { xs: 2, md: 6 } }}>
          <Container>
            <Typography variant="h1" color="#fff" fontSize={{ xs: '2rem', md: '3.5rem' }}>
              {data.title || data.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mt={1} color="#E5E7EB">
              <Box display="flex" alignItems="center"><LocationOnIcon sx={{ mr: 0.5 }} />{data.location || 'Global'}</Box>
              <Box display="flex" alignItems="center" color="#FF6B35"><StarIcon sx={{ mr: 0.5 }} />{data.rating || '4.8'} (Excellent)</Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container sx={{ mt: 6 }}>
        <Grid container spacing={6}>
          {/* Main Details Section */}
          <Grid item xs={12} md={8}>
            <Box bgcolor="#fff" p={4} borderRadius={3} boxShadow="0 4px 16px rgba(0,0,0,0.03)" mb={4}>
              <Typography variant="h3" color="secondary.main" mb={3}>Overview</Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8} mb={4}>
                {data.description || data.desc || "Experience the vacation of your dreams with this exclusive package. Enjoy curated activities, premium accommodations, and stress-free planning."}
              </Typography>

              {data.highlights && data.highlights.length > 0 && (
                <>
                  <Typography variant="h3" color="secondary.main" mb={3}>Highlights</Typography>
                  <Grid container spacing={2} mb={4}>
                    {data.highlights.map((highlight: string, i: number) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Box display="flex" alignItems="center" color="text.primary">
                          <StarIcon sx={{ color: 'accent.main', fontSize: '1.2rem', mr: 1 }} />
                          <Typography>{highlight}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              <Divider sx={{ my: 4 }} />

              <Typography variant="h3" color="secondary.main" mb={3}>
                {data.itinerary ? 'Itinerary / Program' : 'Included Services'}
              </Typography>
              
              {data.itinerary ? (
                <Box>
                  {data.itinerary.map((item: any) => (
                    <Box key={item.day} mb={3}>
                      <Typography variant="h6" color="primary.main" fontWeight={700}>Day {item.day}: {item.title}</Typography>
                      <Typography variant="body1" color="text.secondary">{item.description}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {(data.includes || ['Guided Tours', 'Premium Accommodation', 'Meals Included', 'Free Cancellations']).map((service: string, i: number) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                        <Typography>{service}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>

          {/* Sticky Booking Panel */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Card sx={{ borderRadius: 3, boxShadow: '0 12px 32px rgba(29, 58, 95, 0.08)' }}>
                <Box bgcolor="#f8fafc" p={3} textAlign="center" borderBottom="1px solid" borderColor="divider">
                  <Typography variant="h4" fontWeight={800} color="primary.main">
                    ${data.price} <Typography component="span" variant="body1" color="text.secondary">/ person</Typography>
                  </Typography>
                </Box>

                <Box p={4} bgcolor="#fff">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Traveler Details */}
                    {step === 'details' && (
                      <motion.form key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleDetailsSubmit}>
                        <Typography variant="h5" color="secondary.main" mb={3} fontWeight={600}>Booking Details</Typography>
                        <TextField fullWidth label="Full Name" required variant="outlined" sx={{ mb: 3 }} />
                        <TextField fullWidth label="Email Address" type="email" required variant="outlined" sx={{ mb: 3 }} />
                        <TextField fullWidth label="Travel Date" type="date" required InputLabelProps={{ shrink: true }} sx={{ mb: 3 }} />
                        <Button variant="accent" type="submit" fullWidth sx={{ py: 1.5, fontSize: '1.1rem' }}>Proceed to Payment</Button>
                      </motion.form>
                    )}

                    {/* Step 2: Payment */}
                    {step === 'payment' && (
                      <motion.form key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handlePaymentSubmit}>
                        <Typography variant="h5" color="secondary.main" mb={3} fontWeight={600}>Complete Payment</Typography>
                        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                          <RadioGroup value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                            <FormControlLabel value="card" control={<Radio color="primary" />} label="Credit / Debit Card" />
                            <FormControlLabel value="paypal" control={<Radio color="primary" />} label="PayPal" />
                          </RadioGroup>
                        </FormControl>

                        {paymentStrategy.getFields().length > 0 ? (
                          <Box mb={3}>
                            {paymentStrategy.getFields().map(field => (
                              <TextField
                                key={field.name}
                                fullWidth
                                name={field.name}
                                label={field.label}
                                required={field.required}
                                type={field.type}
                                sx={{ mb: 2 }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary" mb={3}>
                            You will be redirected to PayPal to complete your secure payment.
                          </Typography>
                        )}
                        <Button variant="accent" type="submit" fullWidth sx={{ py: 1.5, fontSize: '1.1rem' }}>
                          {paymentStrategy.getSubmitButtonLabel(data.price)}
                        </Button>
                        <Button variant="text" fullWidth onClick={() => setStep(bookingService.reset())} sx={{ mt: 1, color: 'text.secondary' }}>
                          Back
                        </Button>
                      </motion.form>
                    )}

                    {/* Step 3: Success */}
                    {step === 'success' && (
                      <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
                        <Box sx={{ width: 64, height: 64, bgcolor: 'primary.main', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, fontSize: '2rem' }}>
                          ✓
                        </Box>
                        <Typography variant="h4" color="secondary.main" mb={2}>Booking Confirmed!</Typography>
                        <Typography variant="body1" color="text.secondary" mb={4}>
                          Your adventure is secured. We've sent a confirmation email to your inbox.
                        </Typography>
                        <Button variant="primary" fullWidth onClick={() => navigate('/')}>Return to Home</Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Buy;