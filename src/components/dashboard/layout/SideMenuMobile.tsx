'use client'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from '@/components/dashboard/layout/MenuButton';
import MenuContent from '@/components/dashboard/layout/MenuContent';

import Session from "supertokens-web-js/recipe/session";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
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
      } finally {
        setLoading(false);
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
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              sx={{ width: 24, height: 24 }}
            />
            {loading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <Typography component="p" variant="h6">
                {userEmail}
              </Typography>
            )}
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={logout}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
