import { Activity, UserOrCustomer } from '@activity/types/activity';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import MainCard from '@base/components/App/MainCard';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface MailBodyProps {
  value: Activity;
}
const MailBody = ({ value: activityData }: MailBodyProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const makeCallFormat = useCallback((data: UserOrCustomer[]) => {
    const l = data.length;
    return data.map((v: UserOrCustomer, index) => {
      return (
        <React.Fragment key={`${v.id}-${index}`}>
          {v.name}
          {v.phone && `<${v.email}>`}
          {l > index + 1 && ','}
        </React.Fragment>
      );
    });
  }, []);
  return (
    <>
      <MainCard sx={{ overflowX: 'auto' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" component={'span'} sx={{ mr: '10px' }}>
              {`${t('ncrm_activity_from')}:`}
            </Typography>
            <Typography variant="body1" component="span">
              {makeCallFormat(activityData?.from)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" component={'span'} sx={{ mr: '10px' }}>
              {`${t('ncrm_activity_to')}:`}
            </Typography>
            <Typography variant="body1" component="span">
              {makeCallFormat(activityData?.to)}
            </Typography>
          </Grid>
          {activityData?.cc && (
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1" component={'span'} sx={{ mr: '10px' }}>
                CC:
              </Typography>
              <Typography variant="body1" component="span">
                {makeCallFormat(activityData?.cc)}
              </Typography>
            </Grid>
          )}
          {activityData?.bcc && (
            <Grid item xs={12}>
              <Typography color="textSecondary" component={'span'} sx={{ mr: '10px' }}>
                BCC:
              </Typography>
              <Typography variant="body1" component="span">
                {makeCallFormat(activityData?.bcc)}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <MainCard>
              <RawHTML>{activityData?.description}</RawHTML>
            </MainCard>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default MailBody;
