
import * as keyNames from '@settings/template/config/key-names';


import { LabelValue } from '@base/types/app';
import { TEMPLATE_STAGE_OPTIONS, TEMPLATE_TASK_TYPE_OPTIONS_ENUM, TEMPLATE_TYPE_OPTIONS_ENUM } from '../constants';
import { LanguageSelect, ProductAutoComplete, SelectBoxCustom, UserAutoComplete } from '@settings/template/config/write-fields/components';
import { LabelData } from '@settings/template/types/template';
import { Product } from '@product/product/types/product';
import { User } from '@base/types/user';

export const groupByOptionsTask: LabelValue[] = [
  { label: 'ncrm_setting_template_all_templates', value: 'all' },
  { label: 'ncrm_setting_template_my_templates', value: 'my' },
  { label: 'ncrm_setting_template_all_drafts', value: 'draft' },
  { label: 'ncrm_setting_template_my_drafts', value: 'myDraft' },
  { label: 'ncrm_setting_template_deleted_templates', value: 'deletedTemplates' }
];
export const dateByOptionsTask: LabelValue[] = [
  { label: 'ncrm_setting_template_created_on', value: 'createdAt' },
  { label: 'ncrm_setting_template_updated_on', value: 'updatedAt' }
];

export const filterByOptionsTask = [

  {
    label: 'ncrm_setting_template_task_type',
    value: keyNames.KEY_MENU_TEMPLATE_SUB_TYPE,
    component: SelectBoxCustom,
    componentProps: {
      options: TEMPLATE_TASK_TYPE_OPTIONS_ENUM,
      fieldValue: 'value',
      fieldLabel: 'label',
      isSearchable: false
    },
    getValue: (componentValue: any) => {
      return componentValue?.value;
    },
    setValue: (value: any) => {
      return TEMPLATE_TASK_TYPE_OPTIONS_ENUM?.find((v: any) => v.value === value);
    }
  },
  {
    label: 'ncrm_setting_template_template_type',
    value: keyNames.KEY_MENU_TEMPLATE_TYPE,
    component: SelectBoxCustom,
    componentProps: {
      options: TEMPLATE_TYPE_OPTIONS_ENUM
    },
    getValue: (componentValue: LabelData) => {
      return componentValue?.value;
    },
    setValue: (value: number) => {
      return TEMPLATE_TYPE_OPTIONS_ENUM?.find((v: any) => v.value === value);
    }
  },
  {
    label: 'ncrm_setting_template_language',
    value: keyNames.KEY_MENU_TEMPLATE_LANGUAGE,
    component: LanguageSelect,
    componentProps: {},
    getValue: (componentValue: any) => {
      return componentValue?.value;
    }
  },
  {
    label: 'ncrm_setting_template_product',
    value: keyNames.KEY_MENU_TEMPLATE_PRODUCT,
    component: ProductAutoComplete,
    getValue: (value: Product) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_setting_template_owner',
    value: keyNames.KEY_MENU_TEMPLATE_CREATED_BY,
    component: UserAutoComplete,
    getValue: (value: User[]) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_setting_template_stage',
    value: keyNames.KEY_MENU_TEMPLATE_STAGE,
    component: SelectBoxCustom,
    componentProps: {
      options: TEMPLATE_STAGE_OPTIONS
    },
    getValue: (value: LabelData) => {
      return value?.value;
    },
    setValue: (value: string|number) => {
      return TEMPLATE_STAGE_OPTIONS.find((e) => e.value == value);
    }
  }
];
