import { Avatar, Box, IconButton } from "@mui/material"


export const Cabecalho = () =>{

    return (

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton>
            <Avatar alt="Renato Lopes" />
        </IconButton>
        </Box>
    )
}
