import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Grid, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { motion } from "framer-motion";
import Button from '../components/Button';
import { AuthFormContext } from '../services/AuthFormService';
import { userService } from '../services/UserService';

const Signup: React.FC = () => {
  const authStrategy = AuthFormContext.getStrategy('signup');
  const [formState, setFormState] = useState<Record<string, string>>({ name: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await userService.register({
        name: formState.name,
        email: formState.email,
        password: formState.password
      });
      navigate("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="background.default" py={4}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: 1000, margin: '0 20px' }}>
        <Grid container sx={{ bgcolor: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}>

          {/* Left Side - Image Cover */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(30,58,95,0.9), transparent)', p: 6, color: '#fff' }}>
              <Typography variant="h3" fontWeight={700} mb={1}>Join the Adventure</Typography>
              <Typography variant="body1">Create an account to access exclusive travel deals and save your customized itineraries.</Typography>
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="h3" color="secondary.main" fontWeight={700} mb={1}>Sign Up</Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>Let's get you set up so you can start traveling.</Typography>

              {error && <Typography color="error" mb={2}>{error}</Typography>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {authStrategy.getFields().map(field => (
                  <TextField
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    variant="outlined"
                    fullWidth
                    required={field.required}
                    value={formState[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                  />
                ))}

                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label={<Typography variant="body2" color="text.secondary">I agree to all terms and conditions.</Typography>}
                />

                <Button variant="accent" type="submit" sx={{ py: 1.5, fontSize: '1.1rem', mt: 2 }}>
                  {authStrategy.getSubmitLabel()}
                </Button>
              </form>

              <Typography variant="body2" color="text.secondary" align="center" mt={4}>
                {authStrategy.getFooterText()}{' '}
                <Link to={authStrategy.getFooterLinkPath()} style={{ color: '#FF6B35', fontWeight: 600, textDecoration: 'none' }}>
                  {authStrategy.getFooterLinkLabel()}
                </Link>
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </motion.div>
    </Box>
  );
};

export default Signup;