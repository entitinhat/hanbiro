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
import useDevice from '@base/hooks/useDevice';

interface ItemProps {
  title: string;
  user: User;
  route?: { link: string; label: string };
  createdAt: Date;
  isSelected?: boolean;
}
const Item = (props: ItemProps) => {
  const { title, user, route, createdAt, isSelected = false } = props;
  const { isMobile } = useDevice();
  const theme = useTheme();
  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary" sx={{ px: isMobile ? 3 : 2, py: isMobile ? 2 : 4, textAlign: 'left' }}>
        {convertDateTimeServerToClient({ date: createdAt.toString(), humanize: false, isTime: true })}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector
          sx={{
            color: isSelected ? theme.palette.text.secondary : theme.palette.divider,
            border: isSelected ? '2px solid' : '1px solid',
            borderRadius: '10px'
          }}
        />
      </TimelineSeparator>
      <TimelineContent sx={{ pr: isMobile ? 3 : 4, py: isMobile ? 2 : 4 }}>
        <Content
          title="Account updated"
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
