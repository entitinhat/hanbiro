import React, { useMemo } from 'react';

import { Card, Stack, Typography, useTheme, Grid } from '@mui/material';

import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { moneyFormat } from '@base/utils/helpers';
import MainCard from '@base/components/App/MainCard';
import { MENU_ITEM, MENU_PRODUCT } from '@base/config/menus';
import { Item } from '@product/item/types/item';
import * as keyNames from '@product/item/config/keyNames';
import ImageSlider from '@base/components/@hanbiro/ImageSlider';
import useDevice from '@base/hooks/useDevice';
import RouteName from '@base/components/@hanbiro/RouteName';
import GridFields from '@base/components/@hanbiro/List/GridFields';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import { IMAGE_MODULE_PRODUCT_ITEM } from '@product/main/config/constants';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Item;
  isSplitMode?: boolean;
  fields?: any[];
  mapFields?: any;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode = false, fields, mapFields } = props;
  const { id, images, attrValues, unitPrice, prod } = data;
  const url = `/${MENU_PRODUCT}/${MENU_ITEM}/${id}`;

  const prodName = prod?.name ?? '';
  const theme = useTheme();

  const getAttributes = (attrValues: { id: string; name: string; attr: any }[]) => {
    // return attrValues?.map((_a) => _a?.attr?.name).join(',') ?? '';
    return attrValues?.map((_a) => _a?.name).join(',') ?? '';
  };

  const { isMobile } = useDevice();

  const SHOW_KEYS = [
    keyNames.KEY_ITEM_CODE,
    keyNames.KEY_ITEM_TYPE,
    keyNames.KEY_ITEM_INVENTORY_TYPE,
    keyNames.KEY_ITEM_UNIT_VALUE,
    keyNames.KEY_ITEM_ATTR_VALUES,
    keyNames.KEY_ITEM_UNIT_PRICE,
    keyNames.KEY_ITEM_ACTIVE
  ];

  const CardMemo = useMemo(() => {
    return (
      <MainCard
        boxShadow={isSplitMode ? false : true}
        sx={{ ...sx, ...(isSplitMode && { borderRadius: 0, borderBottom: `1px solid ${theme.palette.divider}` }) }}
        border={isSplitMode ? false : true}
        title={
          isSplitMode ? null : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <MuiCheckbox value={isChecked ?? false} onChange={(val: boolean) => onChecked && onChecked(data['id'])} />
              <RouteName name={data[keyNames.KEY_ITEM_NAME]} url={url} />
            </Stack>
          )
        }
        headerSX={{ p: 1.5 }}
        contentSX={{ p: 2, pb: '16px !important' }}
        divider
      >
        {!isSplitMode && (
          <Card elevation={0} sx={{ bgColor: theme.palette.background.paper, height: '100%', minHeight: 0, width: '100%' }}>
            <Grid container spacing={2} sx={{ width: '100%', height: '100%', mt: 0, ml: 0 }}>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{
                  pl: '0px !important',
                  pt: '0px !important',
                  height: '100%'
                }}
              >
                <ImageSlider
                  sx={{
                    '& .MuiGrid-root .MuiGrid-item': {
                      width: 294,
                      height: 294
                    },
                    height: '100%',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: theme.palette.divider
                  }}
                  images={images ?? []}
                  vertical={false}
                  allowZoom={!isSplitMode}
                  showSlider={false}
                  moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
                />
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{
                  pt: '0px !important'
                }}
              >
                <GridFields fields={fields} showKeys={SHOW_KEYS} componentProps={{ sm: 12 }} mapFields={mapFields} data={data} />
              </Grid>
            </Grid>
          </Card>
        )}
        {isSplitMode && (
          <Stack spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ pb: 1 }}>
              <MuiCheckbox value={isChecked ?? false} onChange={(val: boolean) => onChecked && onChecked(data['id'])} />
              <RouteName name={data?.[keyNames.KEY_ITEM_NAME]} url={url} />
            </Stack>
            <Stack direction={'row'} justifyContent="space-between">
              <ImageSlider
                sx={{
                  '& .MuiGrid-root .MuiGrid-item': {
                    height: '70px',
                    width: '70px'
                  },
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: theme.palette.divider
                }}
                images={images ?? []}
                vertical={false}
                allowZoom={!isSplitMode}
                showSlider={false}
                moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
              />
              <Stack direction={'column'} justifyContent="space-between">
                <Typography fontSize="small" textAlign="right">
                  {prodName}
                </Typography>
                <Typography fontSize="small" textAlign="right">
                  {getAttributes(attrValues)}
                </Typography>
                <Typography fontSize="small" textAlign="right">{`${
                  unitPrice ? moneyFormat(unitPrice?.amount, unitPrice?.currency) : ''
                }`}</Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </MainCard>
    );
  }, [data, isChecked, onChecked, theme.palette.mode, isMobile]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
