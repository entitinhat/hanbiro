import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import { UserAutoComplete } from '@customer/config/write-field/components';
import * as keyNames from '@settings/sites/config/key-names';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { t } from 'i18next';
import { LabelValue } from '@base/types/app';
const SITE_STAGE_ACTIVE = 'STAGE_ACTIVE';
const SITE_STAGE_INACTIVE = 'STAGE_INACTIVE';
const SITE_STAGE_PREPARE = 'STAGE_PREPARE';
const SITE_STAGE_NONE = 'STAGE_NONE';

export const SITE_TYPE_OPTIONS_ENUM: LabelValue[] = [
  {
    value: 1,
    label: t('TYPE_GENERAL')
  },
  {
    value: 2,
    label: t('TYPE_SURVEY')
  },
  {
    value: 3,
    label: t('TYPE_THANK_YOU')
  },
  {
    value: 4,
    label: t('TYPE_FOLLOW_UP')
  }
];

export const SITE_STAGE_OPTIONS: LabelValue[] = [
  {
    value: SITE_STAGE_NONE,
    label: 'ncrm_generalsetting_site_stage_none'
  },
  {
    value: SITE_STAGE_ACTIVE,
    label: 'ncrm_generalsetting_site_stage_active'
  },
  {
    value: SITE_STAGE_INACTIVE,
    label: 'ncrm_generalsetting_site_stage_inactive'
  },
  {
    value: SITE_STAGE_PREPARE,
    label: 'ncrm_generalsetting_site_stage_prepare'
  }
];

export const groupByOptionsDesk: LabelValue[] = [
  { label: 'ncrm_generalsetting_template_all_templates', value: 'all' },
  { label: 'ncrm_generalsetting_template_my_templates', value: 'my' },
  { label: 'ncrm_generalsetting_template_all_drafts', value: 'draft' },
  { label: 'ncrm_generalsetting_template_my_drafts', value: 'myDraft' },
  { label: 'ncrm_generalsetting_template_deleted_templates', value: 'deletedTemplates' }
];
export const dateByOptionsDesk: LabelValue[] = [
  { label: 'ncrm_generalsetting_site_filter_created_on', value: 'createdAt' },
  { label: 'ncrm_generalsetting_site_filter_created_on', value: 'updatedAt' }
];

export const filterByOptionsDesk = [
  {
    label: 'ncrm_generalsetting_site_filter_active',
    value: keyNames.KEY_MENU_SITE_STAGE,
    component: SelectBoxCustom,
    componentProps: {
      options: SITE_STAGE_OPTIONS
    },
    getValue: (value: any) => {
      return value?.value;
    },
    setValue: (value: any) => {
      return SITE_STAGE_OPTIONS.find((e) => e.value == value);
    }
  }
];
