import { useMemo } from 'react';

//project
import { Product } from '@product/product/types/product';
import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';
//material-ui
import { Box } from '@mui/system';
import { AccessAlarm } from '@mui/icons-material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
interface ProductCardProps {
  data: Product;
  mode: number;
}
interface cardField {
  title: string;
  data: string;
}
const ProductCard = (props: ProductCardProps) => {
  const { data, mode } = props;
  const { t } = useTranslation();
  //Card fields config
  // const theme = createTheme({
  //   elevation: 0
  // });
  const theme = useTheme();
  const border = '2px solid ' + theme.palette.divider;

  const renderCard = useMemo(() => {
    console.log('Customer card layoutData:', data);
    if (data) {
      return (
        <Grid sx={{ p: '10px', width: '100%', m: 'auto' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="div" variant="h3" sx={{ maxWidth: '300px', flexWrap: 'wrap' }}>
                  {t(data.name)}
                </Typography>
                <Box sx={{ p: 0.5, pl: 0 }}>
                  <Chip
                    color={data.active ? 'success' : 'error'}
                    label={t(data.active ? 'Active' : 'Not Active ')}
                    size="small"
                    variant="light"
                  />
                </Box>
              </Box>
              <Grid container direction="row" flexWrap="nowrap" sx={{ height: '100%' }}>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ height: '100%', display: 'flex', flex: '0 1 35%' }}>
                  <Stack direction="row" spacing={0.3} alignItems="left">
                    <Typography variant="subtitle1" color="text.secondary">
                      {t(PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value == data.type)?.label ?? '')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.3} alignItems="left">
                    <Typography variant="subtitle1" color="text.secondary">
                      {data.code}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ ml: '10px', flex: '1 1 25%', display: 'flex' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Base unit:
                    </Typography>
                    <Typography component="div" variant="h5" sx={{ wordWrap: 'break-all' }}>
                      {data?.unit?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Items:
                    </Typography>
                    <Typography component="div" variant="h5" sx={{ wordWrap: 'break-all' }}>
                      {data?.items?.length ?? 0}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ display: 'flex', flex: '0 1 30%' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 'auto' }}>
                    <PermIdentityIcon style={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="secondary">
                      {data?.updatedBy?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 'auto' }}>
                    <AccessAlarm style={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="secondary">
                      {convertDateTimeServerToClient({ date: data.createdAt?.toString(), humanize: false, isTime: false })}
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
  const renderCardOneColumn = useMemo(() => {
    if (data) {
      return (
        <Grid sx={{ p: '10px', width: '80%', m: 'auto' }}>
          <Card sx={{ display: 'flex', width: '100%', border: border }} elevation={0}>
            <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="div" variant="h3" sx={{ maxWidth: '300px', flexWrap: 'wrap' }}>
                  {t(data.name)}
                </Typography>
                <Box sx={{ p: 0.5, pl: 0 }}>
                  <Chip
                    color={data.active ? 'success' : 'error'}
                    label={t(data.active ? 'Active' : 'Not Active ')}
                    size="small"
                    variant="light"
                  />
                </Box>
              </Box>
              <Grid container direction="row" flexWrap="nowrap" sx={{ height: '100%' }}>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ height: '100%', display: 'flex', flex: '0 1 35%' }}>
                  <Stack direction="column" spacing={0.1} alignItems="left"></Stack>
                  <Stack direction="row" spacing={0.3} alignItems="left">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Type:
                    </Typography>
                    <Typography component="div" variant="h5">
                      {PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value == data.type)?.label ?? ''}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.3} alignItems="left">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Code:
                    </Typography>
                    <Typography component="div" variant="h5">
                      {data.code}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ ml: '10px', flex: '1 1 25%', display: 'flex' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Base unit:
                    </Typography>
                    <Typography component="div" variant="h5" sx={{ wordWrap: 'break-all' }}>
                      {data?.unit?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography component="div" variant="subtitle1" color="text.secondary">
                      Items:
                    </Typography>
                    <Typography component="div" variant="h5" sx={{ wordWrap: 'break-all' }}>
                      {data?.items?.length ?? 0}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item justifyContent="space-around" flexDirection="column" sx={{ display: 'flex', flex: '0 1 30%' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 'auto' }}>
                    <PermIdentityIcon style={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="secondary">
                      {data?.updatedBy?.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessAlarm style={{ fontSize: '0.875rem' }} sx={{ ml: 'auto' }} />
                    <Typography variant="caption" color="secondary">
                      {convertDateTimeServerToClient({ date: data.createdAt?.toString(), humanize: false, isTime: false })}
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
      {mode === 0 && renderCardOneColumn}
      {mode === 1 && renderCard}
    </>
  );
};

export default ProductCard;
