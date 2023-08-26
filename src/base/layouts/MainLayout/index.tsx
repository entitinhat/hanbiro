import { ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { headerHeight } from '@base/config/config';
// import useConfig from '@base/hooks/useConfig';
import { menuWithDrawerOpen, menuWithOpenItem } from '@base/store/selectors/app';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MainDrawer from './Drawer';
import Header from './Header';
import _ from 'lodash';
import useDevice from '@base/hooks/useDevice';
import VersionDialog from '@base/containers/VersionDialog';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = useRecoilState(menuWithDrawerOpen);
  console.log('drawerOpen', drawerOpen);
  const openItem = useRecoilValue(menuWithOpenItem);
  const theme = useTheme();
  // const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { isMobile, isDesktop } = useDevice();
  // const { miniDrawer } = useConfig();
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    setDrawerOpen(!open);
  };

  // useEffect(() => {
  //   setOpen(!matchDownLG);
  //   setDrawerOpen(!matchDownLG);
  // }, [matchDownLG]);
  // if openItem menu => hide drawerOpen
  useEffect(() => {
    if (!_.isEmpty(openItem)) {
    }
  }, [openItem]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <VersionDialog />
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          // position: 'absolute',
          // top: headerHeight,
          display: 'flex',
          width: '100%',
          height: `calc(100vh - ${headerHeight}px)`,
          minHeight: `calc(100vh - ${headerHeight}px)`,
          flexDirection: 'row',
          overflow: 'hidden'
        }}
      >
        {isMobile && <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />}
        <Box
          component="main"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // flexGrow: 1,
            overflow: 'hidden',
            height: '100%',
            bgcolor: isMobile ? theme.palette.background.default : theme.palette.background.paper
          }}
        >
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
