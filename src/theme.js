import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#5c6eee', // Blue from logo
    },
    error: {
      main: '#d36440', // Orange from logo
    },
    warning: {
      main: '#dda6e7', // Lilac from logo
    },
    success: {
      main: '#60b0a3', // Mint from logo
    },
    background: {
      default: '#0a0a0a',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: '"Kanit", "Syne", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Syne", sans-serif',
      fontWeight: 800,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 800,
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 0, // Hard sharp edges for streetwear Neobrutalism
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 28px',
          border: '2px solid #fff',
          boxShadow: '4px 4px 0px #5c6eee', // Vivid hard shadow
          fontFamily: '"Syne", sans-serif',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translate(-3px, -3px)',
            boxShadow: '7px 7px 0px #dda6e7',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          backgroundImage: 'none',
          borderRadius: 0,
          border: '1px solid #333',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid #fff',
            boxShadow: '8px 8px 0px #d36440',
            transform: 'translate(-4px, -4px)',
          }
        },
      },
    },
  },
});

export default theme;
