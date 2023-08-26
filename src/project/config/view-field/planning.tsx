import { TextAreaView, TextView } from '@base/config/view-field/components';
import { IdName, OptionValue } from '@base/types/common';
import {
  KEY_NAME_PLANNING_DESCRIPTION,
  KEY_NAME_PLANNING_INSTRUCTION,
  KEY_NAME_PLANNING_LINK,
  KEY_NAME_PLANNING_NAME,
  KEY_NAME_PLANNING_PAGE_TYPE,
  KEY_NAME_PLANNING_SEQUENCE
} from '@project/config/keyNames';

import { SettingBoxView } from './components';

export const PlanningViewField = {
  [KEY_NAME_PLANNING_NAME]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_project_planning_name'
  },
  [KEY_NAME_PLANNING_PAGE_TYPE]: {
    component: SettingBoxView,
    languageKey: 'ncrm_project_planning_page_type',
    showFullRow: true,
    componentProps: {
      type: 'TYPE_PAGE'
    },
    getValueView: (v: any) => (v ? (v.id ? { keyName: v.id, languageKey: v.name } : v) : null),
    getValueEdit: (v: IdName) => (v ? { keyName: v.id, languageKey: v.name } : null),
    getMutationValue: (v: OptionValue) => {
      return {
        [KEY_NAME_PLANNING_PAGE_TYPE]: v
          ? {
              id: v.keyName,
              name: v.languageKey
            }
          : null
      };
    }
  },
  [KEY_NAME_PLANNING_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_project_planning_description'
  },
  [KEY_NAME_PLANNING_LINK]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_project_planning_link'
  },
  [KEY_NAME_PLANNING_INSTRUCTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_project_planning_instruction'
  },
  [KEY_NAME_PLANNING_SEQUENCE]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      type: 'number'
    },
    languageKey: 'ncrm_project_planning_sequence'
  }
};

export default PlanningViewField;
