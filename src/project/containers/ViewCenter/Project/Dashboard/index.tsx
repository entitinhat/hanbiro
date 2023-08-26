import { Grid } from '@mui/material';
import TimeSheetDashboard from '@project/containers/TimeSheet/Dashboard';

import GanttContainer from '../Gantt';
import Left from './Left';
import Right from './Right';

interface DashboardProps {
  menuSource: string;
  menuSourceId: string;
}

function Dashboard(props: DashboardProps) {
  const { menuSource, menuSourceId } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <GanttContainer /> */}
        <TimeSheetDashboard data={[]} />
      </Grid>
      <Grid item xs={12} md={7}>
        <Left />
      </Grid>
      <Grid item xs={12} md={5}>
        <Right menuSource={menuSource} menuSourceId={menuSourceId} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
