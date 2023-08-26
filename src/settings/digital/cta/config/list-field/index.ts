import { SETTING_ONLINE_DIGITAL_MENUS } from '@base/config/routeMenus';
import { FilterByOption } from '@base/types/common';
import { slideToObject } from '@base/utils/helpers/arrayUtils';
import { lazy } from 'react';
import { SETTING_CTA_CONTENT_TYPES_ENUM } from '../constants';
import { LabelValue } from '@base/types/app';

const Selectbox = lazy(() => import('@base/components/@hanbiro/SelectBox'));
export const LanguageSelect = lazy(() => import('@base/components/@hanbiro/LangSelect'));

export const groupByOptions: LabelValue[] = [
  { label: 'ncrm_generalsetting_cta_groupby_all', value: 'all' },
  { label: 'ncrm_generalsetting_cta_groupby_image', value: 'image' },
  { label: 'ncrm_generalsetting_cta_groupby_text', value: 'text' },
  { label: 'ncrm_generalsetting_cta_groupby_qrcode', value: 'qrCode' },
  { label: 'ncrm_generalsetting_cta_groupby_url', value: 'url' }
];

export const dateByOptions: LabelValue[] = [
  { label: 'ncrm_generalsetting_cta_created_at', value: 'createdAt' },
  { label: 'ncrm_generalsetting_cta_updated_at', value: 'updatedAt' }
];

export const filterByOptions: FilterByOption[] = [
  {
    label: 'ncrm_generalsetting_cta_content_type',
    value: 'contentType',
    component: Selectbox,
    componentProps: {
      options: SETTING_CTA_CONTENT_TYPES_ENUM.map((item: any, index: number) => {
        return { ...item, id: item.keyName };
      })
    },
    getValue: (componentValue: any) => {
      return componentValue?.keyName;
    },
    setValue: (value: any) => {
      return SETTING_CTA_CONTENT_TYPES_ENUM?.find((v: any) => v.keyName === value);
    }
  },
  {
    label: 'ncrm_generalsetting_cta_language',
    value: 'language',
    component: LanguageSelect,
    getValue: (componnetValue: any) => {
      return componnetValue?.key;
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

export const categoryOptions = slideToObject(SETTING_ONLINE_DIGITAL_MENUS, 'value', 'label');

export const sortByOptions: LabelValue[] = [
  { label: 'ncrm_generalsetting_cta_name', value: 'name' },
  { label: 'ncrm_generalsetting_cta_created_at', value: 'createdAt' },
  { label: 'ncrm_generalsetting_cta_updated_at', value: 'updatedAt' }
];
