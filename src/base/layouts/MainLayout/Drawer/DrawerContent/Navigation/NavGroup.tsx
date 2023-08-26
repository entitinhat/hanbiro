import { NavItemType } from '@base/types/menu';
import { List } from '@mui/material';

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

interface Props {
  item: NavItemType;
}

const NavGroup = ({ item }: Props) => {
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return <></>;
    }
  });

  return <List sx={{ mt: 0, mx: 1, py: 0, zIndex: 0 }}>{navCollapse}</List>;
};

export default NavGroup;
