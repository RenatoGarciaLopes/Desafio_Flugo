import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { IndexTheme } from './shared/themes';
import ErrorBoundary from './shared/components/error-boundary/ErrorBoundary';
import { NotificationProvider } from './shared/contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider theme = {IndexTheme}>
      <BrowserRouter>
        <CssBaseline />
        <ErrorBoundary>
        <NotificationProvider>
        <AppRoutes />
        </NotificationProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;