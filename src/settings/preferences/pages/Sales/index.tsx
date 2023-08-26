import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import MainCard from '@base/components/App/MainCard';
import useDevice from '@base/hooks/useDevice';

import GeneralTab from './General';
import WeightedSalesTab from './WeightedSales';
import SalesTeamTab from './SalesTeam';

interface PreferenceLeadProps {}

const TABS: TabProps[] = [
  {
    default: true,
    label: 'ncrm_common_admin_menu_general',
    path: 'general',
    order: 0,
    tabComponent: <GeneralTab />
  },
  {
    default: false,
    label: 'ncrm_setting_lead_tab_weighted_sales_pipeline',
    path: 'weighted_sales_pipeline',
    order: 1,
    tabComponent: <WeightedSalesTab />
  },
  {
    default: false,
    label: 'ncrm_setting_lead_tab_sales_team',
    path: 'note',
    order: 2,
    tabComponent: <SalesTeamTab />
  }
];

const PreferenceLead = (props: PreferenceLeadProps) => {
  const viewTabsProps = { menuSource: '', menuSourceId: '', tabs: TABS };
  const { isMobile } = useDevice();
  return (
    <MainCard sx={{ m: 0, p: 0, maxHeight: 'calc(100vh - 150px)' }} className="scroll-box">
      <ViewTabs {...viewTabsProps} />
    </MainCard>
  );
};

export default PreferenceLead;
