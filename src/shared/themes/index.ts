import { createTheme } from "@mui/material";
import { appPaleta } from "./paleta";
import { appTipografia } from "./tipografia";

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
    palette: appPaleta,
    typography: appTipografia,
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                /* Regras para o preenchimento automático (autofill) */
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0px 1000px white inset !important; 
                    -webkit-text-fill-color: #000000 !important; 
                    color: #000000 !important; 
                    transition: background-color 5000s ease-in-out 0s; 
                }

            `,
        },

    },
});
