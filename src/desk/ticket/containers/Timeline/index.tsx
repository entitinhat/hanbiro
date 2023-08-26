import { Timeline } from '@mui/lab';
import { Box, Button, Divider, Stack } from '@mui/material';
import Item from './Item';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import Filter from './Filter';
import useDevice from '@base/hooks/useDevice';
import { useState } from 'react';
interface TimelineProps {}

const date = new Date();

const TicketTimeline = (props: TimelineProps) => {
  const { isMobile } = useDevice();
  const [maxItems, setMaxItems] = useState<number>(3);
  return (
    <Box>
      {/* <Box sx={{ p: 1, pt: 0, pb: 2, display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
        <Filter onChangeFilter={() => {}} />
      </Box> */}
      <Divider />
      <Timeline
        position="right"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: isMobile ? 0.1 : 0.8
          }
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
        {/* <Box sx={{ pl: 2 }}>
          <Button
            onClick={() => {
              setMaxItems(maxItems + 5);
            }}
          >
            View more
          </Button>
        </Box> */}
      </Timeline>
    </Box>
  );
};

export default TicketTimeline;
