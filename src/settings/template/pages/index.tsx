import React from 'react';
//third-party
import { Outlet } from 'react-router-dom';

import MenuLayout from '@base/components/@hanbiro/MenuLayout';
import { Box, Stack, useTheme } from '@mui/material';

// import MenuLayout from './MenuLayout';
import { TEMPLATE_MENU } from './contants';
import Header from './Header';
import { useRecoilValue } from 'recoil';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { SUB_SETTING_MENU_TEMPLATE } from '@base/containers/License/config';

interface TemplateContentMainProps {}
const TemplateContentMain: React.FC = (props: TemplateContentMainProps) => {
  const theme = useTheme();
  const { settingPageRoute } = useRecoilValue(licenseMenuAtom);
  const menuItems = settingPageRoute[SUB_SETTING_MENU_TEMPLATE]
  const menuProps = {
    menuItems: menuItems??[]
    //title: 'Preferences'
  };
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Header title="ncrm_setting_template_template" />
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
