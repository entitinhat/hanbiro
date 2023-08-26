import * as keyNames from '@settings/template/config/key-names';
import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';

import { FieldConfig } from '@base/types/pagelayout';

import {
  AssignRepViewField,
  LanguageSelectViewField,
  ProductViewField,
  SelectBoxCustomViewField,
  StageViewField
} from '@settings/template/config/view-fields/components';
import { LabelData, MainTemplate } from '@settings/template/types/template';
import { Product } from '@product/product/types/product';
import { TEMPLATE_STAGE_OPTIONS, TEMPLATE_TYPE_OPTIONS } from '../constants';

const configViewGeneral: FieldConfig = {
  ...commonConfig?.default,

  [keyNames.KEY_MENU_TEMPLATE_TYPE]: {
    component: SelectBoxCustomViewField,
    showFullRow: true,
    componentProps: {
      isMultiple: false,
      isSearchable: false,
      options: TEMPLATE_TYPE_OPTIONS,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (value: MainTemplate) => {
      const currentKey = value?.[keyNames.KEY_MENU_TEMPLATE_TYPE] ?? '';
      const currentValue = TEMPLATE_TYPE_OPTIONS.filter((item) => item.value === currentKey)[0];
      return currentValue?.label;
    }
  },

  [keyNames.KEY_MENU_TEMPLATE_PRODUCT]: {
    showFullRow: true,
    component: ProductViewField,
    languageKey: 'crm_new_menu_product',
    schema: `isAllProducts
    products{
        id
        name
    }`,
    getValue: (value: MainTemplate) => {
      const currentValue = value?.[keyNames.KEY_MENU_TEMPLATE_PRODUCT] ?? [{ id: '1', name: 'all' }];
      return currentValue;
    },
    getMutationValue: (value: Product[]) => {
      const currentValue = value?.map((item) => {
        return {
          id: item.id,
          name: item.name
        };
      });
      return { [keyNames.KEY_MENU_TEMPLATE_PRODUCT]: currentValue };
    }
  },
  [keyNames.KEY_MENU_TEMPLATE_CREATED_BY]: {
    showFullRow: true,
    languageKey: 'setting_cta_field_basic_createdby',
    schema: `createdBy{
        id
        name
        fullName
    }`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    component: AssignRepViewField,
    getValue: (value: MainTemplate) => {
      const currentValue = value?.[keyNames.KEY_MENU_TEMPLATE_CREATED_BY] ?? '';
      return currentValue;
    }
  },
  [keyNames.KEY_MENU_TEMPLATE_LANGUAGE]: {
    component: LanguageSelectViewField,
    schema: `language`,
    showFullRow: true,
    componentProps: {
      options: []
    },
  },
  [keyNames.KEY_MENU_TEMPLATE_DESCRIPTION]: {
    component: commonComponents.TextAreaView,
    schema: `description`,
    showFullRow: true
  },
  [keyNames.KEY_MENU_TEMPLATE_TITLE]: {
    schema: `title`,
    showFullRow: true
  },
  [keyNames.KEY_MENU_TEMPLATE_DESGIN]: {
    showFullRow: true,
    schema: `html`,
    component: null,
    getValue: (value: MainTemplate) => {
      const currentValue = value?.[keyNames.KEY_MENU_TEMPLATE_DESGIN];
      return currentValue;
    },
    getValueView: (value: any) => {
      return value;
    },
    getValueEdit: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_MENU_TEMPLATE_DESGIN]: JSON.stringify(value)
      };
    }
  },
  [keyNames.KEY_MENU_TEMPLATE_DESIGN_VIEW]: {
    showFullRow: true,
    schema: `html`,
    component: null,
    viewProps: {
      defaultShowEdit: true
    },
    getValue: (value: any) => {
      const currentValue = value?.[keyNames.KEY_MENU_TEMPLATE_DESIGN_VIEW];
      return currentValue;
    },
    getValueView: (value: any) => {
      return value;
    },
    getValueEdit: (value: any) => {
      return value;
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_MENU_TEMPLATE_DESIGN]: JSON.stringify(value)
      };
    }
  },
  [keyNames.KEY_MENU_TEMPLATE_STAGE]: {
    schema: `stage`,
    component: StageViewField,
    showFullRow: true,
    componentProps: {
      isMultiple: false,
      isSearchable: false,
      options: TEMPLATE_STAGE_OPTIONS,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (apiData: MainTemplate) => {
      return TEMPLATE_STAGE_OPTIONS?.find((v: any) => v.value === apiData?.[keyNames.KEY_MENU_TEMPLATE_STAGE]) ?? {};
    },
    getValueView: (value: LabelData) => {
      return value?.value ?? '';
    },
    getMutationValue: (value: LabelData) => {
      return {
        [keyNames.KEY_MENU_TEMPLATE_STAGE]: value.value
      };
    }
  }
};

export default configViewGeneral;
