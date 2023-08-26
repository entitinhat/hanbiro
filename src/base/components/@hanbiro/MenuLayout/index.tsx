import { NavItemType } from '@base/types/menu';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import SimpleBar from '@base/components/third-party/SimpleBar';
import { drawerWidth } from '@base/config/config';
import NavGroup from './NavGroup';

interface MenuLayoutProps {
  menuItems: NavItemType[];
}

const MenuLayout = (props: MenuLayoutProps) => {
  const { menuItems = [] } = props;

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const navGroups = menuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return <></>;
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: matchDownSM ? '100%' : drawerWidth,
        borderRight: matchDownSM ? 'none' : `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        // backgroundColor: theme.palette.common.white,
        boxShadow: 'inherit',
        pt: 2
      }}
    >
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box>{navGroups}</Box>
      </SimpleBar>
    </Box>
  );
};

export default MenuLayout;
