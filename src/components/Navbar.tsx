import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Button from './Button';
import { NavService } from '../services/NavService';

const navService = new NavService();

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = navService.getPrimaryItems();
  const authItems = navService.getAuthItems();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'secondary.main', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: { xs: '1.5rem', md: '1.8rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Logo icon representation */}
          <span style={{ fontSize: 28, display: 'flex', alignItems: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Token of Memento
        </Typography>

        {isMobile ? (
          <IconButton color="inherit" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {navItems.map((item) => (
              <Typography
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  position: 'relative',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  transition: 'all 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === item.path ? '100%' : '0%',
                    height: '2px',
                    bottom: -4,
                    left: 0,
                    bgcolor: 'accent.main',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  }
                }}
              >
                {item.name}
              </Typography>
            ))}
            <Box ml={2} display="flex" gap={2}>
              {authItems.map((item) => (
                item.name === 'Sign Up' ? (
                  <Button key={item.path} variant="accent" component={RouterLink} to={item.path}>
                    {item.name}
                  </Button>
                ) : (
                  <Typography
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{ color: '#fff', textDecoration: 'none', fontWeight: 500, alignSelf: 'center', transition: '0.3s', '&:hover': { color: 'accent.main' } }}
                  >
                    {item.name}
                  </Typography>
                )
              ))}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 