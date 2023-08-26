import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { Schedule } from '@mui/icons-material';
import { OutlinedInput, TextField } from '@mui/material';
import {
  KEY_NAME_TASK_ATTACHMENT,
  KEY_NAME_TASK_DESCRIPTION,
  KEY_NAME_TASK_DEV_SOURCE,
  KEY_NAME_TASK_DEV_TYPE,
  KEY_NAME_TASK_ESTIMATED_TIME,
  KEY_NAME_TASK_FINISHINGQA,
  KEY_NAME_TASK_LINK,
  KEY_NAME_TASK_NAME,
  KEY_NAME_TASK_PAGE_TYPE
} from '@project/config/keyNames';
import { FinishingQA, Link } from '@project/types/task';

import { KEY_NAME_TASK_DEV_COST_TYPE } from '../keyNames';
import { FinishingQAWrite, LinkWrite, S3UploadFilesWrite, SettingBoxWrite } from './components';

export const TaskTemplateWriteField = {
  [KEY_NAME_TASK_NAME]: {
    component: TextField,
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
    component: TextField,
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
    component: SettingBoxWrite,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    componentProps: {
      type: 'TYPE_PAGE'
    },
    languageKey: 'ncrm_project_task_page_type',
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_TASK_DEV_TYPE]: {
    component: SettingBoxWrite,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    componentProps: {
      type: 'TYPE_DEV'
    },
    languageKey: 'ncrm_project_task_dev_type',
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_TASK_DEV_SOURCE]: {
    component: SettingBoxWrite,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    componentProps: {
      type: 'TYPE_DEV_SOURCE'
    },
    defaultValue: null,
    languageKey: 'ncrm_project_task_dev_source',
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_TASK_ESTIMATED_TIME]: {
    component: OutlinedInput,
    validate: {
      required: validators.required
    },
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
    defaultValue: '',
    showFullRow: false,
    languageKey: 'ncrm_project_task_estimated_time'
  },
  [KEY_NAME_TASK_DEV_COST_TYPE]: {
    component: SettingBoxWrite,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    componentProps: {
      type: 'TYPE_COST'
    },
    languageKey: 'ncrm_project_task_dev_cost_type',
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_TASK_ATTACHMENT]: {
    component: S3UploadFilesWrite,
    showFullRow: true,
    defaultValue: [],
    languageKey: 'ncrm_project_task_attachment'
  },
  [KEY_NAME_TASK_LINK]: {
    component: LinkWrite,
    showFullRow: true,
    defaultValue: [],
    languageKey: 'ncrm_project_task_link',
    parseParam: (v: Link[]) => {
      return v.map((link) => ({
        id: link.id,
        title: link.title,
        url: link.url
      }));
    }
  },
  [KEY_NAME_TASK_FINISHINGQA]: {
    component: FinishingQAWrite,
    showFullRow: true,
    defaultValue: [],
    componentProps: {
      type: 'TEMPLATE'
    },
    languageKey: 'ncrm_project_task_finishing_qa',
    parseParam: (v: FinishingQA[]) => {
      return v.map((qa) => ({
        id: qa.id,
        subject: qa.subject,
        checklist: qa.checklist
      }));
    }
  }
};
