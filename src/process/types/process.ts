import { LabelValue } from '@base/types/app';
import { Duration, IdName, OptionValue } from '@base/types/common';
import { User } from '@base/types/user';

import { CriteriaOption, Direction, FieldType, MethodType, MultipleType, NodeType, Stage, TriggerType } from './diagram';

export type ModuleType =
  | 'MODULE_NONE'
  | 'MODULE_ACCOUNT'
  | 'MODULE_CONTACT'
  | 'MODULE_PRODUCT'
  | 'MODULE_DESK'
  | 'MODULE_PROJECT'
  | 'MODULE_PROTOTYPE'
  | 'MODULE_PLANNING'
  | 'MODULE_DEV_TASK';

export type ProcessType = 'TYPE_NONE' | 'TYPE_BUSINESS' | 'TYPE_CAMPAIN';

export type PropertyType =
  | 'PROPERTY_DISABLE'
  | 'PROPERTY_NONE'
  | 'PROPERTY_COMPLETED'
  | 'PROPERTY_CANCELED'
  | 'PROPERTY_CLOSED'
  | 'PROPERTY_DELETED'
  | 'PROPERTY_MERGED'
  | 'PROPERTY_DENIED'
  | 'PROPERTY_LOST'
  | 'PROPERTY_WON'
  | 'PROPERTY_NEW'
  | 'PROPERTY_PAID_IN_FULL'
  | 'PROPERTY_PARTIALLY_PAID'
  | 'PROPERTY_REJECTED'
  | 'PROPERTY_START'
  | 'PROPERTY_END'
  | 'PROPERTY_REUSED'
  | 'PROPERTY_APPROVED'
  | 'PROPERTY_TODO'
  | 'PROPERTY_TODO_DOING'
  | 'PROPERTY_TODO_CLOSE';

export type ViewType =
  | 'VIEW_DISABLE'
  | 'VIEW_NONE'
  | 'VIEW_SINGLE'
  | 'VIEW_HIDE'
  | 'VIEW_MORE_BOX'
  | 'VIEW_DIMNED'
  | 'VIEW_SELECTED'
  | 'VIEW_CTA';

export type EventType =
  | 'EVENT_DISABLE'
  | 'EVENT_NONE'
  | 'EVENT_CLICK'
  | 'EVENT_TRIGGER'
  | 'EVENT_API'
  | 'EVENT_WEB_HOOK'
  | 'EVENT_CRITERIA_RESULT'
  | 'EVENT_DOWNLOAD'
  | 'EVENT_SUBMIT';

export type ActionType =
  | 'ACTION_NONE'
  | 'ACTION_APPROVAL'
  | 'ACTION_APPROVAL_REVIEW'
  | 'ACTION_EMAIL'
  | 'ACTION_EMAIL_REVIEW'
  | 'ACTION_EMAIL_AGAIN'
  | 'ACTION_EMAIL_REPLY'
  | 'ACTION_INVOKE_PROCESS'
  | 'ACTION_FEEDBACK'
  | 'ACTION_NEW'
  | 'ACTION_SITE_QUOTE'
  | 'ACTION_CLOSED'
  | 'ACTION_SMS'
  | 'ACTION_CUSTOM'
  | 'WAIT_UNTIL_TRIGGER'
  | 'WAIT_UNTIL_DATE_TIME'
  | 'WAIT_BY_DURATION'
  | 'WAIT_UNTIL_RETURN_PROCESS'
  | 'WAIT_SCHEDULE_ATTRIBUTE'
  | 'CRITERIA_3MATCH'
  | 'CRITERIA_PAID_IN_ORDER'
  | 'CRITERIA_CHECK_PURCHASE'
  | 'CRITERIA_CHECK_PAYMENT';

export interface BusinessProcess extends IdName {
  module: ModuleType;
  description: string;
  users: User[];
  steps: number;
  products: IdName[];
  trigger: string;
}

export interface NextSteps {
  steps: IdName[];
}

