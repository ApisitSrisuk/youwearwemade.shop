import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';

export default function MagneticWrapper({ children, strength = 20 }) {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const moveX = (clientX - centerX) / (width / strength);
      const moveY = (clientY - centerY) / (height / strength);

      gsap.to(ref.current, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const reset = () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    const el = ref.current;
    if (el) {
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', reset);
    }
    
    return () => {
      if (el) {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', reset);
      }
    };
  }, [strength]);

  return <Box ref={ref} sx={{ display: 'inline-block' }}>{children}</Box>;
}
