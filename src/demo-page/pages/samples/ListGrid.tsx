import { CSSProperties } from 'react';

// material-ui
import { CardProps, Grid, ChipProps } from '@mui/material';
import ActivityCard from './ActivityCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
  sx?: CardProps['sx'];
  style?: CSSProperties;
}

export interface ActivityCardProps {
  subject: string;
  dueDate: string;
  activityDate: string;
  status: {
    color: ChipProps['color'];
    name: 'todo' | 'progress' | 'done' | 'hold';
  };
  from: {
    id: string;
    name: string;
  }[];
  to: {
    id: string;
    name: string;
  }[];
  priority: {
    color: ChipProps['color'];
    name: 'lower' | 'low' | 'normal' | 'high' | 'urgent';
  };
  activityType: {
    icon: 'task' | 'call' | 'sms' | 'email';
    color: ChipProps['color'];
    name: 'task' | 'call' | 'sms' | 'email';
  };
  direction?: 'in' | 'out';
}

const data: ActivityCardProps[] = [
  {
    subject: 'Task1',
    dueDate: '10 days ago',
    activityDate: '2022/11/16 12:30',
    status: {
      color: 'magenta',
      name: 'todo'
    },
    from: [{ id: '1', name: 'Account1' }],
    to: [{ id: '1', name: 'Jikime' }],
    priority: {
      color: 'error',
      name: 'high'
    },
    activityType: {
      icon: 'task',
      color: 'primary',
      name: 'task'
    },
    direction: 'out'
  },
  {
    subject: 'Check My Email',
    dueDate: '3 weeks ago',
    activityDate: '2022/10/12 21:38',
    status: {
      color: 'primary',
      name: 'progress'
    },
    from: [{ id: '1', name: 'Account1' }],
    to: [{ id: '1', name: 'Jikime' }],
    priority: {
      color: 'warning',
      name: 'urgent'
    },
    activityType: {
      icon: 'email',
      color: 'success',
      name: 'email'
    },
    direction: 'in'
  },
  {
    subject: 'Check My Email',
    dueDate: '3 weeks ago',
    activityDate: '2022/10/12 21:38',
    status: {
      color: 'primary',
      name: 'progress'
    },
    from: [{ id: '1', name: 'Account1' }],
    to: [{ id: '1', name: 'Jikime' }],
    priority: {
      color: 'warning',
      name: 'urgent'
    },
    activityType: {
      icon: 'email',
      color: 'success',
      name: 'email'
    },
    direction: 'in'
  },
  {
    subject: 'Check My Email',
    dueDate: '3 weeks ago',
    activityDate: '2022/10/12 21:38',
    status: {
      color: 'primary',
      name: 'progress'
    },
    from: [{ id: '1', name: 'Account1' }],
    to: [{ id: '1', name: 'Jikime' }],
    priority: {
      color: 'warning',
      name: 'urgent'
    },
    activityType: {
      icon: 'email',
      color: 'success',
      name: 'email'
    },
    direction: 'in'
  }
];

const ListGrid = ({ sx, style }: Props) => {
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {data.map((activity: ActivityCardProps, index: number) => (
        <Grid key={index} item xs={12} sm={6} lg={4}>
          <ActivityCard activity={activity} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListGrid;
