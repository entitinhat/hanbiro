import { useMemo } from 'react';
//project
import IconAvatar from '../../IconAvatar';
import { Customer } from '@customer/types/interface';
//material-ui
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
//third-party
import { useTranslation } from 'react-i18next';

interface CustomerCardProps {
  data: Customer;
  columns: number;
}

const CustomerCard = (props: CustomerCardProps) => {
  const { data, columns } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const border = '2px solid ' + theme.palette.divider;

  const Card2Columns = useMemo(() => {
    console.log('Customer card layoutData:', data);
    if (data) {
      let photo = { key: '', bucket: '' };
      try {
        photo = JSON.parse(data?.photo ?? '');
      } catch (e) {
        //console.log('parse photo error.');
      }
      return (
        <Grid sx={{ p: '10px' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconAvatar id={photo.key} url={photo.bucket} alt={data.name} size="xl" />
            </CardContent>
            <CardContent>
              <Box>
                <Box>
                  <Typography component="div" variant="h5">
                    {t(data.name)}
                  </Typography>
                </Box>
                <Box sx={{ mb: '5px' }}>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {t(data.type?.languageKey ?? '(none)')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <AlternateEmailIcon fontSize="small" color="secondary" sx={{ mr: '3px' }} />
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {t(data.emails?.[0].email ?? '(none)')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <PhoneIcon fontSize="small" color="secondary" sx={{ mr: '3px' }} />
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {t(data.phones?.[0].phoneNumber ?? '(none)')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }, [data]);

  const Card1Column = useMemo(() => {
    console.log('Customer card layoutData:', data);
    if (data) {
      let photo = { key: '', bucket: '' };
      try {
        photo = JSON.parse(data?.photo ?? '');
      } catch (e) {
        //console.log('parse photo error.');
      }
      return (
        <Grid sx={{ p: '10px', width: '80%', m: 'auto' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconAvatar id={photo.key} url={photo.bucket} alt={data.name} sx={{ width: 86, height: 86 }} />
            </CardContent>
            <CardContent sx={{ width: '100%' }}>
              <Grid container direction="row" flexWrap="nowrap" sx={{ height: '100%' }}>
                <Grid item justifyContent="center" flexDirection="column" sx={{ height: '100%', display: 'flex', flex: '0 1 35%' }}>
                  <Typography component="div" variant="h5" fontWeight="bold" sx={{ maxWidth: '300px', flexWrap: 'wrap' }}>
                    {t(data.name)}
                  </Typography>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {t(data.type?.languageKey ?? '(none)')}
                  </Typography>
                </Grid>
                <Grid item justifyContent="center" flexDirection="column" sx={{ ml: '10px', flex: '1 1 25%', display: 'flex' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AlternateEmailIcon fontSize="small" color="secondary" sx={{ mr: '3px' }} />
                    <Typography component="div" variant="subtitle1" color="text.secondary" sx={{ wordWrap: 'break-all' }}>
                      {t(data.emails?.[0].email ?? '(none)')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PhoneIcon fontSize="small" color="secondary" sx={{ mr: '3px' }} />
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      {t(data.phones?.[0].phoneNumber ?? '(none)')}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item justifyContent="center" flexDirection="column" sx={{ ml: '10px', flex: '0 1 25%', display: 'flex' }}>
                  <Stack direction="column">
                    {data?.industries?.map((_item: any, index: number) => (
                      <Box key={index} sx={{ p: 0.5 }}>
                        <Chip color="primary" label={t(_item?.languageKey)} size="small" variant="light" />
                      </Box>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }, [data]);

  return (
    <>
      {columns === 1 && Card1Column}
      {columns === 2 && Card2Columns}
    </>
  );
};

export default CustomerCard;
