import { forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { LinkTarget, NavItemType } from '@base/types/menu';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface Props {
  item: NavItemType;
  openItem: string; //'customer'
  level: number;
  setOpenItem: (id: string) => void;
}

const NavItem = ({ item, openItem, level, setOpenItem }: Props) => {
  const theme = useTheme();
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

  const itemIcon = item.icon ? <FormIcon icon={item.icon.icon} iconType={item.icon.iconType} fontSize={item.icon.fontSize} /> : false;
  const isSelected = openItem === item.id;
  const { pathname } = useLocation();

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url || pathname.indexOf(item.url + '/') !== -1) {
      const newId = item.id ? item.id : '';
      setOpenItem(newId);
    }
  }, [pathname]);

  const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
  const iconSelectedColor = theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main';

  return (
    <ListItemButton
      {...listItemProps}
      onClick={() => setOpenItem(item.id || '')}
      selected={isSelected}
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
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : item.icon?.color || textColor
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
            {typeof item.title === 'string' ? t(item.title) : item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
