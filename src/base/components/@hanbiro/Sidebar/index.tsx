import { useMediaQuery } from '@mui/material';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { headerHeight } from '@base/config/config';

const openedMixin = (theme: Theme, width: number | string): CSSObject => ({
  width: width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflow: 'hidden',
  boxShadow: 'none'
});

const closedMixin = (theme: Theme, width: number | string): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflow: 'hidden',
  width: width,
  display: 'none',
  boxShadow: 'none'
});

interface SidebarProps extends DrawerProps {
  open?: boolean;
  width: number | string;
  overlay?: number;
}

const SideBar = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })<SidebarProps>(
  ({ theme, open, width, overlay, anchor }) => {
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return {
      width: width,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme, width),
        '& .MuiDrawer-paper': matchDownSM
          ? { ...openedMixin(theme, width), border: 'none', top: 0 }
          : overlay
          ? { ...openedMixin(theme, width), border: 'none', top: headerHeight, boxShadow: theme.customShadows.z1 }
          : { ...openedMixin(theme, width), top: headerHeight }
      }),
      ...(!open && {
        ...closedMixin(theme, width),
        '& .MuiDrawer-paper': closedMixin(theme, width)
      }),
      ...(overlay && { position: 'absolute', right: 0, top: 0, bottom: 0 })
    };
  }
);

export default SideBar;
