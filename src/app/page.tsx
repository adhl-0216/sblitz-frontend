import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Dashboard />
      </Box>
    </Container>
  );
}
