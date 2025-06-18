import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { IndexTheme } from './shared/themes';

function App() {
  return (
    <ThemeProvider theme = {IndexTheme}>
      <BrowserRouter>
        <CssBaseline />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;