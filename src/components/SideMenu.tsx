import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Session from "supertokens-web-js/recipe/session";
import { SblitzIcon } from './CustomIcons';



const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  async function logout() {
    await Session.signOut();
    window.location.href = "/sign-in";
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <SblitzIcon />
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
        justifyContent='space-between'
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }} >
          <Avatar
            sizes="small"
            alt=""
            sx={{ width: 36, height: 36 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            riley@email.com
          </Typography>
        </Box>
        <IconButton onClick={logout}>
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Drawer>
  );
}
