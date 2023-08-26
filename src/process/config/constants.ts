import { OptionValue } from '@base/types/common';
import { CriteriaOperator, StatusFormProperty } from '@process/types/diagram';
import { StatusForm, StepType } from '@process/types/process';

export const MODULE: { [index: string]: string } = {
  MODULE_ACTIVITY: 'Activity',
  MODULE_TICKET: 'Ticket',
  MODULE_PRODUCT: 'Product',
  MODULE_ACCOUNT: 'Account',
  MODULE_CONTACT: 'Contact',
  MODULE_PROJECT: 'Project',
  MODULE_PROTOTYPE: 'Prototype',
  MODULE_PLANNING: 'Planning',
  MODULE_DEV_TASK: 'Dev Task'
};

export const MODULE_OPTIONS: OptionValue[] = [
  {
    keyName: 'MODULE_ACTIVITY',
    languageKey: 'ncrm_process_module_activity'
  },
  {
    keyName: 'MODULE_TICKET',
    languageKey: 'ncrm_process_module_ticket'
  },
  {
    keyName: 'MODULE_ACCOUNT',
    languageKey: 'ncrm_process_module_account'
  },
  {
    keyName: 'MODULE_CONTACT',
    languageKey: 'ncrm_process_module_contact'
  },
  {
    keyName: 'MODULE_PRODUCT',
    languageKey: 'ncrm_process_module_product'
  },
  {
    keyName: 'MODULE_PROJECT',
    languageKey: 'ncrm_process_module_project'
  },
  {
    keyName: 'MODULE_PROTOTYPE',
    languageKey: 'ncrm_process_module_prototype'
  },
  {
    keyName: 'MODULE_PLANNING',
    languageKey: 'ncrm_process_module_planning'
  },
  {
    keyName: 'MODULE_DEV_TASK',
    languageKey: 'ncrm_process_module_dev_task'
  }
];

export const PROCESS_TYPE: { [index: string]: string } = {
  TYPE_BUSINESS: 'Business',
  TYPE_CAMPAIN: 'Campaign'
};

export const PROCESS_TYPE_OPTIONS = [
  {
    keyName: 'TYPE_BUSINESS',
    languageKey: 'ncrm_process_type_business'
  },
  {
    keyName: 'TYPE_CAMPAIN',
    languageKey: 'ncrm_process_type_campain'
  }
];

export const PROCESS_TRIGGER_OPTIONS = [
  {
    keyName: 'TRIGGER_RECORD_CREATED',
    languageKey: 'ncrm_process_trigger_record_created'
  },
  {
    keyName: 'TRIGGER_INVOKE_PROCESS',
    languageKey: 'ncrm_process_trigger_invoke_process'
  }
];

export const TRIGGER_TYPE: { [index: string]: string } = {
  TRIGGER_TYPE_NONE: 'None',
  TRIGGER_TYPE_RECORD_CREATED: 'Record Created',
  TRIGGER_TYPE_RECORD_UPDATED: 'Record Updated',
  TRIGGER_TYPE_RECORD_CREATED_UPDATED: 'Record Created or Updated',
  TRIGGER_TYPE_RECORD_DELETED: 'Record Deleted',
  TRIGGER_TYPE_FIELD_UPDATED: 'Field Updated',
  TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED: 'Process Property Updated',
  TRIGGER_TYPE_SCHEDULED_DATE_TIME: 'Schedule Date time'
};

export const TRIGGER_TYPE_OPTIONS = [
  {
    keyName: 'TRIGGER_TYPE_NONE',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_NONE']
  },
  {
    keyName: 'TRIGGER_TYPE_RECORD_CREATED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_RECORD_CREATED']
  },
  {
    keyName: 'TRIGGER_TYPE_RECORD_UPDATED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_RECORD_UPDATED']
  },
  {
    keyName: 'TRIGGER_TYPE_RECORD_CREATED_UPDATED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_RECORD_CREATED_UPDATED']
  },
  {
    keyName: 'TRIGGER_TYPE_RECORD_DELETED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_RECORD_DELETED']
  },
  {
    keyName: 'TRIGGER_TYPE_FIELD_UPDATED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_FIELD_UPDATED']
  },
  {
    keyName: 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED']
  },
  {
    keyName: 'TRIGGER_TYPE_SCHEDULED_DATE_TIME',
    languageKey: TRIGGER_TYPE['TRIGGER_TYPE_SCHEDULED_DATE_TIME']
  }
];

