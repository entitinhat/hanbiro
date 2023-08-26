import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePublicLanguageByMenu } from '@base/services/i18n';
import { Box, useTheme } from '@mui/material';
import { extractUrlParams } from '@public-page/site/utils';

const MainPage = () => {
  //hook
  const theme = useTheme();
  const siteParams = extractUrlParams();
  // load menu language
  usePublicLanguageByMenu(['common', 'pagelayout', 'generalsetting'], siteParams?.tk || '');

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Site</title>
      </Helmet>
      <Box sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
        <Box
          component="main"
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
      </Box>
    </>
  );
};

export default MainPage;
