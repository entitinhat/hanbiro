import {
  TimelineConnector,
  TimelineItem,
  Timeline,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineContent
} from '@mui/lab';
import {Box, Stack} from '@mui/material';
import Item from './Item';
import {timelineOppositeContentClasses} from '@mui/lab/TimelineOppositeContent';

interface TimelineProps {
}

const date = new Date('2020-05-12T23:50:21.817Z');

const TimeLine = (props: TimelineProps) => {
  return (
    <Box>
      <Timeline
        position="right"
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.17
          }
        }} onResize={undefined} onResizeCapture={undefined}>
        {[...Array(3)].map((x, i) => (
          <Item
            key={i}
            title="Marketing list updated"
            user={{
              id: '22779486-f43a-4530-b77f-31a932dd0a23',
              name: 'Darlene Robertson',
              fullName: 'Darlene Robertson'
            }}
            createdAt={date}
          />
        ))}
      </Timeline>
    </Box>
  );
};

export default TimeLine;
