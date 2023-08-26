import { useEffect } from 'react';

import { MENU_PRODUCT } from '@base/config/menus';
import { Grid, Switch, Typography, Checkbox, InputLabel, useTheme } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import RouteName from '@base/components/@hanbiro/RouteName';

import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import { usePublishProductView } from '@product/product/hooks/usePublishProductView';
import AtrributeView from '@product/product/containers/ViewFields/Attribute/View';

export const ProductQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;
  const theme = useTheme();
  const { data, isLoading } = usePublishProductView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const name = data?.name ?? '';
  const url = `/${MENU_PRODUCT}/product/${id}`;

  const listItemView = (data: any) => {
    return [
      {
        keyLang: 'product_product_field_basic_group',
        component: <Typography>{data?.group?.name}</Typography>
      },
      {
        keyLang: 'product_product_field_basic_canbesold',
        component: <Checkbox color="primary" sx={{ p: 0, cursor: 'default' }} checked={data?.canBeSold || false} />
      },
      {
        keyLang: 'product_product_field_basic_type',
        component: <SpanLang keyLang={PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === data?.type)?.label ?? ''} textOnly />
      },
      {
        keyLang: 'product_product_field_basic_attributes',
        component: <AtrributeView value={data} />
      },
      {
        keyLang: 'product_product_field_basic_active',
        component: <Switch size="small" color="primary" sx={{ margin: 0 }} checked={data?.active || false} readOnly />
      },
      {
        keyLang: 'product_product_field_basic_assignto',
        component: <Typography>{data?.assignTo?.user?.name}</Typography>
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

export default withTextAndPreviewModal(ProductQuickView, { title: 'Product Detail' });
