export enum EAssignmentRuleModule {
  //SALES = 'AR_MODULE_SALES',
  CUSTOMER = 'AR_MODULE_CUSTOMER',
  DESK = 'AR_MODULE_DESK',
  PRODUCT = 'AR_MODULE_PRODUCT',
}

export enum EARAssignToType {
  USERS = 'AR_ASSIGN_TO_TYPE_USERS',
  GROUPS = 'AR_ASSIGN_TO_TYPE_GROUPS',
}

export enum EARAssignToMode {
  OWNER = 'AR_ASSGIN_TO_MODE_OWNER',
  ROUND_ROBIN = 'AR_ASSGIN_TO_MODE_ROUND_ROBIN',
  BALANCE_CAPACITY = 'AR_ASSGIN_TO_BALANCE_CAPACITY',
}
//Ticket Classification

export enum EAssignmentRuleCriteria {
  CHANNEL = 'criteria_channel',
  TAG = 'criteria_tag',
  TICKET_CLASSIFICATION = 'criteria_ticket_classification',
  CATEGORY = 'criteria_category',
}

export enum EAREntryAssignToMode {
  USER = 'AR_ASSGIN_TO_MODE_USER',
  GROUP = 'AR_ASSGIN_TO_MODE_GROUP',
  USERS = 'AR_ASSGIN_TO_MODE_USERS',
  GROUPS = 'AR_ASSGIN_TO_MODE_GROUPS',
}
export enum EAREntryAssignToType {
  NONE = 'AR_ASSIGN_TO_TYPE_NONE',
  QUEUE = 'AR_ASSIGN_TO_TYPE_QUEUE',
  ROUND_ROBIN = 'AR_ASSIGN_TO_TYPE_ROUND_ROBIN',
  BALANCE_NUM = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_NUM',
  BALANCE_CAP = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_CAP',
}
