import LinearProgressWithLabel from '@base/components/@hanbiro/LinearProgressWithLabel';
import { Stack, Typography } from '@mui/material';

interface KPIProps {}

const KPI = (props: KPIProps) => {
  return (
    <Stack spacing={1.5} sx={{ p: 2 }} >
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
          Click throught rate
        </Typography>
        <Typography color="secondary">83% goal reached</Typography>
      </Stack>

      <Stack spacing={0.5}>
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography>0%</Typography>
          <Typography>100%</Typography>
        </Stack>
        <LinearProgressWithLabel color="success" value={60} />
      </Stack>
    </Stack>
  );
};

export default KPI;
