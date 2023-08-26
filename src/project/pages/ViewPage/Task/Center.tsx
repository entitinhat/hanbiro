import { useMemo } from 'react';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { ArticleOutlined, DashboardOutlined, ViewTimelineOutlined } from '@mui/icons-material';
import Detail from '@project/containers/ViewCenter/Task/Detail';
import TimelineContainer from '@project/containers/Timeline';
import Comment from '@project/containers/Comment';
import { Chip, Stack, Typography } from '@mui/material';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId } = props;
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Detail',
        path: 'detail',
        order: 0,
        icon: <DashboardOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <Detail menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: (
          <Stack direction="row" spacing={1}>
            <Typography>Comments</Typography>
            <Chip label="5" size="small" sx={{ borderRadius: 4 }} />
          </Stack>
        ),
        path: 'comment',
        order: 1,
        icon: <ArticleOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <Comment />
      },
      {
        default: false,
        label: 'Timeline',
        path: 'timeline',
        order: 7,
        icon: <ViewTimelineOutlined sx={{ fontSize: 18 }} />,
        iconPosition: 'start',
        tabComponent: <TimelineContainer />
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
