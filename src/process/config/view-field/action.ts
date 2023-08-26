import { TextAreaView, TextView } from '@base/config/view-field/components';
import {
  KEY_NAME_SETTING_ACTION_DESCRIPTION,
  KEY_NAME_SETTING_ACTION_NAME,
  KEY_NAME_SETTING_ACTION_STATUSES
} from '@process/config/keyNames';
import { BusinessStatus } from '@process/types/process';

import {
  PROCESS_STATUS_DIRECTIONS_SORT,
  PROCESS_STATUS_DIRECTIONS_VIEW,
  PROCESS_STATUS_EVENTS_VIEW,
  PROCESS_STATUS_PROPERTIES_VIEW,
  PROCESS_STATUS_VIEWS_VIEW
} from '../constants';
import { ActionView } from './components';

const mappingActionStatuses = (v: BusinessStatus[]) => {
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
      primary: status.primary
    };
  });
};

export const ActionViewField = {
  [KEY_NAME_SETTING_ACTION_NAME]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_process_action_name'
  },
  [KEY_NAME_SETTING_ACTION_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_common_description'
  },
  [KEY_NAME_SETTING_ACTION_STATUSES]: {
    component: ActionView,
    showFullRow: true,
    languageKey: 'ncrm_process_action_statuses',
    getValueView: mappingActionStatuses,
    getValueEdit: mappingActionStatuses
  }
};

export default ActionViewField;