export const PROCESS_STATUS_DIRECTIONS_VIEW: { [index: string]: string } = {
  DIRECTION_DISABLE: '-',
  DIRECTION_NONE: 'ncrm_process_status_direction_none',
  DIRECTION_STAYING: 'ncrm_process_status_direction_staying',
  DIRECTION_ACTION_STAYING: 'ncrm_process_status_direction_action_staying',
  DIRECTION_ACTION_INCOMING: 'ncrm_process_status_direction_action_incoming',
  DIRECTION_GROUP_INCOMING: 'ncrm_process_status_direction_group_incoming',
  DIRECTION_FORWARD_INCOMING_LEFT: 'ncrm_process_status_direction_forward_incoming_left',
  DIRECTION_FORWARD_OUTGOING_RIGHT: 'ncrm_process_status_direction_forward_outgoing_right',
  DIRECTION_FORWARD_OUTGOING_BOTTOM: 'ncrm_process_status_direction_forward_outgoing_bottom',
  DIRECTION_FORWARD_OUTGOING_MIDDLE: 'ncrm_process_status_direction_forward_outgoing_middle',
  DIRECTION_FORWARD_OUTGOING_JUMP: 'ncrm_process_status_direction_forward_outgoing_jump',
  DIRECTION_FORWARD_OUTGOING_TOP: 'ncrm_process_status_direction_forward__outgoing_top',
  DIRECTION_FORWARD_OUTGOING_PROCESS: 'ncrm_process_status_direction_forward_process',
  DIRECTION_BACKWARD_INCOMING_LEFT: 'ncrm_process_status_direction_backward_incoming_left',
  DIRECTION_BACKWARD_INCOMING_RIGHT: 'ncrm_process_status_direction_backward_incoming_right',
  DIRECTION_BACKWARD_INCOMING_TOP: 'ncrm_process_status_direction_backward_incoming_top',
  DIRECTION_BACKWARD_OUTGOING_LEFT: 'ncrm_process_status_direction_backward_outgoing_left',
  DIRECTION_BACKWARD_OUTGOING_BOTTOM: 'ncrm_process_status_direction_backward_outgoing_bottom',
  DIRECTION_BACKWARD_OUTGOING_RIGHT: 'ncrm_process_status_direction_backward_outgoing_right',
  DIRECTION_BACKWARD_OUTGOING_MIDDLE: 'ncrm_process_status_direction_backward_outgoing_middle',
};

export const PROCESS_STATUS_DIRECTIONS = [
  { keyName: 'DIRECTION_NONE', languageKey: 'ncrm_process_status_direction_none' },
  {
    keyName: 'DIRECTION_STAYING',
    languageKey: 'ncrm_process_status_direction_staying'
  },
  {
    keyName: 'DIRECTION_FORWARD_OUTGOING_RIGHT',
    languageKey: 'ncrm_process_status_direction_forward_outgoing_right'
  },
  {
    keyName: 'DIRECTION_FORWARD_OUTGOING_BOTTOM',
    languageKey: 'ncrm_process_status_direction_forward_outgoing_bottom'
  },
  {
    keyName: 'DIRECTION_FORWARD_OUTGOING_MIDDLE',
    languageKey: 'ncrm_process_status_direction_forward_outgoing_middle'
  },
  {
    keyName: 'DIRECTION_FORWARD_OUTGOING_JUMP',
    languageKey: 'ncrm_process_status_direction_forward_outgoing_jump'
  },
  {
    keyName: 'DIRECTION_FORWARD_OUTGOING_PROCESS',
    languageKey: 'ncrm_process_status_direction_other_process'
  },
  {
    keyName: 'DIRECTION_BACKWARD_OUTGOING_BOTTOM',
    languageKey: 'ncrm_process_status_direction_backward_outgoing_bottom'
  },
  {
    keyName: 'DIRECTION_BACKWARD_OUTGOING_MIDDLE',
    languageKey: 'ncrm_process_status_direction_backward_outgoing_middle'
  },
  {
    keyName: 'DIRECTION_BACKWARD_OUTGOING_RIGHT',
    languageKey: 'ncrm_process_status_direction_backward_outgoing_right'
  },
  {
    keyName: 'DIRECTION_BACKWARD_OUTGOING_LEFT',
    languageKey: 'ncrm_process_status_direction_backward_outgoing_left'
  },
];

