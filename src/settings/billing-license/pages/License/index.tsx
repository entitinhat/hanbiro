import { Box, Grid, Stack } from '@mui/material';
import LicensesUsed from '@settings/billing-license/containers/LicensesUsed';
import OnlineStorageUsed from '@settings/billing-license/containers/OnlineStorageUsed';

import LicenseGuide from '@settings/billing-license/containers/LicensingGuide';
import CurrentRechargeStatus from '@settings/billing-license/containers/CurrentRechargeStatus';
const containStyle = {
  height: 'calc(100vh - 174px)'
};
const License = () => {
  return (
    <Stack sx={containStyle} className="scroll-box" p={2} spacing={2}>
      <LicensesUsed />
      <Grid container spacing={2} sx={{ ml: '-16px !important' }}>
        <Grid item xs={4}>
          <OnlineStorageUsed />
        </Grid>
        <Grid item xs={8}>
          <CurrentRechargeStatus />
        </Grid>
      </Grid>
      <LicenseGuide />
    </Stack>
  );
};
export default License;
