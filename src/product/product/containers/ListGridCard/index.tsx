import React, { useMemo } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { Stack, Typography, useTheme } from '@mui/material';

import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import MainCard from '@base/components/App/MainCard';
import { MENU_PRODUCT } from '@base/config/menus';
import RouteName from '@base/components/@hanbiro/RouteName';
import Switch from '@base/components/@hanbiro/Switch';
import { Product } from '@product/product/types/product';
import * as keyNames from '@product/product/config/keyNames';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';

import GridFields from '@base/components/@hanbiro/List/GridFields';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Product;
  isSplitMode: boolean;
  fields?: any[];
  mapFields?: any;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode, fields, mapFields } = props;
  const { t } = useTranslation();

  const { id } = data;
  const url = `/${MENU_PRODUCT}/${MENU_PRODUCT}/${id}`;

  const theme = useTheme();

  const SHOW_KEYS: string[] = [
    keyNames.KEY_PRODUCT_GROUP,
    keyNames.KEY_PRODUCT_CODE,
    keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
    keyNames.KEY_PRODUCT_TYPE,
    keyNames.KEY_PRODUCT_BASE_UNIT,
    keyNames.KEY_PRODUCT_ATTRIBUTE,
    keyNames.KEY_PRODUCT_ACTIVE,
    keyNames.KEY_PRODUCT_ASSIGN_TO
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
              <RouteName name={data[keyNames.KEY_PRODUCT_NAME]} url={url} />
            </Stack>
          )
        }
        headerSX={{ p: 1.5 }}
        contentSX={{ p: 2 }}
        divider
      >
        {isSplitMode ? (
          <Stack spacing={1}>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Stack direction="row" alignItems="center">
                <MuiCheckbox value={isChecked ?? false} onChange={(val: boolean) => onChecked && onChecked(data['id'])} />
                <RouteName name={data[keyNames.KEY_PRODUCT_NAME]} url={url} />
              </Stack>
              <Typography>{data[keyNames.KEY_PRODUCT_GROUP]?.name ?? ''}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" sx={{ pl: 1 }}>
              <Typography>{data?.[keyNames.KEY_PRODUCT_BASE_UNIT]?.name ?? ''}</Typography>
              <Typography>{data?.[keyNames.KEY_PRODUCT_ATTRIBUTE]?.map((item: any) => item?.name).join(',') ?? ''}</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Switch value={data?.[keyNames.KEY_PRODUCT_ACTIVE] ?? false} />
              <Typography>
                {data?.[keyNames.KEY_PRODUCT_ASSIGN_TO]?.user?.name ?? <SpanLang keyLang="ncrm_common_unassigned" textOnly />}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <>
            <GridFields fields={fields} showKeys={SHOW_KEYS} mapFields={mapFields} data={data} />
          </>
        )}
      </MainCard>
    );
  }, [data, isChecked, onChecked]);

  return <>{CardMemo}</>;
};

export default ListGridCard;
