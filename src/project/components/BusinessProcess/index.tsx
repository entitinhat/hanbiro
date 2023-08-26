import SelectBox from '@base/components/@hanbiro/SelectBox';
import { Grid, Stack, Typography } from '@mui/material';

interface BusinessProcessProps {}

function BusinessProcess({}: BusinessProcessProps) {
  const value = { keyName: '', languageKey: '' };
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={3}>
        <Stack spacing={0.5}>
          <Typography variant="caption">Project</Typography>
          <SelectBox value={value} options={[]} onChange={() => console.log('k')} />
        </Stack>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack spacing={0.5}>
          <Typography variant="caption">Prototype</Typography>
          <SelectBox value={value} options={[]} onChange={() => console.log('k')} />
        </Stack>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack spacing={0.5}>
          <Typography variant="caption">Planning</Typography>
          <SelectBox value={value} options={[]} onChange={() => console.log('k')} />
        </Stack>
      </Grid>
      <Grid item xs={6} md={3}>
        <Stack spacing={0.5}>
          <Typography variant="caption">Dev Task</Typography>
          <SelectBox value={value} options={[]} onChange={() => console.log('k')} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BusinessProcess;
