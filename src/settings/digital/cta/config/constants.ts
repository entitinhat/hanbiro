import { LabelValueIcon } from '@base/types/app';
import Icon from '@base/assets/icons/svg-icons';

export const SETTING_CTA_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'ncrm_common_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_common_export',
    value: 'export',
    icon: Icon('download')
  }
];

export const SETTING_CTA_TYPE_IMAGE = 'CTA_TYPE_IMAGE';
export const SETTING_CTA_TYPE_TEXT = 'CTA_TYPE_TEXT';
export const SETTING_CTA_TYPE_QRCODE = 'CTA_TYPE_QRCODE';
export const SETTING_CTA_TYPE_URL = 'CTA_TYPE_URL';

export const SETTING_CTA_TYPES: any = [
  {
    value: SETTING_CTA_TYPE_IMAGE,
    label: 'ncrm_generalsetting_cta_type_image',
    keyName: SETTING_CTA_TYPE_IMAGE,
    languageKey: 'ncrm_generalsetting_cta_type_image'
  },
  {
    value: SETTING_CTA_TYPE_TEXT,
    label: 'ncrm_generalsetting_cta_type_text',
    keyName: SETTING_CTA_TYPE_TEXT,
    languageKey: 'ncrm_generalsetting_cta_type_text'
  },
  {
    value: SETTING_CTA_TYPE_QRCODE,
    label: 'ncrm_generalsetting_cta_type_qrcode',
    keyName: SETTING_CTA_TYPE_QRCODE,
    languageKey: 'ncrm_generalsetting_cta_type_qrcode'
  },
  {
    value: SETTING_CTA_TYPE_URL,
    label: 'ncrm_generalsetting_cta_type_url',
    keyName: SETTING_CTA_TYPE_URL,
    languageKey: 'ncrm_generalsetting_cta_type_url'
  }
];

export const SETTING_CTA_LINK_TYPE_INTERNAL = 'LINK_TYPE_INTERNAL';
export const SETTING_CTA_LINK_TYPE_EXTERNAL = 'LINK_TYPE_EXTERNAL';

export const SETTING_CTA_LINK_TYPES: any = [
  {
    keyName: SETTING_CTA_LINK_TYPE_INTERNAL,
    value: SETTING_CTA_LINK_TYPE_INTERNAL,
    label: 'ncrm_generalsetting_cta_link_internal',
    languageKey: 'ncrm_generalsetting_cta_link_internal'
  },
  {
    keyName: SETTING_CTA_LINK_TYPE_EXTERNAL,
    value: SETTING_CTA_LINK_TYPE_EXTERNAL,
    label: 'ncrm_generalsetting_cta_link_external',
    languageKey: 'ncrm_generalsetting_cta_link_external'
  }
];

export const SETTING_CTA_CONTENT_TYPE_LANDING_PAGE = 'CTA_CONTENT_TYPE_LANDING_PAGE';
export const SETTING_CTA_CONTENT_TYPE_SITE = 'CTA_CONTENT_TYPE_SITE';
export const SETTING_CTA_CONTENT_TYPE_SURVEY = 'CTA_CONTENT_TYPE_SURVEY';

export const SETTING_CTA_CONTENT_TYPES: any = [
  {
    value: SETTING_CTA_CONTENT_TYPE_LANDING_PAGE,
    label: 'ncrm_generalsetting_landing_page',
    keyName: SETTING_CTA_CONTENT_TYPE_LANDING_PAGE,
    languageKey: 'ncrm_generalsetting_landing_page'
  },
  {
    value: SETTING_CTA_CONTENT_TYPE_SITE,
    label: 'ncrm_generalsetting_content_type_site',
    keyName: SETTING_CTA_CONTENT_TYPE_SITE,
    languageKey: 'ncrm_generalsetting_content_type_site'
  },
  {
    value: SETTING_CTA_CONTENT_TYPE_SURVEY,
    label: 'ncrm_generalsetting_survey',
    keyName: SETTING_CTA_CONTENT_TYPE_SURVEY,
    languageKey: 'ncrm_generalsetting_survey'
  }
];

export const SETTING_CTA_CONTENT_TYPES_ENUM: any = [
  {
    keyName: 1,
    languageKey: 'ncrm_generalsetting_landing_page'
  },
  {
    keyName: 2,
    languageKey: 'ncrm_generalsetting_content_type_site'
  },
  {
    keyName: 3,
    languageKey: 'ncrm_generalsetting_survey'
  }
];

export const SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS: any = [
  { value: 'lighter', label: 'Lighter', keyName: 'lighter', languageKey: 'Lighter' },
  { value: 'normal', label: 'Normal', keyName: 'normal', languageKey: 'Normal' },
  { value: 'bold', label: 'Bold', keyName: 'bold', languageKey: 'Bold' }
];

export const SETTING_CTA_STAGE_BUILD = 'CTA_STAGE_BUILD';
export const SETTING_CTA_STAGE_DISABLE = 'CTA_STAGE_DISABLE';
export const SETTING_CTA_STAGE_ENABLE = 'CTA_STAGE_ENABLE';

export const SETTING_CTA_STAGE_OPTIONS: any[] = [
  {
    value: SETTING_CTA_STAGE_BUILD,
    label: 'ncrm_generalsetting_cta_stage_build'
  },
  {
    value: SETTING_CTA_STAGE_DISABLE,
    label: 'ncrm_generalsetting_cta_stage_disable'
  },
  {
    value: SETTING_CTA_STAGE_ENABLE,
    label: 'ncrm_generalsetting_cta_stage_enable'
  }
];
