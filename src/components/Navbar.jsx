import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Drawer, Dialog, TextField, Button } from '@mui/material';
import { Search, ShoppingBag, User } from 'lucide-react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';

const navItems = [
  { name: 'Shop', path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
];

const LogoText = [
  { char: 'Y', color: '#d36440' },
  { char: 'W', color: '#5c6eee' },
  { char: 'W', color: '#dda6e7' },
  { char: 'M', color: '#60b0a3' },
  { char: '.', color: '#ffffff' },
];

export default function Navbar({ cartItems = [], removeFromCart }) {
  const navRef = useRef(null);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
    }
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.path === location.pathname);
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <style>{`
        @keyframes flip3d {
          0% { transform: perspective(600px) rotateY(0deg) scale(1); }
          50% { transform: perspective(600px) rotateY(-180deg) scale(1.4) translateY(-5px); text-shadow: 0px 15px 25px rgba(255,255,255,0.6); }
          100% { transform: perspective(600px) rotateY(-360deg) scale(1); }
        }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; width: 100%; height: 2px; bottom: -4px; left: 0;
          background-color: #fff; transform: scaleX(0); transform-origin: right; transition: transform 0.3s ease;
        }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>

      {/* Full-width Raw Utility Navbar */}
      <Box
        ref={navRef}
        sx={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: 80,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
          backgroundColor: '#0a0a0a', borderBottom: '2px solid #333',
          zIndex: 1000
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MagneticWrapper strength={15}>
            <Box className="logo-container" sx={{ display: 'flex', cursor: 'pointer', '&:hover .letter-inner': { animation: 'flip3d 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both' } }}>
              {LogoText.map((item, i) => (
                <Box key={i} sx={{ position: 'relative', display: 'inline-block' }}>
                  <Box className="letter-inner" sx={{ display: 'inline-block', transformOrigin: 'center center', animationDelay: `${i * 0.05}s !important` }}>
                    <Typography sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 900, fontSize: '2.2rem', letterSpacing: '0.05em', color: item.color, textShadow: '2px 2px 0px rgba(255,255,255,0.1)' }}>
                      {item.char}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </MagneticWrapper>
        </Link>

        {/* Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 6 }}>
          {navItems.map((item, index) => (
            <MagneticWrapper key={item.name} strength={25}>
              <Typography component={Link} to={item.path} className="nav-link" sx={{ fontFamily: '"Syne", sans-serif', textTransform: 'uppercase', textDecoration: 'none', color: activeIndex === index ? '#fff' : '#888', fontSize: '1.1rem', fontWeight: 800, transition: 'color 0.3s ease' }}>
                {item.name}
              </Typography>
            </MagneticWrapper>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <MagneticWrapper strength={20}>
            <IconButton onClick={() => setSearchOpen(true)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 0, '&:hover': { backgroundColor: '#fff', color: '#000' }, transition: 'all 0.2s' }}><Search size={20} /></IconButton>
          </MagneticWrapper>
          <MagneticWrapper strength={20}>
            <IconButton onClick={() => setUserOpen(true)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 0, '&:hover': { backgroundColor: '#fff', color: '#000' }, transition: 'all 0.2s' }}><User size={20} /></IconButton>
          </MagneticWrapper>
          <MagneticWrapper strength={30}>
            <IconButton onClick={() => setCartOpen(true)} sx={{ color: '#000', backgroundColor: '#fff', border: '1px solid #fff', borderRadius: 0, '&:hover': { backgroundColor: '#60b0a3', color: '#000', borderColor: '#60b0a3' }, transition: 'all 0.2s', position: 'relative' }}>
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <Box sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: '#d36440', border: '2px solid #000', color: '#fff', borderRadius: 0, width: 24, height: 24, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontFamily: '"Syne", sans-serif' }}>
                  {totalItems}
                </Box>
              )}
            </IconButton>
          </MagneticWrapper>
        </Box>
      </Box>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: { xs: 300, md: 450 }, p: 4, backgroundColor: '#050505', height: '100%', color: '#fff', borderLeft: '4px solid #fff', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ mb: 4, fontFamily: '"Syne", sans-serif', fontWeight: 900, textTransform: 'uppercase', color: '#5c6eee', textShadow: '2px 2px 0px #fff' }}>YOUR BAG</Typography>
          
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <Typography color="text.secondary" sx={{fontFamily: '"Kanit", sans-serif', fontSize: '1.2rem'}}>Your bag is currently empty.</Typography>
            ) : (
              cartItems.map(item => (
                <Box key={item.id} sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'center', backgroundColor: '#111', p: 2, border: '2px solid #333' }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 100, objectFit: 'cover' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}>{item.name}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{fontFamily: '"Kanit", sans-serif', mt: 1}}>{item.price.toLocaleString()} THB x {item.quantity}</Typography>
                  </Box>
                  <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: '#fff', backgroundColor: '#000', border: '2px solid #333', borderRadius: 0, '&:hover': {backgroundColor: '#d36440', borderColor: '#d36440'} }}>
                    <Typography variant="button" sx={{fontFamily: '"Syne", sans-serif'}}>X</Typography>
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          {cartItems.length > 0 && (
            <Box sx={{ pt: 4, borderTop: '4px solid #333' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{fontWeight: 900, fontFamily: '"Syne", sans-serif'}}>TOTAL</Typography>
                <Typography variant="h5" sx={{fontWeight: 900, fontFamily: '"Kanit", sans-serif', color: '#60b0a3'}}>{cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()} THB</Typography>
              </Box>
              <Button variant="contained" fullWidth sx={{ fontFamily: '"Syne", sans-serif', backgroundColor: '#fff', color: '#000', borderRadius: 0, py: 2, fontSize: '1.3rem', fontWeight: 900, border: '2px solid #fff', boxShadow: '6px 6px 0px #d36440', '&:hover':{backgroundColor: '#000', color: '#fff', transform: 'translate(-2px, -2px)', boxShadow: '8px 8px 0px #60b0a3'} }}>
                CHECKOUT SECURELY
              </Button>
            </Box>
          )}

          {cartItems.length === 0 && (
            <Button variant="contained" fullWidth sx={{ fontFamily: '"Syne", sans-serif', mt: 4, backgroundColor: '#fff', color: '#000', borderRadius: 0, py: 2, fontWeight: 900, border: '2px solid #fff', boxShadow: '4px 4px 0px #dda6e7', '&:hover': {backgroundColor: '#000', color: '#fff'} }} onClick={() => setCartOpen(false)}>
              CONTINUE SHOPPING
            </Button>
          )}
        </Box>
      </Drawer>

      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} PaperProps={{ sx: { border: '4px solid #fff', backgroundColor: '#050505', color: '#fff', minWidth: { xs: 300, md: 600 }, p: 6, borderRadius: 0, boxShadow: '12px 12px 0px #5c6eee' } }}>
        <Typography variant="h3" sx={{ mb: 4, fontFamily: '"Syne", sans-serif', fontWeight: 900, textTransform: 'uppercase' }}>SEARCH</Typography>
        <TextField autoFocus fullWidth placeholder="TYPE TO SEARCH..." variant="standard" sx={{ input: { color: '#60b0a3', fontSize: '2rem', py: 2, fontFamily: '"Syne", sans-serif', fontWeight: 800 }, borderBottom: '4px solid #fff' }} />
      </Dialog>
      
      <Dialog open={userOpen} onClose={() => setUserOpen(false)} PaperProps={{ sx: { border: '4px solid #fff', backgroundColor: '#050505', color: '#fff', minWidth: { xs: 300, md: 500 }, p: 6, borderRadius: 0, boxShadow: '12px 12px 0px #dda6e7' } }}>
        <Typography variant="h3" sx={{ mb: 5, fontFamily: '"Syne", sans-serif', textAlign: 'center', fontWeight: 900 }}>LOGIN</Typography>
        <TextField fullWidth placeholder="EMAIL" variant="outlined" sx={{ mb: 3, input: { color: '#fff', fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '1.2rem' }, fieldset: { borderColor: '#555', borderWidth: '2px', borderRadius: 0 }, '&:hover fieldset': {borderColor: '#fff!important'} }} />
        <TextField fullWidth placeholder="PASSWORD" type="password" variant="outlined" sx={{ mb: 5, input: { color: '#fff', fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '1.2rem' }, fieldset: { borderColor: '#555', borderWidth: '2px', borderRadius: 0 }, '&:hover fieldset': {borderColor: '#fff!important'}  }} />
        <Button variant="contained" fullWidth sx={{ fontFamily: '"Syne", sans-serif', backgroundColor: '#dda6e7', color: '#000', borderRadius: 0, py: 2, fontSize: '1.3rem', fontWeight: 900, border: '2px solid #dda6e7', boxShadow: '6px 6px 0px #fff', '&:hover':{backgroundColor: '#c792d2', transform: 'translate(-2px, -2px)', boxShadow: '8px 8px 0px #5c6eee'} }} onClick={() => setUserOpen(false)}>SIGN IN / SECURE</Button>
      </Dialog>
    </>
  );
}
