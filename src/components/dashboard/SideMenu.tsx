import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconButton, Skeleton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Session from "supertokens-web-js/recipe/session";

import MenuContent from '@/components/dashboard/MenuContent';
import { SblitzIcon } from '@/components/CustomIcons';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  async function getUserInfo() {
    try {
      const response = await axios.post('/api/auth/get-user-info');
      const userInfo = response.data;
      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.emails && userInfo.emails.length > 0) {
          setUserEmail(userInfo.emails[0]);
        } else {
          throw new Error('User email not found');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUserEmail('');
        window.location.href = '/login';
      }
    }
    fetchUserInfo();
  }, []);


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
          {loading ? (
            <Skeleton width={120} height={20} />
          ) : (
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {userEmail}
            </Typography>
          )}
        </Box>
        <IconButton onClick={logout}>
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Drawer>
  );
}
