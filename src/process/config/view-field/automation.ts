import { TextAreaView, TextView } from '@base/config/view-field/components';
import { AUTOMATION_TYPE_OPTIONS } from '@process/config/constants';
import {
  KEY_NAME_AUTOMATION_CRITERIA,
  KEY_NAME_AUTOMATION_DESCRIPTION,
  KEY_NAME_AUTOMATION_NAME,
  KEY_NAME_AUTOMATION_TRIGGER,
  KEY_NAME_AUTOMATION_TYPE
} from '@process/config/keyNames';
import { IdName } from '@base/types/common';
import { CriteriaAutomationView, TriggerAutomationView } from './components';

const AutomationViewField = {
  [KEY_NAME_AUTOMATION_NAME]: {
    component: TextView,
    showFullRow: false,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_name'
  },
  [KEY_NAME_AUTOMATION_TYPE]: {
    component: TextView,
    showFullRow: false,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_type',
    getValueView: (v: string) => AUTOMATION_TYPE_OPTIONS.find((e) => e.value == v)?.label
  },
  [KEY_NAME_AUTOMATION_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_description'
  },
  [KEY_NAME_AUTOMATION_TRIGGER]: {
    component: TriggerAutomationView,
    showFullRow: true,
    viewProps: {
      mode: 'view',
      userPermission: { isEdit: false, isShow: true }
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_trigger',
    getValueView: (v: IdName) => ({ keyName: v.id, languageKey: v.name })
  },
  [KEY_NAME_AUTOMATION_CRITERIA]: {
    component: CriteriaAutomationView,
    showFullRow: true,
    viewProps: {
      mode: 'view',
      userPermission: { isEdit: false, isShow: true }
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_criteria'
  }
};

export default AutomationViewField;
