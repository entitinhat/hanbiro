import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';
import { Box, Grid, Tab, Tabs, useTheme } from '@mui/material';
import CustomerDefaultCountry from '@settings/preferences/containers/CustomerDefaultCountry';
import CustomerDefaultType from '@settings/preferences/containers/CustomerDefaultType';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Options from './Options';

export const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_customer_rating',
    value: 'customer_rating'
  },
  {
    label: 'ncrm_generalsetting_preferences_customer_employee_role',
    value: 'employee_role'
  },
  {
    label: 'ncrm_generalsetting_preferences_customer_job_position',
    value: 'job_position'
  },
  // new tab
  {
    label: 'ncrm_generalsetting_preferences_customer_default_country',
    value: 'default_country'
  },
  {
    label: 'ncrm_generalsetting_preferences_customer_default_customer_type',
    value: 'default_customer_type'
  }
];

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`preference-customer-tabpanel-${index}`}
      aria-labelledby={`preference-customer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const PreferenceCustomer = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Grid className="scroll-box" height="100%" container spacing={2} p={2} pb={4}>
        <Grid item xs={12} md={6}>
          <CustomerDefaultType keyRoot="default_customer_type" />
          <CustomerDefaultCountry keyRoot="default_country" />
          <Options keyRoot="customer_rating" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Options keyRoot="employee_role" />
          <Options keyRoot="job_position" />
        </Grid>
      </Grid>
    </>
  );
};

export default PreferenceCustomer;
