import React, { useState, useRef, useEffect } from 'react';
import { Card, Box, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { ShoppingBag } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import gsap from 'gsap';

export default function ProductCard({ product, addToCart, onCardClick }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setOpen(true);
  };

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <>
      <Card
        ref={cardRef}
        onClick={onCardClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative', overflow: 'visible', cursor: 'pointer',
          borderRadius: 0, border: '1px solid #333', backgroundColor: '#050505',
          flexGrow: 1,
          '&:hover': { borderColor: '#fff' },
          '&:hover .product-img': { transform: 'scale(1.1)' },
          '&:hover .add-btn': { opacity: 1, transform: 'translateY(0)' }
        }}
      >
        <Box sx={{ 
          width: '100%', 
          aspectRatio: '1/1',
          backgroundColor: '#000', 
          overflow: 'hidden', 
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2.5 // Tighter padding for 6-column density
        }}>
          <img 
            className="product-img"
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '85%', 
              height: '85%', 
              objectFit: 'contain', 
              transition: 'transform 0.5s ease-out' 
            }} 
          />
        </Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="caption" sx={{ fontFamily: '"Syne", sans-serif', color: '#dda6e7', mb: 0.5, textTransform: 'uppercase', fontWeight: 900 }}>{product.category}</Typography>
          <Typography sx={{ mb: 0.5, fontWeight: 900, fontFamily: '"Syne", sans-serif', textTransform: 'uppercase', fontSize: '0.85rem', lineHeight: 1.2 }}>{product.name}</Typography>
          <Typography sx={{ fontFamily: '"Kanit", sans-serif', fontWeight: 700, mt: 'auto', fontSize: '0.85rem', color: '#fff' }}>{product.price.toLocaleString()} THB</Typography>
        </Box>
        
        <Box sx={{ position: 'absolute', bottom: 10, right: 10, opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s' }} className="add-btn">
          <IconButton
            onClick={handleAddToCart}
            size="small"
            sx={{ p: 1, backgroundColor: '#fff', color: '#000', border: '1px solid #000', borderRadius: 0, '&:hover': { backgroundColor: '#60b0a3' } }}
          >
            <ShoppingBag size={16} />
          </IconButton>
        </Box>
      </Card>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: '100%', borderRadius: 0, fontWeight: 900, fontFamily: '"Kanit", sans-serif' }}>
          ADDED!
        </Alert>
      </Snackbar>
    </>
  );
}
