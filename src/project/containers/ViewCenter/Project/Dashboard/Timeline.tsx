import dayjs from 'dayjs';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { TIMELINE_PAGE_SIZE } from '@base/config/constant';
import { MENU_SOURCE } from '@base/config/menus';
import { queryKeys } from '@base/config/queryKeys';
import { makeContent } from '@base/containers/TimeLine/Helper';
import { useTimelinesLimit } from '@base/hooks/timeline/useTimelines';
import { RefreshRounded } from '@mui/icons-material';
import { Timeline, TimelineConnector, TimelineContent, TimelineSeparator } from '@mui/lab';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';

interface TimelineProps {
  menuSource: string;
  menuSourceId: string;
}

function TimelineContainer(props: TimelineProps) {
  const { menuSource, menuSourceId } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  const timelineParams = {
    source: {
      menu: MENU_SOURCE[menuSource],
      id: menuSourceId
    },
    filter: {
      sort: {
        field: 'createdAt',
        orderBy: 'DESC'
      },
      paging: {
        size: TIMELINE_PAGE_SIZE
      }
    }
  };

  const { data: results, refetch } = useTimelinesLimit([queryKeys.timelines, menuSourceId], timelineParams);

  console.log('timelines', results);

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          Timeline
        </Typography>
        <IconButton size="small" onClick={() => refetch()}>
          <RefreshRounded sx={{ color: 'primary.main', fontSize: 18 }} />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ p: 1 }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0
            },
            py: 0
          }}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {results?.data.map((item) => {
            return (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <HanAvatar size="xs" name={item.createdBy?.name!!} />
                  <TimelineConnector sx={{ my: 1 }} />
                </TimelineSeparator>
                <TimelineContent sx={{ mb: 1.5, py: 0 }}>
                  <Stack spacing={1}>
                    {makeContent(t, item)}
                    <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                      <Typography>{item.createdBy?.name}</Typography>
                      <Typography color="textSecondary">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}</Typography>
                    </Stack>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Stack>
    </Box>
  );
}

export default TimelineContainer;
