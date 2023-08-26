import { useMemo } from 'react';

//material
import { ArticleOutlined, History, NoteAltOutlined } from '@mui/icons-material';

//project
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import ViewDetail from '@quote/containers/ViewDetail';

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

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Details',
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
          />
        )
      },
      {
        default: false,
        label: 'Timeline',
        path: 'timeline',
        order: 2,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'Notes',
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
