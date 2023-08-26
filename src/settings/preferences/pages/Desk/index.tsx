import { ReactNode, useEffect, useRef, useState } from 'react';

//project
import MainCard from '@base/components/App/MainCard';
import { LabelValue } from '@base/types/app';
import { useMenuSettings, useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';

//material
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import DeskGeneral from '@settings/preferences/containers/DeskGeneral';
import DeskCategory from '@settings/preferences/containers/DeskCategory';
import DeskTag from '@settings/preferences/containers/DeskTag';
import DeskAssignment from '@settings/preferences/containers/DeskAssignment';
import DeskChannel from '@settings/preferences/containers/DeskChannel';
import { useTranslation } from 'react-i18next';
import SLATab from '@settings/preferences/containers/SLATab';

//local
// import EmailTerm from './EmailTerm';
// import SmsTerm from './SmsTerm';

const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_desk_general',
    value: 'general'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_categories',
    value: 'categories'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_tags',
    value: 'tag'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_assignment_group',
    value: 'assignment_group'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_assignment_sla',
    value: 'Service Level Agreement'
  },
  {
    label: 'ncrm_generalsetting_preferences_desk_channel',
    value: 'channel'
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
      id={`preference-desk-tabpanel-${index}`}
      aria-labelledby={`preference-desk-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const PreferenceDesk = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const { t } = useTranslation();
  //state

  //get data
  //get
  // const params = {
  //   keys: ['emails', 'domains', 'company_phones', 'personal_phones'],
  //   menus: ['activity', 'desk']
  // };
  // const { data: settingPost, isLoading } = useMenuSettings(params);

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <MainCard
      sx={{
        m: 2
        //height: '100vh',
        // '& .MuiCardContent-root': {
        //   bgcolor: theme.palette.common.white
        // }
      }}
    >
      <Box sx={{ pb: 2, maxHeight: 'calc(100vh - 160px)' }} className="scroll-box">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="preference activity tabs">
            {TABS.map((_tab: LabelValue, index: number) => (
              <Tab
                key={_tab.value}
                label={t(_tab.label)}
                id={`preference-desk-tab-${index}`}
                aria-controls={`preference-desk-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={0}>
          {/* General */}
          <DeskGeneral />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {/* Category */}
          <DeskCategory />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          {/* Tag */}
          <DeskTag />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          {/* Assignment User/Group */}
          <DeskAssignment />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          {/* Channel */}
          <SLATab />
        </TabPanel>
        <TabPanel value={activeTab} index={5}>
          {/* Channel */}
          <DeskChannel />
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default PreferenceDesk;