export const PROCESS_STATUS_DIRECTIONS_SORT: { [index: string]: number } = {
  DIRECTION_DISABLE: -1,
  DIRECTION_NONE: 0,
  DIRECTION_FORWARD_INCOMING_LEFT: 1,
  DIRECTION_BACKWARD_INCOMING_TOP: 2,
  DIRECTION_STAYING: 3,
  DIRECTION_FORWARD_OUTGOING_RIGHT: 4,
  DIRECTION_FORWARD_OUTGOING_BOTTOM: 5,
  DIRECTION_FORWARD_OUTGOING_MIDDLE: 6,
  DIRECTION_FORWARD_OUTGOING_PROCESS: 7,
  DIRECTION_FORWARD_OUTGOING_JUMP: 8,
  DIRECTION_BACKWARD_OUTGOING_BOTTOM: 9,
  DIRECTION_BACKWARD_OUTGOING_MIDDLE: 10,
  DIRECTION_BACKWARD_OUTGOING_RIGHT: 11,
  DIRECTION_BACKWARD_OUTGOING_LEFT: 12,
  DIRECTION_BACKWARD_OUTGOING_PROCESS: 13
};

export const PROCESS_STATUS_PROPERTIES_VIEW: { [index: string]: string } = {
  PROPERTY_DISABLE: '-',
  PROPERTY_NONE: 'ncrm_process_status_prop_none',
  PROPERTY_NEW: 'ncrm_process_status_prop_new', // fix
  PROPERTY_TODO: 'ncrm_process_status_prop_todo', // fix
  PROPERTY_TODO_DOING: 'ncrm_process_status_prop_todo_doing', // fix
  PROPERTY_TODO_CLOSE: 'ncrm_process_status_prop_todo_close', // fix
  PROPERTY_COMPLETED: 'ncrm_process_status_prop_completed',
  PROPERTY_CANCELED: 'ncrm_process_status_prop_canceled',
  PROPERTY_LOST: 'ncrm_process_status_prop_lost',
  PROPERTY_PAID_IN_FULL: 'ncrm_process_status_prop_paid_in_full',
  PROPERTY_PARTIALLY_PAID: 'ncrm_process_status_prop_partially_paid',
  PROPERTY_REJECTED: 'ncrm_process_status_prop_rejected',
  PROPERTY_REUSED: 'ncrm_process_status_prop_reused',
  PROPERTY_APPROVED: 'ncrm_process_status_prop_approved'
};

export const PROCESS_STATUS_PROPERTIES = [
  {
    keyName: 'PROPERTY_NONE',
    languageKey: 'ncrm_process_status_prop_none'
  },
  // { keyName: 'PROPERTY_TODO', languageKey: 'Todo' },
  // { keyName: 'PROPERTY_TODO_DOING', languageKey: 'Todo Doing' },
  {
    keyName: 'PROPERTY_TODO_CLOSE',
    languageKey: 'ncrm_process_status_prop_todo_close'
  },
  {
    keyName: 'PROPERTY_COMPLETED',
    languageKey: 'ncrm_process_status_prop_completed'
  },
  {
    keyName: 'PROPERTY_CANCELED',
    languageKey: 'ncrm_process_status_prop_canceled'
  },
  { keyName: 'PROPERTY_LOST', languageKey: 'ncrm_process_status_prop_lost' },
  {
    keyName: 'PROPERTY_PAID_IN_FULL',
    languageKey: 'ncrm_process_status_prop_paid_in_full'
  },
  {
    keyName: 'PROPERTY_PARTIALLY_PAID',
    languageKey: 'ncrm_process_status_prop_partially_paid'
  },
  {
    keyName: 'PROPERTY_REJECTED',
    languageKey: 'ncrm_process_status_prop_rejected'
  },
  { keyName: 'PROPERTY_REUSED', languageKey: 'ncrm_process_status_prop_reused' },
  {
    keyName: 'PROPERTY_APPROVED',
    languageKey: 'ncrm_process_status_prop_approved'
  }
];

