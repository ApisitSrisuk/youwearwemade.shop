import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import MagneticWrapper from './MagneticWrapper';
import { tokens, hardShadow, withAlpha } from '../theme';

const { color, font } = tokens;

const titleSx = {
  fontFamily: font.display,
  fontSize: { xs: 'clamp(3.2rem, 15vw, 4.5rem)', sm: '5.5rem', md: '7rem', lg: '8.5rem' },
  fontWeight: 800,
  lineHeight: 0.88,
  textTransform: 'uppercase',
  letterSpacing: '-0.03em',
};

const marqueeText = 'YOU WEAR WE MADE • THAI STREETWEAR • IN LOVE WITH FRIDAY • THE DEADLINE • ';

// Duplicated content so translateX(-50%) loops seamlessly.
function MarqueeBand({ bg, fg, rotate, reverse = false, duration = 30, sx }) {
  return (
    <Box
      sx={{
        position: 'absolute', left: '-5%', width: '110%', zIndex: 2, transform: `rotate(${rotate}deg)`,
        backgroundColor: bg, color: fg, overflow: 'hidden', whiteSpace: 'nowrap', py: 1,
        borderTop: `2px solid ${color.strong}`, borderBottom: `2px solid ${color.strong}`,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'inline-block', fontFamily: font.display, fontWeight: 800, fontSize: { xs: '1rem', md: '1.4rem' },
          letterSpacing: '0.06em', textTransform: 'uppercase',
          animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {marqueeText.repeat(4)}
      </Box>
    </Box>
  );
}

export default function HeroSection() {
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleLabelRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 110, opacity: 0, skewY: 5 },
        { yPercent: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        0.3
      );
      tl.fromTo(
        [subtitleLabelRef.current, descriptionRef.current, buttonRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' },
        0.8
      );
    });

    const onMove = (e) => {
      if (!parallaxRef.current) return;
      const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(parallaxRef.current, { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative', minHeight: '100svh', width: '100%', pt: 'var(--nav-height)', pb: { xs: 12, md: 14 },
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', backgroundColor: color.ink, borderBottom: `2px solid ${color.strong}`,
      }}
    >
      {/* Parallax grid, faded at the edges */}
      <Box
        ref={parallaxRef}
        sx={{
          position: 'absolute', width: '110%', height: '110%', top: '-5%', left: '-5%', zIndex: 0,
          backgroundImage: `linear-gradient(${withAlpha(color.strong, 6)} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(color.strong, 6)} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
        }}
      />
      {/* Colour glow behind the headline */}
      <Box sx={{ position: 'absolute', top: '30%', left: '50%', width: { xs: 320, md: 640 }, height: { xs: 320, md: 640 }, transform: 'translate(-50%, -50%)', borderRadius: '50%', background: `radial-gradient(circle, ${withAlpha(color.blue, 33)} 0%, transparent 65%)`, zIndex: 0, pointerEvents: 'none' }} />

      {/* Spinning badge */}
      <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', top: '62%', right: '12%', zIndex: 3, animation: 'spin 15s linear infinite' }}>
        <svg viewBox="0 0 100 100" width="120" height="120" aria-hidden="true" style={{ color: 'var(--c-strong)' }}>
          <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
          <text fill={color.mintInk} fontSize="10" fontWeight="800" fontFamily="Syne" letterSpacing="2px">
            <textPath href="#circlePath" startOffset="0%">• WEAR MADE STYLE • YWWM STREETWEAR • </textPath>
          </text>
          <path d="M 50 25 L 55 45 L 75 50 L 55 55 L 50 75 L 45 55 L 25 50 L 45 45 Z" fill="currentColor" />
        </svg>
      </Box>

      {/* Crossed marquee bands */}
      <MarqueeBand bg={color.blue} fg="#fff" rotate={-1.5} duration={32} sx={{ bottom: { xs: '5%', md: '7%' } }} />
      <MarqueeBand bg={color.lilac} fg="#000" rotate={1.2} reverse duration={38} sx={{ bottom: { xs: '1%', md: '2%' }, zIndex: 1 }} />

      <Box sx={{ position: 'relative', zIndex: 5, textAlign: 'center', px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ overflow: 'hidden', pb: 0.5 }}>
          <Typography
            component="h1"
            ref={titleLine1Ref}
            sx={{ ...titleSx, color: color.strong, textShadow: { xs: `3px 3px 0 ${color.blue}`, md: `6px 6px 0 ${color.blue}` } }}
          >
            YOU WEAR
          </Typography>
        </Box>
        <Box sx={{ overflow: 'hidden', pb: 0.5 }}>
          <Typography
            component="span"
            ref={titleLine2Ref}
            sx={{
              ...titleSx, display: 'block', color: 'transparent',
              WebkitTextStroke: { xs: `1.5px ${color.strong}`, md: `2.5px ${color.strong}` },
            }}
          >
            WE MADE
          </Typography>
        </Box>

        <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
          <Box
            ref={subtitleLabelRef}
            sx={{
              px: 2.5, py: 0.6, backgroundColor: color.orange, border: `2px solid ${color.strong}`, boxShadow: hardShadow(color.strong, 'sm'),
              transform: 'skewX(-12deg)',
            }}
          >
            <Typography
              variant="overline"
              sx={{ display: 'block', color: '#fff', fontSize: { xs: '0.7rem', md: '1rem' }, whiteSpace: 'nowrap', transform: 'skewX(12deg)' }}
            >
              THAI STREETWEAR BRAND
            </Typography>
          </Box>

          <Typography
            ref={descriptionRef}
            sx={{ color: color.strong, maxWidth: 480, mx: 'auto', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' }, lineHeight: 1.6, opacity: 0.85 }}
          >
            เสื้อผ้าที่ออกแบบจากแรงบันดาลใจในชีวิตประจำวัน ผสมผสานความดิบของสตรีทแฟชั่น
          </Typography>
        </Box>

        <Box sx={{ mt: { xs: 4, md: 5 } }}>
          <MagneticWrapper strength={15}>
            <Button
              ref={buttonRef}
              variant="contained"
              endIcon={<ArrowDown size={20} />}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' }, px: { xs: 3, md: 4.5 }, py: 1.6, whiteSpace: 'nowrap', boxShadow: hardShadow(color.strong, 'md') }}
            >
              Explore the drop
            </Button>
          </MagneticWrapper>
        </Box>
      </Box>
    </Box>
  );
}
