import { createTheme } from "@mui/material";


declare module '@mui/material/styles' {
  interface Palette {
    status: {
      inativoBg: string;
      inativoText: string;
      ativoBg: string;
      ativoText: string;
    };
  }
  interface PaletteOptions {
    status?: {
      inativoBg?: string;
      inativoText?: string;
      ativoBg?: string;
      ativoText?: string;
    };
  }
}

export const IndexTheme = createTheme({
    palette: {
        primary: {
            main: '#22c55e',
            dark: '#178941',
            light: '#4ed07e',
            contrastText: '#ffffff',
        },

        secondary: {
            main: '#1BB55C'
        },

        background: {
            default: '#ffffff'
        },

        text: {
            primary: '#000000',
            secondary: '#637381'
        },

        error: {
            main: '#d32f2f',
            contrastText: '#ffff',
        },
        success: {
            main: '#4caf50',
            contrastText: '#ffff',
        },
        status: {
            inativoBg: '#ffe4de',  
            inativoText: '#b71d18', 
            ativoBg: '#dbf6e5', 
            ativoText: '#118d57', 
        }

    },

    typography: {

        fontFamily: [
            'Public Sans',
            'sans-serif'
        ].join(','),

       
                h1: {
            fontWeight: 800,
            fontSize: '4rem', 
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem',
        },
        h3: { 
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h4: { 
            fontWeight: 700,
            fontSize: '2rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h6: { 
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        
        body1: {
            fontWeight: 400, 
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', 
        }
    }
});