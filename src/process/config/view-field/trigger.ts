import { TextAreaView, TextView } from '@base/config/view-field/components';
import {
  KEY_NAME_SETTING_TRIGGER_DESCRIPTION,
  KEY_NAME_SETTING_TRIGGER_NAME,
  KEY_NAME_SETTING_TRIGGER_TRIGGER
} from '@process/config/keyNames';
import { DefinedTrigger, TriggerForm } from '@process/types/process';

import { MODULE, PROCESS_STATUS_PROPERTIES_VIEW, PROCESS_TYPE, TRIGGER_TYPE_OPTIONS } from '../constants';
import { TriggerView } from './components';

const mappingTriggerForm = (v: DefinedTrigger) => {
  {
    let newTrigger = {} as TriggerForm;
    if (v.trigger) {
      newTrigger.trigger = TRIGGER_TYPE_OPTIONS.find((opt) => opt.keyName == v.trigger)!!;
    }
    if (v.module) {
      newTrigger.module = {
        keyName: v.module,
        languageKey: MODULE[v.module]
      };
    }
    if (v.field) {
      newTrigger.field = { keyName: v.field, languageKey: v.field };
    }
    if (v.process?.id) {
      newTrigger.process = {
        keyName: v.process.id,
        languageKey: v.process.name
      };
    }
    if (v.step?.id) {
      newTrigger.step = { keyName: v.step.id, languageKey: v.step.name };
    }
    if (v.property) {
      newTrigger.property = {
        keyName: v.property,
        languageKey: PROCESS_STATUS_PROPERTIES_VIEW[v.property]
      };
    }
    if (v.ptype) {
      newTrigger.ptype = {
        keyName: v.ptype,
        languageKey: PROCESS_TYPE[v.ptype]
      };
    }

    return newTrigger;
  }
};

export const TriggerViewField = {
  [KEY_NAME_SETTING_TRIGGER_NAME]: {
    component: TextView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    languageKey: 'ncrm_process_trigger_name'
  },
  [KEY_NAME_SETTING_TRIGGER_DESCRIPTION]: {
    component: TextAreaView,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_common_description'
  },
  [KEY_NAME_SETTING_TRIGGER_TRIGGER]: {
    component: TriggerView,
    showFullRow: true,
    languageKey: 'ncrm_process_trigger_trigger',
    getValueView: mappingTriggerForm,
    getValueEdit: mappingTriggerForm
  }
};

export default TriggerViewField;
