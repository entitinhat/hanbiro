import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { menuAtom } from '@base/store/atoms/menu';
import { NavItemType } from '@base/types/menu';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import NavItem from './NavItem';
import { KeyboardArrowDown, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface Props {
  menu: NavItemType;
  level: number;
}

const NavCollapse = ({ menu, level }: Props) => {
  const theme = useTheme();
  const menuState = useRecoilValue(menuAtom);
  const { drawerOpen } = menuState;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const childrens = menu.children ? menu.children : [];
    childrens.forEach((item) => {
      if (pathname && pathname.includes('product-details')) {
        if (item.url && item.url.includes('product-details')) {
          setOpen(true);
        }
      }

      if (item.url === pathname) {
        setOpen(true);
        setSelected(menu.id);
      }
    });
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return <></>;
    }
  });

  // const borderIcon = level === 1 ? <BorderOutlined style={{ fontSize: '1rem' }} /> : false;
  // const menuIcon = menu.icon ? <FormIcon icon={menu.icon.icon} iconType={menu.icon.iconType} /> : borderIcon;
  const textColor = 'grey.400';
  const iconSelectedColor = 'grey.300';

  return (
    <>
      <ListItemButton
        disableRipple
        selected={selected === menu.id}
        onClick={handleClick}
        sx={{
          pl: `${level * 16}px`,
          borderRadius: 1,
          my: 0.5,
          py: 0.5,
          color: textColor,
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            bgcolor: 'transparent',
            color: iconSelectedColor,
            '&:hover': { color: iconSelectedColor, bgcolor: 'transparent' }
          }
        }}
      >
        {/* {menuIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: selected === menu.id ? 'primary.main' : menu.icon?.color || textColor
            }}
          >
            {menuIcon}
          </ListItemIcon>
        )} */}
        <ListItemText
          primary={
            <Stack spacing={1}>
              <Typography variant="body1" sx={{ fontSize: 17, color: selected === menu.id ? '#d9d9d9' : textColor }}>
                {t(menu.title as string)}
              </Typography>
              <Divider sx={{ borderColor: '#444444' }} />
            </Stack>
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
