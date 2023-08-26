import { useEffect, useMemo, useState } from 'react';

//project
import useAWSS3Mutation from '@base/hooks/aws/useAWSS3Mutation';
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import productPlaceHodler from '@base/assets/images/commerce/prod-11.png';
import { Item } from '@product/item/types/item';
//material-ui
import { Card, CardContent, CardMedia, Chip, Grid, Stack, Tooltip, Typography, useTheme, Box } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { AccessAlarm } from '@mui/icons-material';
//third-party
import { useTranslation } from 'react-i18next';
interface ItemCardProps {
  data: Item;
  mode: number;
}
interface cardField {
  title: string;
  data: string;
}
const ItemCard = (props: ItemCardProps) => {
  const { data, mode } = props;
  const { t } = useTranslation();

  const [imageData, setImageData] = useState<any>(null);

  const theme = useTheme();
  const border = '2px solid ' + theme.palette.divider;

  //download item image
  //download mutation
  const { mDownload } = useAWSS3Mutation(setImageData);

  // set new image
  useEffect(() => {
    const mainImage: any = data?.images?.[0] ?? null;
    console.log('mainimage:', mainImage);
    if (mainImage?.name && mainImage?.id) {
      try {
        const params = {
          key: mainImage.id,
          bucket: mainImage.name
        };
        mDownload.mutate(params);
      } catch {
        setImageData(null);
      }
    } else {
      setImageData(null);
    }
  }, [data]);
  const renderCard = useMemo(() => {
    const itemWidth = mode == 0 ? '70%' : '100%';
    console.log('Customer card layoutData:', data);
    if (mode != 2) {
      return (
        <Grid sx={{ width: itemWidth, m: 'auto' }}>
          <Card sx={{ display: 'flex', borderRadius: '8px', border: border }} elevation={0}>
            <CardContent sx={{ flex: '1 1 auto', display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box>
                  <Typography component="div" variant="h5">
                    {t(data.name)}
                  </Typography>
                </Box>
                <Box sx={{ mb: '5px' }}>
                  <Box sx={{ p: 0.5, pl: 0 }}>
                    <Chip
                      color={data.active ? 'success' : 'error'}
                      label={t(data.active ? 'Active' : 'Not Active ')}
                      size="small"
                      variant="light"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: '5px' }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PermIdentityIcon style={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="secondary">
                      {data.createdBy.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessAlarm style={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="secondary">
                      {convertDateTimeServerToClient({ date: data.createdAt?.toString(), humanize: false, isTime: false })}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography component="div" variant="h4">
                    {moneyFormat(data?.prices?.[0].amount ?? 0, data?.prices?.[0].currency)}
                  </Typography>
                  <Tooltip title="Open Stock">
                    <Box sx={{ display: 'flex' }}>
                      <InventoryIcon fontSize="small" sx={{ mr: '2px' }} />
                      <Typography component="div" variant="subtitle1">
                        {t(data.openStock)}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
            <Box sx={{}}>
              <CardMedia component="img" sx={{ width: 250, height: 250, position: 'relative' }} image={imageData ?? productPlaceHodler} />
            </Box>
          </Card>
        </Grid>
      );
    } else {
      return (
        <Grid sx={{}}>
          <Card sx={{ borderRadius: '8px', border: border }} elevation={0}>
            <CardContent sx={{ flex: '1 1 auto', display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box>
                  <Typography component="div" variant="h5">
                    {t(data.name)}
                  </Typography>
                </Box>
                <Box sx={{ mb: '5px' }}>
                  <Box sx={{ p: 0.5, pl: 0 }}>
                    <Chip
                      color={data.active ? 'success' : 'error'}
                      label={t(data.active ? 'Active' : 'Not Active ')}
                      size="small"
                      variant="light"
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mt: '5px' }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <PermIdentityIcon style={{ fontSize: '0.875rem' }} />
                      <Typography variant="caption" color="secondary">
                        {data.createdBy.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessAlarm style={{ fontSize: '0.875rem' }} />
                      <Typography variant="caption" color="secondary">
                        {convertDateTimeServerToClient({ date: data.createdAt?.toString(), humanize: false, isTime: false })}
                      </Typography>
                    </Stack>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: 150, position: 'relative', ml: 'auto' }}
                    image={imageData ?? productPlaceHodler}
                  />
                </Box>
                <Box sx={{ display: 'flex', mt: '5px', justifyContent: 'space-between' }}>
                  <Typography component="div" variant="h4">
                    {moneyFormat(data?.prices?.[0].amount ?? 0, data?.prices?.[0].currency)}
                  </Typography>
                  <Tooltip title="Open Stock">
                    <Box sx={{ display: 'flex' }}>
                      <InventoryIcon fontSize="small" sx={{ mr: '2px' }} />
                      <Typography component="div" variant="subtitle1">
                        {t(data.openStock)}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }, [data, imageData, mode]);
  return <>{renderCard}</>;
};
// //{
//   border-color: $color transparent transparent transparent;
//   border-width: #{$corner-bevel}px #{$corner-bevel}px 0 0;
// }

export default ItemCard;
