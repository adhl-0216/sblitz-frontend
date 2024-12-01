'use client';
import React, { useContext, useState, useEffect } from 'react';
import withProtectedRoute from '@/components/withProtectedRoute';
import BillsContainer from '@/components/dashboard/billsContainer/BillsContainer';
import { AlertContext } from '@/app/(dashboard-layout)/layout';
import { AlertSeverity } from '@/types/alert';
import { Typography, CircularProgress } from '@mui/material';

function DashboardPage() {
  const alertContext = useContext(AlertContext);
  const [error, setError] = useState<string | null>(null);


  if (!alertContext) {
    return <Typography color="error">Alert context is not available. This is likely a configuration error.</Typography>;
  }

  return (
    <BillsContainer
      showAlert={alertContext.showAlert}
      onError={(errorMessage: string) => {
        setError(errorMessage);
        alertContext.showAlert(errorMessage, AlertSeverity.Error);
      }}
    />
  );
}

export default withProtectedRoute(DashboardPage);
