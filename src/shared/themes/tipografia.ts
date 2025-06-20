import type { TypographyVariantsOptions } from "@mui/material";

export const appTipografia: TypographyVariantsOptions = {
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
};