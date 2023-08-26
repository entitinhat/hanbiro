import {
  LAYOUT_PROJECT_TASK_TEMPLATE,
  MENU_CAMPAIGN,
  MENU_COMPETITOR,
  MENU_CUSTOMER_MARKETING,
  MENU_CUSTOMER_MARKETING_LIST,
  MENU_LEAD,
  MENU_OPPORTUNITY
} from './menus';
import {
  MENU_CUSTOMER,
  MENU_SETTING_ASSIGNMENT_RULE,
  MENU_SETTING_CTA,
  MENU_SETTING_LANDINGPAGE,
  MENU_TEMPLATE_EMAIL,
  MENU_TEMPLATE_KNOWLEDGEBASE,
  MENU_TEMPLATE_TASK,
  MENU_TEMPLATE_SMS,
  MENU_TEMPLATE_CALL,
  MENU_TEMPLATE_QUOTE,
  MENU_DESK_TICKET,
  MENU_DESK_KNOWLEDGE,
  MENU_SETTING_SURVEY,
  MENU_SETTING_TICKET_FORM,
  MENU_ANALYTIC_REPORT,
  MENU_ACTIVITY,
  MENU_PRODUCT,
  MENU_UNIT,
  MENU_ITEM,
  LAYOUT_PROCESS_BUSINESS,
  LAYOUT_PROCESS_STEP,
  LAYOUT_PROCESS_STAGE,
  LAYOUT_PROCESS_DEFINED_ITEM,
  MENU_SETTING_SATISFACTION_SURVEY,
  MENU_QUOTE,
  LAYOUT_PROJECT_PROJECT
} from '@base/config/menus';

interface MenuAPI {
  /** mutationKey for update field */
  mutationKey: string;
  /** variableKey will set value for update */
  variableKey: string;
}

interface ViewFieldAPI {
  [key: string]: MenuAPI;
}

const VIEW_FIELD_API_CONFIG: ViewFieldAPI = {
  [MENU_DESK_TICKET]: {
    mutationKey: 'desk_updateTicket',
    variableKey: 'ticket'
  },
  [MENU_DESK_KNOWLEDGE]: {
    mutationKey: 'desk_updateKnowledgebase',
    variableKey: 'knowledgebase'
  },
  [MENU_CUSTOMER]: {
    mutationKey: 'customer_updateCustomer',
    variableKey: 'customer'
  },
  [MENU_CUSTOMER_MARKETING_LIST]: {
    mutationKey: 'marketing_updateMarketingList',
    variableKey: 'marketingList'
  },
  [MENU_ACTIVITY]: {
    mutationKey: 'activity_updateActivity',
    variableKey: 'activity'
  },
  mywork_task_sequence: {
    mutationKey: 'activity_updateTaskSequence',
    variableKey: 'sequence'
  },
  [MENU_PRODUCT]: {
    mutationKey: 'product_updateProduct',
    variableKey: 'product'
  },
  [MENU_UNIT]: {
    mutationKey: 'product_updateUnit',
    variableKey: 'unit'
  },
  [MENU_ITEM]: {
    mutationKey: 'product_updateItem',
    variableKey: 'item'
  },
  [LAYOUT_PROCESS_BUSINESS]: {
    mutationKey: 'process_updateProcess',
    variableKey: 'process'
  },
  [LAYOUT_PROCESS_STEP]: {
    mutationKey: 'process_updateStep',
    variableKey: 'step'
  },
  [LAYOUT_PROCESS_STAGE]: {
    mutationKey: 'process_updateStage',
    variableKey: 'stage'
  },
  [LAYOUT_PROCESS_DEFINED_ITEM]: {
    mutationKey: 'process_updateDefinedItem',
    variableKey: 'definedItem'
  },
  [MENU_SETTING_ASSIGNMENT_RULE]: {
    mutationKey: 'setting_updateAssignmentRule',
    variableKey: 'ar'
  },
  [MENU_SETTING_CTA]: {
    mutationKey: 'setting_updateCta',
    variableKey: 'cta'
  },
  [MENU_SETTING_LANDINGPAGE]: {
    mutationKey: 'setting_updateLandingPage',
    variableKey: 'landingPage'
  },
  [MENU_TEMPLATE_EMAIL]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_TEMPLATE_KNOWLEDGEBASE]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_TEMPLATE_TASK]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_TEMPLATE_SMS]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_TEMPLATE_CALL]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_TEMPLATE_QUOTE]: {
    mutationKey: 'setting_updateMenuTemplate',
    variableKey: 'menuTemplate'
  },
  [MENU_SETTING_SURVEY]: {
    mutationKey: 'setting_updateSurvey',
    variableKey: 'survey'
  },
  [MENU_SETTING_SATISFACTION_SURVEY]: {
    mutationKey: 'setting_updateSatisfactionSurvey',
    variableKey: 'satisfactionSurvey'
  },
  [MENU_SETTING_TICKET_FORM]: {
    mutationKey: 'setting_updateTicketForm',
    variableKey: 'ticketForm'
  },
  [MENU_ANALYTIC_REPORT]: {
    mutationKey: 'analytic_updateReport',
    variableKey: 'report'
  },
  [MENU_QUOTE]: {
    mutationKey: 'quote_updateQuote',
    variableKey: 'quote'
  },
  [LAYOUT_PROJECT_PROJECT]: {
    mutationKey: 'project_updateProject',
    variableKey: 'project'
  },
  [LAYOUT_PROJECT_TASK_TEMPLATE]: {
    mutationKey: 'project_updateTaskTemplate',
    variableKey: 'task'
  },
  [MENU_CAMPAIGN]: {
    mutationKey: 'marketing_updateCampaign',
    variableKey: 'campaign'
  },
  [MENU_LEAD]: {
    mutationKey: 'lead_updateLead',
    variableKey: 'lead'
  },
  [MENU_COMPETITOR]: {
    mutationKey: 'competitor_updateCompetitor',
    variableKey: 'competitor'
  },
  [MENU_OPPORTUNITY]: {
    mutationKey: 'opportunity_updateOpportunity',
    variableKey: 'opportunity'
  }
};

export default VIEW_FIELD_API_CONFIG;
