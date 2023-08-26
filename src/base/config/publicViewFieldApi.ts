import {
  MENU_CUSTOMER,
  MENU_INVENTORY_ITEM,
  MENU_MARKETING_LEAD,
  MENU_MARKETING_LOYALTY,
  MENU_PRODUCT_BOM,
  MENU_PRODUCT_COMPONENT,
  MENU_PRODUCT_ITEM,
  MENU_PRODUCT_PRODUCT,
  MENU_PRODUCT_UNIT,
  MENU_SALES_ORDER,
  MENU_SALES_ORDER_REPLACEMENT,
  MENU_SALES_ORDER_RETURN,
  MENU_SETTING_ASSIGNMENT_RULE,
  MENU_SETTING_CTA,
  MENU_SETTING_LANDINGPAGE,
  MENU_SETTING_SALES_COMMISSION,
  MENU_SETTING_TEMPLATE,
  MENU_TEMPLATE_EMAIL,
  MENU_TEMPLATE_KNOWLEDGEBASE,
  MENU_TEMPLATE_TASK,
  MENU_TEMPLATE_SMS,
  MENU_TEMPLATE_CALL,
  MENU_DESK_TICKET,
  MENU_DESK_KNOWLEDGE,
  MENU_SETTING_SURVEY,
  MENU_SETTING_TICKET_FORM,
  MENU_ANALYTIC_REPORT
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
const PUBLIC_VIEW_FIELD_API_CONFIG: ViewFieldAPI = {
  [MENU_DESK_TICKET]: {
    mutationKey: 'site_updateTicket',
    variableKey: 'ticket'
  },
  // [MENU_DESK_KNOWLEDGE]: {
  //   mutationKey: 'desk_updateKnowledgebase',
  //   variableKey: 'knowledgebase',
  // },
  // [MENU_CUSTOMER]: {
  //   mutationKey: 'customer_updateCustomer',
  //   variableKey: 'customer',
  // },
  // mywork: {
  //   mutationKey: 'activity_updateActivity',
  //   variableKey: 'activity',
  // },
  // mywork_task_sequence: {
  //   mutationKey: 'activity_updateTaskSequence',
  //   variableKey: 'sequence',
  // },
  // inventory_warehouse: {
  //   mutationKey: 'inventory_updateWarehouse',
  //   variableKey: 'warehouse',
  // },
  // inventory_adjustment: {
  //   mutationKey: 'inventory_updateAdjustment',
  //   variableKey: 'adjustment',
  // },
  // inventory_transfer: {
  //   mutationKey: 'inventory_updateTransferOrder',
  //   variableKey: 'transferOrder',
  // },
  // pricelist: {
  //   mutationKey: 'product_updatePriceList',
  //   variableKey: 'priceList',
  // },
  // discount: {
  //   mutationKey: 'product_updateDiscount',
  //   variableKey: 'discount',
  // },
  // agreement: {
  //   mutationKey: 'product_updateAgreement',
  //   variableKey: 'agreement',
  // },
  // [MENU_PRODUCT_PRODUCT]: {
  //   mutationKey: 'product_updateProduct',
  //   variableKey: 'product',
  // },
  // pr: {
  //   mutationKey: 'purchase_updatePR',
  //   variableKey: 'purchase',
  // },
  // rfq: {
  //   mutationKey: 'purchase_updateRFQ',
  //   variableKey: 'rfq',
  // },
  // rft: {
  //   mutationKey: 'purchase_updateRFT',
  //   variableKey: 'rft',
  // },
  // [MENU_PRODUCT_UNIT]: {
  //   mutationKey: 'product_updateUnit',
  //   variableKey: 'unit',
  // },
  // [MENU_PRODUCT_ITEM]: {
  //   mutationKey: 'product_updateItem',
  //   variableKey: 'item',
  // },
  // [MENU_SALES_ORDER]: {
  //   mutationKey: 'order_updateSalesOrder',
  //   variableKey: 'salesOrder',
  // },
  // [MENU_SALES_ORDER_RETURN]: {
  //   mutationKey: 'order_updateSalesReturn',
  //   variableKey: 'salesReturn',
  // },
  // [MENU_SALES_ORDER_REPLACEMENT]: {
  //   mutationKey: 'order_updateSalesReplacement',
  //   variableKey: 'salesReplacement',
  // },
  // processStep: {
  //   mutationKey: 'automation_updateStep',
  //   variableKey: 'step',
  // },
  // processStage: {
  //   mutationKey: 'automation_updateStage',
  //   variableKey: 'stage',
  // },
  // marketing_promotionalItems: {
  //   mutationKey: 'marketing_updatePromotional',
  //   variableKey: 'Promotional',
  // },
  // marketing_digital_ooh: {
  //   mutationKey: 'marketing_updateDigitalOOH',
  //   variableKey: 'DigitalOOH',
  // },
  // subscription_template: {
  //   mutationKey: 'setting_updateSubscriptionTemplate',
  //   variableKey: 'subscriptionTemplate',
  // },
  // marketing_print_ads: {
  //   mutationKey: 'marketing_updateAds',
  //   variableKey: 'ads',
  // },
  // [MENU_SETTING_SALES_COMMISSION]: {
  //   mutationKey: 'setting_updateSalesCommission',
  //   variableKey: 'sc',
  // },
  [MENU_SETTING_ASSIGNMENT_RULE]: {
    mutationKey: 'setting_updateAssignmentRule',
    variableKey: 'ar'
  }
  // [MENU_PRODUCT_COMPONENT]: {
  //   mutationKey: 'product_updateComponent',
  //   variableKey: 'component',
  // },
  // [MENU_MARKETING_LOYALTY]: {
  //   mutationKey: 'marketing_updateLoyalty',
  //   variableKey: 'loyalty',
  // },
  // [MENU_MARKETING_LEAD]: {
  //   mutationKey: 'marketing_updateLead',
  //   variableKey: 'lead',
  // },
  // [MENU_INVENTORY_ITEM]: {
  //   mutationKey: 'product_updateInventoryItem',
  //   variableKey: 'inventoryItem',
  // },
  // [MENU_PRODUCT_BOM]: {
  //   mutationKey: 'product_updateBom',
  //   variableKey: 'bom',
  // },
  // [MENU_SETTING_CTA]: {
  //   mutationKey: 'setting_updateCta',
  //   variableKey: 'cta',
  // },
  // [MENU_SETTING_LANDINGPAGE]: {
  //   mutationKey: 'setting_updateLandingPage',
  //   variableKey: 'landingPage',
  // },
  // [MENU_TEMPLATE_EMAIL]: {
  //   mutationKey: 'setting_updateMenuTemplate',
  //   variableKey: 'menuTemplate',
  // },
  // [MENU_TEMPLATE_KNOWLEDGEBASE]: {
  //   mutationKey: 'setting_updateMenuTemplate',
  //   variableKey: 'menuTemplate',
  // },
  // [MENU_TEMPLATE_TASK]: {
  //   mutationKey: 'setting_updateMenuTemplate',
  //   variableKey: 'menuTemplate',
  // },
  // [MENU_TEMPLATE_SMS]: {
  //   mutationKey: 'setting_updateMenuTemplate',
  //   variableKey: 'menuTemplate',
  // },
  // [MENU_TEMPLATE_CALL]: {
  //   mutationKey: 'setting_updateMenuTemplate',
  //   variableKey: 'menuTemplate',
  // },
  // [MENU_SETTING_SURVEY]: {
  //   mutationKey: 'setting_updateSurvey',
  //   variableKey: 'survey',
  // },
  // [MENU_SETTING_TICKET_FORM]: {
  //   mutationKey: 'setting_updateTicketForm',
  //   variableKey: 'ticketForm',
  // },
  // [MENU_ANALYTIC_REPORT]: {
  //   mutationKey: 'analytic_updateReport',
  //   variableKey: 'report',
  // },
};
export default PUBLIC_VIEW_FIELD_API_CONFIG;