export const PROCESS_STATUS_EVENTS_VIEW: { [index: string]: string } = {
  EVENT_DISABLE: '-',
  EVENT_NONE: 'ncrm_process_status_event_none',
  EVENT_CLICK: 'ncrm_process_status_event_click',
  EVENT_TRIGGER: 'ncrm_process_status_event_trigger',
  // EVENT_API: 'API',
  // EVENT_WEB_HOOK: 'Web Hook',
  // EVENT_CRITERIA_RESULT: 'Criteria Result',
  EVENT_DOWNLOAD: 'ncrm_process_status_event_download',
  EVENT_SUBMIT: 'ncrm_process_status_event_submit'
};

export const PROCESS_STATUS_EVENTS = [
  { keyName: 'EVENT_NONE', languageKey: 'ncrm_process_status_event_none' },
  { keyName: 'EVENT_CLICK', languageKey: 'ncrm_process_status_event_click' },
  { keyName: 'EVENT_TRIGGER', languageKey: 'ncrm_process_status_event_trigger' },
  // { keyName: 'EVENT_API', languageKey: 'API' },
  // { keyName: 'EVENT_WEB_HOOK', languageKey: 'Web Hook' },
  // { keyName: 'EVENT_CRITERIA_RESULT', languageKey: 'Criteria Result' },
  { keyName: 'EVENT_DOWNLOAD', languageKey: 'ncrm_process_status_event_download' },
  { keyName: 'EVENT_SUBMIT', languageKey: 'ncrm_process_status_event_submit' }
];

export const PROCESS_STATUS_VIEWS_VIEW: { [index: string]: string } = {
  VIEW_DISABLE: '-',
  VIEW_NONE: 'ncrm_process_status_none',
  VIEW_SINGLE: 'ncrm_process_status_view_single',
  // VIEW_HIDE: 'Hide',
  VIEW_MORE_BOX: 'ncrm_process_status_view_more_box'
  // VIEW_DIMNED: 'Dimned',
  // VIEW_SELECTED: 'Selected',
  // VIEW_CTA: 'CTA',
};

export const PROCESS_STATUS_VIEWS = [
  { keyName: 'VIEW_NONE', languageKey: 'ncrm_process_status_none' },
  { keyName: 'VIEW_SINGLE', languageKey: 'ncrm_process_status_view_single' },
  // { keyName: 'VIEW_HIDE', languageKey: 'Hide' },
  { keyName: 'VIEW_MORE_BOX', languageKey: 'ncrm_process_status_view_more_box' }
  // { keyName: 'VIEW_DIMNED', languageKey: 'Dimned' },
  // { keyName: 'VIEW_SELECTED', languageKey: 'Selected' },
  // { keyName: 'VIEW_CTA', languageKey: 'CTA' },
];

export const STEP_TYPES: StepType[] = [
  {
    key: 'action',
    value: 'TYPE_ACTION',
    label: 'ncrm_process_business_action'
  },
  {
    key: 'wait',
    value: 'TYPE_WAIT',
    label: 'ncrm_process_business_wait'
  },
  {
    key: 'criteria',
    value: 'TYPE_CRITERIA',
    label: 'ncrm_process_business_rule_criteria'
  },
  {
    key: 'site',
    value: 'TYPE_SITE',
    label: 'ncrm_process_business_site'
  },
  {
    key: 'simple',
    value: 'TYPE_SIMPLE_ACTION',
    label: 'ncrm_process_business_simple_action'
  },
  {
    key: 'checklist',
    value: 'TYPE_CHECKLIST',
    label: 'ncrm_process_business_checklist'
  }
];

export const PROCESS_CLOSED_PROPERTY_OPTIONS = [
  {
    keyName: 'PROPERTY_COMPLETED',
    languageKey: 'ncrm_process_closed_prop_completed'
  },
  {
    keyName: 'PROPERTY_CANCELED',
    languageKey: 'ncrm_process_closed_prop_canceled'
  },
  {
    keyName: 'PROPERTY_LOST',
    languageKey: 'ncrm_process_closed_prop_lost'
  },
  {
    keyName: 'PROPERTY_WON',
    languageKey: 'ncrm_process_closed_prop_won'
  },
  {
    keyName: 'PROPERTY_REJECTED',
    languageKey: 'ncrm_process_closed_prop_rejected'
  }
];

