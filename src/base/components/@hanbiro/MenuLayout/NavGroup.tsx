import { NavItemType } from '@base/types/menu';
import { List } from '@mui/material';
import { useState } from 'react';
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

interface Props {
  item: NavItemType;
}

const NavGroup = ({ item }: Props) => {
  const [openItem, setOpenItem] = useState<string>('');

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} openItem={openItem} setOpenItem={setOpenItem} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} openItem={openItem} setOpenItem={setOpenItem} />;
      default:
        return <></>;
    }
  });

  return <List sx={{ mt: 0, py: 0, zIndex: 0 }}>{navCollapse}</List>;
};

export default NavGroup;
