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
import { useTranslation } from 'react-i18next';
import ViewDetail from '@opportunity/containers/ViewDetail';
import Develop from '@opportunity/containers/Develop';
import Proposal from '@opportunity/containers/Propose';

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
  console.log('layoutData.data', layoutData.data);
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: false,
        label: t('Details'),
        path: 'details',
        order: 1,
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
        label: t('Develop'),
        path: 'develope',
        order: 2,
        tabComponent: <Develop menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('Propose'),
        path: 'propose',
        order: 3,
        tabComponent: <Proposal menuSourceId={menuSourceId} menuSourceName={layoutData.data?.title} />
      },
      {
        default: false,
        label: t('Activities'),
        path: 'activities',
        order: 4,
        tabComponent: <Activities menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_opportunity_timeline'),
        path: 'timeline',
        order: 5,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_opportunity_notes'),
        path: 'note',
        order: 6,
        icon: <NoteAltOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
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
