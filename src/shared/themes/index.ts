import { createTheme } from "@mui/material";


export const IndexTheme = createTheme({
    palette: {
        primary: {
            main: '#22c55e',
            dark: '#178941',
            light: '#4ed07e',
            contrastText: '#ffffff',
        },

        secondary:{
            main: '#1BB55C'
        },

        background: {
            default: '#ffffff'
        },

        text: {
            primary: '#000000',
            secondary: '#637381'
        }
    },

    typography: {
        
        fontFamily: [
            'Public Sans',
            'sans-serif'
        ].join(','),

        // Customiza variantes específicas
        h4: {
            fontWeight: 700, // Negrito
            fontSize: '2rem', // Exemplo de tamanho
        },
        body1: {
            fontWeight: 400, // Peso regular
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', // Impede que os botões fiquem em MAIÚSCULAS
            fontWeight: 700,
        }
    }
});