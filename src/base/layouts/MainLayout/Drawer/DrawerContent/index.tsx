import SimpleBar from '@base/components/third-party/SimpleBar';
import { Box, Divider } from '@mui/material';
import SearchBox from '../../Header/HeaderContent/Search/SearchBox';
// import { NavItemType } from '@base/types/menu';
// import { Divider } from '@mui/material';

import Navigation from './Navigation';
// import NavCollapse from './Navigation/NavCollapse';

const DrawerContent = () => {
  // const menuItem: NavItemType = {
  //   id: 'favorite',
  //   title: 'Favorite',
  //   type: 'collapse',
  //   icon: {
  //     icon: 'Star',
  //     iconType: 'feather',
  //     color: '#fdc414'
  //   },
  //   children: [
  //     {
  //       id: 'account',
  //       title: 'Account',
  //       type: 'item',
  //       url: '/dashboard/default'
  //     },
  //     {
  //       id: 'product_list',
  //       title: 'Product List',
  //       type: 'item',
  //       url: '/dashboard/analytics'
  //     }
  //   ]
  // };

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Box sx={{p: 1}}>
        <SearchBox />
      </Box>
      <Divider sx={{borderColor: '#444444'}} />
      <Navigation />
    </SimpleBar>
  );
};

export default DrawerContent;
