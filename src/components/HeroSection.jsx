import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';
import MagneticWrapper from './MagneticWrapper';

export default function HeroSection() {
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleLabelRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const parallaxRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (titleLine1Ref.current && titleLine2Ref.current) {
      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        0.3
      );

      // Subtle Glitch Effect Loop
      gsap.to([titleLine1Ref.current, titleLine2Ref.current], {
        x: 'random(-1, 1)',
        y: 'random(-0.5, 0.5)',
        duration: 0.1,
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
        delay: 2
      });
    }

    if (subtitleLabelRef.current && descriptionRef.current && buttonRef.current) {
      tl.fromTo(
        [subtitleLabelRef.current, descriptionRef.current, buttonRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' },
        0.8
      );
    }

    const onMove = (e) => {
      if (!parallaxRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;
      gsap.to(parallaxRef.current, { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
        borderBottom: '2px solid #fff'
      }}
    >
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .grid-bg {
          position: absolute; width: 110%; height: 110%; top: -5%; left: -5%;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
        }
      `}</style>

      <Box ref={parallaxRef} className="grid-bg" />
      
      {/* Small spinning badge in safe zone */}
      <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: '12%', right: '10%', zIndex: 20, animation: 'spin 15s linear infinite', opacity: 0.6 }}>
        <svg viewBox="0 0 100 100" width="100" height="100">
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
          <text fill="#60b0a3" fontSize="10" fontWeight="900" fontFamily="Syne" letterSpacing="2px">
            <textPath href="#circlePath" startOffset="0%">• WEAR MADE STYLE • YWWM STREETWEAR • </textPath>
          </text>
          <path d="M 50 25 L 55 45 L 75 50 L 55 55 L 50 75 L 45 55 L 25 50 L 45 45 Z" fill="#fff" />
        </svg>
      </Box>

      {/* Marquee moved to absolute bottom safely */}
      <Box sx={{ position: 'absolute', bottom: '5%', left: '-5%', width: '110%', zIndex: 1, transform: 'rotate(-1deg)', opacity: 0.5 }}>
        <Box sx={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', backgroundColor: '#5c6eee', color: '#fff', py: 1, borderTop: '1px solid #fff', borderBottom: '1px solid #fff' }}>
           <Box sx={{ display: 'inline-block', animation: 'marquee 30s linear infinite', fontWeight: 900, fontSize: '1.4rem', fontFamily: '"Syne", sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              YOU WEAR WE MADE • THAI STREETWEAR • IN LOVE WITH FRIDAY • THE DEADLINE • 
           </Box>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 5, textAlign: 'center', px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography ref={titleLine1Ref} sx={{ fontFamily: '"Syne", sans-serif', fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem', lg: '8rem' }, fontWeight: 900, lineHeight: 0.85, textTransform: 'uppercase', color: '#fff' }}>
            YOU WEAR
          </Typography>
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography ref={titleLine2Ref} sx={{ fontFamily: '"Syne", sans-serif', fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem', lg: '8rem' }, fontWeight: 900, lineHeight: 0.85, textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: { xs: '1px #fff', md: '2px #fff' } }}>
            WE MADE
          </Typography>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box ref={subtitleLabelRef} sx={{ position: 'relative', display: 'inline-block' }}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) skewX(-15deg)', width: '110%', height: '100%', backgroundColor: '#d36440', zIndex: -1, boxShadow: '3px 3px 0px #fff' }} />
            <Typography sx={{ px: 2, py: 0.5, color: '#fff', fontWeight: 900, fontFamily: '"Syne", sans-serif', letterSpacing: '0.2em', fontSize: { xs: '0.8rem', md: '1.1rem' }, textTransform: 'uppercase' }}>
              THAI STREETWEAR BRAND
            </Typography>
          </Box>

          <Typography ref={descriptionRef} sx={{ color: '#fff', maxWidth: 450, mx: 'auto', fontWeight: 500, fontFamily: '"Kanit", sans-serif', fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.5, opacity: 0.8 }}>
            เสื้อผ้าที่ออกแบบจากแรงบันดาลใจในชีวิตประจำวัน ผสมผสานความดิบของสตรีทแฟชั่น
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <MagneticWrapper strength={15}>
            <Button
              ref={buttonRef}
              variant="contained"
              onClick={() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
              sx={{ backgroundColor: '#dda6e7', color: '#000', fontSize: '1.1rem', fontWeight: 900, fontFamily: '"Syne", sans-serif', px: 4, py: 1.2, borderRadius: 0, border: '2px solid #fff', boxShadow: '5px 5px 0px #fff', '&:hover': { backgroundColor: '#fff', transform: 'translate(-2px, -2px)', boxShadow: '8px 8px 0px #60b0a3' }, transition: 'all 0.2s' }}
            >
              EXPLORE THE DROP
            </Button>
          </MagneticWrapper>
        </Box>
      </Box>
    </Box>
  );
}
