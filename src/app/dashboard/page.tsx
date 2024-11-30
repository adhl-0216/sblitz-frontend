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
import withProtectedRoute from '@/components/withProtectedRoute';
import BillsContainer from '@/components/dashboard/billsContainer/BillsContainer';

function DashboardPage() {
  const { alert, showAlert, handleAlertClose } = useAlert();

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <AppNavbar />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          <BillsContainer showAlert={showAlert} />
        </Stack>
      </Box>

      {/* Snackbar for alerts */}
      {alert && (
        <Snackbar open autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default withProtectedRoute(DashboardPage);
