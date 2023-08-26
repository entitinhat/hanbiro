import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';
import { Box, Grid, Tab, Tabs, useTheme } from '@mui/material';
import { useMenuSettings } from '@settings/general/hooks/useMenuSetting';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cost from './Cost';
import Objectives from './Objectives';

const TABS: LabelValue[] = [
  {
    label: 'General',
    value: 'general'
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
      id={`preference-marketing-tabpanel-${index}`}
      aria-labelledby={`preference-marketing-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const PreferenceMarketing = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [objItems, setObjItems] = useState<any>([]);
  const [costData, setCostData] = useState<any>(null);
  const theme = useTheme();
  const { t } = useTranslation();

  //get data
  const params = {
    keys: ['campaign_objective', 'campaign_cost'],
    menus: ['marketing']
  };
  const { data: settingData, isLoading } = useMenuSettings(params);
  //console.log('settingData', settingData);

  //set setting data
  useEffect(() => {
    if (settingData?.data) {
      const newObjectiveValue = settingData.data.find((_ele: any) => _ele.key === 'campaign_objective');
      if (newObjectiveValue) {
        try {
          setObjItems(JSON.parse(newObjectiveValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
      const newCostValue = settingData.data.find((_ele: any) => _ele.key === 'campaign_cost');
      if (newCostValue) {
        try {
          setCostData(JSON.parse(newCostValue.value));
        } catch {
          // console.log('Parse error.');
        }
      }
    }
  }, [settingData]);

  //change tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <MainCard
      sx={{
        m: 2,
        //height: '100vh',
        '& .MuiCardContent-root': {
          bgcolor: theme.palette.background.paper
        }
      }}
    >
      <Box sx={{ pb: 2, maxHeight: 'calc(100vh - 160px)' }} className="scroll-box">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="preference marketing tabs">
            {TABS.map((_tab: LabelValue, index: number) => (
              <Tab
                key={_tab.value}
                label={t(_tab.label)}
                id={`preference-marketing-tab-${index}`}
                aria-controls={`preference-marketing-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Objectives data={objItems} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Cost data={costData} />
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default PreferenceMarketing;
