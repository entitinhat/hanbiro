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
import Members from '@marketing-list/containers/Members';

interface CenterProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData, ignoreFields } = props;
  const { t } = useTranslation();

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: false,
        label: t('Members'),
        path: 'members',
        order: 1,
        // icon: <History fontSize="small" />,
        // iconPosition: 'start',
        tabComponent: <Members menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_timeline'),
        path: 'timeline',
        order: 2,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_notes'),
        path: 'note',
        order: 3,
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
