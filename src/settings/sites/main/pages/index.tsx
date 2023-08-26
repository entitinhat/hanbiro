import Icon from '@base/assets/icons/svg-icons';
import { Box, Stack, useTheme } from '@mui/material';
import { keys } from 'lodash';
import React, { useState } from 'react';
import { SITE_MENU } from './contants';
import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { SUB_SETTING_MENU_SITES } from '@base/containers/License/config';
export const SITE_ADD_OPTIONS: Record<string, any> = {
  desk: {
    name: 'Desk',
    icon: Icon('desk')
  }
};

interface TemplateContentMainProps {}
const TemplateContentMain: React.FC = (props: TemplateContentMainProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { settingPageRoute } = useRecoilValue(licenseMenuAtom);
  const menuItems = settingPageRoute[SUB_SETTING_MENU_SITES] ?? [];
  const menuProps = {
    menuItems: menuItems
    //title: 'Preferences'
  };
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Header title={'ncrm_generalsetting_site_tilte'} />
      </Box>
      <Stack direction="row" sx={{ height: '100%' }}>
        <MenuLayout {...menuProps} />
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
