import React, { useMemo, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

// mui import
import { Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AddOutlined, ArrowBackOutlined, Close, DensityMedium } from '@mui/icons-material';

// project import
import { ViewHeaderProps } from '../types/interface';
import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';
import { headerHeight } from '@base/config/config';
import { LabelValueIcon, LabelValueButton, LabelValueIconPath } from '@base/types/app';
import { useTranslation } from 'react-i18next';
import CategoryMenu from '@base/components/@hanbiro/List/ListToolbar/CategoryMenu';
import useDevice from '@base/hooks/useDevice';
import Dropdown, { DropdownProps } from '@base/components/@hanbiro/Dropdown'; // using dropdown replace for menu render
import { useRecoilValue } from 'recoil';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { ALL_LICENSE_KEY_BY_MENU } from '@base/containers/License/config';

const Header = (props: ViewHeaderProps) => {
  const {
    menu,
    isSplitMode,
    onMenuChange,
    title,
    onNew,
    addOptions,
    moreActions,
    onMore,
    newTitle,
    listTitle,
    hideChangeMenu = false,
    hideBackButton = false
  } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { mainPageRoute } = useRecoilValue(licenseMenuAtom);
  const menus = useMemo(() => {
    const licenseKey = ALL_LICENSE_KEY_BY_MENU[menu ?? ''] ?? '';
    const menus = mainPageRoute[licenseKey];
    console.log('category-check - View page', menus);
    if (menus) return menus;
    // return []
    return props.menus;
  }, [menu]);
  // current path
  let { label, path } = useMemo(() => menus?.find((item: any) => item.value == menu) || { path: '/' }, [menus, menu]);
  // if (tabPath) path = tabPath;

  const moreButton = useMemo(() => {
    return onMore?.map((item: LabelValueButton, index: number) => {
      return (
        <Button
          size="small"
          key={index}
          variant="contained"
          color={item.color}
          onClick={() => {
            item?.onClick && item.onClick();
          }}
        >
          <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>
            {t(item.label)}
          </Typography>
        </Button>
      );
    });
  }, [onMore]);

  const newButton = useMemo(() => {
    return (
      onNew && (
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => {
            onNew && onNew();
          }}
          size="small"
          sx={{
            height: 32
          }}
        >
          <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>
            {newTitle ?? t(`ncrm_common_btn_new`)}
          </Typography>
        </Button>
      )
    );
  }, [onNew, addOptions]);

  // category change
  const handeFilterChange = (newCategory: string) => {
    if (onMenuChange) {
      onMenuChange(newCategory);
    } else {
      let { path } = menus?.find((item: any) => item.value == newCategory);
      navigate(path);
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSort = Boolean(anchorEl);
  const handleClickItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, item: LabelValueIcon) => {
    setAnchorEl(null);
    item?.onClick && item.onClick();
  };

  const categoryMenuProps = {
    items: menus as LabelValueIconPath[],
    menu: menu,
    selected: menu ?? '',
    onClick: handeFilterChange
  };

  const dropDownMoreOption: DropdownProps = {
    disableChangeTitle: true,
    items: moreActions || [],
    icon: <DensityMedium sx={{ fontSize: 16 }} />,
    minWidth: 320,
    size: 'small',
    variant: 'outlined',
    listTitle: listTitle,
    color: 'secondary'
  };

  const handleMenuChange = (item: LabelValueIcon) => {
    item?.onClick && item.onClick();
  };

  return (
    <Suspense fallback={<></>}>
      <MainCard
        border={false}
        content={false}
        sx={{
          position: 'relative',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 0,
          height: headerHeight,
          minHeight: headerHeight,
          // bgcolor: theme.palette.mode == 'dark' ? theme.palette.background.paper : '#f4f6f8',
          // borderBottom: `1px solid ${theme.palette.divider}`,
          overflow: 'visible' // display dropdown menu when using dropdown component
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, zIndex: 1 }}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={0.75}
            sx={{ flexGrow: 1, display: 'flex', px: 2 }}
          >
            {/* back icon, change menu */}
            {!isSplitMode && (
              <Stack direction="row" justifyContent="space-around" alignItems="center">
                {!hideBackButton && (
                  <IconButton
                    variant="outlined"
                    size="small"
                    sx={{
                      border: 0,
                      ml: 0
                    }}
                    onClick={() => {
                      navigate(path);
                    }}
                  >
                    <ArrowBackOutlined fontSize="small" />
                  </IconButton>
                )}
                {!isMobile && !hideChangeMenu && (
                  <>
                    <CategoryMenu isDetail={true} {...categoryMenuProps} />
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ marginX: '8px' }} />
                  </>
                )}
              </Stack>
            )}

            {/* view title */}
            {title && (
              <Box className="view-title" sx={{ width: '45%' }}>
                {title}
              </Box>
            )}
            {/* right button */}
            <Stack sx={{ ml: 'auto !important' }} direction="row" justifyContent="space-around" alignItems="center" spacing={0.75}>
              {moreButton}
              {!isMobile && moreActions && (
                <Box>
                  {/* <IconButton
                    onClick={handleClickItem}
                    variant="outlined"
                    size='small'
                    color="secondary"
                    sx={{
                      border: '1px solid',
                      borderColor: theme.palette.divider,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.lighter,
                        borderColor: theme.palette.secondary.light
                      },
                      display: 'flex',
                      alignItems: 'center',
                      width: 32,
                      height: 32
                    }}
                  >
                    <DensityMedium
                      // fontSize={'small'}
                      sx={{ fontSize: 16 }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openSort}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: isMobile ? 'center' : 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: isMobile ? 'center' : 'right'
                    }}
                    sx={{
                      mt: .5
                    }}
                  >
                    {moreActions?.map((item: LabelValueIcon, index: number) => {
                      return (
                        <Box key={index}>
                          {item.value === 'divider' ? (
                            <Divider sx={{ mt: 1, mb: 1 }} />
                          ) : (
                            <MenuItem key={index} disableRipple onClick={(event) => handleMenuItemClick(event, item)}>
                              <ListItemIcon>{item?.icon}</ListItemIcon>
                              <ListItemText>{t(item?.label)}</ListItemText>
                            </MenuItem>
                          )}
                        </Box>
                      );
                    })}
                  </Menu> */}

                  {/* using dropDownComponent */}
                  <Dropdown {...dropDownMoreOption} onChange={(value) => handleMenuChange(value)} />
                </Box>
              )}
              {newButton}
              {isSplitMode && (
                <IconButton
                  variant="text"
                  size="small"
                  color="secondary"
                  onClick={() => {
                    navigate(path);
                  }}
                >
                  <Close fontSize={'small'} />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Box>
      </MainCard>
    </Suspense>
  );
};

Header.defaultProps = {};

export default Header;
