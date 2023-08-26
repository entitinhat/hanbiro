import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import {
    ArticleOutlined, NoteAltOutlined, TaskAltOutlined, ViewTimelineOutlined
} from '@mui/icons-material';
import DevTask from '@project/containers/DevTask';
import TimelineContainer from '@project/containers/Timeline';
import PlanningFinishingQA from '@project/containers/ViewCenter/Planning/FinishingQA';
import Note from '@project/containers/ViewCenter/Project';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  projectId: string;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, projectId } = props;
  const { t } = useTranslation();
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: false,
        label: t('ncrm_project_dev_task'),
        path: 'project',
        order: 2,
        icon: <TaskAltOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <DevTask type="PLANNING" projectId={projectId} planningId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_project_finishing_qa'),
        path: 'qa',
        order: 3,
        icon: <ArticleOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <PlanningFinishingQA menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_project_timeline'),
        path: 'timeline',
        order: 7,
        icon: <ViewTimelineOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <TimelineContainer />
      },
      {
        default: false,
        label: t('ncrm_project_note'),
        path: 'note',
        order: 8,
        icon: <NoteAltOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <Note />
      }
    ];
  }, [menuSourceId, projectId]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, [viewTabsProps]);

  return <>{centerMemo}</>;
};

export default Center;
