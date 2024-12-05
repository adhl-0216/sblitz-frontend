import React, { createContext, useState, ReactNode } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { AlertSeverity } from '@/types/alert';

type AlertContextType = {
    showAlert: (message: string, severity: AlertSeverity) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<{ message: string; severity: AlertSeverity } | null>(null);

    const showAlert = (message: string, severity: AlertSeverity) => {
        setAlert({ message, severity });
    };

    const handleAlertClose = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <Snackbar open autoHideDuration={5000} onClose={handleAlertClose}>
                    <MuiAlert onClose={handleAlertClose} severity={alert.severity} variant="filled">
                        {alert.message}
                    </MuiAlert>
                </Snackbar>
            )}
        </AlertContext.Provider>
    );
};
