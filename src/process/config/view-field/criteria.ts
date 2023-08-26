import { TextAreaView, TextView } from '@base/config/view-field/components';
import { CRITERIA_TYPES } from '@process/components/Diagram/Criteria';
import {
  KEY_NAME_SETTING_CRITERIA_DESCRIPTION,
  KEY_NAME_SETTING_CRITERIA_NAME,
  KEY_NAME_SETTING_CRITERIA_STATUSES,
  KEY_NAME_SETTING_CRITERIA_TYPE
} from '@process/config/keyNames';
import { BusinessStatus } from '@process/types/process';

import {
  PROCESS_STATUS_DIRECTIONS_SORT,
  PROCESS_STATUS_DIRECTIONS_VIEW,
  PROCESS_STATUS_EVENTS_VIEW,
  PROCESS_STATUS_PROPERTIES_VIEW,
  PROCESS_STATUS_VIEWS_VIEW
} from '../constants';
import { CriteriaView } from './components';

const mappingCriteriaStatuses = (v: BusinessStatus[]) => {
  return v.map((status) => {
    return {
      id: status.id,
      name: status.name,
      button: status.button,
      view: { keyName: status.view, languageKey: PROCESS_STATUS_VIEWS_VIEW[status.view] },
      event: { keyName: status.event, languageKey: PROCESS_STATUS_EVENTS_VIEW[status.event] },
      property: {
        keyName: status.property,
        languageKey: PROCESS_STATUS_PROPERTIES_VIEW[status.property]
      },
      direction: {
        keyName: status.direction,
        languageKey: PROCESS_STATUS_DIRECTIONS_VIEW[status.direction]
      },
      sequence: status.sequence ?? [],
      new: false,
      reset: true,
      order: PROCESS_STATUS_DIRECTIONS_SORT[status.direction],
      multiple: status.multiple,
      primary: status.primary,
      criteria: status.options ? JSON.parse(status.options) : {}
    };
  });
};

export const CriteriaViewField = {
  [KEY_NAME_SETTING_CRITERIA_NAME]: {
    component: TextView,
    showFullRow: false,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_process_criteria_name'
  },
  [KEY_NAME_SETTING_CRITERIA_TYPE]: {
    component: TextView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    showFullRow: false,
    getValueView: (v: string) => CRITERIA_TYPES.find((e) => e.value == v)?.label,
    languageKey: 'ncrm_process_criteria_type'
  },
  [KEY_NAME_SETTING_CRITERIA_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_common_description'
  },
  [KEY_NAME_SETTING_CRITERIA_STATUSES]: {
    component: CriteriaView,
    showFullRow: true,
    languageKey: 'ncrm_process_criteria_statuses',
    getValueView: mappingCriteriaStatuses,
    getValueEdit: mappingCriteriaStatuses
  }
};

export default CriteriaViewField;
