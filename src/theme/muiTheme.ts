import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#1565C0',
            light: '#1E88E5',
            dark: '#0D47A1',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#E65100',
            light: '#FF8A65',
            dark: '#BF360C',
        },
        success: {
            main: '#2E7D32'
        },
        error: {
            main: '#B71C1C'
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
        },
        h5: {
            fontWeight: 600,
            fontSize: 'clamp(1.25rem, 3vw, 2rem)'
        },
        h6: {
            fontWeight: 600,
            fontSize: 'clamp(1rem, 2vw, 1.5rem)'
        },
        body1: {
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)'
        },
        body2: {
            fontSize: 'clamp(0.75rem, 1vw, 0.875rem)'
        },
        button: {
            textTransform: 'none',
            fontWeight: 600
        },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: 8,
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    paddingLeft: 20,
                    paddingRight: 20
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small'
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    borderRadius: 12
                },
            },
        },
    },
});

export default muiTheme;