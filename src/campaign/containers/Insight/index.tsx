import LinearProgressWithLabel from '@base/components/@hanbiro/LinearProgressWithLabel';
import { Box, CircularProgress, LinearProgress, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

interface InsightProps {}

const Insight = (props: InsightProps) => {
  const chartOptions = {
    chart: {
      height: 350
      //type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return '249';
            }
          }
        }
      }
    },
    labels: ['Opened', 'Bounced', 'Unopen']
  };

  return (
    <Box>
      <List>
        <ListItem divider>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Sent
            </Typography>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              2023-03-03
            </Typography>
          </Stack>
        </ListItem>
        <ListItem divider>
          <Stack direction="row" justifyContent={'space-between'} sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Recipients
            </Typography>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              150
            </Typography>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction="row" justifyContent={'space-between'} sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Total Sent
            </Typography>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              149
            </Typography>
          </Stack>
        </ListItem>
      </List>

      <ReactApexChart options={chartOptions} series={[50, 70, 30]} type="radialBar" height={350} />

      <List>
        <ListItem>
          <Stack direction="row" alignItems={'center'} spacing={2} sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Opened
            </Typography>
            <Stack sx={{ width: '100%' }}>
              <LinearProgressWithLabel color="info" textColor="info.main" star={225} starPosition="start" value={60} />
            </Stack>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction="row" alignItems={'center'} spacing={2} sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Clicked
            </Typography>
            <Stack sx={{ width: '100%' }}>
              <LinearProgressWithLabel color="primary" textColor="primary.main" star={115} starPosition="start" value={40} />
            </Stack>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction="row" alignItems={'center'} spacing={2} sx={{ width: '100%' }}>
            <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
              Replied
            </Typography>
            <Stack sx={{ width: '100%' }}>
              <LinearProgressWithLabel color="success" textColor="success.main" star={45} starPosition="start" value={30} />
            </Stack>
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
};

export default Insight;
