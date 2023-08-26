import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import AllItemTab from '@settings/billing-license/containers/LicensingGuide/AllItemTab';
import React, { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function a11yProps(index: number) {
  return {
    id: `view-tab-${index}`,
    'aria-controls': `view-tabpanel-${index}`
  };
}

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
  disableTabPadding?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, disableTabPadding = false, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`view-tabpanel-${index}`} aria-labelledby={`view-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: disableTabPadding ? 0 : 2, height: '100%' }}>{children}</Box>}
    </div>
  );
}

const LicenseGuide = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(1);
  const { t } = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  const tabs: TabProps[] = useMemo(() => {
    const tabs: TabProps[] = [
      {
        default: true,
        label: 'All Items',
        path: 'All Items',
        order: 1,
        tabComponent: <AllItemTab />
      },
      {
        label: 'Free Items Address',
        path: 'Free Items',
        order: 2,
        tabComponent: <AllItemTab />
      },
      {
        label: 'Paid Items',
        path: 'Paid Items',
        order: 3,
        tabComponent: <AllItemTab />
      },
      {
        label: 'Recharge Items',
        path: 'Recharge Items',
        order: 4,
        tabComponent: <AllItemTab />
      }
    ];
    return tabs;
  }, []);

  return (
    <Box border={border}>
      <Box borderBottom={border} p={2}>
        <Typography fontWeight={500}>Licensing Guide</Typography>
      </Box>
      <Box p={2}>
        <Tabs
          variant="scrollable"
          sx={{ borderBottom: 1, borderColor: 'divider', p: 1 }}
          value={tabIndex}
          onChange={handleChange}
          aria-label="view tabs"
        >
          {tabs?.map((tab: any, idx) => {
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
        <>
          {tabs?.map((tab, idx) => {
            return (
              <TabPanel key={tab.path} value={tabIndex} index={idx} dir={theme.direction} disableTabPadding={true}>
                <RetryErrorBoundary>{tab.tabComponent}</RetryErrorBoundary>
              </TabPanel>
            );
          })}
        </>
      </Box>
    </Box>
  );
};
export default LicenseGuide;
