import React from 'react';

//third-party
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//material
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';

//project
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import { BILLING_LICENSE_MENUS } from '@settings/billing-license/config/constants';
import { NavItemType } from '@base/types/menu';
import Header from '@base/layouts/SettingLayout/Header';

const MainPage = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const billMenus: NavItemType[] = BILLING_LICENSE_MENUS.map((item: NavItemType) => {
    return {
      ...item,
      title: t(item.title as string),
      children: item.children?.map((_item: NavItemType) => {
        return {
          ..._item,
          title: t(_item.title as string)
        };
      })
    };
  });

  // console.log('pagePros', pageProps);
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
      <Header title={t('Bill & License')} menus={billMenus} />
      <Stack direction="row" sx={{ height: '100%' }}>
        {!matchDownMd && <MenuLayout menuItems={billMenus} />}
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
  );
};

export default MainPage;
