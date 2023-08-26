import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// material-ui
import { Badge, Box, Card, Chip, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';

// assets
import { FileTextOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import DraggableTable from '@demo-page/containers/Draggable/DraggableTable';
import ListGrid from './ListGrid';
import DiagramContainer from '@process/containers/Diagram/DiagramFlow2';
import KanbanBoard from '../../containers/Kanban/Board';

// ==============================|| PROFILE - ACCOUNT ||============================== //
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ overflow: 'auto', height: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TabContainer = () => {
  const [value, setValue] = useState(3);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
          <Tab
            label={
              <Stack direction="row" spacing={1}>
                <Typography>List Grid</Typography>
                <Chip label="5" size="small" sx={{ borderRadius: 4 }} />
              </Stack>
            }
            icon={<UserOutlined />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Badge badgeContent={4} color="primary">
                Draggable Table
              </Badge>
            }
            icon={<FileTextOutlined />}
            iconPosition="start"
            {...a11yProps(1)}
          />
          <Tab label="Kanban Board" icon={<LockOutlined />} iconPosition="start" {...a11yProps(2)} />
          <Tab label="Business Process" icon={<LockOutlined />} iconPosition="start" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ListGrid />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DraggableTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <KanbanBoard />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DiagramContainer />
      </TabPanel>
    </Stack>
  );
};

export default TabContainer;
