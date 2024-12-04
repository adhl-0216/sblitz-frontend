'use client';
import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AppNavbar from '@/components/dashboard/layout/AppNavbar';
import Header from '@/components/dashboard/layout/Header';
import SideMenu from '@/components/dashboard/layout/SideMenu';
import { AlertProvider } from '@/context/AlertContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AlertProvider>
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
        </AlertProvider>
    );
}
