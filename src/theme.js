import { createTheme } from '@mui/material/styles';

// ---------------------------------------------------------------------------
// Design tokens — the single source of truth for colour, shadow and type.
//
// Surface / line / text tokens are CSS variables that flip with the colour
// scheme (dark = default, light = warm paper + black borders). The four brand
// colours are constant. Colour roles:
//   lilac = primary CTA · mint = hover / totals · orange = accent · blue = labels
// `*Ink` variants are the brand colours darkened for use as TEXT on the light page.
// ---------------------------------------------------------------------------
const schemeVars = {
  dark: {
    ink: '#0a0a0a',
    deep: '#050505',
    surface: '#111111',
    raised: '#1a1a1a',
    line: '#2a2a2a',
    strong: '#ffffff', // borders, hard shadows, primary text
    'on-strong': '#000000', // text sitting on a `strong` fill
    stage: '#000000', // product-image stage
    muted: '#8a8a8a',
    'orange-ink': '#d36440',
    'lilac-ink': '#dda6e7',
    'mint-ink': '#60b0a3',
  },
  light: {
    ink: '#f6f2e9',
    deep: '#ece6d8',
    surface: '#ffffff',
    raised: '#f1ece0',
    line: '#cfc8b6',
    strong: '#0a0a0a',
    'on-strong': '#ffffff',
    stage: '#ffffff',
    muted: '#66625a',
    'orange-ink': '#b8461f',
    'lilac-ink': '#8e3fa6',
    'mint-ink': '#2b7a6c',
  },
};

const cssVars = (mode) =>
  Object.fromEntries(Object.entries(schemeVars[mode]).map(([k, v]) => [`--c-${k}`, v]));

const v = (name) => `var(--c-${name})`;

export const tokens = {
  color: {
    ink: v('ink'),
    deep: v('deep'),
    surface: v('surface'),
    raised: v('raised'),
    line: v('line'),
    strong: v('strong'),
    onStrong: v('on-strong'),
    stage: v('stage'),
    muted: v('muted'),
    orangeInk: v('orange-ink'),
    lilacInk: v('lilac-ink'),
    mintInk: v('mint-ink'),
    // brand — constant in both schemes
    blue: '#5c6eee',
    orange: '#d36440',
    lilac: '#dda6e7',
    mint: '#60b0a3',
  },
  font: {
    display: '"Syne", "Kanit", sans-serif',
    body: '"Kanit", "Syne", sans-serif',
  },
};

// Hard offset shadow, three sizes only.
export const hardShadow = (color, size = 'md') => {
  const px = { sm: 3, md: 5, lg: 8 }[size];
  return `${px}px ${px}px 0px ${color}`;
};

// Works with CSS-variable colours, unlike string-concatenated hex alpha.
export const withAlpha = (color, percent) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;

// Each collection owns one brand colour (card shadow + chip). `*Text` is the
// scheme-safe variant for when the colour is used as text on the page.
const collectionAccents = {
  'COLLECTION 01': { fill: tokens.color.mint, text: tokens.color.mintInk },
  'COLLECTION 02': { fill: tokens.color.orange, text: tokens.color.orangeInk },
};
const fallbackAccent = { fill: tokens.color.blue, text: tokens.color.blue };
export const collectionAccent = (category) => (collectionAccents[category] ?? fallbackAccent).fill;
export const collectionAccentText = (category) => (collectionAccents[category] ?? fallbackAccent).text;

const { color: c, font } = tokens;

