import React from 'react';
import { Box, Typography } from '@mui/material';
import { tokens, withAlpha } from '../theme';

const { color } = tokens;

const letters = [
  { char: 'Y', color: color.orange },
  { char: 'W', color: color.blue },
  { char: 'W', color: color.lilac },
  { char: 'M', color: color.mint },
  { char: '.', color: color.strong },
];

// Four-colour YWWM. wordmark. `animated` adds the letter-flip on hover.
export default function Logo({ size = '2.2rem', animated = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: animated ? 'pointer' : 'default',
        ...(animated && {
          '&:hover .letter-inner': { animation: 'flip3d 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both' },
        }),
      }}
    >
      {letters.map((item, i) => (
        <Box
          key={i}
          className="letter-inner"
          sx={{ display: 'inline-block', transformOrigin: 'center center', animationDelay: `${i * 0.05}s !important` }}
        >
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontFamily: tokens.font.display,
              fontWeight: 900,
              fontSize: size,
              lineHeight: 1.1,
              letterSpacing: '0.05em',
              color: item.color,
              textShadow: `2px 2px 0px ${withAlpha(color.strong, 12)}`,
            }}
          >
            {item.char}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
