import { Link as RouteLink } from 'react-router-dom';

// mui import
import { Switch, Typography, useTheme, Stack } from '@mui/material';

// project import
import { MENU_PRODUCT } from '@base/config/menus';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { ProductQuickView } from '@base/containers/QuickView';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

// menu import
import * as keyNames from '@product/unit/config/keyNames';
import * as itemKeyNames from '@product/item/config/keyNames';
import RouteName from '@base/components/@hanbiro/RouteName';

export const columnRenderRemap = (menu: string, isProdPerUnit: boolean) => ({
  [keyNames.KEY_UNIT_NAME](col: string, data: any) {
    const name = data?.[col] ?? '';
    const id = data?.id ?? '';
    let url = `/${MENU_PRODUCT}/${menu}/${id}`;
    const isRead = data?.isRead ?? true;
    if (isProdPerUnit) {
      url = '';
    }
    return <RouteName url={url} name={name} component="h6" isRead={isRead} />;
  },
  [keyNames.KEY_UNIT_ACTIVE](col: string, data: any) {
    return <Switch checked={data?.[col] || false} size="small" readOnly />;
  },
  [keyNames.KEY_UNIT_VALUES](col: string, data: any) {
    const items = data[col] || [];
    return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
  },
  [keyNames.KEY_UNIT_RELATED_PRODUCTS](col: string, data: any) {
    const items = data[col] || [];
    return items.length > 0 ? (
      <ListTableCellDroplist
        showAvatar={false}
        values={items}
        // cellComponent={(item: any) => <ProductQuickView value={{ id: item.id, name: item.name }} showViewModal={false} />}
      />
    ) : (
      ''
    );
  },
  [keyNames.KEY_UNIT_QTY](col: string, data: any) {
    const items = data[keyNames.KEY_UNIT_VALUES] || [];
    const qty = items.reduce((total: number, object: any) => {
      return total + object.qty;
    }, 0);
    return qty;
  },
  //Helper for case  'Product-Item list by Base Unit'
  [itemKeyNames.KEY_ITEM_UNIT](col: string, data: any) {
    const name = data?.[col].name ?? '';
    const id = data?.unit?.id ?? '';
    const url = `/${MENU_PRODUCT}/${menu}/${id}`;
    return (
      <RouteLink to={url} style={{ textDecoration: 'none' }}>
        <Typography noWrap color={'link'}>
          {name}
        </Typography>
      </RouteLink>
    );
  },
  [itemKeyNames.KEY_ITEM_PRODUCT](col: string, data: any) {
    return data?.[col] ? <ProductQuickView value={data?.[col]} /> : '';
  },
  [itemKeyNames.KEY_ITEM_IMAGES](col: string, data: any) {
    const mainImage: any = data?.images?.[0] ?? null;
    return (
      <div
        style={{
          position: 'absolute', //fixed wrong display when table cell first-of-type apply on image item from 2nd to end of rowspan because no checkbox
          left: 8,
          top: 8
        }}
      >
        <IconAvatar showType="image" variant="rounded" id={mainImage?.id} url={mainImage?.name} alt={''} size="md" />
      </div>
    );
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE](col: string, data: any) {
    return data?.[col]?.name ?? '';
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY](col: string, data: any) {
    const items = data[itemKeyNames.KEY_ITEM_UNIT_VALUE] || [];
    return items.qty;
  }
});

export const isDeleteList = (groupBy: string): boolean => {
  return ['deletedUnit'].indexOf(groupBy) >= 0;
};
