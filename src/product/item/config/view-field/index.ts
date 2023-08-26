import { Country } from '@base/types/setting';
import * as keyNames from '@product/item/config/keyNames';
import * as commonConfig from '@base/config/view-field';
import * as components from './components';
import * as commonComponents from '@base/config/view-field/components';
import { PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS, PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';
import { FieldConfig } from '@base/types/pagelayout';

const ViewConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_ITEM_PRODUCT]: {
    component: components.ProductView,
    componentProps: { single: true },
    viewProps: {
      userPermission: { isEdit: false, isShow: true },
      quickView: true
    },
    schema: `prod {
      id
      name
      type
      group {
        id
        name
      }
      canBeSold
    }`,
    getValue: (value: any) => {
      return value?.prod;
    },
    getMutationValue: (value: any) => {
      return {
        prod: {
          id: value?.id,
          name: value?.name
        }
      };
    }
  },
  [keyNames.KEY_ITEM_UNIT]: {
    schema: `unit {
      id
      name
    }`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      return value?.name ?? '';
    }
  },
  [keyNames.KEY_ITEM_NAME]: {
    schema: keyNames.KEY_ITEM_NAME
  },
  [keyNames.KEY_ITEM_ACTIVE]: {
    component: commonComponents.SwitchView
  },
  [keyNames.KEY_ITEM_UNIT_VALUE]: {
    schema: `unitVal {
      id
      name
      qty
    }`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (apiData: any) => {
      return apiData?.unitVal;
    },
    getValueView: (value: any) => {
      return value?.name ?? '';
    },
    component: commonComponents.TextView
  },
  [keyNames.KEY_ITEM_UNIT_VALUE_QTY]: {
    schema: `unitVal {
      id
      name
      qty
    }`
  },
  [keyNames.KEY_ITEM_ATTR_VALUES]: {
    schema: `attrValues {
      id
      name
      attr {
        id
        name
      }
    }`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (apiData: any) => {
      return apiData?.attrValues;
    },
    component: components.AttrValuesView
  },
  [keyNames.KEY_ITEM_WEIGHT]: {
    component: commonComponents.WeightView,
    schema: `weight {
      unit
      val
    }`
  },
  [keyNames.KEY_ITEM_WARRANTY_PERIOD]: {
    component: commonComponents.WarrantyPeriodView,
    schema: `warrantyPeriod {
      unit
      period
    }`
  },
  [keyNames.KEY_ITEM_DIMENSION]: {
    component: commonComponents.DimensionView,
    schema: `dimension {
      unit
      val {
        x
        y
        z
      }
    }`
  },
  [keyNames.KEY_ITEM_INVENTORY_TYPE]: {
    schema: keyNames.KEY_ITEM_INVENTORY_TYPE,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      return PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.find((v: any) => v.value === value)?.label ?? '';
    }
  },
  [keyNames.KEY_ITEM_TYPE]: {
    schema: keyNames.KEY_ITEM_TYPE,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      return PRODUCT_ITEM_TYPE_OPTIONS?.find((v: any) => v.value === value)?.label ?? '';
    }
  },
  [keyNames.KEY_ITEM_COUNTRY_ORIGIN]: {
    schema: keyNames.KEY_ITEM_COUNTRY_ORIGIN,
    component: commonComponents.CountryView,
    getMutationValue: (value: Country) => {
      return {
        [keyNames.KEY_ITEM_COUNTRY_ORIGIN]: value?.isoCode2
      };
    }
  },
  [keyNames.KEY_ITEM_BARCODE]: {
    // component: components.ItemBarCodeView,
    schema: keyNames.KEY_ITEM_BARCODE
  },
  [keyNames.KEY_ITEM_VENDOR]: {
    schema: `vendor {
      id
      code
      name
    }`
  },
  [keyNames.KEY_ITEM_MANUFACTURER]: {
    schema: `manufacturer {
      id
      code
      name
    }`,
    component: components.CustomerView,
    componentProps: {
      single: true
    },
    getValueView: (value: any) => {
      return value;
    },
    getValueEdit: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        manufacturer: value
      };
    },
    getDefaultValue: (value: any) => {
      return value;
    }
  },
  [keyNames.KEY_ITEM_MANUFACTURE_DATE]: {
    component: commonComponents.DateTimeView,
    getDefaultValue: (val: Date | null) => {
      return val ? val?.toISOString() : '';
    }
  },
  [keyNames.KEY_ITEM_EXPIRED_DATE]: {
    component: commonComponents.DateTimeView,
    getDefaultValue: (val: Date | null) => {
      return val ? val?.toISOString() : '';
    }
  },
  [keyNames.KEY_ITEM_BEST_BEFORE_DATE]: {
    component: commonComponents.DateTimeView,
    getDefaultValue: (val: Date | null) => {
      return val ? val?.toISOString() : '';
    }
  },
  [keyNames.KEY_ITEM_UNIT_PRICE]: {
    schema: `unitPrice {
      amount
      currency
    }
    basePrice {
      amount
      currency
    }
    costPrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_BASE_PRICE]: {
    schema: `basePrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_COST_PRICE]: {
    schema: `costPrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_BEST_PRICE]: {
    schema: `bestPrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_PURCHASE_PRICE]: {
    schema: `purchasePrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_DESCRIPTION]: {
    ...commonConfig?.default?.[keyNames.KEY_ITEM_DESCRIPTION],
    showFullRow: true
  },
  [keyNames.KEY_ITEM_IMAGES]: {
    schema: `images {
      id
      name
      orgName
    }`
  },
  [keyNames.KEY_ITEM_BRAND]: {
    schema: keyNames.KEY_ITEM_BRAND
  },
  [keyNames.KEY_ITEM_ASSIGN_TO]: {
    schema: `assignTo {
      id
      name
    }`
  },
  [keyNames.KEY_ITEM_OPEN_STOCK]: {
    schema: keyNames.KEY_ITEM_OPEN_STOCK,
    component: commonComponents.NumericView,
    getMutationValue: (value: string | number) => {
      return parseInt(value as string);
    }
  },
  [keyNames.KEY_ITEM_SKU]: {
    schema: `sku`,
    component: components.SkuView,
    componentProps: {
      single: true
    },
    getValue: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_ITEM_SKU]: value?.[keyNames.KEY_ITEM_SKU] ?? []
      };
    }
  },
  [keyNames.KEY_ITEM_REPLENISHMENT_POINT]: {
    schema: keyNames.KEY_ITEM_REPLENISHMENT_POINT,
    component: commonComponents.NumericView,
    getMutationValue: (value: string | number) => {
      return parseInt(value as string);
    }
  },
  [keyNames.KEY_ITEM_STOCK_ON_HAND]: {
    schema: keyNames.KEY_ITEM_STOCK_ON_HAND,
    component: commonComponents.NumericView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getMutationValue: (value: string | number) => {
      return parseInt(value as string);
    }
  },
  ['unitPrices']: {
    schema: ``
  },
  ['manufacturers']: {
    schema: ``
  }
};
export default ViewConfig;
