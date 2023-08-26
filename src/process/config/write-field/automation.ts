import { MuiRadioGroup } from '@base/config/write-field/components';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import { CriteriaValue } from '@process/components/Automation/Criteria/CriteriaAutomation';
import { AUTOMATION_TYPE_OPTIONS } from '@process/config/constants';
import {
    KEY_NAME_AUTOMATION_CRITERIA, KEY_NAME_AUTOMATION_DESCRIPTION, KEY_NAME_AUTOMATION_NAME,
    KEY_NAME_AUTOMATION_TRIGGER, KEY_NAME_AUTOMATION_TYPE
} from '@process/config/keyNames';
import { CriteriaAutomation, TriggerAutomation } from '@process/config/write-field/components';
import { InstantType, InstantValue } from '@process/types/automation';

const AutomationWriteField = {
  [KEY_NAME_AUTOMATION_NAME]: {
    component: TextField,
    showFullRow: false,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    defaultValue: '',
    languageKey: 'ncrm_process_automation_rule_field_basic_name'
  },
  [KEY_NAME_AUTOMATION_TYPE]: {
    component: MuiRadioGroup,
    defaultValue: AUTOMATION_TYPE_OPTIONS[0],
    componentProps: {
      options: AUTOMATION_TYPE_OPTIONS,
      isVertical: false
    },
    validate: {
      required: validators.required
    },
    showFullRow: false,
    languageKey: 'ncrm_process_automation_rule_field_basic_type',
    parseParam: (v: LabelValue) => v.value
  },
  [KEY_NAME_AUTOMATION_DESCRIPTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    languageKey: 'ncrm_process_automation_rule_field_basic_description',
    defaultValue: ''
  },
  [KEY_NAME_AUTOMATION_TRIGGER]: {
    component: TriggerAutomation,
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    componentProps: {
      triggerModule: ''
    },
    // hideTitle: true,
    languageKey: 'ncrm_process_automation_rule_field_basic_trigger',
    parseParam: (v: OptionValue) => {
      return { id: v.keyName, name: v.languageKey, module: v.extra?.module };
    }
  },
  [KEY_NAME_AUTOMATION_CRITERIA]: {
    component: CriteriaAutomation,
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    // hideTitle: true,
    languageKey: 'ncrm_process_automation_rule_field_basic_criteria',
    parseParam: (v: CriteriaValue) => {
      let instants: InstantValue[] = [];
      Object.keys(v.instants).forEach((idx) => {
        const instant = v.instants[idx];
        instant.forEach((o) => {
          let newInstant: InstantValue = {
            name: o.name,
            type: o.type.keyName as InstantType,
            criteria: idx
          };

          if (o.template) {
            newInstant.template = {
              id: o.template.keyName,
              name: o.template.languageKey
            };
          }

          if (o.type.keyName == 'ACTION_TYPE_TASK') {
            newInstant.targets = o.targetUsers?.map((target) => ({
              id: target.id,
              name: target.name
            }));
          } else if (o.type.keyName == 'ACTION_TYPE_EMAIL') {
            newInstant.targets = o.targetCustomers?.map((target) => ({
              id: target.id,
              name: target.name
            }));
          } else if (o.type.keyName == 'ACTION_TYPE_FIELD_UPDATE') {
            newInstant.field = o.field && {
              name: o.field.field?.keyName,
              value: o.field?.value,
              type: o.field.field?.extra
            };
          } else if (o.type.keyName == 'ACTION_TYPE_OUTBOUND_MESSAGE') {
            newInstant.message = o.message;
          }
          instants.push(newInstant);
        });
      });
      return {
        criteria: v.criteria && {
          id: v.criteria.keyName,
          name: v.criteria.languageKey
        },
        instants: instants
      };
    }
  }
};

export default AutomationWriteField;
