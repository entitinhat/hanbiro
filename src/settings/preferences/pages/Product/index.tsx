import { ReactNode, useState } from 'react';

//project
import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';

//material
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import ProductAttribute from '@settings/preferences/containers/ProductAttribute';
import ProductGeneral from '../../containers/ProductGeneral/index';
import SKUGenerator from '@settings/preferences/containers/SKUGenerator';
import ProductGroup from '@settings/preferences/containers/ProductGroup';
import { useTranslation } from 'react-i18next';

const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_product_general',
    value: 'general'
  },
  {
    label: 'ncrm_generalsetting_preferences_product_product_group',
    value: 'group'
  },
  {
    label: 'ncrm_generalsetting_preferences_product_attributes',
    value: 'attribute'
  },
  {
    label: 'ncrm_generalsetting_preferences_product_sku_generator',
    value: 'sku'
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
      id={`preference-product-tabpanel-${index}`}
      aria-labelledby={`preference-product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const PreferenceProduct = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <MainCard
      sx={{
        m: 2
        // height: '100vh',
        // '& .MuiCardContent-root': {
        //   bgcolor: theme.palette.common.white
        // }
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="preference product tabs">
            {TABS.map((_tab: LabelValue, index: number) => (
              <Tab
                key={_tab.value}
                label={t(_tab.label)}
                id={`preference-product-tab-${index}`}
                aria-controls={`preference-product-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <ProductGeneral />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ProductGroup />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <ProductAttribute />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <SKUGenerator />
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default PreferenceProduct;
