import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Grid, Button, Dialog } from '@mui/material';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection({ addToCart }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = selectedCat === 'All' ? products : products.filter(p => p.category === selectedCat);

  useEffect(() => {
    // Reveal Heading
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' } 
        }
      );
    }

    // Staggered Reveal for Grid Items
    const items = gridRef.current.querySelectorAll('.grid-item-container');
    gsap.fromTo(items,
      { y: 50, opacity: 0, scale: 0.98 },
      { 
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: 'expo.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 95%' }
      }
    );
  }, []);

  return (
    <Box id="products" ref={sectionRef} sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#050505', borderTop: '2px solid #fff' }}>
      <Container maxWidth="xl">
        <Typography ref={headingRef} variant="h3" sx={{ fontFamily: '"Syne", sans-serif', mb: 4, textAlign: 'left', fontWeight: 900, textTransform: 'uppercase', color: '#fff', borderLeft: '6px solid #d36440', pl: 3 }}>
          THE VAULT
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 1.5, mb: 6 }}>
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              sx={{ fontFamily: '"Syne", sans-serif', color: selectedCat === cat ? '#000' : '#888', backgroundColor: selectedCat === cat ? '#dda6e7' : 'transparent', borderRadius: 0, border: '1px solid', borderColor: selectedCat === cat ? '#dda6e7' : '#222', px: 2, py: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 900, boxShadow: selectedCat === cat ? '3px 3px 0px #fff' : 'none' }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Optimizing Density: 6-column Grid per user request */}
        <Grid ref={gridRef} container spacing={2} alignItems="stretch">
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={4} md={2} key={product.id} className="grid-item-container" sx={{ display: 'flex' }}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <ProductCard product={product} addToCart={addToCart} onCardClick={() => setSelectedProduct(product)} />
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Product Detail Modal */}
        <Dialog 
          open={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { backgroundColor: '#050505', color: '#fff', borderRadius: 0, border: '2px solid #fff', overflow: 'hidden' } }}
        >
          {selectedProduct && (
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Box 
                sx={{ 
                  flex: 0.8,
                  backgroundColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 6
                }} 
              >
                <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '220px', height: '220px', objectFit: 'contain' }} />
              </Box>
              <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="overline" sx={{ fontFamily: '"Syne", sans-serif', color: '#dda6e7', fontWeight: 900 }}>
                  {selectedProduct.category}
                </Typography>
                <Typography variant="h5" sx={{ mb: 1, fontFamily: '"Syne", sans-serif', fontWeight: 900, textTransform: 'uppercase' }}>
                  {selectedProduct.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, color: '#fff', fontFamily: '"Kanit", sans-serif' }}>
                  {selectedProduct.price.toLocaleString()} THB
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: '"Kanit", sans-serif', mb: 3, opacity: 0.7 }}>
                  {selectedProduct.description}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  sx={{ backgroundColor: '#d36440', color: '#fff', borderRadius: 0, fontWeight: 900 }}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
