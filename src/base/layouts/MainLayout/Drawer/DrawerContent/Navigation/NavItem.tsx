import { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { menuWithDrawerOpen, menuWithOpenItem } from '@base/store/selectors/app';
import { LinkTarget, NavItemType } from '@base/types/menu';
import { Divider, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  item: NavItemType;
  level: number;
}

const NavItem = ({ item, level }: Props) => {
  const [openItem, setOpenItem] = useRecoilState(menuWithOpenItem);
  const setDrawerOpen = useSetRecoilState(menuWithDrawerOpen);
  const { t } = useTranslation();

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const listItemProps: {
    component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
    href?: string;
    target?: LinkTarget;
  } = { component: forwardRef((props, ref) => <Link {...props} to={item.url!} target={itemTarget} />) };

  // const itemIcon = item.icon ? <FormIcon icon={item.icon.icon} iconType={item.icon.iconType} /> : false;
  const isSelected = openItem.findIndex((id: string) => id === item.id) > -1;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === item.url || pathname.indexOf(item.url + '/') !== -1) {
      const newState = item.id ? [item.id] : [];
      setOpenItem(newState);
    }
  }, [pathname]);

  const textColor = 'grey.400';
  const iconSelectedColor = 'grey.300';

  return (
    <ListItemButton
      {...listItemProps}
      onClick={() => setDrawerOpen(false)}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: `${level * 16}px`,
        my: 0.5,
        py: 0.5,
        borderRadius: 1,
        '&:hover': {
          bgcolor: 'transparent'
        },
        '&.Mui-selected': {
          bgcolor: 'transparent',
          color: iconSelectedColor,
          '&:hover': {
            color: iconSelectedColor,
            bgcolor: 'transparent'
          }
        }
      }}
    >
      {/* {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : item.icon?.color || textColor
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )} */}
      <ListItemText
        primary={
          <Stack spacing={1}>
            <Typography variant="body1" sx={{ fontSize: 17, color: isSelected ? '#d9d9d9' : textColor }}>
              {t(item.title as string)}
            </Typography>
            <Divider sx={{ borderColor: '#444444' }} />
          </Stack>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
