import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  AvatarGroup,
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
  CardMedia,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SellIcon from '@mui/icons-material/Sell';

import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { moneyFormat } from '@base/utils/helpers';
import MainCard from '@base/components/App/MainCard';
import { MENU_ITEM, MENU_PRODUCT } from '@base/config/menus';
import { Item } from '@product/item/types/item';
import * as keyNames from '@product/item/config/keyNames';
import ImageSlider from '@base/components/@hanbiro/ImageSlider';
import useDevice from '@base/hooks/useDevice';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Item;
  isSplitMode?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode = false } = props;
  const { t } = useTranslation();

  const { id, createdAt, updatedBy, images, code, dimension, weight, brand, warrantyPeriod, attrValues } = data;

  const url = ` /${MENU_PRODUCT}/${MENU_ITEM}/${id}`;
  // const mainImage = images?.[0] ?? null;

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;

  const { isMobile } = useDevice();

  const CardMemo = useMemo(() => {
    return (
      <MainCard
        content={false}
        // boxShadow
        sx={{
          // backgroundColor: theme.palette.mode === 'dark' ? bgColor : theme.palette.info.lighter,
          // ':hover': {
          //   boxShadow: '12px 10px 8px rgba(0, 0, 0, 0.2)',
          //   transform: 'translate(-2px, -2px)'
          // }
          '&:hover': {
            transform: 'scale3d(1.02, 1.02, 1)',
            transition: 'all .4s ease-in-out'
          }
        }}
      >
        <Grid container spacing={1} sx={{ pl: 1, pr: 1, pb: 1 }} direction={isSplitMode || isMobile ? 'column' : 'row'}>
          <Grid item xs={7}>
            <Box
              sx={{
                width: 'calc(100%) - 8px', // space for transition and box-shadow
                pt: 2,
                pl: isSplitMode || isMobile ? 0 : 1,
                pb: 1,
                pr: 0
              }}
            >
              <ImageSlider
                sx={{
                  backgroundColor: bgColor,
                  boxShadow: isSplitMode || isMobile ? '0px 8px 6px rgba(0, 0, 0, 0.15)' : '8px 8px 6px rgba(0, 0, 0, 0.15)',
                  borderRadius: '4px',
                  // ':hover': {
                  //   boxShadow: '12px 10px 8px rgba(0, 0, 0, 0.2)',
                  //   transform: 'translate(-2px, -2px)'
                  // },
                  // transition: 'all .3s ease',
                  border: '1px solid',
                  borderColor: theme.palette.divider
                }}
                images={images ?? []}
                vertical={false}
                allowZoom={!isSplitMode}
                showSlider={false}
              />
            </Box>

            {onChecked && (
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="flex-end"
                sx={{ width: '100%', position: 'absolute', top: 0, pt: 2, pl: 0, pr: 3 }}
              >
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
              </Stack>
            )}
          </Grid>

          <Grid item xs={5}>
            <CardContent
              sx={{
                pt: 2,
                pr: 0,
                pl: 0,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                '&.MuiCardContent-root:last-child': {
                  pb: 1
                }
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Stack sx={{ px: theme.spacing(1) }}>
                    <Typography
                      component={Link}
                      to={url}
                      color="textPrimary"
                      variant="h4"
                      sx={{
                        mt: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        textDecoration: 'none',
                        // fontWeight: 900,
                        opacity: '.8'
                      }}
                    >
                      {data?.[keyNames.KEY_ITEM_NAME]}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '0.7rem' }} color="textSecondary">
                      {code}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Stack sx={{ px: theme.spacing(1) }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* <ListTableCellDroplist
                          showAvatar={false}
                          values={data?.[keyNames.KEY_ITEM_PRICES]?.map((price: any) => ({
                            id: price?.currency,
                            name: moneyFormat(price?.amount ?? 0, price?.currency)
                          }))}
                          cellComponent={(item: any) => (
                            <Typography
                              variant="h2"
                              sx={{
                                fontWeight: 400,
                                fontSize: '2.5rem',
                                color: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.main
                              }}
                            >
                              {item?.name}
                            </Typography>
                          )}
                        /> */}
                        {data?.[keyNames.KEY_ITEM_UNIT_PRICE] && (
                          <Typography
                            variant="h2"
                            sx={{
                              fontWeight: 400,
                              fontSize: '2.5rem',
                              color: theme.palette.mode === 'dark' ? theme.palette.error.dark : theme.palette.error.main
                            }}
                          >
                            {moneyFormat(data?.[keyNames.KEY_ITEM_UNIT_PRICE]?.amount ?? 0, data?.[keyNames.KEY_ITEM_UNIT_PRICE]?.currency)}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  {attrValues && (
                    <Box
                      sx={{
                        display: 'flex',
                        padding: theme.spacing(1),
                        flexDirection: 'column'
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        sx={{
                          marginRight: '5px',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          fontSize: '12px',
                          fontWeight: 400,
                          opacity: '.6'
                        }}
                      >
                        {t('product_item_field_basic_attrvalues')}
                      </Typography>

                      {attrValues?.length > 0 &&
                        attrValues?.map((attr: any, index: number) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: '5px'
                              }}
                              key={index}
                            >
                              <Typography sx={{ marginRight: '10px', fontWeight: 500, fontSize: '15px' }}>
                                {attr?.attr.name ?? ''}
                              </Typography>
                              <Box>
                                {/* {attr?.values?.length > 0 &&
                                attr?.values?.map((val: any, i: number) => {
                                    return <Chip sx={{ borderRadius: 20 }} key={i} label={val?.name ?? ''} variant="outlined" size={'small'} />;
                                })} */}
                                <Chip sx={{ borderRadius: 20 }} label={attr?.name ?? ''} variant="outlined" size={'small'} />
                              </Box>
                            </Box>
                          );
                        })}
                    </Box>
                  )}
                </Grid>

                {(dimension || weight || brand) && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '100%',
                        padding: theme.spacing(1)
                      }}
                    >
                      <Stack direction="row" alignItems="flex-start">
                        <Typography
                          color="textSecondary"
                          sx={{
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase',
                            fontSize: '12px',
                            fontWeight: 400,
                            opacity: '.6',
                            mb: 0.5
                          }}
                        >
                          {t('ncrm_product_item_base_info_about_item')}
                        </Typography>
                      </Stack>

                      {dimension && (
                        <Stack direction="row" alignItems="flex-start" sx={{ my: 0.5 }} spacing={1.5}>
                          <ViewInArIcon fontSize="small" />
                          <Typography variant="h6">
                            {` 
                            ${dimension?.val.x && `${dimension?.val.y}`}
                            ${dimension?.val.y && `x ${dimension?.val.y}`} 
                            ${dimension?.val.z && `x ${dimension?.val.z}`}
                            ${dimension?.unit}
                            `}
                          </Typography>
                        </Stack>
                      )}

                      {weight && (
                        <Stack direction="row" alignItems="flex-start" sx={{ my: 0.5 }} spacing={1.5}>
                          <ScaleIcon fontSize="small" />
                          <Typography variant="h6">
                            {` 
                            ${weight?.val}
                            ${weight?.unit}
                            `}
                          </Typography>
                        </Stack>
                      )}

                      {brand && (
                        <Stack direction="row" alignItems="flex-start" sx={{ my: 0.5 }} spacing={1.5}>
                          <SellIcon fontSize="small" />
                          <Typography variant="h6">{`${brand}`}</Typography>
                        </Stack>
                      )}
                    </Box>
                  </Grid>
                )}
              </Grid>
              {/* {isSplitMode ? (
                <></>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    pt: 2
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {}}
                    // disabled={!isStock}
                    sx={{
                      boxShadow: 4px 4px 12px rgba(0, 0, 0, 0.2),
                      textTransform: 'uppercase'
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              )} */}
            </CardContent>
          </Grid>
        </Grid>
      </MainCard>
    );
  }, [data, isChecked, onChecked, theme.palette.mode, isMobile]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
