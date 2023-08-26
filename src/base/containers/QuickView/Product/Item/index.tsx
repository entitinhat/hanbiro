import { PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS, PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';
import { useEffect } from 'react';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { usePublishItemView } from '@product/item/hooks/usePublishItemView';
import { Grid, Typography, useTheme, Switch, InputLabel } from '@mui/material';

import { MENU_PRODUCT } from '@base/config/menus';

import SpanLang from '@base/components/@hanbiro/SpanLang';
import RouteName from '@base/components/@hanbiro/RouteName';
import AtrrView from '@product/item/containers/ViewFields/AttrValues/View';

import { moneyFormat } from '@base/utils/helpers';

export const ProductItemQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;
  const { data, isLoading } = usePublishItemView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);
  const theme = useTheme();

  const items: any[] =
    data?.attrValues?.map((item: any) => ({
      id: item?.id,
      name: [item?.attr?.name, item?.name].join(':')
    })) ?? [];

  const name = data?.name ?? '';
  const url = `/${MENU_PRODUCT}/item/${id}`;

  const listItemView = (data: any) => {
    return [
      {
        keyLang: 'product_item_field_basic_unitprice',
        component: (
          <Typography noWrap>{data?.unitPrice ? moneyFormat(data?.unitPrice?.amount ?? 0, data?.unitPrice?.currency) : ''}</Typography>
        )
      },
      {
        keyLang: 'product_item_field_basic_basecost',
        component: (
          <Typography noWrap>{data?.costPrice ? moneyFormat(data?.costPrice?.amount ?? 0, data?.costPrice?.currency) : ''}</Typography>
        )
      },
      {
        keyLang: 'product_item_field_basic_itemtype',
        component: <SpanLang keyLang={PRODUCT_ITEM_TYPE_OPTIONS?.find((v: any) => v.value === data?.itemType)?.label ?? ''} textOnly />
      },
      {
        keyLang: 'product_item_field_basic_inventorytype',
        component: (
          <SpanLang
            keyLang={PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.find((v: any) => v.value === data?.inventoryType)?.label ?? ''}
            textOnly
          />
        )
      },
      {
        keyLang: 'product_item_field_basic_unitval',
        component: <Typography>{data?.unit?.name}</Typography>
      },
      {
        keyLang: 'product_item_field_basic_unitvalqty',
        component: <Typography>{data?.unitVal?.qty}</Typography>
      },
      {
        keyLang: 'product_item_field_basic_attrvalues',
        component: items.length > 0 ? <AtrrView value={data?.attrValues} /> : ''
      },
      {
        keyLang: 'product_item_field_basic_active',
        component: <Switch size="small" color="primary" sx={{ margin: 0 }} checked={data?.active || false} readOnly />
      }
    ];
  };

  return (
    <Grid container spacing={1.75} sx={{ p: 2, width: 400 }}>
      <Grid item xs={12}>
        <RouteName url={url} name={name} />
      </Grid>
      {listItemView(data).map((item: any, index: number) => {
        return (
          <Grid item xs={12} key={index}>
            <InputLabel sx={{ display: 'flex', alignItems: 'center', pl: '0px', color: theme.palette.secondary.main, pb: 1 }}>
              <SpanLang keyLang={item?.keyLang} />
            </InputLabel>
            {item?.component}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withTextAndPreviewModal(ProductItemQuickView, { title: 'Product Item Detail' });
