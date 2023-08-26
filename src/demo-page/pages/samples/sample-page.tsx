import './sample.scss';
import '@process/pages/MainPage/diagram-new.scss';

import { lazy, ReactElement, useState } from 'react';
// react import
import { useTranslation } from 'react-i18next';

// project import
import SideBar from '@base/components/@hanbiro/Sidebar';
import { Box, Button, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';

import TabPersonal from './Personal';
import Header from './Header';
import TabContainer from './Tabs';
import { headerHeight } from '../../../base/config/config';

const TestError = lazy(() => import('./TestError'));

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = (): ReactElement => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const overlay = false;
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        // justifyContent: 'center',
        // minHeight: '1px',
        overflow: 'hidden',
        padding: 0,
        width: '100%',
        bgcolor: theme.palette.background.paper
      }}
    >
      <Stack sx={{ width: '100%' }}>
        <Toolbar
          sx={{
            minHeight: headerHeight,
            height: headerHeight,
            p: 0,
            bgcolor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Button size="small" onClick={() => setOpen((cur) => !cur)}>
            Open
          </Button>
          <Header />
        </Toolbar>
        <TabContainer />
        {/* <ListGrid /> */}
        {/* <Stack
          sx={{
            padding: { xs: 0, md: '1rem', xl: '1rem' },
            ...(open && {
              width: matchDownSM || overlay ? '100%' : 'calc(100% - 400px)'
              // width: overlay ? { xs: '100%', md: 3, xl: 5.5 } : 0,
            }),
            ...(!open && {
              width: '100%'
            }),
            overflowY: 'auto',
            height: 'calc(100vh - 60px)'
          }}
        >
          <Box title={t('common_activity_activity')}>
            <Stack direction="row">
              <Button onClick={() => setOpen((cur) => !cur)}>Open</Button>
            </Stack>
            <DraggableTable />
            <Divider sx={{ margin: '20px 0' }} />
            <KanbanBoard />
          </Box>
        </Stack> */}
      </Stack>
      <SideBar anchor="right" width={matchDownSM ? '100%' : 400} overlay={overlay ? 1 : 0} variant="permanent" open={open}>
        <TabPersonal />
      </SideBar>
    </Box>
  );
};

export default SamplePage;
