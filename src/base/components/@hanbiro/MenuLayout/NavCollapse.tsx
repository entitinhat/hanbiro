import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { menuAtom } from '@base/store/atoms/menu';
import { NavItemType } from '@base/types/menu';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavItem from './NavItem';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { FormIcon } from '../FormIcon';
import _ from 'lodash';

interface Props {
  menu: NavItemType;
  level: number;
  openItem: string;
  setOpenItem: (id: string) => void;
}

const NavCollapse = ({ menu, level, openItem, setOpenItem }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    setOpen(!open);
  };

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} openItem={openItem} setOpenItem={setOpenItem} />;
      default:
        return <></>;
    }
  });

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main';
  const menuIcon = menu.icon ? <FormIcon icon={menu.icon.icon} iconType={menu.icon.iconType} fontSize={menu.icon.fontSize} /> : false;
  const isSelected = openItem.indexOf(menu.id) === 0;

  return (
    <>
      <ListItemButton
        disableRipple
        selected={isSelected}
        onClick={handleClick}
        sx={{
          zIndex: 1201,
          pl: `${level * 24}px`,
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'primary.lighter',
            // borderLeft: `3px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': {
              color: iconSelectedColor,
              bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'primary.lighter'
            }
          }
        }}
      >
        {menuIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected ? 'primary.main' : menu.icon?.color || textColor
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
              {menu.title}
            </Typography>
          }
        />
        {open ? <KeyboardArrowUpRounded sx={{ fontSize: 18, ml: 1 }} /> : <KeyboardArrowDownRounded sx={{ fontSize: 18, ml: 1 }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ p: 0 }}>{navCollapse}</List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
