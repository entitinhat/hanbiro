import { ReactNode, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';

import { ViewTabsProps } from './interface';
import { useTranslation } from 'react-i18next';
import SpanLang from '../SpanLang';
import RetryErrorBoundary from '../Errors/RetryErrorBoundary';

// ==============================|| TABS - ICON ||============================== //
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
  disableTabPadding?: boolean;
}

function a11yProps(index: number) {
  return {
    id: `view-tab-${index}`,
    'aria-controls': `view-tabpanel-${index}`
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, disableTabPadding = false, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`view-tabpanel-${index}`} aria-labelledby={`view-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: disableTabPadding ? 0 : 2, height: '100%' }}>{children}</Box>}
    </div>
  );
}

const ViewTabs = (props: ViewTabsProps) => {
  console.log('ViewTabs');
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const { tabs, disableTabPadding = false } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Tabs
        variant="scrollable"
        sx={{ borderBottom: 1, borderColor: 'divider', p: 1 }}
        value={tabIndex}
        onChange={handleChange}
        aria-label="view tabs"
      >
        {tabs?.map((tab, idx) => {
          return (
            <Tab
              sx={{ fontWeight: theme.typography.fontWeightRegular, '&:hover': { bgcolor: 'transparent' } }}
              key={tab.path}
              // icon={tab.icon}
              // iconPosition={tab.iconPosition}
              label={typeof tab.label === 'string' ? <SpanLang keyLang={tab.label} /> : tab.label}
              {...a11yProps(idx)}
            />
          );
        })}
      </Tabs>
      {/* <SwipeableViews
        enableMouseEvents={matchesMD ? true : false}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        hysteresis={0.3}
        onChangeIndex={handleChangeIndex}
        // disabled // If true, it will disable touch events. This is useful when you want to prohibit the user from changing slides.
      > */}
      <>
        {tabs?.map((tab, idx) => {
          return (
            <TabPanel key={tab.path} value={tabIndex} index={idx} dir={theme.direction} disableTabPadding={disableTabPadding}>
              <RetryErrorBoundary>{tab.tabComponent}</RetryErrorBoundary>
            </TabPanel>
          );
        })}
      </>
      {/* </SwipeableViews> */}
    </Box>
  );
};
export default ViewTabs;
