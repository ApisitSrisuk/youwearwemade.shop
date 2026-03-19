import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { products as initialProducts } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        <CustomCursor />
        <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ProductSection addToCart={addToCart} />
            </>
          } />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
