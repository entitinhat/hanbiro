import {
  PRODUCT_ITEM_TYPE_ENUM_GENERAL,
  PRODUCT_ITEM_TYPE_ENUM_PREPAID,
  PRODUCT_TYPE_PRODUCED,
  PRODUCT_TYPE_PURCHASE
} from '@product/main/config/constants';
import React, { useEffect, useState } from 'react';
import { getAttributesByValues, moneyFormat } from '@base/utils/helpers';
import { useTranslation } from 'react-i18next';
import { Chip, Box, Typography, useTheme, SxProps } from '@mui/material';
import { Item } from '@product/item/types/item';

interface Props {
  data?: Item;
  sx?: SxProps;
}

const ItemBaseInfo = (props: Props) => {
  const { data, sx } = props;
  const { t } = useTranslation();
  const [attributes, setAttributes] = useState<any[]>([]);

  useEffect(() => {
    if (JSON.stringify(data?.attrValues) !== JSON.stringify(attributes)) {
      if (data?.attrValues?.length > 0) {
        const _attributes = getAttributesByValues(data?.attrValues);
        setAttributes(_attributes);
      } else {
        setAttributes([]);
      }
    }
  }, [data?.attrValues]);

  const theme = useTheme();

  const formGroupProps = {
    display: 'flex',
    padding: theme.spacing(1),
    borderTop: '1px solid ' + theme.palette.grey[300],
    borderLeft: 0,
    borderRight: 0,
    borderStyle: 'dashed',
    borderBottom: 0
  };

  const typeTitleProps = {
    marginRight: '5px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontSize: '12px'
  };

  const typeNameProps = {
    marginLeft: 'auto',
    fontSize: '15px',
    fontWeight: 600
  };

  return (
    <Box sx={{ ...sx }}>
      {/* Base Unit */}
      {data?.itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID && (
        <Box sx={{ display: 'flex', padding: theme.spacing(1) }}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Base Unit</Typography>
          <Typography sx={typeNameProps}>{data?.unit?.name ?? ''}</Typography>
        </Box>
      )}
      {/* Unit Name */}
      {data?.itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID && (
        <Box sx={formGroupProps}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Unit Name</Typography>
          <Typography sx={typeNameProps}>{data?.unitVal?.name ?? ''}</Typography>
        </Box>
      )}
      {/* Unit Quantity */}
      {data?.itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID && (
        <Box sx={formGroupProps}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Unit Qty</Typography>
          <Typography sx={typeNameProps}>{data?.unitVal?.qty ?? 0}</Typography>
        </Box>
      )}
      {/* Base Price */}
      {data?.prod?.canBeSold && data?.itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID && (
        <Box sx={formGroupProps}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Base Price</Typography>
          <Box sx={typeNameProps}>
            {data?.basePrice?.map((item: any, index: number) => {
              return (
                <Typography sx={typeNameProps} key={index}>
                  {moneyFormat(item?.amount ?? 0, item?.currency)}
                </Typography>
              );
            })}
          </Box>
        </Box>
      )}
      {/* Base Cost Price */}
      {(data?.prod?.canBeSold || data?.prod?.type === PRODUCT_TYPE_PRODUCED) && data?.itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID && (
        <Box sx={formGroupProps}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Base Cost</Typography>
          <Box sx={typeNameProps}>
            {data?.costPrice?.map((item: any, index: number) => {
              return (
                <Typography sx={typeNameProps} key={index}>
                  {moneyFormat(item?.amount ?? 0, item?.currency)}
                </Typography>
              );
            })}
          </Box>
        </Box>
      )}
      {/* Best Price */}
      {/* Purchase Price */}
      {data?.prod?.type === PRODUCT_TYPE_PURCHASE && !data?.prod?.canBeSold && (
        <Box sx={formGroupProps}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Base Purchase Price</Typography>
          <Box sx={typeNameProps}>
            {data?.purchasePrice?.map((item: any, index: number) => {
              return (
                <Typography sx={typeNameProps} key={index}>
                  {moneyFormat(item?.amount ?? 0, item?.currency)}
                </Typography>
              );
            })}
          </Box>
        </Box>
      )}
      {/* Attributes */}
      {data?.itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL && (
        <Box sx={{ ...formGroupProps, flexDirection: 'column' }}>
          <Typography sx={{ ...typeTitleProps, color: theme.palette.primary.main }}>Attributes</Typography>
          {attributes?.length > 0 &&
            attributes?.map((attr: any, index: number) => {
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
                  <Typography sx={{ marginRight: '10px', fontWeight: 600, fontSize: '15px' }}>{attr?.name ?? ''}</Typography>
                  <Box>
                    {attr?.values?.length > 0 &&
                      attr?.values?.map((val: any, i: number) => {
                        return <Chip sx={{ borderRadius: 20 }} key={i} label={val?.name ?? ''} variant="outlined" size={'small'} />;
                      })}
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default ItemBaseInfo;
