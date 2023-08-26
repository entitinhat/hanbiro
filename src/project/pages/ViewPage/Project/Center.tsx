import { useMemo } from 'react';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import {
  ArticleOutlined,
  AttachFileOutlined,
  ChatOutlined,
  DashboardOutlined,
  NoteAltOutlined,
  RequestQuoteOutlined,
  TaskAltOutlined,
  ViewTimelineOutlined
} from '@mui/icons-material';
import Note from '@project/containers/ViewCenter/Project';
import TimelineContainer from '@project/containers/Timeline';
import DashboardContainer from '@project/containers/ViewCenter/Project/Dashboard';
import DevTask from '@project/containers/DevTask';
import Files from '@project/containers/ViewCenter/Project/Files';
import { useTranslation } from 'react-i18next';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId } = props;
  const { t } = useTranslation();
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: t('ncrm_common_dashboard'),
        path: 'dashboard',
        order: 0,
        icon: <DashboardOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <DashboardContainer menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_project_planning'),
        path: 'planning',
        order: 1,
        icon: <ArticleOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <div></div>
      },
      {
        default: false,
        label: t('ncrm_project_dev_task'),
        path: 'project',
        order: 2,
        icon: <TaskAltOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <DevTask type="PROJECT" projectId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_project_qa'),
        path: 'qa',
        order: 3,
        icon: <ArticleOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <div></div>
      },
      {
        default: false,
        label: t('ncrm_project_teamchannel'),
        path: 'team-channel',
        order: 4,
        icon: <ChatOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <div></div>
      },
      {
        default: false,
        label: t('ncrm_project_quote'),
        path: 'quote',
        order: 5,
        icon: <RequestQuoteOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <div></div>
      },
      {
        default: false,
        label: t('ncrm_project_files'),
        path: 'files',
        order: 6,
        icon: <AttachFileOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <Files />
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
  }, [menuSourceId]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, [viewTabsProps]);

  return <>{centerMemo}</>;
};

export default Center;
