import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        accent: Palette['primary'];
    }
    interface PaletteOptions {
        accent?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#2E8B57', // Green
        },
        secondary: {
            main: '#1E3A5F', // Deep Blue
        },
        accent: {
            main: '#FF6B35', // Orange
        },
        background: {
            default: '#F5F7F6',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A1A1A',
            secondary: '#6B7280',
        },
        divider: '#E5E7EB',
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h1: { fontFamily: "'Poppins', sans-serif", fontSize: '32px', fontWeight: 600, color: '#1A1A1A' },
        h2: { fontFamily: "'Poppins', sans-serif", fontSize: '24px', fontWeight: 600, color: '#1A1A1A' },
        h3: { fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 600, color: '#1A1A1A' },
        body1: { fontSize: '16px' },
        button: {
            fontFamily: "'Inter', sans-serif",
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 24px',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(46, 139, 87, 0.2)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                    },
                },
            },
        },
    },
});

export default theme;
