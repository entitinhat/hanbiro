import { LabelValue } from '@base/types/app';
import { FilterByOption } from '@base/types/common';

import Switch from '@base/components/@hanbiro/Switch';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import BaseUnitAutoComplete from '@product/unit/containers/BaseUnitAutoComplete';
import UnitValueAutoComplete from '@product/unit/containers/UnitValueAutoComplete';
import { UnitValue } from '@product/unit/types/unit';
import { Product } from '@product/product/types/product';
import { BaseUnit } from '@product/unit/types/unit';

import { KEY_UNIT_NAME } from '../keyNames';
import { t } from 'i18next';

export const groupByOptions = [
  {
    label: 'ncrm_product_units_all_units',
    value: 'all'
  },
  {
    label: 'ncrm_product_units_deleted_unit',
    value: 'deletedUnit'
  },
  {
    label: 'ncrm_product_units_products_per_unit',
    value: 'prodPerUnit'
  }
];

export const dateByOptions = [
  {
    label: 'product_item_field_more_createdat',
    value: 'createdAt'
  },
  {
    label: 'product_item_field_more_updatedat',
    value: 'updatedAt'
  }
];

export const filterByOptions: FilterByOption[] = [
  {
    label: 'product_unit_field_basic_active',
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
    label: 'product_item_field_basic_owner',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: {
      single: false,
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
    label: 'product_item_field_more_updatedby',
    value: 'updatedBy',
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const deletedUnitFilterByOptions: FilterByOption[] = [
  {
    label: 'product_item_field_basic_createdby',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: { single: true, showAvatar: true },
    getValue: (componentValue: any) => {
      return componentValue?.id ?? '';
    }
  }
];

export const prodPerUnitFilterByOptions: FilterByOption[] = [
  {
    label: 'product_unit_field_basic_name',
    value: 'unitId',
    component: BaseUnitAutoComplete,
    componentProps: { single: false },
    getValue: (componentValue: BaseUnit[]) => {
      return componentValue?.map((v: BaseUnit) => v?.id).join(',');
    },
    setValue: (value: string) => {
      return value ? value.split(',')?.map((vId: string) => ({ id: vId })) : [];
      // return value ? value.split(',') : [];
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
  }
];

export const searchFields = [
  {
    name: KEY_UNIT_NAME,
    type: 'text',
    label: 'Base Unit',
    defaultValue: ''
  }
];

export const sortsBy: LabelValue[] = [
  {
    label: 'product_unit_field_basic_name',
    value: 'name'
  },
  {
    label: 'product_unit_field_basic_relatedproducts',
    value: 'products'
  },
  {
    label: 'product_item_field_basic_owner',
    value: 'createdBy'
  },
  {
    label: 'product_units_field_basic_createdat',
    value: 'createdAt'
  },
  {
    label: 'product_item_field_more_updatedat',
    value: 'updatedAt'
  },
  {
    label: 'product_item_field_more_updatedby',
    value: 'updatedBy'
  }
];
