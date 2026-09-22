import React, { useRef } from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { tokens, hardShadow, collectionAccent, withAlpha } from '../theme';

const { color, font } = tokens;

export default function ProductCard({ product, onAdd, onCardClick }) {
  const cardRef = useRef(null);
  const accent = collectionAccent(product.category);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 6, rotateX: -y * 6, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <Card
      ref={cardRef}
      onClick={onCardClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer',
        '&:hover': { borderColor: color.strong, boxShadow: hardShadow(accent, 'lg') },
        '&:hover .product-img': { transform: 'scale(1.06) rotate(-1deg)' },
      }}
    >
      <Box
        sx={{
          position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 5 },
          borderBottom: `2px solid ${color.strong}`, backgroundColor: color.stage,
          backgroundImage: `radial-gradient(circle at 50% 55%, ${withAlpha(accent, 25)} 0%, transparent 62%), linear-gradient(${withAlpha(color.strong, 5)} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(color.strong, 5)} 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      >
        <Box
          sx={{
            position: 'absolute', top: 14, left: 14, px: 1.5, py: 0.4, zIndex: 1,
            backgroundColor: accent, color: '#000', border: `2px solid ${color.strong}`,
          }}
        >
          <Typography variant="overline" sx={{ display: 'block', fontSize: '0.7rem', color: 'inherit' }}>
            {product.category}
          </Typography>
        </Box>
        <img
          className="product-img"
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease-out' }}
        />
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Typography component="h3" sx={{ fontFamily: font.display, fontWeight: 800, textTransform: 'uppercase', fontSize: { xs: '1.05rem', md: '1.3rem' }, lineHeight: 1.15 }}>
            {product.name}
          </Typography>
          <Typography sx={{ fontFamily: font.body, fontWeight: 600, fontSize: { xs: '1rem', md: '1.15rem' }, whiteSpace: 'nowrap' }}>
            {product.price.toLocaleString()} <Box component="span" sx={{ color: color.muted, fontSize: '0.75em' }}>THB</Box>
          </Typography>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<Plus size={18} />}
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          sx={{ mt: 'auto', py: 1.1, '&:hover': { backgroundColor: accent, color: '#000', boxShadow: hardShadow(color.strong, 'sm') } }}
        >
          Add to bag
        </Button>
      </Box>
    </Card>
  );
}
