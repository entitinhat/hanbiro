import { useMemo } from 'react';

import ViewContent from '@desk/knowledge-base/containers/ViewContent';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import { PageLayoutData } from '@base/types/pagelayout';
import { ArticleOutlined, History, NoteAltOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import Attachments from '@base/containers/Attachments';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  reloadKB: (updateData: any) => void;
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields, reloadKB } = props;

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'ncrm_desk_knowledge_base_detail_header_details',
        path: 'content',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <ViewContent menuSource={menuSource} menuSourceId={menuSourceId} reloadKB={reloadKB} layoutData={layoutData} />
      },
      {
        default: false,
        label: 'ncrm_desk_knowledge_base_detail_header_timeline',
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_desk_knowledge_base_detail_header_attachment',
        path: 'attachment',
        order: 2,
        tabComponent: <Attachments menuSource={menuSource} menuSourceId={menuSourceId} />
      },

      {
        default: false,
        label: 'ncrm_desk_knowledge_base_detail_header_note',
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
