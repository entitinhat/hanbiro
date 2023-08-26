import { useMemo } from 'react';

//material
import { ArticleOutlined, History, NoteAltOutlined, PendingActions, SupportAgent } from '@mui/icons-material';

//project
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import Activities from '@base/containers/Activities';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import ViewDetail from '@customer/containers/ViewDetail';
import CustomerTicket from '@customer/containers/CustomerTicket';
import { useTranslation } from 'react-i18next';
import CustomerContactView from '@customer/containers/CustomerContactView';
import { CUSTOMER_CATEGORY_ACCOUNT } from '@customer/config/constants';

interface CenterProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch: () => void;
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData, ignoreFields, onRefetch } = props;
  const { t } = useTranslation();

  const tabsMemo: TabProps[] = useMemo(() => {
    const tabs: TabProps[] = [
      {
        default: true,
        label: t('ncrm_customer_details'),
        path: 'detail',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ViewDetail
            menuSource={menuSource}
            menuCategory={menuCategory}
            menuSourceId={menuSourceId}
            layoutData={layoutData}
            ignoreFields={ignoreFields}
            readOnly={layoutData?.data?.restore?.id ? true : false}
            onRefetch={onRefetch}
          />
        )
      },
      {
        default: false,
        label: t('ncrm_customer_timeline'),
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },

      {
        default: false,
        label: t('ncrm_customer_activities'),
        path: 'activity',
        order: 3,
        icon: <PendingActions fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Activities menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_tickets'),
        path: 'ticket',
        order: 4,
        icon: <SupportAgent fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <CustomerTicket menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_notes'),
        path: 'note',
        order: 5,
        icon: <NoteAltOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];

    if (menuCategory === CUSTOMER_CATEGORY_ACCOUNT) {
      tabs.splice(2, 0, {
        default: false,
        label: t('ncrm_customer_contacts'),
        path: 'contact',
        order: 2,
        icon: <PendingActions fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <CustomerContactView menuSource={menuSource} menuSourceId={menuSourceId} menuSourceName={layoutData?.data?.name || ''} isCenter />
        )
      });
    }

    return tabs;
  }, [layoutData]);

  const viewTabsProps = { menuSource, menuSourceId, tabs: tabsMemo };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
};

export default Center;
