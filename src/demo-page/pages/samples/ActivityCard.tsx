import { CSSProperties } from 'react';

// material-ui
import { Avatar, AvatarGroup, Box, Card, CardProps, Chip, ChipProps, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { East, West } from '@mui/icons-material';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ActivityCardProps } from './ListGrid';
import { MoreOutlined } from '@ant-design/icons';
import avatar1 from '@base/assets/images/users/avatar-1.png';
import avatar2 from '@base/assets/images/users/avatar-2.png';
import avatar3 from '@base/assets/images/users/avatar-3.png';
import avatar4 from '@base/assets/images/users/avatar-4.png';
// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  sx?: CardProps['sx'];
  style?: CSSProperties;
  activity: ActivityCardProps;
}

const ActivityCard = ({ sx, style, activity }: Props) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        border: '1px solid',
        borderRadius: 1,
        px: 1.5,
        py: 1,
        borderColor: theme.palette.grey.A800,
        ...sx
      }}
    >
      <Stack spacing={0.8}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            variant="combined"
            color={activity.activityType.color}
            label={activity.activityType.name}
            icon={<FormIcon icon={activity.activityType.icon} iconType="icon" size={12} />}
            size="small"
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" color="secondary">
              {activity.activityDate}
            </Typography>
            <IconButton edge="end" color="secondary">
              <MoreOutlined style={{ fontSize: '1.15rem' }} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" noWrap color="secondary">
            {activity.subject}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip variant="combined" color={activity.priority.color} label={activity.priority.name} size="small" />
            {activity.direction && (
              <Chip variant="combined" color="secondary" icon={activity.direction == 'in' ? <East /> : <West />} size="small" />
            )}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip variant="filled" color={activity.status.color} label={activity.status.name} size="small" />
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ClockCircleOutlined style={{ fontSize: '0.675rem' }} />
              <Typography variant="subtitle2" color="secondary">
                {activity.dueDate}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AvatarGroup max={3} sx={{ justifyContent: 'start', '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              <Avatar alt="Remy Sharp" src={avatar1} />
              <Avatar alt="Travis Howard" src={avatar2} />
            </AvatarGroup>
            <Divider orientation="vertical" sx={{ height: 25 }} />
            <AvatarGroup max={2} sx={{ justifyContent: 'start', '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              <Avatar alt="Remy Sharp" src={avatar3} />
            </AvatarGroup>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default ActivityCard;
