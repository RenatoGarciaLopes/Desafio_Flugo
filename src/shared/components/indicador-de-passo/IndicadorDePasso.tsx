// src/shared/components/indicador-de-passo/IndicadorDePasso.tsx
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
        transform: 'scale(1.1)', // Efeito de "aproximar" (pop/escala)
    },
    '&.completed': {
        backgroundColor: theme.palette.primary.main,
    },
    // Adiciona uma classe para quando o formulário está completamente finalizado
    '&.formCompleted': {
        backgroundColor: theme.palette.primary.main,
        // Você pode adicionar um transform diferente ou outro efeito se quiser um "pop" final
        // transform: 'scale(1.2)', 
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
    // Estilo para o conector quando o formulário está completamente finalizado
    '&.formCompleted': {
        backgroundColor: theme.palette.primary.main,
    },
    '&.active': {
        height: 'auto', 
        backgroundColor: theme.palette.grey[400],
    }
}));


// Defina os passos fora do componente para evitar recriação desnecessária
// IMPORTANTE: Se você moveu steps para um arquivo de constantes (EMPLOYEE_FORM_STEPS),
// você precisaria importá-lo aqui também, ou passá-lo como prop.
// Por enquanto, vamos assumir que está definido localmente ou que o hook o provê.
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

    // LÓGICA PRINCIPAL DA ANIMAÇÃO:
    // 1. Se o formulário está CONCLUÍDO, todos os ícones são CheckIcon
    if (isFormCompleted) { 
        iconComponent = <CheckIcon />;
        statusClass = 'completed formCompleted'; // Adiciona a classe 'formCompleted'
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 
    // 2. Se não está concluído, mas o passo já foi COMPLETO (passou por ele)
    else if (isCompleted) {
        iconComponent = <CheckIcon />;
        statusClass = 'completed';
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 
    // 3. Se é o passo ATIVO
    else if (isActive) {
        iconComponent = <Typography variant="body2">{stepIndex + 1}</Typography>;
        statusClass = 'active';
        textColor = theme.palette.text.primary;
        fontWeight = 'bold';
    } 
    // 4. Se é um passo FUTURO
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
                    // O conector também fica verde se o passo estiver completo OU se o formulário inteiro estiver completo
                    className={isCompleted || isFormCompleted ? 'completed' : (isActive ? 'active' : '')} 
                />
            )}
        </Box>
    );
};