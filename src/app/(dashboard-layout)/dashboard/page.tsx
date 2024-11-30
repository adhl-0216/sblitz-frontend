'use client';
import React from 'react';
import { useAlert } from '@/hooks/useAlert';
import withProtectedRoute from '@/components/withProtectedRoute';
import BillsContainer from '@/components/dashboard/billsContainer/BillsContainer';
import { Alert, Snackbar } from '@mui/material';

function DashboardPage() {
  const { alert, showAlert, handleAlertClose } = useAlert();

  return (
    <>
      <BillsContainer showAlert={showAlert} />
      {/* Snackbar for alerts */}
      {
        alert && (
          <Snackbar open autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={alert.severity}>
              {alert.message}
            </Alert>
          </Snackbar>
        )
      }
    </>
  );
}

export default withProtectedRoute(DashboardPage);
