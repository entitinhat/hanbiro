import RouteName from '@base/components/@hanbiro/RouteName';
import { User } from '@base/types/user';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import {
  TimelineConnector,
  TimelineItem,
  Timeline,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineContent
} from '@mui/lab';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import Content from './Content';

interface ItemProps {
  title: string;
  user: User;
  route?: { link: string; label: string };
  createdAt: Date;
}
const Item = (props: ItemProps) => {
  const { title, user, route, createdAt } = props;
  const theme = useTheme();
  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary" sx={{ pr: 6, py: 5 }}>
        {convertDateTimeServerToClient({ date: createdAt.toString(), humanize: false, isTime: true })}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ color: theme.palette.divider }} />
      </TimelineSeparator>
      <TimelineContent sx={{ pl: 6, py: 4 }}>
        <Content
          title="Lead marks as disqualified"
          user={{
            id: '22779486-f43a-4530-b77f-31a932dd0a23',
            name: 'Darlene Robertson',
            fullName: 'Darlene Robertson'
          }}
        />
      </TimelineContent>
    </TimelineItem>
  );
};
export default Item;
