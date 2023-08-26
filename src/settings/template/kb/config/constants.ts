import { LabelValue } from "@base/types/app";
import { LabelData } from "@settings/template/types/template";

export const TEMPLATE_TYPE_OPTIONS: LabelValue[] = [
  /*{
    value: 'TYPE_NONE',
    label: 'None',
  },*/
  {
    label: 'General',
    value: 'TYPE_GENERAL'
  },
  {
    label: 'Survey',
    value: 'TYPE_SURVEY'
  },
  {
    label: 'Thank You',
    value: 'TYPE_THANK_YOU'
  },
  {
    label: 'Follow Up',
    value: 'TYPE_FOLLOW_UP'
  }
];

export const TEMPLATE_LANGUAGE_OPTIONS= [
  {
    title: 'English',
    code: 'en'
  },
  {
    title: 'Tiếng Việt',
    code: 'vi'
  },
  {
    title: '한국어',
    code: 'ko'
  }
]

const TEMPLATE_STAGE_ACTIVE = 'STAGE_ACTIVE';
const TEMPLATE_STAGE_INACTIVE = 'STAGE_INACTIVE';
const TEMPLATE_STAGE_PREPARE = 'STAGE_PREPARE';
const TEMPLATE_STAGE_NONE = 'STAGE_NONE';

export const TEMPLATE_TYPE_OPTIONS_ENUM: LabelData[] = [
  {
    value: 1,
    label: 'ncrm_setting_template_general',//General
    name: 'General',
    id: 'General',
    languageKey: 'ncrm_setting_template_general' 
  },
  {
    value: 2,
    label: 'ncrm_setting_template_survey',//Survey
    name: 'Survey',
    id: 'Survey',
    languageKey: 'ncrm_setting_template_survey' 
  },
  {
    value: 3,
    label: 'ncrm_setting_template_thank_you', //Thank you
    name: 'Thank You',
    id: 'Thank You',
    languageKey:'ncrm_setting_template_thank_you'
  },
  {
    value: 4,
    label: 'ncrm_setting_template_follow_up', // Follow Up
    name: 'Follow Up',
    id: 'Follow Up',
    languageKey: 'ncrm_setting_template_follow_up'
  }
];

export const TEMPLATE_STAGE_OPTIONS: LabelData[] = [
  // {
  //   value: TEMPLATE_STAGE_NONE,
  //   label: 'None'
  // },
  {
    value: TEMPLATE_STAGE_ACTIVE,
    label: 'ncrm_setting_template_active', // Active
    name: 'Active',
    id: 'Active',
    languageKey: 'ncrm_setting_template_active' 

  },
  {
    value: TEMPLATE_STAGE_INACTIVE,
    label: 'ncrm_setting_template_inactive', //Inactive
    name: 'Inactive',
    id: 'Inactive',
    languageKey: 'ncrm_setting_template_inactive' 
  }
  // {
  //   value: TEMPLATE_STAGE_PREPARE,
  //   label: 'Prepare'
  // }
];