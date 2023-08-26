import { t } from 'i18next';

import { LabelValue } from '@base/types/app';
import { LabelData } from '../types/template';

export const TEMPLATE_STAGE_ACTIVE = 'STAGE_ACTIVE';
export const TEMPLATE_STAGE_INACTIVE = 'STAGE_INACTIVE';
export const TEMPLATE_STAGE_PREPARE = 'STAGE_PREPARE';
export const TEMPLATE_STAGE_NONE = 'STAGE_NONE';

export const TEMPLATE_TASK_MANUAL = 'SUB_TYPE_TASK_MANUAL';
export const TEMPLATE_TASK_CHECK_LIST = 'SUB_TYPE_TASK_CHECK_LIST';
export const TEMPLATE_TASK_SEQUENCE = 'SUB_TYPE_TASK_SEQUENCE';

export const TEMPLATE_MESSAGE_SMS = 'SUB_TYPE_MESSAGE_SMS';
export const TEMPLATE_MESSAGE_MMS = 'SUB_TYPE_MESSAGE_MMS';

export const TEMPLATE_GROUP: any[] = [
  {
    value: 'GROUP_NONE',
    label: 'None',
    key: ''
  },
  {
    value: 'GROUP_KNOWLEDGE',
    label: 'Knowledge Base',
    key: 'knowledgebase',
    param: ''
  },
  {
    value: 'GROUP_EMAIL',
    label: 'Email',
    key: 'email'
  },
  {
    value: 'GROUP_SMS',
    label: 'Sms',
    key: 'sms'
  },
  {
    value: 'GROUP_TASK',
    label: 'Task',
    key: 'task'
  },
  {
    value: 'GROUP_CALL',
    label: 'Call',
    key: 'call'
  },
  {
    value: 'GROUP_QUOTE',
    label: 'Quote',
    key: 'quote'
  }
];

export const TEMPLATE_TYPE_OPTIONS: LabelValue[] = [
  /*{
    value: 'TYPE_NONE',
    label: 'None',
  },*/
  {
    label: 'ncrm_setting_template_general', //'General',
    value: 'TYPE_GENERAL'
  },
  {
    label: 'ncrm_setting_template_survey', //'Survey',
    value: 'TYPE_SURVEY'
  },
  {
    label: 'ncrm_setting_template_thank_you', //'Thank You',
    value: 'TYPE_THANK_YOU'
  },
  {
    label: 'ncrm_setting_template_follow_up', // 'Follow Up'
    value: 'TYPE_FOLLOW_UP'
  }
];

export const TEMPLATE_MESSAGE_TYPE_OPTIONS_ENUM: LabelData[] = [
  /*{
    value: 0,
    label: t('SUB_TYPE_NONE'),
  },*/
  {
    value: 1,
    label: t('SMS'),
    name: t('SMS'),
    id: t('SMS')
  },
  {
    value: 2,
    label: t('MMS'),
    name: t('MMS'),
    id: t('MMS')
  }
];

export const TEMPLATE_MESSAGE_TYPE_OPTIONS: LabelValue[] = [
  {
    value: 'SUB_TYPE_NONE',
    label: 'ncrm_setting_template_none' //None
  },
  {
    label: 'ncrm_setting_template_sms', //SMS
    value: TEMPLATE_MESSAGE_SMS
  },
  {
    label: 'ncrm_setting_template_mms', //MMS
    value: TEMPLATE_MESSAGE_MMS
  }
];

export const TEMPLATE_TASK_TYPE_OPTIONS: LabelValue[] = [
  /*{
    value: 'SUB_TYPE_NONE',
    label: 'None',
  },*/
  {
    label: 'ncrm_setting_template_manual', //Manual
    value: TEMPLATE_TASK_MANUAL
  },
  {
    label: 'ncrm_setting_template_check_list', //Check list
    value: TEMPLATE_TASK_CHECK_LIST
  },
  {
    label: 'ncrm_setting_template_sequence', //sequence
    value: TEMPLATE_TASK_SEQUENCE
  }
];

export const TEMPLATE_TASK_TYPE_OPTIONS_ENUM: LabelData[] = [
  {
    label: t(TEMPLATE_TASK_MANUAL),
    value: 3,
    name: t(TEMPLATE_TASK_MANUAL),
    id: t(TEMPLATE_TASK_MANUAL)
  },
  {
    label: t(TEMPLATE_TASK_CHECK_LIST),
    value: 4,
    name: t(TEMPLATE_TASK_CHECK_LIST),
    id: t(TEMPLATE_TASK_CHECK_LIST)
  },
  {
    label: t(TEMPLATE_TASK_SEQUENCE),
    value: 5,
    name: t(TEMPLATE_TASK_SEQUENCE),
    id: t(TEMPLATE_TASK_SEQUENCE)
  }
];
export const USER_ID = '22779486-f43a-4530-b77f-31a932dd0a23';
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
