import _ from 'lodash';

import { Button, Grid, Stack, Typography } from '@mui/material';

interface NormalErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function NormalErrorProps({ error, resetErrorBoundary }: NormalErrorProps) {
  console.log('normal error', error);
  let errors = error;
  try {
    errors = JSON.parse(error.toString());
  } catch (err) {}
  const message = _.isArray(errors) ? errors[0]?.message : error?.message;

  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid item xs={12}>
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            // sx={{ width: '100%', p: 2, position: 'absolute', left: 0, right: 0, top: '50%' }}
            sx={{ width: '100%', p: 2 }}
          >
            <Typography color="textPrimary" variant="h3">
              Error
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              Message: {message}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              If the error persists, contact customer service.
            </Typography>
            <Button color="success" variant="contained" size="small" sx={{ textTransform: 'none' }} onClick={resetErrorBoundary}>
              Try again
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default NormalErrorProps;
