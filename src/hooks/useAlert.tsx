import { AlertSeverity } from '@/types/alert';
import { useState } from 'react';

export function useAlert() {
    const [alert, setAlert] = useState<{ message: string; severity: AlertSeverity } | null>(null);

    const showAlert = (message: string, severity: AlertSeverity) => {
        setAlert({ message, severity });
    };

    const handleAlertClose = () => {
        setAlert(null);
    };

    return { alert, showAlert, handleAlertClose };
}