export interface StepSetting {
  method: MethodType;
  template: boolean;
  cta: boolean;
  auto: boolean;
  email: boolean;
  due: boolean;
  assign: boolean;
}

export interface StepMeta {
  jump: boolean;
  property: PropertyType;
  view: ViewType;
}

export interface BusinessStep extends IdName {
  stage: string;
  type: NodeType;
  definedId: string;
  description: string;
  setting?: StepSetting;
  statuses?: BusinessStatus[];
  meta: StepMeta;
  action?: Action;
  automation?: Automation;
  wait?: Wait;
  critiera?: Critiera;
  site?: Site;
  close?: Close;
}

export interface Checklist extends IdName {}

export interface BusinessStatus {
  id: string;
  definedId: string;
  name: string;
  button: string;
  view: ViewType;
  property: PropertyType;
  event: EventType;
  direction: Direction;
  nextStep: IdName;
  // nextDirection: string;
  sequence: string[];
  multiple: MultipleType;
  primary: boolean;
  step: string;
  options?: string;
  ctaId?: string;
  pageName?: string;
  flag?: string;
}

export interface StatusForm {
  id: string;
  button: string;
  name: string;
  view: OptionValue;
  event: OptionValue;
  property: OptionValue;
  direction: OptionValue;
  nextStep: OptionValue;
  sequence: string[];
  definedId?: string;
  order: number;
  multiple: MultipleType;
  // primary: boolean;
  checklist?: Checklist[];
  criteria?: CriteriaOption;
  // site?: SiteOption;
  new: boolean;
  reset: boolean;
  ctaId?: string;
  pageName?: string;
  flag?: string;
}

// export interface SiteOption {
//   id: string;
//   name: string;
// }

export interface ModuleProcess {
  process: IdName;
  stages: Stage[];
  closed: BusinessStatus[];
  steps: ModuleStep[];
}

export interface ModuleStep {
  stageId: string;
  step: IdName;
  status: IdName;
  type: NodeType;
  property: string;
  statuses: BusinessStatus[];
  sequence: string;
  checklist?: string;
}

export interface DefinedField {
  id: string;
  module: string;
  fieldName: string;
  fieldType: FieldType;
}

export interface DefinedTrigger {
  trigger: TriggerType;
  module: ModuleType;
  field: string;
  ftype: FieldType;
  ptype: ProcessType;
  process: IdName;
  step: IdName;
  property: PropertyType;
}

export interface TriggerForm {
  trigger: OptionValue;
  module: OptionValue;
  field: OptionValue;
  ptype: OptionValue;
  process: OptionValue;
  step: OptionValue;
  property: OptionValue;
}

export interface DefinedFields {
  results: DefinedField[];
}

export interface StepType {
  key: string;
  value: NodeType;
  label: string;
}

export interface StepSiteForm {
  category: LabelValue;
  type: OptionValue;
  template: OptionValue;
  html: string;
}

export interface SleepingExecute {
  status: IdName;
  useNotify: boolean;
  notify: IdName;
  useChangeStep: boolean;
  changeStep: IdName;
  useMywork: boolean;
}

export interface Action {
  duration: Duration;
  template?: IdName;
  method: string;
  html?: string;
  sendEmail: boolean;
}

export interface Critiera {}

export interface Site {
  type: string;
  category: string;
  template?: IdName;
  html?: string;
}

export interface Automation {
  useSleeping: boolean;
  sleeping: {
    executes: SleepingExecute[];
    duration: Duration;
  };
}

export interface Wait {
  type: string;
  datetime: string;
  duration: Duration;
  schedule: {
    duration: Duration;
    when: string;
    attr: string;
  };
  trigger: string;
}

export interface Close {
  status: string;
  view: ViewType;
  jump: boolean;
  property: string;
}

// export interface WaitForm {
//   type: OptionValue;
//   datetime: Date | null;
//   duration: Term;
//   schedule: {
//     duration: Term;
//     when: OptionValue;
//     attr: OptionValue;
//   };
//   trigger: OptionValue;
// }

export interface ProcessOpen {
  open: boolean;
  data?: BusinessProcess;
}
