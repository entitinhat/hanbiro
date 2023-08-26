import _ from 'lodash';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import SideBar from '@base/components/@hanbiro/Sidebar';
import { MENU_PROCESS_BUSINESS } from '@base/config/menus';
import { Box, Stack, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { SettingView, SettingWrite } from '@process/pages/WritePage/Setting';
import { settingOpenAtom } from '@process/store/atoms/setting';
import SpanLang from '@base/components/@hanbiro/SpanLang';

import { SettingTabs } from './Helper';
import SettingTab from './Tab';
import PageToolbar from './Toolbar';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../config/queryKeys';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`process-setting-tabpanel-${index}`}
      aria-labelledby={`process-setting-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `process-setting-tab-${index}`,
    'aria-controls': `process-setting-tabpanel-${index}`
  };
}

interface ListPageProps {
  isSplitMode: boolean;
}

const SettingListPage = ({ isSplitMode }: ListPageProps) => {
  console.log('SettingListPage');
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { category = MENU_PROCESS_BUSINESS } = useParams();
  const settingOpen = useRecoilValue(settingOpenAtom);
  const resetSettingOpen = useResetRecoilState(settingOpenAtom);

  const onCloseWrite = useCallback(() => {
    resetSettingOpen();
  }, []);

  const [tabIndex, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const onRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.definedItems] });
  }, []);

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={onRefresh} />;
  }, [isSplitMode]);

  return (
    <RetryErrorBoundary>
      <ListContainer>
        <Stack
          sx={{
            width: settingOpen.open ? `calc(100% - ${settingOpen.size}px)` : '100%',
            flexGrow: 1,
            overflow: 'hidden',
            height: '100%'
          }}
        >
          {PageToolbarMemo}

          <Box sx={{ px: 2 }}>
            <Tabs
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              value={tabIndex}
              variant="scrollable"
              onChange={handleChange}
              aria-label="process setting tabs"
            >
              {SettingTabs.map((tab, idx) => {
                const itemIcon = <FormIcon icon={tab.icon} iconType={tab.iconType} />;
                return (
                  <Tab
                    sx={{ '&:hover': { bgcolor: 'transparent' } }}
                    key={tab.value}
                    label={<SpanLang keyLang={tab.label} />}
                    icon={itemIcon}
                    iconPosition={tab.iconPosition}
                    {...a11yProps(idx)}
                  />
                );
              })}
            </Tabs>
            <SwipeableViews
              enableMouseEvents
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={tabIndex}
              hysteresis={0.3}
              onChangeIndex={handleChangeIndex}
            >
              {SettingTabs.map((v, idx) => {
                return (
                  <TabPanel key={v.value} value={tabIndex} index={idx} dir={theme.direction}>
                    <SettingTab isSplitMode={isSplitMode} selectedTab={v.value} selectedType={v.type} />
                  </TabPanel>
                );
              })}
            </SwipeableViews>
          </Box>
        </Stack>
        <SideBar anchor="right" width={matchDownSM ? '100%' : settingOpen.size} variant="permanent" open={settingOpen.open}>
          <Suspense fallback={<></>}>
            {settingOpen.data ? (
              <SettingView selectedTab={settingOpen.type} data={settingOpen.data} onClose={onCloseWrite} />
            ) : (
              <SettingWrite selectedTab={settingOpen.type} onClose={onCloseWrite} />
            )}
          </Suspense>
        </SideBar>
      </ListContainer>
    </RetryErrorBoundary>
  );
};

export default SettingListPage;
