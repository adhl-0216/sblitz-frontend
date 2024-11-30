import { useState } from 'react';

export function useAlert() {
    const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

    const showAlert = (message: string, severity: 'success' | 'error') => {
        setAlert({ message, severity });
    };

    const handleAlertClose = () => {
        setAlert(null);
    };

    return { alert, showAlert, handleAlertClose };
}
