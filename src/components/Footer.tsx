import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { FooterService } from '../services/FooterService';

const footerService = new FooterService();

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'secondary.main',
      color: '#fff',
      py: 6,
      mt: 'auto',
      position: 'relative',
    }}
  >
    <Container maxWidth="lg">
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">

        <Box display="flex" alignItems="center" gap={1} mb={{ xs: 3, md: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Typography 
            variant="h5" 
            fontWeight="700" 
            letterSpacing={1} 
            fontFamily="Poppins"
            className="navbar-brand"
          >
            Token of Memento
          </Typography>
        </Box>

        <Box display="flex" gap={3} mb={{ xs: 3, md: 0 }}>
          {footerService.getLinks().map(link => (
            <Typography key={link.label} variant="body2" sx={{ cursor: link.path ? 'pointer' : 'default', transition: '0.3s', '&:hover': { color: link.path ? 'accent.main' : 'inherit' } }}>
              {link.label}
            </Typography>
          ))}
        </Box>

        <Box display="flex" gap={2}>
          {footerService.getSocialLinks().map((social) => {
            const icon = (() => {
              switch (social.icon) {
                case 'twitter':
                  return <FaTwitter style={{ cursor: 'pointer', fontSize: '1.2rem', transition: '0.3s' }} className="hover-accent" />;
                case 'facebook':
                  return <FaFacebook style={{ cursor: 'pointer', fontSize: '1.2rem', transition: '0.3s' }} className="hover-accent" />;
                case 'linkedin':
                  return <FaLinkedin style={{ cursor: 'pointer', fontSize: '1.2rem', transition: '0.3s' }} className="hover-accent" />;
                case 'instagram':
                default:
                  return <FaInstagram style={{ cursor: 'pointer', fontSize: '1.2rem', transition: '0.3s' }} className="hover-accent" />;
              }
            })();

            return <Box key={social.label}>{icon}</Box>;
          })}
        </Box>
      </Box>

      <Typography variant="body2" color="rgba(255,255,255,0.7)" align="center" sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        &copy; {new Date().getFullYear()} Token of Memento. All rights reserved.
      </Typography>

      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          bgcolor: 'rgba(255,255,255,0.15)',
          color: '#fff',
          '&:hover': { bgcolor: 'accent.main' },
        }}
      >
        <FaArrowUp />
      </IconButton>
    </Container>
    <style>{`
      .hover-accent:hover { color: #FF6B35 !important; }
    `}</style>
  </Box>
);

export default Footer; 