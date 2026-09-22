import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Drawer, Dialog, TextField, Button } from '@mui/material';
import { Search, ShoppingBag, User, X, Sun, Moon } from 'lucide-react';
import { useColorScheme } from '@mui/material/styles';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import MagneticWrapper from './MagneticWrapper';
import Logo from './Logo';
import { tokens, hardShadow } from '../theme';

const { color, font } = tokens;

const navItems = [
  { name: 'Shop', path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
];

const iconButtonSx = {
  padding: { xs: '6px', md: '8px' },
  color: color.strong,
  border: `2px solid ${color.line}`,
  '&:hover': { backgroundColor: color.strong, color: color.onStrong, borderColor: color.strong },
};

function NavAction({ strength = 20, label, onClick, children, sx }) {
  return (
    <MagneticWrapper strength={strength}>
      <IconButton aria-label={label} onClick={onClick} sx={{ ...iconButtonSx, ...sx }}>
        {children}
      </IconButton>
    </MagneticWrapper>
  );
}

function DialogHeader({ title, onClose, center = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'space-between', mb: 4, position: 'relative' }}>
      <Typography variant="h4" sx={{ textTransform: 'uppercase', fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
        {title}
      </Typography>
      <IconButton aria-label="Close" onClick={onClose} sx={{ ...iconButtonSx, ...(center && { position: 'absolute', right: 0 }) }}>
        <X size={18} />
      </IconButton>
    </Box>
  );
}

export default function Navbar({ cartItems = [], removeFromCart }) {
  const navRef = useRef(null);
  const location = useLocation();
  const { mode, setMode } = useColorScheme();
  const isLight = mode === 'light';

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
    }
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Box
        component="header"
        ref={navRef}
        sx={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: 'var(--nav-height)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: { xs: 2, md: 5 },
          backgroundColor: color.ink, borderBottom: `2px solid ${color.strong}`,
          zIndex: 1000,
        }}
      >
        <Link to="/" aria-label="YWWM home" style={{ textDecoration: 'none' }}>
          <MagneticWrapper strength={15}>
            <Logo animated size={{ xs: '1.5rem', md: '2.2rem' }} />
          </MagneticWrapper>
        </Link>

        <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 6 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <MagneticWrapper key={item.name} strength={25}>
                <Typography
                  component={Link}
                  to={item.path}
                  sx={{
                    position: 'relative', fontFamily: font.display, textTransform: 'uppercase', textDecoration: 'none',
                    color: active ? color.strong : color.muted, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.08em',
                    transition: 'color 0.3s ease',
                    '&:hover': { color: color.strong },
                    '&::after': {
                      content: '""', position: 'absolute', width: '100%', height: 3, bottom: -6, left: 0,
                      backgroundColor: color.lilac, transformOrigin: active ? 'left' : 'right',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.3s ease',
                    },
                    '&:hover::after': { transform: 'scaleX(1)', transformOrigin: 'left' },
                  }}
                >
                  {item.name}
                </Typography>
              </MagneticWrapper>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', gap: { xs: 0.75, md: 2 } }}>
          <NavAction label={isLight ? 'Switch to dark mode' : 'Switch to light mode'} onClick={() => setMode(isLight ? 'dark' : 'light')}>
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </NavAction>
          <NavAction label="Search" onClick={() => setSearchOpen(true)}><Search size={20} /></NavAction>
          <NavAction label="Account" onClick={() => setUserOpen(true)}><User size={20} /></NavAction>
          <NavAction
            label={`Open bag, ${totalItems} items`}
            strength={30}
            onClick={() => setCartOpen(true)}
            sx={{
              color: color.onStrong, backgroundColor: color.strong, borderColor: color.strong, position: 'relative',
              '&:hover': { backgroundColor: color.mint, color: '#000', borderColor: color.mint },
            }}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <Box sx={{
                position: 'absolute', top: -10, right: -10, backgroundColor: color.orange, border: '2px solid #000', color: '#fff',
                minWidth: 24, height: 24, px: 0.5, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontFamily: font.display,
              }}>
                {totalItems}
              </Box>
            )}
          </NavAction>
        </Box>
      </Box>

      {/* Cart drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: { xs: '100vw', sm: 420, md: 460 }, maxWidth: '100vw', p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogHeader title="Your Bag" onClose={() => setCartOpen(false)} />

          <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.5 }}>
            {cartItems.length === 0 ? (
              <Box sx={{ border: `2px dashed ${color.line}`, p: 4, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: font.display, fontWeight: 800, textTransform: 'uppercase', mb: 1 }}>Bag is empty</Typography>
                <Typography color="text.secondary">Your bag is currently empty.</Typography>
              </Box>
            ) : (
              cartItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', backgroundColor: color.surface, p: 1.5, border: `2px solid ${color.line}` }}>
                  <Box sx={{ width: 76, height: 76, flexShrink: 0, backgroundColor: color.stage, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontFamily: font.display, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.95rem', lineHeight: 1.2 }}>{item.name}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: '0.9rem' }}>
                      {item.price.toLocaleString()} THB × {item.quantity}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeFromCart(item.id)}
                    sx={{ ...iconButtonSx, '&:hover': { backgroundColor: color.orange, borderColor: color.orange, color: '#fff' } }}
                  >
                    <X size={16} />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          <Box sx={{ pt: 3, mt: 2, borderTop: `3px solid ${color.strong}` }}>
            {cartItems.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 3 }}>
                <Typography variant="h5">TOTAL</Typography>
                <Typography variant="h5" sx={{ color: color.mintInk }}>{totalPrice.toLocaleString()} THB</Typography>
              </Box>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={cartItems.length > 0 ? undefined : () => setCartOpen(false)}
              sx={{ py: 1.8, fontSize: '1.1rem' }}
            >
              {cartItems.length > 0 ? 'Checkout securely' : 'Continue shopping'}
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Search */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} fullWidth maxWidth="sm">
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <DialogHeader title="Search" onClose={() => setSearchOpen(false)} />
          <TextField
            autoFocus
            fullWidth
            placeholder="TYPE TO SEARCH..."
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              input: { color: color.mintInk, fontSize: { xs: '1.4rem', md: '2rem' }, py: 1.5, fontFamily: font.display, fontWeight: 800 },
              borderBottom: `4px solid ${color.strong}`,
            }}
          />
        </Box>
      </Dialog>

      {/* Login */}
      <Dialog
        open={userOpen}
        onClose={() => setUserOpen(false)}
        fullWidth
        maxWidth="xs"
        slotProps={{ paper: { sx: { boxShadow: hardShadow(color.lilac, 'lg') } } }}
      >
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <DialogHeader title="Login" center onClose={() => setUserOpen(false)} />
          <TextField fullWidth placeholder="EMAIL" sx={{ mb: 2.5 }} />
          <TextField fullWidth placeholder="PASSWORD" type="password" sx={{ mb: 4 }} />
          <Button variant="contained" fullWidth sx={{ py: 1.8, fontSize: '1.1rem' }} onClick={() => setUserOpen(false)}>
            Sign in / secure
          </Button>
        </Box>
      </Dialog>
    </>
  );
}
