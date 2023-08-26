import { useMemo } from 'react';

import { PageLayoutData } from '@base/types/pagelayout';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { ArticleOutlined, History, SupportAgent } from '@mui/icons-material';
import ViewContent from '@settings/sites/desk/containers/ViewContent';
import Timeline from '@base/containers/TimeLine';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import CustomerTicket from '@customer/containers/CustomerTicket';
import ListPage from '@desk/ticket/pages/ListPage';
interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  const { data } = layoutData;
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'ncrm_generalsetting_site_tab_detail',
        path: 'detail',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ViewContent menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />
        )
      },
      {
        default: false,
        label: 'ncrm_generalsetting_site_tab_timeline',
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_generalsetting_site_tab_all_ticket',
        path: 'tickets',
        order: 2,
        icon: <SupportAgent fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <ListPage isSplitMode={false} isShowToolbar={false} />
      }
    ];
  }, [layoutData]);
  const viewTabsProps = { menuSource, menuSourceId, tabs };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);
  return <>{centerMemo}</>;
};

export default Center;
