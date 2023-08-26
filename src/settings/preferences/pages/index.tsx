import React from 'react';

//third-party
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//material
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';

//project
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import { PREFERENCES_MENUS } from '@settings/preferences/config/constants';
import { NavItemType } from '@base/types/menu';
import Header from '@base/layouts/SettingLayout/Header';
import { useRecoilValue } from 'recoil';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { SUB_SETTING_MENU_PREFERENCES } from '@base/containers/License/config';

const MainPage: React.FC = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const { settingPageRoute } = useRecoilValue(licenseMenuAtom);
  const menuItems = settingPageRoute[SUB_SETTING_MENU_PREFERENCES] ?? [];
  const preferenceMenus: NavItemType[] = menuItems?.map((item: NavItemType) => {
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
      <Header title={t('ncrm_common_admin_menu_preferences')} menus={preferenceMenus} />
      <Stack direction="row" sx={{ height: '100%' }}>
        {!matchDownMd && <MenuLayout menuItems={preferenceMenus} />}
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