export const PROCESS_CLOSED_VIEW_OPTIONS = [
  {
    label: 'ncrm_process_view_single',
    value: 'VIEW_SINGLE'
  },
  {
    label: 'ncrm_process_view_more_box',
    value: 'VIEW_MORE_BOX'
  }
];

export const AUTOMATION_TYPE: { [index: string]: string } = {
  RULE_TYPE_BOOLEAN: 'ncrm_process_automation_rule_boolean',
  RULE_TYPE_SIMPLE: 'ncrm_process_automation_rule_simple'
};

export const AUTOMATION_TYPE_OPTIONS = [
  {
    value: 'RULE_TYPE_BOOLEAN',
    label: AUTOMATION_TYPE['RULE_TYPE_BOOLEAN']
  },
  {
    value: 'RULE_TYPE_SIMPLE',
    label: AUTOMATION_TYPE['RULE_TYPE_SIMPLE']
  }
];

export const STATUS_BASIC_DATA = (props: StatusFormProperty): StatusForm => {
  const view = props.view ?? 'VIEW_NONE';
  const event = props.event ?? 'EVENT_NONE';
  const property = props.property ?? 'PROPERTY_NONE';
  const direction = props.direction ?? 'DIRECTION_NONE';
  const sequence = props.sequence ?? ['2'];
  const definedId = props.definedId ?? '';
  const newFlag = props.newFlag ?? false;
  const resetFlag = props.resetFlag ?? false;
  const ctaId = props.ctaId ?? '';

  return {
    id: props.id ?? '',
    button: props.button ?? '',
    name: props.name ?? '',
    view: { keyName: view, languageKey: PROCESS_STATUS_VIEWS_VIEW[view] },
    event: { keyName: event, languageKey: PROCESS_STATUS_EVENTS_VIEW[event] },
    property: {
      keyName: property,
      languageKey: PROCESS_STATUS_PROPERTIES_VIEW[property]
    },
    direction: {
      keyName: direction,
      languageKey: PROCESS_STATUS_DIRECTIONS_VIEW[direction]
    },
    nextStep: { keyName: '', languageKey: '' },
    sequence: sequence,
    new: newFlag,
    reset: resetFlag,
    definedId: definedId,
    order: PROCESS_STATUS_DIRECTIONS_SORT[direction],
    multiple: props.multiple ?? 'MULTIPLE_NONE',
    // primary: false,
    ctaId: ctaId
  };
};

export const CRITERIA_OPERATOR: { [index: string]: string } = {
  CRITERIA_OPERATOR_NONE: 'Operator',
  CRITERIA_OPERATOR_EQUAL: '=',
  CRITERIA_OPERATOR_NOT_EQUAL: '!=',
  CRITERIA_OPERATOR_LESS_THAN: '<',
  CRITERIA_OPERATOR_LESS_THAN_EQUAL: '<=',
  CRITERIA_OPERATOR_GREATER_THAN: '>',
  CRITERIA_OPERATOR_GREATER_THAN_EQUAL: '>=',
  CRITERIA_OPERATOR_IS_EMPTY: '""',
  CRITERIA_OPERATOR_IS_NOT_EMPTY: '!=""',
  CRITERIA_OPERATOR_CONTAIN: 'in',
  CRITERIA_OPERATOR_NOT_CONTAIN: '!in',
  CRITERIA_OPERATOR_ON: 'on',
  CRITERIA_OPERATOR_NOT_ON: '!on',
  CRITERIA_OPERATOR_AFTER: 'after',
  CRITERIA_OPERATOR_BEFORE: 'before',
  CRITERIA_OPERATOR_BETWEEN: 'between',
  CRITERIA_OPERATOR_THIS_ID: 'this id',
  CRITERIA_OPERATOR_RELATED_ID: 'releated id',
  CRITERIA_OPERATOR_PROPERTY: 'property'
};

