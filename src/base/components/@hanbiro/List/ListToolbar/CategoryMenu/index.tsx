import React, { useEffect, useMemo, useState } from 'react';
import IconButton from '@base/components/@extended/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Menu, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { LabelValueIcon, LabelValueIconPath } from '@base/types/app';
import { StarOutlineRounded } from '@mui/icons-material';
import { isFunction, reduce } from 'lodash';
import { UPDATE_USER_SETTING } from '@base/services/graphql/setting';
import useMutationPost from '@base/hooks/useMutationPost';
import { listFavoriteAtom, pinSubMenuSettingsAtom } from '@base/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { FormIconProps } from '@base/components/@hanbiro/FormIcon/common';
import { ALL_LICENSE_KEY_BY_MENU } from '@base/containers/License/config';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';

export interface CategoryMenuProps {
  menu?: string;
  items: LabelValueIconPath[];
  selected?: string;
  pinned?: string;
  onClick: (v: string) => void;
  isSmall?: boolean;
  mainIconProps?: FormIconProps | (() => FormIconProps);
  isDetail?: boolean;
}

interface MenuRequest {
  userSetting: {
    menu: string;
    key: string;
    value: string;
  };
}

const CategoryMenu = (props: CategoryMenuProps) => {
  const { menu = '', selected = '', isSmall = false, mainIconProps: iMainIconProps, onClick, isDetail = false } = props;
  const { t } = useTranslation();
  const { mainPageRoute } = useRecoilValue(licenseMenuAtom);
  const items = useMemo(() => {
    const licenseKey = ALL_LICENSE_KEY_BY_MENU[menu] ?? '';
    const items = mainPageRoute[licenseKey];
    console.log('category-check List Page', items);
    if (items) return items;
    return props.items;
    // return [];
  }, [menu]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClickItem = (v: string) => {
    //console.log('categorymenu', v);
    onClick && onClick(v);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [favoriteList, setFavoriteList] = useRecoilState(listFavoriteAtom);
  const [pinSubMenuSettings, setPinSubMenuSettings] = useRecoilState(pinSubMenuSettingsAtom);

  const { mutate: mUpdate } = useMutationPost<MenuRequest>(UPDATE_USER_SETTING, 'setting_updateUserSetting');
  const defaultActive = pinSubMenuSettings?.[menu] ?? '';

  const [activeValue, setActiveValue] = useState(defaultActive);

  useEffect(() => {
    if (pinSubMenuSettings) {
      const nActive = pinSubMenuSettings[menu] ?? '';
      setActiveValue(nActive);
    }
  }, [pinSubMenuSettings]);

  const handleOnPinClick = (nVal: string) => {
    //console.log('menu', menu, nVal);
    const nSettings = {
      ...pinSubMenuSettings,
      [menu]: nVal
    };
    const userSetting = {
      menu: 'common',
      key: 'pin_submenu',
      value: JSON.stringify(nSettings)
    };

    mUpdate(
      { userSetting: userSetting },
      {
        onSuccess: (res: any) => {
          //console.log('nsetting', nSettings);
          setPinSubMenuSettings(nSettings);
        }
      }
    );
  };

  const handleOnFavourite = (title: string, selected: any) => {
    const addItem: any = {
      menuKey: selected,
      menuTitle: title,
      menuPath: `/${menu}/${selected}`
    };
    const newFavorites: any[] = favoriteList.filter((_item: any) => {
      if (_item.menuKey != addItem.menuKey) {
        return _item;
      }
    });
    if (newFavorites?.length === favoriteList?.length) {
      newFavorites.push(addItem);
    }

    setFavoriteList(newFavorites);
    const params = {
      menu: 'common',
      key: 'menu_favorites',
      value: JSON.stringify(newFavorites)
    };
    mUpdate({ userSetting: params });
  };

  const itemRefer = reduce(
    items,
    function (f: any, v: LabelValueIcon) {
      f[v.value] = v;
      return f;
    },
    {}
  );

  let headerTitle = '-- None --';
  if (typeof itemRefer[selected] === 'object') {
    headerTitle = itemRefer[selected].label;
  } else {
    headerTitle = itemRefer[selected];
  }

  const theme = useTheme();

  const mainIconProps: FormIconProps = {
    icon: menu,
    iconType: 'main',
    ...(isFunction(iMainIconProps) ? iMainIconProps() : iMainIconProps)
  };

  return (
    <Stack direction="row" spacing={0} alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        {/* {!isSmall && !isDetail && (
          <Box sx={{ color: theme.palette.secondary.main, mr: 0.5, lineHeight: 1 }}>
            <FormIcon {...mainIconProps} />
          </Box>
        )} */}
        {!isDetail && (
          <Tooltip title={t('ncrm_common_tooltip_add_favorite') as string}>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => handleOnFavourite(headerTitle, selected)}
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#faad14'
                }
              }}
            >
              <StarOutlineRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <Button
          variant="text"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={items.length > 1 ? handleClick : undefined}
          endIcon={items.length > 1 ? <KeyboardArrowDownIcon fontSize={'small'} /> : undefined}
          sx={{
            '&:hover': {
              border: 0,
              borderColor: 'transparent !important',
              bgcolor: 'transparent !important',
              boxShadow: 'none'
            },
            minWidth: 0,
            px: 0.5,
            ml: `0px !important`
          }}
          size="small"
        >
          <Typography
            variant={'voraTollbar'}
            noWrap
            sx={{
              textTransform: 'capitalize'
            }}
          >
            <SpanLang keyLang={headerTitle} textOnly />
          </Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: {
              minWidth: 185,
              maxWidth: 300,
              py: 0.5
            }
          }}
        >
          {items.map((v, i) => (
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white
                }
              }}
              key={i}
              //selected={selected === v.value}
              disabled={selected === v.value}
              onClick={() => handleOnClickItem(v.value)}
            >
              <Typography
                component="span"
                sx={{
                  flex: '1 1 0%'
                }}
              >
                <SpanLang keyLang={v?.label} textOnly />
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </Stack>
  );
};

export default CategoryMenu;
