import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from '@/components/dashboard/layout/MenuButton';
import ColorModeToggle from '@/components/ColorModeToggle';

export default function Header() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        justifyContent: 'flex-end',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeToggle />
      </Stack>
    </Box>
  );
}
