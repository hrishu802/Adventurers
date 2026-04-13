import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Grid, Typography, TextField, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { motion } from "framer-motion";
import Button from '../components/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" py={4}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 1000, margin: '0 20px' }}>
        <Grid container sx={{ bgcolor: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>

          {/* Left Side - Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="h3" color="secondary.main" fontWeight={700} mb={1}>Welcome Back!</Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>Please enter your details to sign in.</Typography>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                  />
                  <Typography variant="body2" sx={{ color: 'accent.main', cursor: 'pointer', fontWeight: 500 }}>
                    Forgot Password?
                  </Typography>
                </Box>

                <Button variant="accent" type="submit" sx={{ py: 1.5, fontSize: '1.1rem', mt: 1 }}>
                  Sign In
                </Button>
              </form>

              <Divider sx={{ my: 4, color: 'text.secondary', '&::before, &::after': { borderColor: 'divider' } }}>
                OR
              </Divider>

              <Typography variant="body2" color="text.secondary" align="center">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#2E8B57', fontWeight: 600, textDecoration: 'none' }}>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Image Cover */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1517760444937-f6397edcfa8e?auto=format&fit=crop&w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.9), transparent)', p: 6, color: '#fff' }}>
              <Typography variant="h3" fontWeight={700} mb={1}>Ready to explore?</Typography>
              <Typography variant="body1">"To travel is to discover that everyone is wrong about other countries." - Aldous Huxley</Typography>
            </Box>
          </Grid>

        </Grid>
      </motion.div>
    </Box>
  );
};

export default Login;