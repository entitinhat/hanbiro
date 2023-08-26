import { useMemo } from 'react';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import { PageLayoutData } from '@base/types/pagelayout';
import { ArticleOutlined, History, NoteAltOutlined } from '@mui/icons-material';
import Marketing from '@lead/containers/Marketing';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Marketing', //Content
        path: 'content',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Marketing menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />
      },
      {
        default: false,
        label: 'Timeline', //Timeline
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'Notes', //Notes
        path: 'note',
        order: 2,
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