const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: '#ffffff' },
        secondary: { main: c.blue },
        error: { main: c.orange },
        warning: { main: c.lilac },
        success: { main: c.mint },
        background: { default: schemeVars.dark.ink, paper: schemeVars.dark.surface },
        text: { primary: '#ffffff', secondary: schemeVars.dark.muted },
      },
    },
    light: {
      palette: {
        primary: { main: '#0a0a0a' },
        secondary: { main: c.blue },
        error: { main: c.orange },
        warning: { main: c.lilac },
        success: { main: c.mint },
        background: { default: schemeVars.light.ink, paper: schemeVars.light.surface },
        text: { primary: '#0a0a0a', secondary: schemeVars.light.muted },
      },
    },
  },
  typography: {
    fontFamily: font.body,
    h1: { fontFamily: font.display, fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontFamily: font.display, fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontFamily: font.display, fontWeight: 800, letterSpacing: '-0.01em' },
    h4: { fontFamily: font.display, fontWeight: 800 },
    h5: { fontFamily: font.display, fontWeight: 800 },
    h6: { fontFamily: font.display, fontWeight: 800 },
    overline: {
      fontFamily: font.display,
      fontWeight: 800,
      letterSpacing: '0.18em',
      lineHeight: 1.4,
    },
    button: {
      fontFamily: font.display,
      textTransform: 'uppercase',
      fontWeight: 800,
      letterSpacing: '0.1em',
    },
  },
  shape: { borderRadius: 0 }, // hard edges — streetwear neobrutalism
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': cssVars('dark'),
        '[data-mui-color-scheme="light"]': cssVars('light'),
        '::selection': { backgroundColor: c.lilac, color: '#000' },
        ':focus-visible': { outline: `2px solid ${c.mint}`, outlineOffset: '3px' },
        '::-webkit-scrollbar': { width: 10 },
        '::-webkit-scrollbar-track': { background: c.ink },
        '::-webkit-scrollbar-thumb': { background: c.line, borderRadius: 5 },
        '::-webkit-scrollbar-thumb:hover': { background: c.muted },
        '@keyframes marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
        '@keyframes flip3d': {
          '0%': { transform: 'perspective(600px) rotateY(0deg) scale(1)' },
          '50%': { transform: 'perspective(600px) rotateY(-180deg) scale(1.4) translateY(-5px)' },
          '100%': { transform: 'perspective(600px) rotateY(-360deg) scale(1)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          padding: '12px 28px',
          border: `2px solid ${c.strong}`,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease',
          '&:hover': { transform: 'translate(-3px, -3px)' },
          '&:active': { transform: 'translate(0, 0)', boxShadow: 'none' },
        },
        // Primary CTA — lilac fill, strong shadow, mint shadow on hover.
        contained: {
          backgroundColor: c.lilac,
          color: '#000',
          boxShadow: hardShadow(c.strong),
          '&:hover': { backgroundColor: c.strong, color: c.onStrong, boxShadow: hardShadow(c.mint, 'lg') },
        },
        containedError: {
          backgroundColor: c.orange,
          color: '#fff',
          '&:hover': { backgroundColor: c.orange, color: '#fff', boxShadow: hardShadow(c.strong, 'lg') },
        },
        outlined: {
          color: c.strong,
          borderColor: c.strong,
          '&:hover': { backgroundColor: c.strong, color: c.onStrong, boxShadow: hardShadow(c.blue) },
        },
      },
    },
    MuiIconButton: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { borderRadius: 0, transition: 'all 0.2s ease' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: c.surface,
          backgroundImage: 'none',
          border: `2px solid ${c.line}`,
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: c.surface,
          backgroundImage: 'none',
          border: `3px solid ${c.strong}`,
          boxShadow: hardShadow(c.blue, 'lg'),
          margin: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: c.surface,
          backgroundImage: 'none',
          borderLeft: `3px solid ${c.strong}`,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(4px)' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: font.display,
          fontWeight: 700,
          '& fieldset': { borderColor: c.muted, borderWidth: 2 },
          '&:hover fieldset': { borderColor: c.strong },
          '&.Mui-focused fieldset': { borderColor: c.lilac, borderWidth: 2 },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: font.display,
          fontWeight: 800,
          letterSpacing: '0.08em',
          border: `2px solid ${c.strong}`,
          boxShadow: hardShadow(c.mint),
        },
      },
    },
  },
});

export default theme;
