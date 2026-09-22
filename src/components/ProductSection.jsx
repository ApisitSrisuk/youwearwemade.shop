import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Button, Dialog, IconButton, Snackbar, Alert } from '@mui/material';
import { X } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';
import { tokens, hardShadow, collectionAccent, collectionAccentText, withAlpha } from '../theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { color } = tokens;

const countIn = (cat) => (cat === 'All' ? products.length : products.filter((p) => p.category === cat).length);

export default function ProductSection({ addToCart }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredProducts = selectedCat === 'All' ? products : products.filter((p) => p.category === selectedCat);

  const handleAdd = (product) => {
    addToCart(product);
    setToast(product.name);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-run the staggered reveal whenever the filter changes the visible cards.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.grid-item-container',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: gridRef.current, start: 'top 95%' } }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [selectedCat]);

  // Detail modal: description is "blurb | TAG · TAG · TAG"
  const [blurb, tagLine] = selectedProduct ? selectedProduct.description.split('|').map((s) => s.trim()) : [];
  const tags = tagLine ? tagLine.split('·').map((t) => t.trim()).filter(Boolean) : [];
  const modalAccent = selectedProduct ? collectionAccent(selectedProduct.category) : color.blue;
  const modalAccentText = selectedProduct ? collectionAccentText(selectedProduct.category) : color.blue;

  return (
    <Box id="products" ref={sectionRef} sx={{ py: { xs: 8, md: 12 }, backgroundColor: color.deep }}>
      <Container maxWidth="lg">
        <Box ref={headingRef} sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: color.orangeInk, display: 'block', mb: 1 }}>
            Latest drops
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.6rem', md: '4.2rem' }, textTransform: 'uppercase', lineHeight: 1 }}>
              The Vault
              <Box component="sup" sx={{ ml: 1, fontSize: '0.35em', fontWeight: 800, color: color.muted, letterSpacing: '0.05em', verticalAlign: 'super' }}>
                ({String(filteredProducts.length).padStart(2, '0')})
              </Box>
            </Typography>

            <Box role="tablist" aria-label="Filter by collection" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {categories.map((cat) => {
                const active = selectedCat === cat;
                return (
                  <Button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCat(cat)}
                    sx={{
                      px: 2, py: 0.6, fontSize: '0.75rem', gap: 1,
                      color: active ? '#000' : color.muted,
                      backgroundColor: active ? color.lilac : 'transparent',
                      borderColor: active ? color.strong : color.line,
                      boxShadow: active ? hardShadow(color.strong, 'sm') : 'none',
                      '&:hover': { color: active ? '#000' : color.strong, borderColor: color.strong, backgroundColor: active ? color.lilac : 'transparent', boxShadow: active ? hardShadow(color.strong, 'sm') : 'none' },
                    }}
                  >
                    {cat}
                    <Box component="span" sx={{ opacity: 0.6 }}>{countIn(cat)}</Box>
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Columns adapt to the number of products: 2 items fill the row, 6 items wrap into 3-up. */}
        <Box
          ref={gridRef}
          sx={{ display: 'grid', gap: { xs: 3, md: 5 }, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', alignItems: 'stretch' }}
        >
          {filteredProducts.map((product) => (
            <Box key={product.id} className="grid-item-container" sx={{ display: 'flex', flexDirection: 'column' }}>
              <ProductCard product={product} onAdd={handleAdd} onCardClick={() => setSelectedProduct(product)} />
            </Box>
          ))}
        </Box>

        {/* Product detail modal */}
        <Dialog
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          maxWidth="md"
          fullWidth
          slotProps={{ paper: { sx: { overflow: 'hidden', boxShadow: hardShadow(modalAccent, 'lg') } } }}
        >
          {selectedProduct && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, position: 'relative' }}>
              <IconButton
                aria-label="Close"
                onClick={() => setSelectedProduct(null)}
                sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2, color: color.strong, backgroundColor: color.stage, border: `2px solid ${color.strong}`, '&:hover': { backgroundColor: modalAccent, color: '#000' } }}
              >
                <X size={18} />
              </IconButton>

              <Box
                sx={{
                  flex: 1.1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 4, md: 6 },
                  minHeight: { xs: 260, md: 440 }, backgroundColor: color.stage, borderRight: { md: `3px solid ${color.strong}` }, borderBottom: { xs: `3px solid ${color.strong}`, md: 'none' },
                  backgroundImage: `radial-gradient(circle at 50% 55%, ${withAlpha(modalAccent, 25)} 0%, transparent 62%)`,
                }}
              >
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', maxWidth: 340, aspectRatio: '1 / 1', objectFit: 'contain' }} />
              </Box>

              <Box sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                <Typography variant="overline" sx={{ color: modalAccentText }}>{selectedProduct.category}</Typography>
                <Typography variant="h3" sx={{ textTransform: 'uppercase', fontSize: { xs: '1.9rem', md: '2.4rem' }, lineHeight: 1.05 }}>
                  {selectedProduct.name}
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  {selectedProduct.price.toLocaleString()} <Box component="span" sx={{ color: color.muted, fontSize: '0.6em' }}>THB</Box>
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{blurb}</Typography>
                {tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <Box key={tag} sx={{ px: 1.5, py: 0.3, border: `2px solid ${color.line}` }}>
                        <Typography variant="overline" sx={{ display: 'block', fontSize: '0.7rem', color: color.muted }}>{tag}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => { handleAdd(selectedProduct); setSelectedProduct(null); }}
                  sx={{ mt: 1, py: 1.6, fontSize: '1rem' }}
                >
                  Add to bag
                </Button>
              </Box>
            </Box>
          )}
        </Dialog>

        <Snackbar
          open={!!toast}
          autoHideDuration={2200}
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" sx={{ width: '100%', color: '#000', backgroundColor: color.mint }}>
            ADDED — {toast}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
