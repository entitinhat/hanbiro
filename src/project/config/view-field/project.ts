import _ from 'lodash';

import { TextAreaView, TextView } from '@base/config/view-field/components';
import { IdName } from '@base/types/common';

import {
    KEY_NAME_PROJECT_ACCOUNT, KEY_NAME_PROJECT_CREATED_AT, KEY_NAME_PROJECT_CREATED_BY,
    KEY_NAME_PROJECT_DESCRIPTION, KEY_NAME_PROJECT_DUE_DATE, KEY_NAME_PROJECT_NAME,
    KEY_NAME_PROJECT_PROCESS
} from '../keyNames';
import { CustomerAutoCompleteView, DateTimeView } from './components';

const ProjectViewField = {
  [KEY_NAME_PROJECT_NAME]: {
    component: TextView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    languageKey: 'ncrm_project_project_name'
  },
  [KEY_NAME_PROJECT_ACCOUNT]: {
    component: CustomerAutoCompleteView,
    showFullRow: true,
    componentProps: {
      single: true,
      showAvatar: false,
      showEmail: false,
      placement: 'left'
    },
    languageKey: 'ncrm_project_project_account',
    getMutationValue: (v: any) => {
      return {
        [KEY_NAME_PROJECT_ACCOUNT]: v
          ? {
              id: v.id,
              name: v.name
            }
          : null
      };
    }
  },
  [KEY_NAME_PROJECT_DUE_DATE]: {
    component: DateTimeView,
    showFullRow: true,
    componentProps: {
      humanize: false
    },
    languageKey: 'ncrm_project_project_due_date',
    getValueView: (val: Date | string | null) => {
      return _.isString(val) ? val : val?.toISOString();
    },
    getMutationValue: (v: Date) => {
      return {
        [KEY_NAME_PROJECT_DUE_DATE]: v ? v.toISOString() : null
      };
    }
  },
  [KEY_NAME_PROJECT_PROCESS]: {
    component: TextView,
    showFullRow: true,
    languageKey: 'ncrm_project_project_process',
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (v: IdName) => (v ? v.name : null)
  },
  [KEY_NAME_PROJECT_CREATED_BY]: {
    component: TextView,
    showFullRow: true,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    languageKey: 'ncrm_project_project_created_by',
    getValueView: (v: IdName) => (v ? v.name : null)
  },
  [KEY_NAME_PROJECT_CREATED_AT]: {
    component: DateTimeView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    showFullRow: true,
    languageKey: 'ncrm_project_project_created_at'
  },
  [KEY_NAME_PROJECT_DESCRIPTION]: {
    component: TextAreaView,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      rows: 2
    },
    showFullRow: true,
    languageKey: 'ncrm_project_project_description'
  }
};

export default ProjectViewField;
