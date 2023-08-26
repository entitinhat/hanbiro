import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  TimelineConnector,
  TimelineItem,
  Timeline as MuiTimeline,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineContent
} from '@mui/lab';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import useDevice from '@base/hooks/useDevice';
import { Timeline } from '@base/types/timeLine';
import { useTranslation } from 'react-i18next';
import { makeContent } from './Helper';

interface ItemProps {
  data: Timeline;
  isRecent: boolean;
}

const Item = (props: ItemProps) => {
  const { data, isRecent } = props;

  const { isMobile } = useDevice();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TimelineItem>
      <TimelineOppositeContent
        color="text.secondary"
        // sx={{ pr: isMobile ? 3 : 6, py: isMobile ? 2 : 5 }}
      >
        {convertDateTimeServerToClient({ date: data?.createdAt?.toString(), humanize: false, isTime: true })}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector
          sx={{
            // color: isSelected ? theme.palette.text.secondary : theme.palette.divider,
            // border: isSelected ? '2px solid' : '1px solid',
            borderRadius: '10px'
          }}
        />
      </TimelineSeparator>
      <TimelineContent
      // sx={{ pl: isMobile ? 3 : 6, py: isMobile ? 2 : 4 }}
      >
        <Box>
          <Stack direction="column" spacing={1}>
            {data?.action == 'updated' ? (
              <>
                <Typography fontWeight={500}>{`${data?.section?.replace('SECTION_', '')} ${data?.content?.[0]?.field}`}</Typography>
                {makeContent(t, data)}
              </>
            ) : (
              <>
                <Typography fontWeight={500}>{`${data?.section?.replace('SECTION_', '')} ${data?.action}`}</Typography>
              </>
            )}
            <Typography color="secondary">{`by ` + data?.createdBy?.name}</Typography>
            {/* {route && !isRecent && <RouteName name={`View the ${route.label}`} url={route.link} />} */}
          </Stack>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};
export default Item;
