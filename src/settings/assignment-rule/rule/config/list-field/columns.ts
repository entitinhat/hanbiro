import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import commonConfigs from '@base/config/list-field/columns';
import { ColorNameIconConfig } from '@activity/types/interface';
import { ASSIGNMENT_RULE_MODULE_DESK } from '@settings/assignment-rule/rule/config/constants';

export const listLayoutColumns: { [index: string]: any[] } = {
  // my: myColumn,
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ID]: {
    schema: `
     id
    `
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_NAME]: {
    schema: `
    name
    `
  }
};

export const typeConfigs: ColorNameIconConfig = {
  [ASSIGNMENT_RULE_MODULE_DESK]: {
    icon: 'task',
    color: 'primary',
    name: 'Task'
  }
};
