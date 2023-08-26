import * as keyNames from '@product/product/config/keyNames';
import { PRODUCT_TYPE_PRODUCED } from '@product/main/config/constants';
import validators from '@base/utils/validation/fieldValidator';
import * as baseComponents from '@base/config/write-field/components';
import { TextField } from '@mui/material';
import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';
import Switch from '@base/components/@hanbiro/Switch';
import BaseUnitAutoComplete from '@product/unit/containers/BaseUnitAutoComplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import Type from '@product/product/components/Type';
import ProductAttribute from '@product/product/containers/ProductAttribute';
import { User, AssignToName } from '@base/types/user';
import * as components from '@product/product/config/write-field/components';

export default {
  [keyNames.KEY_PRODUCT_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'product',
      showType: 'canvas'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    // showFullRow: true,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_PRODUCT_TYPE]: {
    component: Type,
    validate: {
      required: validators.required
    },
    defaultValue: PRODUCT_TYPE_PRODUCED
  },
  [keyNames.KEY_PRODUCT_GROUP]: {
    component: ProductGroupAutoComplete,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => {
      return { id: value.id, name: value.name };
    }
  },
  [keyNames.KEY_PRODUCT_COST_OF_GOODS]: {
    // component: components.ProductCostOfGoods,
    validate: {},
    defaultValue: 0,
    parseValue: (valueApi: any) => valueApi || 0,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_ACTIVE]: {
    // component: components.Switch,
    componentProps: {
      value: true
    },
    validate: {},
    defaultValue: true,
    parseValue: (valueApi: any) => valueApi || true,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_START_DATE]: {
    // component: components.DatePicker,
    validate: {},
    defaultValue: new Date().toISOString(),
    parseValue: (valueApi: any) => valueApi || new Date().toISOString(),
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_END_DATE]: {
    // component: components.UnLimitDatePicker,
    validate: {},
    defaultValue: { dataTime: new Date(), isUnlimit: true },
    parseValue: (valueApi: any) => valueApi || { dataTime: new Date(), isUnlimit: true },
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_ASSIGN_TO]: {
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true
    },
    // validate: {},
    // showFullRow: true,
    defaultValue: [],
    parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: User[]) =>
      value?.map(
        (item: User) =>
          ({
            user: {
              id: item.id,
              name: item.name
            },
            group: {
              id: '',
              name: ''
            }
          } as AssignToName)
      )
  },
  [keyNames.KEY_PRODUCT_BASE_UNIT]: {
    component: BaseUnitAutoComplete,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => ({ id: value.id, name: value.name })
  },
  [keyNames.KEY_PRODUCT_ATTRIBUTE]: {
    component: ProductAttribute,
    validate: {
      attributes: validators.attribute
    },
    // showFullRow: true,
    defaultValue: { useAttr: true, attributes: [] },
    parseValue: (valueApi: any) => valueApi || { useAttr: true, attributes: [] },
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_TYPE_BE_SOLD]: {
    // component: Switch,
    component: components.CanBeSold,
    hideTitle: true,
    defaultValue: true,
    showFullRow: true,
    parseValue: (valueApi: any) => valueApi || true,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_PRODUCT_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 3,
      autoComplete: 'off'
    },
    showFullRow: true,
    parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  }
};
