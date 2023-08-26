import { Stack, Switch, Typography, Checkbox } from '@mui/material';
import { t } from 'i18next';
import * as keyNames from '@product/product/config/keyNames';
import { MENU_PRODUCT } from '@base/config/menus';
import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import { ProductGroupQuickView, ProductItemQuickView, CustomerQuickView } from '@base/containers/QuickView';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import RouteName from '@base/components/@hanbiro/RouteName';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';

export const columnRenderRemap = (menu: string, isDeleteList: boolean) => ({
  [keyNames.KEY_PRODUCT_CODE](col: string, data: any) {
    return data?.[col] ?? '';
  },
  [keyNames.KEY_PRODUCT_NAME](col: string, data: any) {
    const name = data?.[col] ?? '';
    const id = data?.id ?? '';
    const isRead = data?.isRead ?? true;
    const url = `/${MENU_PRODUCT}/${menu}/${id}`;
    return <RouteName url={url} name={name} isRead={isRead} />;
  },
  [keyNames.KEY_PRODUCT_TYPE](col: string, data: any) {
    return <SpanLang keyLang={PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? ''} textOnly />;
  },
  [keyNames.KEY_PRODUCT_ACTIVE](col: string, data: any) {
    return <Switch checked={data?.[col] || false} size="small" readOnly />;
  },
  [keyNames.KEY_PRODUCT_GROUP](col: string, data: any) {
    return data?.[col]?.name;
  },
  [keyNames.KEY_PRODUCT_ATTRIBUTE](col: string, data: any) {
    const items = data?.[col] || [];
    return items.length > 0 ? <ListTableCellDroplist values={items} /> : '';
  },
  [keyNames.KEY_PRODUCT_TYPE_BE_SOLD](col: string, data: any) {
    return <MuiCheckbox value={data[col] ?? false} />;
  },
  [keyNames.KEY_PRODUCT_ASSIGN_TO](col: string, data: any) {
    const reps = data[col] || [];
    return reps?.rowSpan ? 
    `${t(reps.name)} ${`( ${reps?.rowSpan} )`}` : 
    (reps?.name || reps?.user?.name) ? (t(reps.name) || reps?.user?.name) : <>{t('ncrm_common_unassigned')}</>;
  },
  [keyNames.KEY_PRODUCT_START_DATE](col: string, data: any) {
    return convertDateTimeServerToClient({ date: data?.[col] });
  },
  [keyNames.KEY_PRODUCT_END_DATE](col: string, data: any) {
    return convertDateTimeServerToClient({ date: data?.[col] });
  },
  [keyNames.KEY_PRODUCT_BASE_UNIT](col: string, data: any) {
    return data?.unit?.name ?? '';
  },
  [keyNames.KEY_PRODUCT_COST_OF_GOODS](col: string, data: any) {
    return `${data?.[col]} %`;
  },
  [keyNames.KEY_PRODUCT_ITEMS](col: string, data: any) {
    const items = data[col] || [];
    return items.length > 0 ? (
      <ListTableCellDroplist
        showAvatar={false}
        values={items}
        cellComponent={(item: any) => <ProductItemQuickView value={{ id: item?.id, name: item?.name }} />}
      />
    ) : (
      ''
    );
  },
  [keyNames.KEY_PRODUCT_VENDOR](col: string, data: any) {
    const items = data[col] || [];
    return items.length > 0 ? (
      <ListTableCellDroplist
        showAvatar={false}
        values={items}
        cellComponent={(item: any) => <CustomerQuickView value={{ id: item?.id, name: item?.name }} />}
      />
    ) : (
      ''
    );
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedProduct'].indexOf(groupBy) >= 0;
};
