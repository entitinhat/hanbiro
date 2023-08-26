import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';
import { FieldConfig } from '@base/types/pagelayout';
import { AssignmentChannelOptions, AssignmentTypeOptions } from '@settings/assignment-rule/rule/config/constants';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import * as components from '@settings/assignment-rule/rule/config/view-field/components';

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_MODULE]: {
    component: commonComponents.SelectBoxView,
    showFullRow: true,
    componentProps: {
      isMultiple: false,
      isSearchable: false,
      options: AssignmentTypeOptions
      // fieldValue: 'value',
      // fieldLabel: 'label'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      console.log('Module value', value);
      const currentValue = AssignmentTypeOptions.filter((item) => item.value === value)[0];
      return { languageKey: currentValue?.label };
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_CHANNEL]: {
    component: commonComponents.SelectBoxView,
    schema: `channel {
      id
      name
    }
    channelType`,
    showFullRow: true,
    componentProps: {
      isMultiple: false,
      isSearchable: false,
      options: AssignmentChannelOptions
      // fieldValue: 'value',
      // fieldLabel: 'label'
    },
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      console.log('Module value', value);
      return { languageKey: value?.name };
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ACTIVE]: {
    component: commonComponents.SwitchView,
    showFullRow: true
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_CREATED_BY]: {
    schema: `createdBy {
      id
      name
    }`,
    showFullRow: true,
    getValue: (value: any) => {
      const currentVal = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_CREATED_BY] ?? '';
      return currentVal?.name;
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_CREATED_AT]: {
    component: commonComponents.DateTimeView,
    componentProps: {},
    showFullRow: true,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_UPDATED_AT]: {
    component: commonComponents.DateTimeView,
    showFullRow: true
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_UPDATED_BY]: {
    showFullRow: true,
    schema: `updatedBy{
      id
      name
      fullName
    }`,
    getValue: (value: any) => {
      const currentVal = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_UPDATED_BY] ?? '';
      return currentVal?.fullName;
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES]: {
    languageKey: 'Rule Entries',
    showFullRow: true,
    hideFieldLabel: true,
    schema: `
    rulesEntry {
      id
      order
      assignRuleId
      criteriaType
       criteria {
      key
      condition
    }
    assignTo {
        mode
        checkAvailable
        assignsTo {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
      }
    }`,
    getValueView: (value: any) => {
      // console.log('Rule Entries', value);
      return value ?? [];
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_DESC]: {
    component: commonComponents.TextAreaView,
    showFullRow: true
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO]: {
    component: components.AssignToViewField,
    showFullRow: true,
    schema: `assignUnassigned {
      mode
      assignsTo {
        user {
          id
          name
        }
        group {
          id
          name
        }
      }
    }`
  }
};
export default viewFieldsConfig;
