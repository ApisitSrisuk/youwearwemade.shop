import React from 'react';
import { Box, Typography, Container, Grid, IconButton } from '@mui/material';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', pt: 8, pb: 4, backgroundColor: '#050505' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', mb: 2, letterSpacing: '0.1em' }}>
              YWWM.
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>OUR PHILOSOPHY</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 350, lineHeight: 1.8 }}>
              ทุก Collection ของเราถูกออกแบบจากช่วงเวลาและอารมณ์ในชีวิตประจำวัน ไม่ว่าจะเป็นความสุขในวันศุกร์ หรือแรงกดดันจากเดดไลน์
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Shop</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>All Collections</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Collection 01</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Collection 02</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Info</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>About Us</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Contact</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: '#fff' } }}>Shipping & Returns</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Instagram size={20} />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Twitter size={20} />
              </IconButton>
              <IconButton sx={{ color: 'text.secondary', '&:hover': { color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Facebook size={20} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', mt: 8, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} YOU WEAR WE MADE &mdash; All rights reserved
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Designed with React + GSAP
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
