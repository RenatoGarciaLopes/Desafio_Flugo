
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'; 
import { styled } from '@mui/system'; 
import { useTheme } from '@mui/material/styles'; 

const StyledIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 28,
    height: 28,
    transition: 'all 1s ease-in-out',

    backgroundColor: theme.palette.grey[400],

    '&.active': {
        backgroundColor: theme.palette.primary.main,
        boxShadow: (theme.shadows as string[])[3],
        transform: 'scale(1.1)', 
    },
    '&.completed': {
        backgroundColor: theme.palette.primary.main,
    },
    
    '&.formCompleted': {
        backgroundColor: theme.palette.primary.main,
        
    },

    '& .MuiSvgIcon-root': {
        fontSize: 18,
        transition: 'all 1s ease-in-out',
        color: theme.palette.common.white, 
    },

    '& .MuiTypography-root': {
        transition: 'color 1s ease-in-out',
        color: theme.palette.common.white,
    },

    '&.inactive .MuiTypography-root': {
        color: theme.palette.text.secondary,
    },
}));


const StyledConnector = styled(Box)(({ theme }) => ({
    width: 2,
    minHeight: 100, 
    backgroundColor: theme.palette.grey[400], 
    transition: 'background-color 1s ease-in-out, height 1s ease-in-out', 
    alignSelf: 'stretch', 
    marginLeft: 28 / 2 - 1, 

    '&.completed': {
        backgroundColor: theme.palette.primary.main, 
    },
    
    '&.formCompleted': {
        backgroundColor: theme.palette.primary.main,
    },
    '&.active': {
        height: 'auto', 
        backgroundColor: theme.palette.grey[400],
    }
}));


const steps = ['Infos Básicas', 'Infos Profissionais']; 

interface IndicadorDePassoProps {
    stepIndex: number;
    activeStep: number;
    isLastStep: boolean;
    isFormCompleted: boolean; // <--- Propriedade que indica se o formulário foi concluído
}

export const IndicadorDePasso = ({ stepIndex, activeStep, isLastStep, isFormCompleted }: IndicadorDePassoProps) => {
    const theme = useTheme(); 
    const isCompleted = stepIndex < activeStep;
    const isActive = stepIndex === activeStep;

    let iconComponent;
    let statusClass = 'inactive';
    let textColor = theme.palette.text.secondary; 
    let fontWeight = 'regular';

    
    if (isFormCompleted) { 
        iconComponent = <CheckIcon />;
        statusClass = 'completed formCompleted'; 
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 
    
    else if (isCompleted) {
        iconComponent = <CheckIcon />;
        statusClass = 'completed';
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 
    
    else if (isActive) {
        iconComponent = <Typography variant="body2">{stepIndex + 1}</Typography>;
        statusClass = 'active';
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 

    else {
        iconComponent = <Typography variant="body2">{stepIndex + 1}</Typography>;
        statusClass = 'inactive';
        textColor = theme.palette.text.secondary;
        fontWeight = 'regular';
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledIcon className={statusClass}>
                    {iconComponent}
                </StyledIcon>
                <Typography
                    variant="body1"
                    sx={{
                        ml: 2,
                        fontWeight: fontWeight,
                        color: textColor,
                        transition: 'color 1s ease-in-out, font-weight 1s ease-in-out'
                    }}
                >
                    {steps[stepIndex]}
                </Typography>
            </Box>

            
            {!isLastStep && (
                <StyledConnector
                    
                    className={isCompleted || isFormCompleted ? 'completed' : (isActive ? 'active' : '')} 
                />
            )}
        </Box>
    );
};