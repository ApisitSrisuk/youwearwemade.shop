import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import Logo from './Logo';
import { tokens } from '../theme';

const { color, font } = tokens;

const columns = [
  { title: 'Shop', links: ['All Collections', 'Collection 01', 'Collection 02'] },
  { title: 'Info', links: ['About Us', 'Contact', 'Shipping & Returns'] },
];

const socials = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Facebook', Icon: Facebook },
];

const headingSx = { color: color.lilacInk, mb: 2.5, display: 'block' };

export default function Footer() {
  return (
    <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', borderTop: `2px solid ${color.strong}`, pt: { xs: 8, md: 10 }, backgroundColor: color.ink }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 6 }, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' } }}>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Logo size="2.6rem" />
            <Typography variant="overline" sx={{ ...headingSx, mt: 2.5, mb: 1.5 }}>Our philosophy</Typography>
            <Typography sx={{ color: color.muted, maxWidth: 380, lineHeight: 1.8 }}>
              ทุก Collection ของเราถูกออกแบบจากช่วงเวลาและอารมณ์ในชีวิตประจำวัน ไม่ว่าจะเป็นความสุขในวันศุกร์ หรือแรงกดดันจากเดดไลน์
            </Typography>
          </Box>

          {columns.map((col) => (
            <Box key={col.title}>
              <Typography variant="overline" sx={headingSx}>{col.title}</Typography>
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {col.links.map((label) => (
                  <Box
                    component="li"
                    key={label}
                    sx={{
                      color: color.muted, cursor: 'pointer', transition: 'color 0.2s ease, transform 0.2s ease', width: 'fit-content',
                      '&:hover': { color: color.strong, transform: 'translateX(6px)' },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}

          <Box>
            <Typography variant="overline" sx={headingSx}>Follow us</Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socials.map((social) => {
                const Icon = social.Icon;
                return (
                  <IconButton
                    key={social.label}
                    aria-label={social.label}
                    sx={{ color: color.strong, border: `2px solid ${color.line}`, '&:hover': { backgroundColor: color.lilac, color: '#000', borderColor: color.strong } }}
                  >
                    <Icon size={20} />
                  </IconButton>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: `2px solid ${color.line}`, mt: { xs: 6, md: 8 }, py: 3,
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: color.muted }}>
            &copy; {new Date().getFullYear()} YOU WEAR WE MADE &mdash; All rights reserved
          </Typography>
          <Typography variant="body2" sx={{ color: color.muted }}>Designed with React + GSAP</Typography>
        </Box>
      </Container>

      {/* Oversized outline wordmark */}
      <Typography
        aria-hidden="true"
        sx={{
          fontFamily: font.display, fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'pre-line', textAlign: 'center',
          lineHeight: 0.85, fontSize: { xs: '9vw', md: '9.5vw' }, color: 'transparent', WebkitTextStroke: `2px ${color.line}`,
          userSelect: 'none', mb: { xs: -1, md: -3 },
        }}
      >
        {'You wear\nwe made'}
      </Typography>
    </Box>
  );
}
