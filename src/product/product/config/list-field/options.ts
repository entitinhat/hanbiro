import { lazy } from 'react';
import { t } from 'i18next';

import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { FilterByOption } from '@base/types/common';
import Switch from '@base/components/@hanbiro/Switch';
import { LabelValue } from '@base/types/app';

import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';
import Type from '@product/product/components/Type';
import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import BaseUnitAutoComplete from '@product/unit/containers/BaseUnitAutoComplete';
import AttributeAutoComplete from '@product/attribute/containers/AttributeAutoComplete';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';

export const groupByOptions = [
  { label: 'ncrm_product_products_all_products', value: 'all' },
  { label: 'ncrm_product_products_my_product', value: 'myProduct' },
  { label: 'ncrm_product_products_my_group_product', value: 'myGroupProduct' },
  { label: 'ncrm_product_products_my_group_product', value: 'myGroupProduct2' },
  { label: 'ncrm_product_products_unassigned_product', value: 'unassignedProduct' },
  { label: 'ncrm_product_products_products_per_group', value: 'productsPerGroup' },
  { label: 'ncrm_product_products_products_per_group', value: 'productsPerGroup2' },
  { label: 'ncrm_product_products_can_be_sold_products', value: 'canBeSoldProduct' },
  { label: 'ncrm_product_products_purchased_product', value: 'purchasedProduct' },
  { label: 'ncrm_product_products_produced_product', value: 'producedProduct' },
  { label: 'ncrm_product_products_active_products', value: 'activeProduct' },
  { label: 'ncrm_product_products_inactive_products', value: 'inActiveProduct' },
  { label: 'ncrm_product_products_not_created_items', value: 'notCreatedItem' },
  { label: 'ncrm_product_products_deleted_product', value: 'deletedProduct' },
];

export const dateByOptions = [
  { label: 'product_product_field_more_createdat', value: 'createdAt' },
  { label: 'product_product_field_more_updatedat', value: 'updatedAt' }
];

export const filterByOptions: FilterByOption[] = [
  {
    label: 'product_product_field_basic_group',
    value: 'groupId',
    component: ProductGroupAutoComplete,
    getValue: (componentValue: any): string => {
      return componentValue?.id;
    },
    setValue: (value: string) => {
      return { id: value };
    }
  },
  {
    label: 'product_product_field_basic_canbesold',
    value: 'canBeSold',
    component: MuiCheckbox,
    getValue: (value: boolean) => {
      return value ?? false;
    },
    setValue: (value?: boolean) => {
      return value ?? false;
    },
    parseExtra: (value: boolean) => {
      return value ? t(`ncrm_product_filter_can_be_sold`) : t(`ncrm_product_filter_can_not_be_sold`);
    }
  },
  {
    label: 'product_product_field_basic_type',
    value: 'type',
    component: Type,
    getValue: (componentValue: string) => {
      return PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === componentValue)?.value ?? '';
    },
    setValue: (value: string) => {
      return PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === value)?.value ?? '';
    },
    parseExtra: (value: string) => {
      return PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === value)?.label ?? '';
    }
  },
  {
    label: 'product_product_field_basic_unit',
    value: 'unitId',
    component: BaseUnitAutoComplete,
    getValue: (componentValue: any): string => {
      return componentValue?.id;
    },
    setValue: (value: any) => {
      return {
        id: value
      };
    }
  },
  {
    label: 'product_product_field_basic_attributes',
    value: 'attributes',
    component: AttributeAutoComplete,
    componentProps: { single: false },
    getValue: (componentValue: any) => {
      console.log('componentValue base Unit >>>>>>>>>>>', componentValue);
      var nVal = componentValue.map((item: any) => item?.id);
      console.log('nVal attributes', nVal);
      nVal = nVal.join(',');
      return nVal;
    },
    setValue: (value: any) => {
      //leave empty for initial value for component
    }
  },
  {
    label: 'product_product_field_basic_active',
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
  {
    label: 'ncrm_product_field_more_assign_rep',
    value: 'assignedTo',
    component: UserAutoComplete,
    componentProps: {
      showAvatar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_product_filter_owner',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  },
  {
    label: 'product_product_field_more_updatedby',
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

export const sortsBy: LabelValue[] = [
  {
    value: 'name',
    label: 'product_product_field_basic_name'
  },
  {
    value: 'group',
    label: 'product_product_field_basic_group'
  },
  {
    value: 'code',
    label: 'product_product_field_basic_code'
  },
  {
    value: 'unit',
    label: 'product_product_field_basic_unit'
  },
  {
    value: 'attributes',
    label: 'product_product_field_basic_attributes'
  },
  {
    value: 'type',
    label: 'product_product_field_basic_type'
  },
  {
    value: 'active',
    label: 'product_product_field_basic_active'
  },
  {
    value: 'assignTo',
    label: 'product_product_field_basic_assign_to'
  },
  {
    value: 'createdBy',
    label: 'product_product_field_basic_createdby'
  },
  {
    value: 'createdAt',
    label: 'product_product_field_basic_createdat'
  },
  {
    value: 'updatedAt',
    label: 'product_product_field_basic_updatedat'
  }
];
