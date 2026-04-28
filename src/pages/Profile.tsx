import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Avatar, Paper, Tab, Tabs, Chip, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { userService, UserData } from '../services/UserService';

// Mock Data
const MOCK_USER = {
  name: "Alex Wanderlust",
  email: "alex.wanderlust@example.com",
  location: "San Francisco, CA",
  joinedDate: "Member since Jan 2024",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200",
  coverImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200",
  stats: {
    trips: 12,
    countries: 8,
    reviews: 24
  }
};

const MOCK_BOOKINGS = [
  { id: 1, title: 'Bali Tropical Escape', date: 'Oct 15 - Oct 25, 2025', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400' },
  { id: 2, title: 'Swiss Alps Adventure', date: 'Dec 10 - Dec 20, 2025', status: 'Pending', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400' },
  { id: 3, title: 'Kyoto Cultural Tour', date: 'Mar 05 - Mar 15, 2024', status: 'Completed', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400' }
];

const MOCK_SAVED = [
  { id: 1, title: 'Santorini Sunset Cruise', price: '$150', image: 'https://images.unsplash.com/photo-1516483638261-f4082823b185?auto=format&fit=crop&w=400' },
  { id: 2, title: 'Northern Lights Tour', price: '$850', image: 'https://images.unsplash.com/photo-1531366936337-77b5a414e21a?auto=format&fit=crop&w=400' }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    bio: '',
    avatar: '',
    coverImage: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        const data = await userService.getProfile(userId);
        setUser(data);
      } catch (error) {
        console.error("Failed to load user profile", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenEditModal = () => {
    if (user) {
      setEditForm({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        coverImage: user.coverImage || ''
      });
      setIsEditModalOpen(true);
      setUpdateError(null);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    if (!editForm.name.trim()) {
      setUpdateError("Name is required");
      return;
    }

    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const updatedData = await userService.updateProfile(userId, editForm);
      setUser(updatedData);
      handleCloseEditModal();
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await userService.deleteProfile(userId);
        navigate('/');
      } catch (error) {
        console.error("Failed to delete account", error);
      }
    }
  };

  if (loading) {
    return <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center"><Typography>Loading Profile...</Typography></Box>;
  }

  if (!user) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 200, md: 350 },
          width: '100%',
          backgroundImage: `url(${user.coverImage || MOCK_USER.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
        <IconButton 
          onClick={handleOpenEditModal}
          sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } }}
        >
          <EditIcon />
        </IconButton>
      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -10 }, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          
          {/* Left Sidebar - Profile Info */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center', bgcolor: '#fff' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar src={user.avatar || MOCK_USER.avatar} sx={{ width: 150, height: 150, border: '6px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <IconButton 
                    onClick={handleOpenEditModal}
                    sx={{ position: 'absolute', bottom: 4, right: 4, bgcolor: 'secondary.main', color: '#fff', width: 36, height: 36, '&:hover': { bgcolor: 'secondary.dark' } }}
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>

                <Typography variant="h5" fontWeight={700} mt={2} color="secondary.main">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>{user.email}</Typography>

                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1} color="text.secondary">
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">{user.location || MOCK_USER.location}</Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2} color="text.secondary">
                  <CalendarMonthIcon fontSize="small" />
                  <Typography variant="body2">{MOCK_USER.joinedDate}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" px={2} mb={3} sx={{ fontStyle: 'italic' }}>
                  "{user.bio || 'No bio yet.'}"
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main">{user.stats?.trips || MOCK_USER.stats.trips}</Typography>
                    <Typography variant="caption" color="text.secondary">Trips</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main">{user.stats?.countries || MOCK_USER.stats.countries}</Typography>
                    <Typography variant="caption" color="text.secondary">Countries</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main">{user.stats?.reviews || MOCK_USER.stats.reviews}</Typography>
                    <Typography variant="caption" color="text.secondary">Reviews</Typography>
                  </Grid>
                </Grid>

                <Button 
                  variant="accent" 
                  fullWidth 
                  sx={{ mt: 4, py: 1.5 }}
                  onClick={handleOpenEditModal}
                >
                  Edit Profile
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Right Area - Tabs & Content */}
          <Grid item xs={12} md={8}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Paper elevation={0} sx={{ borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.06)', bgcolor: '#fff', overflow: 'hidden' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                    <Tab icon={<CardTravelIcon />} label="My Bookings" iconPosition="start" sx={{ fontWeight: 600, py: 3 }} />
                    <Tab icon={<FavoriteIcon />} label="Saved" iconPosition="start" sx={{ fontWeight: 600, py: 3 }} />
                    <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" sx={{ fontWeight: 600, py: 3 }} />
                  </Tabs>
                </Box>

                <Box px={4} pb={4}>
                  {/* Bookings Tab */}
                  <CustomTabPanel value={tabValue} index={0}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main" mb={3}>Upcoming & Past Trips</Typography>
                    <Grid container spacing={3}>
                      {MOCK_BOOKINGS.map((booking, index) => (
                        <Grid item xs={12} key={booking.id}>
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                            <Box sx={{ display: 'flex', gap: 3, p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { borderColor: 'accent.main', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
                              <Box sx={{ width: 120, height: 100, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={booking.image} alt={booking.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </Box>
                              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight={600} color="secondary.main">{booking.title}</Typography>
                                <Typography variant="body2" color="text.secondary" mb={1}>{booking.date}</Typography>
                                <Box>
                                  <Chip 
                                    label={booking.status} 
                                    size="small" 
                                    sx={{ 
                                      bgcolor: booking.status === 'Completed' ? '#e8f5e9' : booking.status === 'Upcoming' ? '#e3f2fd' : '#fff3e0',
                                      color: booking.status === 'Completed' ? '#2e7d32' : booking.status === 'Upcoming' ? '#1565c0' : '#ef6c00',
                                      fontWeight: 600
                                    }} 
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button variant="outlined" sx={{ whiteSpace: 'nowrap' }}>View Details</Button>
                              </Box>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </CustomTabPanel>

                  {/* Saved Destinations Tab */}
                  <CustomTabPanel value={tabValue} index={1}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main" mb={3}>Your Wishlist</Typography>
                    <Grid container spacing={3}>
                      {MOCK_SAVED.map((item, index) => (
                        <Grid item xs={12} sm={6} key={item.id}>
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                            <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', height: 200, cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' } }}>
                              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', p: 2, color: '#fff' }}>
                                <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
                                <Typography variant="body2" sx={{ color: 'accent.main', fontWeight: 700 }}>Starting from {item.price}</Typography>
                              </Box>
                              <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: 'error.main', bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: '#fff' } }}>
                                <FavoriteIcon />
                              </IconButton>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </CustomTabPanel>

                  {/* Settings Tab */}
                  <CustomTabPanel value={tabValue} index={2}>
                     <Typography variant="h6" fontWeight={700} color="secondary.main" mb={3}>Account Settings</Typography>
                     <Typography variant="body1" color="text.secondary" mb={4}>Manage your account preferences and settings here.</Typography>
                     <Button variant="outlined" sx={{ mr: 2 }}>Change Password</Button>
                     <Button variant="outlined" sx={{ color: 'error.main', borderColor: 'error.main', '&:hover': { bgcolor: 'error.50', borderColor: 'error.main' } }} onClick={handleDeleteAccount}>Delete Account</Button>
                  </CustomTabPanel>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Your Profile</DialogTitle>
        <DialogContent dividers>
          {updateError && <Alert severity="error" sx={{ mb: 2 }}>{updateError}</Alert>}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Name" name="name" value={editForm.name} onChange={handleInputChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Location" name="location" value={editForm.location} onChange={handleInputChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Bio" name="bio" value={editForm.bio} onChange={handleInputChange} margin="normal" multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Avatar URL" name="avatar" value={editForm.avatar} onChange={handleInputChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Cover Image URL" name="coverImage" value={editForm.coverImage} onChange={handleInputChange} margin="normal" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEditModal} color="inherit">Cancel</Button>
          <Button 
            onClick={handleUpdateProfile} 
            variant="accent" 
            disabled={updateLoading}
            sx={{ minWidth: 120 }}
          >
            {updateLoading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