export const CRITERIA_FIELD_TYPE: { [index: string]: string } = {
  FIELD_TYPE_NONE: 'Field Type',
  FIELD_TYPE_NUMBER: 'Number',
  FIELD_TYPE_TEXT: 'Text',
  FIELD_TYPE_DATE: 'Date',
  FIELD_TYPE_PROCESS: 'Process'
};

export const CRITERIA_OPERATOR_TYPE: {
  [index: string]: { keyName: CriteriaOperator; operator: string }[];
} = {
  FIELD_TYPE_NUMBER: [
    {
      keyName: 'CRITERIA_OPERATOR_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_NOT_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_NOT_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_LESS_THAN',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_LESS_THAN']
    },
    {
      keyName: 'CRITERIA_OPERATOR_LESS_THAN_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_LESS_THAN_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_GREATER_THAN',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_GREATER_THAN']
    },
    {
      keyName: 'CRITERIA_OPERATOR_GREATER_THAN_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_GREATER_THAN_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_EMPTY']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_NOT_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_NOT_EMPTY']
    }
  ],
  FIELD_TYPE_TEXT: [
    {
      keyName: 'CRITERIA_OPERATOR_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_NOT_EQUAL',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_NOT_EQUAL']
    },
    {
      keyName: 'CRITERIA_OPERATOR_CONTAIN',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_CONTAIN']
    },
    {
      keyName: 'CRITERIA_OPERATOR_NOT_CONTAIN',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_NOT_CONTAIN']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_EMPTY']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_NOT_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_NOT_EMPTY']
    }
  ],
  FIELD_TYPE_DATE: [
    {
      keyName: 'CRITERIA_OPERATOR_ON',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_ON']
    },
    {
      keyName: 'CRITERIA_OPERATOR_NOT_ON',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_NOT_ON']
    },
    {
      keyName: 'CRITERIA_OPERATOR_AFTER',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_AFTER']
    },
    {
      keyName: 'CRITERIA_OPERATOR_BEFORE',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_BEFORE']
    },
    {
      keyName: 'CRITERIA_OPERATOR_BETWEEN',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_BETWEEN']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_EMPTY']
    },
    {
      keyName: 'CRITERIA_OPERATOR_IS_NOT_EMPTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_IS_NOT_EMPTY']
    }
  ],
  FIELD_TYPE_PROCESS: [
    {
      keyName: 'CRITERIA_OPERATOR_THIS_ID',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_THIS_ID']
    },
    {
      keyName: 'CRITERIA_OPERATOR_RELATED_ID',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_RELATED_ID']
    },
    {
      keyName: 'CRITERIA_OPERATOR_PROPERTY',
      operator: CRITERIA_OPERATOR['CRITERIA_OPERATOR_PROPERTY']
    }
  ]
};

export const INSTANT_ACTION_TYPE: { [index: string]: string } = {
  ACTION_TYPE_TASK: 'Assign a Task',
  ACTION_TYPE_EMAIL: 'Sending Email',
  ACTION_TYPE_FIELD_UPDATE: 'Field Update',
  ACTION_TYPE_OUTBOUND_MESSAGE: 'Outbound Message'
};

export const INSTANT_ACTION_TEMPLATE: { [index: string]: string } = {
  ACTION_TYPE_TASK: 'task',
  ACTION_TYPE_EMAIL: 'email'
};

export const INSTANT_ACTION_TYPE_OPTIONS = [
  {
    keyName: 'ACTION_TYPE_TASK',
    languageKey: INSTANT_ACTION_TYPE['ACTION_TYPE_TASK']
  },
  {
    keyName: 'ACTION_TYPE_EMAIL',
    languageKey: INSTANT_ACTION_TYPE['ACTION_TYPE_EMAIL']
  },
  {
    keyName: 'ACTION_TYPE_FIELD_UPDATE',
    languageKey: INSTANT_ACTION_TYPE['ACTION_TYPE_FIELD_UPDATE']
  },
  {
    keyName: 'ACTION_TYPE_OUTBOUND_MESSAGE',
    languageKey: INSTANT_ACTION_TYPE['ACTION_TYPE_OUTBOUND_MESSAGE']
  }
];
