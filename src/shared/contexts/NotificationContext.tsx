// src/shared/context/NotificationContext.tsx
import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import { Alert, Snackbar, type AlertColor } from '@mui/material';

// Definindo o tipo para as opções de notificação
interface NotificationOptions {
  message: string;
  severity?: AlertColor; 
  duration?: number; 
}


interface NotificationContextType {
  showNotification: (options: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationOptions | null>(null);

  const showNotification = useCallback((options: NotificationOptions) => {
    setNotification({
      message: options.message,
      severity: options.severity || 'info', 
      duration: options.duration !== undefined ? options.duration : 6000, 
    });
    setOpen(true);
  }, []);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Snackbar
          open={open}
          autoHideDuration={notification.duration === -1 ? null : notification.duration} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity={notification.severity}
            sx={{ width: '100%' }}
            variant="filled" 
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};