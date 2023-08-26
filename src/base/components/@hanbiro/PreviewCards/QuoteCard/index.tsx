import { useMemo } from 'react';
//project
import IconAvatar from '../../IconAvatar';
import { Customer } from '@customer/types/interface';
//material-ui
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Card, CardContent, Chip, Grid, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PhoneIcon from '@mui/icons-material/Phone';
//third-party
import { useTranslation } from 'react-i18next';
import { Campaign } from '@campaign/types/interface';
import { CalendarTodayOutlined, Inventory } from '@mui/icons-material';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Quote } from '@quote/types/interfaces';

interface CardProps {
  data: Quote;
  columns: number;
}

const QuoteCard = (props: CardProps) => {
  const { data, columns } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const border = '2px solid ' + theme.palette.divider;

  const Card2Columns = useMemo(() => {
    //console.log('card layoutData:', data);
    if (data) {
      return (
        <Grid sx={{ p: '10px' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconAvatar id={''} url={''} alt={data.name} size="xl" />
            </CardContent>
            <CardContent>
              <Stack spacing={1}>
                <Box>
                  <Typography component="div" variant="h5">
                    {data.name}
                  </Typography>
                </Box>
                <Stack direction={'row'} spacing={1}>
                  <InputLabel>ID:</InputLabel>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {data.code || <em>(none)</em>}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <InputLabel>Quote Date:</InputLabel>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {data?.quoteDate ? convertDateTimeServerToClient({ date: data?.quoteDate }) : <em>(none)</em>}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <InputLabel>Customer:</InputLabel>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {data?.contact ? data.contact.name : data?.account?.name || <em>(none)</em>}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <InputLabel>Items:</InputLabel>
                  <Typography component="div" variant="subtitle1" color="text.secondary">
                    {data?.items?.length > 0 ? data.items.map((_ele: any) => _ele.productItem.name).join(', ') : <em>(none)</em>}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }, [data]);

  const Card1Column = useMemo(() => {
    console.log('Customer card layoutData:', data);
    if (data) {
      return (
        <Grid sx={{ p: '10px', width: '80%', m: 'auto' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconAvatar id={''} url={''} alt={data?.name} sx={{ width: 86, height: 86 }} />
            </CardContent>
            <CardContent sx={{ width: '100%' }}>
              <Grid container direction="row" flexWrap="nowrap" sx={{ height: '100%' }}>
                <Grid item justifyContent="center" flexDirection="column" sx={{ height: '100%', display: 'flex', flex: '0 1 35%' }}>
                  <Typography component="div" variant="h5" fontWeight="bold" sx={{ maxWidth: '300px', flexWrap: 'wrap' }}>
                    {t(data.name)}
                  </Typography>
                </Grid>
                <Grid item justifyContent="center" flexDirection="column" sx={{ ml: '10px', flex: '1 1 25%', display: 'flex' }}>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>ID:</InputLabel>
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      {data.code || <em>(none)</em>}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Quote Date:</InputLabel>
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      {data?.quoteDate ? convertDateTimeServerToClient({ date: data?.quoteDate }) : <em>(none)</em>}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Customer:</InputLabel>
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      {data?.contact ? data.contact.name : data?.account?.name || <em>(none)</em>}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Items:</InputLabel>
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      {data?.items?.length > 0 ? data.items.map((_ele: any) => _ele.productItem.name).join(', ') : <em>(none)</em>}
                    </Typography>
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

export default QuoteCard;
