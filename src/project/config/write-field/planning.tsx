import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import {
  KEY_NAME_PLANNING_ATTACHMENT,
  KEY_NAME_PLANNING_DESCRIPTION,
  KEY_NAME_PLANNING_FINISHINGQA,
  KEY_NAME_PLANNING_INSTRUCTION,
  KEY_NAME_PLANNING_LINK,
  KEY_NAME_PLANNING_NAME,
  KEY_NAME_PLANNING_PAGE_TYPE,
  KEY_NAME_PLANNING_SEQUENCE,
  KEY_NAME_PLANNING_UI_IMAGE
} from '@project/config/keyNames';
import { FinishingQA } from '@project/types/task';

import { FinishingQAWrite, S3UploadFilesWrite, SettingBoxWrite } from './components';

export const PlanningWriteField = {
  [KEY_NAME_PLANNING_NAME]: {
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
    languageKey: 'ncrm_project_planning_name'
  },
  [KEY_NAME_PLANNING_PAGE_TYPE]: {
    component: SettingBoxWrite,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    languageKey: 'ncrm_project_planning_page_type',
    componentProps: {
      type: 'TYPE_PAGE'
    },
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_PLANNING_SEQUENCE]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      type: 'number'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'ncrm_project_planning_sequence'
  },
  [KEY_NAME_PLANNING_DESCRIPTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_project_planning_description'
  },
  [KEY_NAME_PLANNING_LINK]: {
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
    languageKey: 'ncrm_project_planning_link'
  },
  [KEY_NAME_PLANNING_UI_IMAGE]: {
    component: S3UploadFilesWrite,
    showFullRow: true,
    componentProps: {},
    defaultValue: [],
    languageKey: 'ncrm_project_planning_ui_image'
  },
  [KEY_NAME_PLANNING_ATTACHMENT]: {
    component: S3UploadFilesWrite,
    showFullRow: true,
    componentProps: {},
    defaultValue: [],
    languageKey: 'ncrm_project_planning_attachment'
  },
  [KEY_NAME_PLANNING_INSTRUCTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_project_planning_instruction'
  },
  [KEY_NAME_PLANNING_FINISHINGQA]: {
    component: FinishingQAWrite,
    showFullRow: true,
    defaultValue: [],
    componentProps: {
      type: 'PLANNING'
    },
    languageKey: 'ncrm_project_planning_finishing_qa',
    parseParam: (v: FinishingQA[]) => {
      return v.map((qa) => ({
        id: qa.id,
        subject: qa.subject,
        checklist: qa.checklist
      }));
    }
  }
};

export default PlanningWriteField;
