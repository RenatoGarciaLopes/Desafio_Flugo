import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };


  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true, error: null, errorInfo: null }; 
  }


  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);

  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            p: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Ocorreu um erro!
          </Typography>
          <Typography variant="body1" mb={2}>
            Lamentamos, mas algo deu errado. Por favor, tente novamente mais tarde.
          </Typography>
          {this.state.error && (
            <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f9f9f9', maxWidth: '600px', overflowX: 'auto' }}>
              <Typography variant="subtitle2" color="error">Detalhes do Erro:</Typography>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', textAlign: 'left' }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </Box>
          )}
          <Button variant="contained" color="primary" onClick={this.handleReload} sx={{ mt: 3 }}>
            Recarregar Página
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;