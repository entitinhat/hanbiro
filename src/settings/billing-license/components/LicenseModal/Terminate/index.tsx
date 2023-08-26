import { Box, Card, CardContent, useTheme, Typography, IconButton, Button, CardActions, Stack, Modal } from '@mui/material';
import React, { useState, Suspense, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

//mui
import { TextField, Grid } from '@mui/material';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslation } from 'react-i18next';

interface TerminateModal {
  isOpen: boolean;
  onClose: () => void;
}
const TerminateModal = (props: TerminateModal) => {
  // console.log('props: ' + JSON.stringify(props))
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  //=========== Footer ===========
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" onClick={onClose} variant="outlined">
              Close
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={t('Confirm') as string}
        isOpen={isOpen}
        fullScreen={false}
        onClose={() => {
          onClose && onClose();
        }}
        footer={Footer}
        size="xs"
      >
        {isOpen && (
          <Stack sx={{ width: '100%', justifyItems: 'center' }} spacing={1} p={2}>
            <Typography sx={{ textAlign: 'center' }}>Check users...</Typography>
            <Stack sx={{ textAlign: 'center' }} spacing={1}>
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <ReportProblemRoundedIcon sx={{ color: '#dc3545' }} />
              </Box>

              <Button size="small" variant="contained">
                Go to delete users
              </Button>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Box>
                <Typography sx={{ display: 'inline' }}> Refund amounts come from most recent invoice </Typography>
                <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Invoice ID</Typography>
              </Box>
              <Box>
                <Typography sx={{ display: 'inline' }}>Prorated refund </Typography>
                <Typography
                  sx={{
                    display: 'inline'
                  }}
                  color="error"
                >
                  $1,000
                </Typography>
                .
              </Box>
              We will reduce the refund amount in next invoice.
            </Box>
          </Stack>
        )}
      </MiModal>
    </Suspense>
  );
};
export default TerminateModal;
