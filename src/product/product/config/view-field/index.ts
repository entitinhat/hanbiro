import * as keyNames from '@product/product/config/keyNames';
import * as commonConfig from '@base/config/view-field';
import * as components from './components';
import * as commonComponents from '@base/config/view-field/components';
import { FieldConfig } from '@base/types/pagelayout';
import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import validators from '@base/utils/validation/fieldValidator';

const Config: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_PRODUCT_TYPE]: {
    component: commonComponents.RadioGroupView,
    componentProps: {
      options: PRODUCT_TYPE_OPTIONS
    },
    schema: keyNames.KEY_PRODUCT_TYPE,
    viewProps: {
      userPermission: { isEdit: true, isShow: true }
    },
    getValueView: (value: any) => {
      if (value?.value) {
        return value;
      } else {
        return PRODUCT_TYPE_OPTIONS.find((_option) => _option.value === value);
      }
    },
    getValueEdit: (value: string) => {
      return PRODUCT_TYPE_OPTIONS.find((_option) => _option.value === value) || PRODUCT_TYPE_OPTIONS[0];
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_PRODUCT_TYPE]: value.value };
    }
  },
  [keyNames.KEY_PRODUCT_GROUP]: {
    schema: `group {
      id
      name
    }`,
    component: components.ProductGroupView,
    getMutationValue: (value: any) => {
      return {
        group: {
          id: value?.id,
          name: value?.name
        }
      };
    },
    getDefaultValue: (value: any) => {
      return {
        id: value?.id,
        name: value?.name
      };
    }
  },
  [keyNames.KEY_PRODUCT_ACTIVE]: {
    component: commonComponents.SwitchView,
    schema: keyNames.KEY_PRODUCT_ACTIVE
  },
  [keyNames.KEY_PRODUCT_TYPE_BE_SOLD]: {
    component: commonComponents.CheckboxView,
    schema: keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_PRODUCT_START_DATE]: {
    component: commonComponents.DateTimeView,
    schema: keyNames.KEY_PRODUCT_START_DATE
  },
  [keyNames.KEY_PRODUCT_END_DATE]: {
    // component: commonComponents.UnLimitDateTimeView,
    schema: `noEndDate
    endDate
    `,
    getValue: (value: any) => {
      return {
        isUnlimit: value?.noEndDate,
        dataTime: value?.noEndDate ? new Date() : new Date(value?.endDate)
      };
    },
    getMutationValue: (value: any) => {
      return {
        noEndDate: value?.isUnlimit,
        endDate: value?.isUnlimit ? '0001-01-01T00:00:00Z' : value?.dataTime
      };
    }
  },
  [keyNames.KEY_PRODUCT_BASE_UNIT]: {
    component: components.BaseUnitView,
    validate: {
      required: validators.required
    },
    schema: `unit {
      id
      name
      unitValues {
        id
        name
        qty
      }
    }`,
    getValue: (value: any) => {
      return value?.unit;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_PRODUCT_BASE_UNIT]: { id: value.id, name: value.name } };
    }
  },
  [keyNames.KEY_PRODUCT_ATTRIBUTE]: {
    component: components.AttributeView,
    schema: `useAttr
    attributes {
      id
      name
      values {
        id
        name
      }
    }`,
    getValue: (value: any) => {
      return {
        useAttr: value?.useAttr,
        attributes: value?.attributes ?? []
      };
    },
    getValueEdit: (value: any) => {
      return {
        attributes: value?.attributes ? value?.attributes?.map((item: any) => ({ ...item })) : [],
        useAttr: value?.useAttr
      };
    },
    getMutationValue: (value: any) => {
      return {
        useAttr: value?.useAttr,
        attributes: value?.useAttr
          ? value?.attributes?.length > 0
            ? value?.attributes?.map((item: any) => ({
                id: item?.id,
                name: item?.name
              }))
            : []
          : []
      };
    }
    // getDefaultValue: (value: any) => {
    //   return {
    //     useAttr: value?.useAttr,
    //     attributes:
    //       value?.attributes?.length > 0
    //         ? value?.attributes?.map((item: any) => ({
    //             id: item?.id,
    //             name: item?.name
    //           }))
    //         : []
    //   };
    // }
  },
  [keyNames.KEY_PRODUCT_ASSIGN_TO]: {
    schema: `assignTo {
      user {
        id
        name
      }
      group {
        id
        name
      }
    }`
  },
  [keyNames.KEY_PRODUCT_VENDOR]: {
    schema: `vendor {
      id
      code
      name
    }`
  },
  [keyNames.KEY_PRODUCT_MANUFACTURERS]: {
    schema: `manufacturer {
      id
      code
      name
    }`
  },
  [keyNames.KEY_PRODUCT_COUNTRY_ORIGIN]: {
    component: commonComponents.CountryView,
    schema: keyNames.KEY_PRODUCT_COUNTRY_ORIGIN,
    getMutationValue: (value: any) => {
      return {
        countryOrigin: value?.value
      };
    }
  },
  [keyNames.KEY_PRODUCT_ITEMS]: {
    schema: `items {
      id
      name
    }`,
    component: null
  },
  [keyNames.KEY_PRODUCT_DESCRIPTION]: {
    schema: keyNames.KEY_PRODUCT_DESCRIPTION,
    component: commonComponents.TextAreaView
  },
  [keyNames.KEY_PRODUCT_COST_OF_GOODS]: {
    schema: keyNames.KEY_PRODUCT_COST_OF_GOODS
    // component: components.ProductCostOfGoodsView
  }
};

export default Config;
