import React from 'react';

//third-party
import { Outlet } from 'react-router-dom';

//material
import { Box, Stack, useTheme } from '@mui/material';

//project
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import Header from './Header';
import { DIGITAL_MENUS } from './contants';

const MainPage: React.FC = () => {
  const theme = useTheme();

  const menuProps = {
    menuItems: DIGITAL_MENUS
    //title: 'Preferences'
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
      <Header title="Online Digital Content" menu="digital" />
      <Stack direction="row" sx={{ height: 'calc(100% - 40px)' }}>
        <MenuLayout {...menuProps} />
        <Box
          //component="main"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'hidden',
            bgcolor: theme.palette.background.paper
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
};

export default MainPage;
