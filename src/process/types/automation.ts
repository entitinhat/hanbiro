import { IdName } from '@base/types/common';

import { FieldType } from './diagram';
import { ModuleType } from './process';

export type RuleType = 'RULE_TYPE_BOOLEAN' | 'RULE_TYPE_SIMPLE';
export type InstantType = 'ACTION_TYPE_EMAIL' | 'ACTION_TYPE_TASK' | 'ACTION_TYPE_FIELD_UPDATE' | 'ACTION_TYPE_OUTBOUND_MESSAGE';

export interface InstantValue {
  id?: string;
  name: string;
  type: InstantType;
  template?: IdName;
  criteria: string;
  targets?: IdName[];
  field?: {
    name: string;
    value: string;
    type: FieldType;
  };
  message?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  type: RuleType;
  module: ModuleType;
  trigger: IdName;
  criteria: IdName;
  instants?: InstantValue[];
}

export interface AutomationOpen {
  open: boolean;
  data?: AutomationRule;
}