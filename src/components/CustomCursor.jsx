import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const mainCursor = useRef(null);
  const secondaryCursor = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      if (mainCursor.current) {
        gsap.to(mainCursor.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
      
      if (secondaryCursor.current) {
        gsap.to(secondaryCursor.current, {
          x: clientX,
          y: clientY,
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    };

    const onMouseEnter = (e) => {
      const target = e.target;
      if (target && target.closest && (target.closest('a') || target.closest('button') || target.tagName === 'BUTTON')) {
        if (secondaryCursor.current) {
          gsap.to(secondaryCursor.current, { scale: 3, backgroundColor: 'rgba(255,255,255,0.2)', mixBlendMode: 'difference', duration: 0.3 });
        }
      }
    };

    const onMouseLeave = () => {
      if (secondaryCursor.current) {
        gsap.to(secondaryCursor.current, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }
        .main-cursor {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .secondary-cursor {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        @media (max-width: 768px) {
          .cursor-wrapper { display: none; }
        }
      `}</style>
      <div className="cursor-wrapper">
        <div ref={mainCursor} className="main-cursor" />
        <div ref={secondaryCursor} className="secondary-cursor" />
      </div>
    </>
  );
}
