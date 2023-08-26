import { TextAreaView, TextView } from '@base/config/view-field/components';
import { IdName, OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { Schedule } from '@mui/icons-material';
import {
  KEY_NAME_TASK_DESCRIPTION,
  KEY_NAME_TASK_DEV_COST_TYPE,
  KEY_NAME_TASK_DEV_SOURCE,
  KEY_NAME_TASK_DEV_TYPE,
  KEY_NAME_TASK_ESTIMATED_TIME,
  KEY_NAME_TASK_FINISHINGQA,
  KEY_NAME_TASK_GROUP_DESCRIPTION,
  KEY_NAME_TASK_GROUP_NAME,
  KEY_NAME_TASK_LINK,
  KEY_NAME_TASK_NAME,
  KEY_NAME_TASK_PAGE_TYPE
} from '@project/config/keyNames';

import { FinishingQAView, LinkView, SettingBoxView } from './components';

export const TaskTemplateViewField = {
  [KEY_NAME_TASK_NAME]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_name'
  },
  [KEY_NAME_TASK_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true,
      autoComplete: 'off'
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_description'
  },
  [KEY_NAME_TASK_PAGE_TYPE]: {
    component: SettingBoxView,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    componentProps: {
      type: 'TYPE_PAGE'
    },
    languageKey: 'ncrm_project_task_page_type',
    getValueView: (v: any) => (v ? (v.id ? { keyName: v.id, languageKey: v.name } : v) : null),
    getValueEdit: (v: IdName) => (v ? { keyName: v.id, languageKey: v.name } : null),
    getMutationValue: (v: OptionValue) => {
      return {
        [KEY_NAME_TASK_PAGE_TYPE]: v
          ? {
              id: v.keyName,
              name: v.languageKey
            }
          : null
      };
    }
  },
  [KEY_NAME_TASK_DEV_TYPE]: {
    component: SettingBoxView,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    componentProps: {
      type: 'TYPE_DEV'
    },
    languageKey: 'ncrm_project_task_dev_type',
    getValueView: (v: any) => (v ? (v.id ? { keyName: v.id, languageKey: v.name } : v) : null),
    getValueEdit: (v: IdName) => (v ? { keyName: v.id, languageKey: v.name } : null),
    getMutationValue: (v: OptionValue) => {
      return {
        [KEY_NAME_TASK_DEV_TYPE]: v
          ? {
              id: v.keyName,
              name: v.languageKey
            }
          : null
      };
    }
  },
  [KEY_NAME_TASK_DEV_SOURCE]: {
    component: SettingBoxView,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    componentProps: {
      type: 'TYPE_DEV_SOURCE'
    },
    languageKey: 'ncrm_project_task_dev_source',
    getValueView: (v: any) => (v ? (v.id ? { keyName: v.id, languageKey: v.name } : v) : null),
    getValueEdit: (v: IdName) => (v ? { keyName: v.id, languageKey: v.name } : null),
    getMutationValue: (v: OptionValue) => {
      return {
        [KEY_NAME_TASK_DEV_SOURCE]: v
          ? {
              id: v.keyName,
              name: v.languageKey
            }
          : null
      };
    }
  },
  [KEY_NAME_TASK_ESTIMATED_TIME]: {
    component: TextView,
    showFullRow: false,
    useTooltip: true,
    tooltipLangKey: `mth: will parse to months (4 weeks per month)
    w: will parse to weeks (5 days per week)
    d: will parse to days (8 hours per day)
    h: will parse to hours
    m: will parse to minutes
    `,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      placeholder: '1w 2d 3h 4m',
      startAdornment: <Schedule sx={{ fontSize: 18, color: 'secondary' }} />
    },
    languageKey: 'ncrm_project_task_estimated_time'
  },
  [KEY_NAME_TASK_DEV_COST_TYPE]: {
    component: SettingBoxView,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    componentProps: {
      type: 'TYPE_COST'
    },
    languageKey: 'ncrm_project_task_dev_cost_type',
    getValueView: (v: any) => (v ? (v.id ? { keyName: v.id, languageKey: v.name } : v) : null),
    getValueEdit: (v: IdName) => (v ? { keyName: v.id, languageKey: v.name } : null),
    getMutationValue: (v: OptionValue) => {
      return {
        [KEY_NAME_TASK_DEV_COST_TYPE]: v
          ? {
              id: v.keyName,
              name: v.languageKey
            }
          : null
      };
    }
  },
  [KEY_NAME_TASK_LINK]: {
    component: LinkView,
    showFullRow: true,
    componentProps: {
      mode: 'view'
    },
    languageKey: 'ncrm_project_task_link'
  },
  [KEY_NAME_TASK_FINISHINGQA]: {
    component: FinishingQAView,
    showFullRow: true,
    componentProps: {
      mode: 'view',
      type: 'TEMPLATE'
    },
    languageKey: 'ncrm_project_task_finishing_qa'
  }
};

export const TaskGroupTemplateViewField = {
  [KEY_NAME_TASK_GROUP_NAME]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_group_name'
  },
  [KEY_NAME_TASK_GROUP_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true,
      autoComplete: 'off'
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_group_description'
  }
};
