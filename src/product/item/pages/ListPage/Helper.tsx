import { useRecoilValue } from 'recoil';

import { Switch, Typography } from '@mui/material';

import { Country } from '@base/types/setting';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers';
import { MENU_PRODUCT } from '@base/config/menus';
import { ProductQuickView } from '@base/containers/QuickView';
import { WARRANTY_PERIOD_OPTIONS } from '@base/config/constant';
import { availableCountrySelector } from '@base/store/selectors/app';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import RouteName from '@base/components/@hanbiro/RouteName';

import { IMAGE_MODULE_PRODUCT_ITEM, PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS, PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';
import * as keyNames from '@product/item/config/keyNames';

export const columnRenderRemap = (menu: string, isDeleteList: boolean) => ({
  code(col: string, data: any) {
    return data?.[col] ?? '';
  },
  [keyNames.KEY_ITEM_IMAGES](col: string, data: any) {
    const mainImage: any = data?.images?.[0] ?? null;
    return (
      <IconAvatar
        moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
        showType="image"
        variant="rounded"
        id={mainImage?.id}
        url={mainImage?.name}
        alt={''}
        size="md"
      />
    );
  },
  [keyNames.KEY_ITEM_NAME](col: string, data: any) {
    const name = data?.[col] ?? '';
    const id = data?.id ?? '';
    const url = `/${MENU_PRODUCT}/${menu}/${id}`;
    const isRead = data?.isRead ?? true;

    return <RouteName url={url} name={name} component="h6" isRead={isRead} />;
  },
  [keyNames.KEY_ITEM_ACTIVE](col: string, data: any) {
    return <Switch checked={data?.[col] || false} size="small" readOnly />;
  },
  [keyNames.KEY_ITEM_INVENTORY_TYPE](col: string, data: any) {
    return <SpanLang keyLang={PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? ''} textOnly />;
  },
  [keyNames.KEY_ITEM_TYPE](col: string, data: any) {
    return <SpanLang keyLang={PRODUCT_ITEM_TYPE_OPTIONS?.find((v: any) => v.value === data[col])?.label ?? ''} textOnly />;
  },
  [keyNames.KEY_ITEM_PRODUCT](col: string, data: any) {
    return data?.[col] ? <ProductQuickView value={data?.[col]} /> : '';
  },
  [keyNames.KEY_ITEM_UNIT](col: string, data: any) {
    return data?.[col]?.name ?? '';
  },
  [keyNames.KEY_ITEM_UNIT_VALUE](col: string, data: any) {
    return data?.[col]?.name ?? '';
  },
  [keyNames.KEY_ITEM_SKU](col: string, data: any) {
    return <Typography>{data?.[col] ?? ''}</Typography>;
  },
  [keyNames.KEY_ITEM_ATTR_VALUES](col: string, data: any) {
    const items: any[] =
      data?.[col]?.map((item: any) => ({
        id: item?.id,
        name: [item?.attr?.name].join(':') // [item?.attr?.name, item?.name].join(':')
      })) ?? [];
    return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
  },
  [keyNames.KEY_ITEM_UNIT_PRICE](col: string, data: any) {
    const unitPrice = data?.[col];
    return <Typography>{data?.[col] ? moneyFormat(unitPrice?.amount ?? 0, unitPrice?.currency) : ''}</Typography>;
  },
  [keyNames.KEY_ITEM_UNIT_VALUE_QTY](col: string, data: any) {
    return data?.unitVal?.qty ?? '';
  },
  [keyNames.KEY_ITEM_WARRANTY_PERIOD](col: string, data: any) {
    return !data?.[col] || data?.[col]?.period <= 0
      ? ''
      : `${data?.[col]?.period} ${WARRANTY_PERIOD_OPTIONS?.find((v: any) => v.value == data?.[col]?.unit)?.label}`;
  },
  [keyNames.KEY_ITEM_COUNTRY_ORIGIN](col: string, data: any) {
    const availableCountries: Country[] = useRecoilValue(availableCountrySelector);
    const selected = availableCountries?.find((v: Country) => {
      return v?.isoCode2 == data?.[col];
    });
    return selected?.country ?? '';
  },
  [keyNames.KEY_ITEM_MANUFACTURE_DATE](col: string, data: any) {
    return convertDateTimeServerToClient({ date: data?.[col] });
  },
  [keyNames.KEY_ITEM_EXPIRED_DATE](col: string, data: any) {
    return convertDateTimeServerToClient({ date: data?.[col] });
  },
  [keyNames.KEY_ITEM_MANUFACTURER](col: string, data: any) {
    return <Typography>{data?.[col]?.name ?? ''}</Typography>;
  },
  [keyNames.KEY_ITEM_VENDOR](col: string, data: any) {
    return <Typography>{data?.[col]?.name ?? ''}</Typography>;
  },
  [keyNames.KEY_ITEM_BARCODE](col: string, data: any) {
    return <Typography>{data?.[col] ?? ''}</Typography>;
  },
  [keyNames.KEY_ITEM_ASSIGN_TO](col: string, data: any) {
    return <Typography>{data?.[col]?.user?.name ?? ''}</Typography>;
  },
  [keyNames.KEY_ITEM_BASE_PRICE](col: string, data: any) {
    const basePrice = data?.[col];
    return <Typography>{data?.[col] ? moneyFormat(basePrice?.amount ?? 0, basePrice?.currency) : ''}</Typography>;
  },
  [keyNames.KEY_ITEM_COST_PRICE](col: string, data: any) {
    const costPrice = data?.[col];
    return <Typography>{data?.[col] ? moneyFormat(costPrice?.amount ?? 0, costPrice?.currency) : ''}</Typography>;
  },
  [keyNames.KEY_ITEM_DIMENSION](col: string, data: any) {
    const dimension = data?.[col] ?? [];
    return dimension.unit
      ? ` 
    ${dimension?.val?.x && `${dimension?.val.y}`}
    ${dimension?.val?.y && `x ${dimension?.val.y}`} 
    ${dimension?.val?.z && `x ${dimension?.val.z}`}
    ${dimension?.unit}
    `
      : '';
  },
  [keyNames.KEY_ITEM_WEIGHT](col: string, data: any) {
    const weight = data?.[col] ?? [];
    return weight.unit
      ? ` 
    ${weight?.val}
    ${weight?.unit}
    `
      : '';
  },
  [keyNames.KEY_ITEM_ASSOCIATED_ITEMS](col: string, data: any) {
    const associatedItems = data?.[col]?.map((_asi: any) => _asi?.item);
    return associatedItems && associatedItems.length > 0 ? <ListTableCellDroplist showAvatar={false} values={associatedItems} /> : '';
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedItem'].indexOf(groupBy) >= 0;
};
