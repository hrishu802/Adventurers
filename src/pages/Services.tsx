import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Adventure Tours',
      description: 'Experience thrilling adventures with our expert guides.',
      image: 'https://images.openai.com/static-rsc-4/HkwuKvun4mvYh3hRCwA7ggxpAQNzT6hZlcDwN1OWvKrjMyq5dFU58mvQ_bdJlEpR8vlcUWHjlpGHDiYk9zKcWQPtuHdJwu6A0r5h_OtUacRA7ymHTVzN_mfSQg9KsgFGQ2cM07kcwiNy_s1bg1RhVWislmiUIP_iNTMquO1mcA86sAtBMxL5TyKv_ghdNQGo?purpose=fullsize',
    },
    {
      title: 'Cultural Experiences',
      description: 'Immerse yourself in local cultures and traditions.',
      image: 'https://images.openai.com/static-rsc-4/B2aShIXve1Xe9SOxttbgTlrOj2O7AmhRgiHjzTN2MdSAlRze2sM6XnvOvNL2RwdbFSXgbscR9bNDD5ExHp8etFi1Mn-LXKUIptbZpa8ZG8O2K77rmmZudkfRHcBBbwZ3b1TQEzwbT2EBGhFjSz6AcKL9UoF-O3IrY20N0RCYuthemsjsWy1oVY6BISXLDoUk?purpose=fullsize',
    },
    {
      title: 'Luxury Travel',
      description: 'Indulge in premium travel experiences with our luxury packages.',
      image: 'https://images.openai.com/static-rsc-4/bDa_SRAeJvvUQhjvhdROuUTBS2TTFxbXrSZ8PZaFlFOMv-QuwKN_5yqne0-rKj6IsAHwAG52hFT4nU2J8uLOyiraLqUM9vPOnBDEZhphbYOcXbOOTXUCCP8aJ-NdC084iZ0nLSLwtseKIOgXOD_xBHkH0w4xsvFGyTa5Ub3W9zq0raO9c1DVgfHPC-f0dgLj?purpose=fullsize',
    },
  ];

  return (
    <Container>
      <Box sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" className="section-title" sx={{ fontFamily: 'Montserrat, Poppins, sans-serif', color: 'var(--primary-color)', fontWeight: 700 }}>

            Our Services
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}

              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 24px rgba(20,58,82,0.10)',
                    backgroundColor: 'var(--surface-color)',
                    border: '1px solid #e3e9f1',
                    transition: 'var(--transition)',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      boxShadow: '0 15px 30px rgba(20,58,82,0.15)',
                      borderColor: 'var(--secondary-color)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: '250px',
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={service.image}
                      alt={service.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent, rgba(20,58,82,0.15))',
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 4,
                      backgroundColor: 'var(--surface-color)',
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        color: 'var(--secondary-color)',
                        fontWeight: 700,
                        mb: 2,
                        fontFamily: 'Montserrat, Poppins, sans-serif',
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'var(--text-light)',
                        lineHeight: 1.8,
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Services; 