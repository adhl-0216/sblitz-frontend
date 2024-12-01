'use client';
import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAlert } from '@/hooks/useAlert';
import AppNavbar from '@/components/dashboard/AppNavbar';
import Header from '@/components/dashboard/Header';
import SideMenu from '@/components/dashboard/SideMenu';
import { AlertSeverity } from '@/types/alert';

export const AlertContext = React.createContext<{
    showAlert: (message: string, severity: AlertSeverity) => void;
} | null>(null);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { alert, showAlert, handleAlertClose } = useAlert();

    return (
        <AlertContext.Provider value={{ showAlert }}>
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: alpha(theme.palette.background.default, 1),
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'start',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        {children}
                    </Stack>
                </Box>
            </Box>

            {alert && (
                <Snackbar open autoHideDuration={6000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </AlertContext.Provider>
    );
}
