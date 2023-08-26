// import React
import React, { ReactNode, useMemo } from 'react';

// import MUI components
import { Tab, Box, Tabs, useTheme } from '@mui/material';

// import components custom
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';

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
const NavbarOption = () => {
  const [tabIndex, setTabIndex] = React.useState<number>(1);
  const { t } = useTranslation();
  const theme = useTheme();
  const tabs: TabProps[] = useMemo(() => {
    const tabs: TabProps[] = [
      {
        default: true,
        label: 'Billing Address',
        path: 'Billing Address',
        order: 1,
        tabComponent: <>Billing Address</>
      },
      {
        label: 'Email Billing Address',
        path: 'Email Billing Address',
        order: 2,
        tabComponent: <>Email Billing Address</>
      },
      {
        label: 'Ship To',
        path: 'Ship To',
        order: 3,
        tabComponent: <>Ship To</>
      }
    ];
    return tabs;
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Box border={border}>
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
            <TabPanel key={tab.path} value={tabIndex} index={idx} dir={theme.direction} disableTabPadding={false}>
              <RetryErrorBoundary>{tab.tabComponent}</RetryErrorBoundary>
            </TabPanel>
          );
        })}
      </>
    </Box>
  );
};

export default NavbarOption;
