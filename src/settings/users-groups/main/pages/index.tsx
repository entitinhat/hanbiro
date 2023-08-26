import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import Header from '@base/layouts/SettingLayout/Header';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { USERS_GROUPS_MENU } from '@settings/users-groups/config/subMenus';
import useDevice from '@base/hooks/useDevice';
import { useRecoilValue } from 'recoil';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { SUB_SETTING_MENU_USERS_GROUPS } from '@base/containers/License/config';

interface TemplateContentMainProps {}
const TemplateContentMain: React.FC = (props: TemplateContentMainProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const { settingPageRoute } = useRecoilValue(licenseMenuAtom);
  const menuItems = settingPageRoute[SUB_SETTING_MENU_USERS_GROUPS] ?? [];
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Header title={t('ncrm_common_admin_menu_manage_users_groups')} menus={menuItems} />
      </Box>
      <Stack direction="row" sx={{ height: '100%' }}>
        {!isMobile && <MenuLayout menuItems={menuItems} />}
        <Box
          //component="main"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'hidden',
            bgcolor: theme.palette.background.default
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};
export default TemplateContentMain;
