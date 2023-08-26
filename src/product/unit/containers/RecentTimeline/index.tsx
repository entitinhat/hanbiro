import { Timeline } from '@mui/lab';
import { Box, Button, Divider, Stack, SxProps } from '@mui/material';
import Item from './Item';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import useDevice from '@base/hooks/useDevice';
import { useState } from 'react';


interface RecentTimelineProps {
  sx?: SxProps;
}

const date = new Date('2020-05-12T23:50:21.817Z');

const RecentTimeline = (props: RecentTimelineProps) => {
  const { sx } = props;
  const { isMobile } = useDevice();
  const [maxItems, setMaxItems] = useState<number>(3);
  return (
    <Box sx={{ ...sx }} >
      <Timeline
        position="right"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: isMobile ? 0.1 : 0.35
          },
          my: 0,
          px: 0
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {[...Array(maxItems)].map((x, i) => (
          <Item
            key={i}
            title="Lead marks as disqualified"
            user={{
              id: '22779486-f43a-4530-b77f-31a932dd0a23',
              name: 'Darlene Robertson',
              fullName: 'Darlene Robertson'
            }}
            route={{ link: 'http://localhost:8080/lead/', label: 'replacement order' }}
            createdAt={date}
            isSelected={i === 2 ? true : false}
          />
        ))}
      </Timeline>
    </Box>
  );
};

export default RecentTimeline;
