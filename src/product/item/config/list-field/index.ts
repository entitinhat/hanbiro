import { lazy } from 'react';
import { Country } from '@base/types/setting';
import { PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS, PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';

import Switch from '@base/components/@hanbiro/Switch';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import CountrySelect from '@base/components/@hanbiro/CountrySelect';
import ItemTypeSelect from '@product/item/components/ItemTypeSelect';
import { LabelValue } from '@base/types/app';
import InventoryTypeSelect from '@product/item/components/InventoryTypeSelect';
import UnitValueAutoComplete from '@product/unit/containers/UnitValueAutoComplete';
import { UnitValue } from '@product/unit/types/unit';
import AttributeValueAutoComplete from '@product/attribute/containers/AttributeValueAutoComplete';
import { AttributeValue } from '@product/attribute/types/attribute';
import { Product } from '@product/product/types/product';
import { FilterByOption } from '@base/types/common';
import { t } from 'i18next';

export const groupByOptions = [
  { label: 'ncrm_product_items_all_items', value: 'all' },
  { label: 'ncrm_product_items_inventory_items', value: 'inventoryItem' },
  { label: 'ncrm_product_items_non_inventory_items', value: 'nonInventoryItem' },
  { label: 'ncrm_product_items_general_items', value: 'generalItem' },
  { label: 'ncrm_product_items_composite_items', value: 'compositeItem' },

  //TODO: add filter for active option && inactive option
  { label: 'ncrm_product_items_active_items', value: 'activeItem' },
  { label: 'ncrm_product_items_inactive_items', value: 'inActiveItem' },
  { label: 'ncrm_product_items_per_products', value: 'itemPerProduct1' },
  { label: 'ncrm_product_items_per_products', value: 'itemPerProduct2' },

  // { label: 'ncrm_product_items_my_items', value: 'myItem' },
  // { label: 'ncrm_product_items_my_group_items', value: 'myGroupItem' },

  { label: 'ncrm_product_items_deleted_items', value: 'deletedItem' }

  // { label: 'ncrm_product_items_prepaid', value: 'prepaidItem' }
];

export const dateByOptions = [
  { label: 'product_item_field_more_manufacturedate', value: 'manufacturerDate' },
  { label: 'product_item_field_more_expireddate', value: 'expiredDate' },
  { label: 'product_item_field_more_createdat', value: 'createdAt' },
  { label: 'product_item_field_more_updatedat', value: 'updatedAt' }
];

export const filterByOptions: FilterByOption[] = [
  {
    label: 'product_item_field_basic_itemtype',
    value: 'itemType',
    component: ItemTypeSelect,
    componentProps: {},
    getValue: (componentValue: any) => {
      return PRODUCT_ITEM_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
    },
    setValue: (value: number) => {
      return PRODUCT_ITEM_TYPE_OPTIONS?.[value - 1]?.value;
    }
  },
  {
    label: 'product_item_field_basic_inventorytype',
    value: 'inventoryType',
    component: InventoryTypeSelect,
    componentProps: {},
    getValue: (componentValue: any) => {
      return PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
    },
    setValue: (value: number) => {
      return PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.[value - 1]?.value;
    }
  },
  {
    label: 'product_item_field_basic_unitval',
    value: 'unitValId',
    component: UnitValueAutoComplete,
    componentProps: { single: false },
    getValue: (componentValue: UnitValue[]) => {
      return componentValue?.map((v: UnitValue) => v?.id).join(',');
    },
    setValue: (value: string) => {
      return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
    }
  },
  {
    label: 'product_item_field_basic_attrvalues',
    value: 'attrValues',
    component: AttributeValueAutoComplete,
    componentProps: { single: false },
    getValue: (componentValue: AttributeValue[]) => {
      return componentValue?.map((v: AttributeValue) => v?.id).join(',');
    },
    setValue: (value: string) => {
      return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
    }
  },
  {
    label: 'product_item_field_basic_prod',
    value: 'prodId',
    component: ProductAutoComplete,
    getValue: (componentValue: Product[]) => {
      return componentValue?.map((v: Product) => v?.id).join(',');
    },
    setValue: (value: string) => {
      // return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
      return value ? value.split(',')?.map((vId: string) => vId) : [];
    }
  },
  {
    label: 'product_item_field_basic_active',
    value: 'active',
    component: Switch,
    componentProps: {
      // defaultValue: true
    },
    getValue: (value?: boolean) => {
      return value ?? false;
    },
    setValue: (value?: boolean) => {
      return value ?? false;
    },
    parseExtra: (value: boolean) => {
      return value ? t(`ncrm_common_active`) : t(`ncrm_common_inactive`);
    }
  },

  // {
  //   label: 'ncrm_product_items_filter_assigned_rep',
  //   value: 'assignTo',
  //   component: UserAutoComplete,
  //   componentProps: { single: false, showAvatar: true },
  //   getValue: (value: any) => {
  //     return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
  //   },
  //   setValue: (value: string) => {
  //     return value ? value.split(',') : [];
  //   }
  // },
  // {
  //   label: 'product_item_field_more_countryorigin',
  //   value: 'countryOrigin',
  //   component: CountrySelect,
  //   getValue: (value: Country) => {
  //     return value.isoCode2;
  //   },
  //   parseExtra: (extra: Country) => {
  //     return extra?.country ?? extra?.isoCode2;
  //   }
  // },
  // {
  //   label: 'Read',
  //   value: 'isRead',
  //   component: Switch,
  //   componentProps: {},
  //   getValue: (value: any) => {
  //     return value;
  //   },
  //   setValue: (value: any) => {
  //     return value || false;
  //   },
  //   parseExtra: (value: boolean) => {
  //     return value ? t(`isRead`) : t(`unRead`);
  //   }
  // },
  {
    label: 'product_item_field_basic_assignedrep',
    value: 'assignedTo',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  },
  {
    label: 'product_item_field_basic_createdby',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  },
  {
    label: 'product_item_field_basic_updatedBy',
    value: 'updatedBy',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  }
];

export const searchFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    defaultValue: ''
  }
];

export const sortsBy = [
  { label: 'product_item_field_basic_name', value: 'name' },
  { label: 'product_item_field_basic_sku', value: 'sku' },
  { label: 'product_item_field_basic_prod', value: 'prod' },
  { label: 'product_item_field_basic_code', value: 'code' },
  { label: 'product_item_field_basic_itemtype', value: 'itemType' },
  { label: 'product_item_field_basic_inventorytype', value: 'inventoryType' },
  { label: 'product_item_field_basic_unitval', value: 'unitVal' },
  { label: 'product_item_field_basic_openstock', value: 'openStock' },
  { label: 'product_item_field_basic_stockonhand', value: 'stockOnHand' },
  { label: 'product_item_field_basic_unitprice', value: 'unitPrice' },
  { label: 'product_item_field_basic_replenishmentpoint', value: 'replenishmentPoint' },
  { label: 'product_item_field_more_countryorigin', value: 'countryOrigin' },
  { label: 'product_item_field_more_createdat', value: 'createdAt' },
  { label: 'product_item_field_more_updatedat', value: 'updatedAt' },
  // { label: 'product_item_field_basic_associateditems', value: 'associatedItems' },
  { label: 'product_item_field_basic_active', value: 'active' },
  // { label: 'product_item_field_basic_attrvalues', value: 'attrValues' },
];
