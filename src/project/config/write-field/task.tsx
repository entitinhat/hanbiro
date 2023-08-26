import dayjs from 'dayjs';

import { DatePicker, LookUp, PrioritySelect, SelectBox, TagInput } from '@base/config/write-field/components';
import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { Schedule } from '@mui/icons-material';
import { OutlinedInput, TextField } from '@mui/material';
import {
  KEY_NAME_TASK_ASSIGN_TO,
  KEY_NAME_TASK_ATTACHMENT,
  KEY_NAME_TASK_DESCRIPTION,
  KEY_NAME_TASK_DEV_COST_TYPE,
  KEY_NAME_TASK_DEV_SOURCE,
  KEY_NAME_TASK_DEV_TYPE,
  KEY_NAME_TASK_DUE_DATE,
  KEY_NAME_TASK_ESTIMATED_TIME,
  KEY_NAME_TASK_FINISHINGQA,
  KEY_NAME_TASK_INSTRUCTION,
  KEY_NAME_TASK_LINK,
  KEY_NAME_TASK_NAME,
  KEY_NAME_TASK_PAGE_TYPE,
  KEY_NAME_TASK_PRIORITY,
  KEY_NAME_TASK_START_DATE,
  KEY_NAME_TASK_TAGS,
  KEY_NAME_TASK_TEMPLATE
} from '@project/config/keyNames';
import { FinishingQA, Link } from '@project/types/task';

import { FinishingQAWrite, LinkWrite, S3UploadFilesWrite, SettingBoxWrite, TemplateBoxWrite, UserAutoComplete } from './components';

export const TaskWriteField = {
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
  [KEY_NAME_TASK_TEMPLATE]: {
    component: TemplateBoxWrite,
    showFullRow: false,
    languageKey: 'ncrm_project_task_template'
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
  [KEY_NAME_TASK_PRIORITY]: {
    component: PrioritySelect,
    showFullRow: false,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    languageKey: 'ncrm_project_task_priority',
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_TASK_TAGS]: {
    component: TagInput,
    showFullRow: false,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    defaultValue: [],
    languageKey: 'ncrm_project_task_tags'
  },
  [KEY_NAME_TASK_ASSIGN_TO]: {
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true,
      placement: 'left'
    },
    showFullRow: true,
    defaultValue: [],
    languageKey: 'ncrm_project_task_assign_to',
    parseParam: (_ele: any) => {
      if (_ele.length == 0) {
        return _ele;
      }

      return _ele.map((v: any) => {
        // const group =
        //   v.properties?.crmGroups?.length > 0 ? v.properties.crmGroups[0] : { id: '', name: '' };
        return {
          user: {
            id: v.id,
            name: v.name
          },
          group: {
            // id: group.id,
            // name: group.name,
            id: '',
            name: ''
          }
        };
      });
    }
  },
  [KEY_NAME_TASK_START_DATE]: {
    languageKey: 'ncrm_project_task_start_date',
    component: DatePicker,
    showFullRow: false,
    componentProps: {
      inputFormat: 'YYYY/MM/DD'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs(),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [KEY_NAME_TASK_DUE_DATE]: {
    languageKey: 'ncrm_project_task_due_date',
    component: DatePicker,
    showFullRow: false,
    componentProps: {
      inputFormat: 'YYYY/MM/DD'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs().add(1, 'day'),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [KEY_NAME_TASK_DESCRIPTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_description'
  },
  [KEY_NAME_TASK_INSTRUCTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_project_task_instruction'
  },
  [KEY_NAME_TASK_ATTACHMENT]: {
    component: S3UploadFilesWrite,
    showFullRow: true,
    defaultValue: [],
    languageKey: 'project_task_attachment'
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
      type: 'TASK'
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

export default TaskWriteField;
