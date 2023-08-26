import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import Routes from '@demo-page/routes/Route';
import { Box, Stack, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface MainPageProps {}

function MainPage({}: MainPageProps) {
  const theme = useTheme();
  const items = Routes.children ?? [];
  const childItems: any[] = [];
  items.map((item) => {
    if (item.path) {
      childItems.push({
        id: item.path,
        title: item.path.toLocaleUpperCase(),
        type: 'item',
        url: item.path
      });
    }
  });
  const menuProps = {
    menuItems: [
      {
        id: 'demo-page',
        title: 'Demo Page',
        type: 'group',
        children: childItems
      }
    ]
  };

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
        <Header title="Demo Page" menu="demo-page" />
        <Stack direction="row" sx={{ height: '100%' }}>
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
    </>
  );
}

export default MainPage;
