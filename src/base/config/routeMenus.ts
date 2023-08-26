import { CAMPAIGN_CATEGORY_ALL, CAMPAIGN_CATEGORY_EMAIL, CAMPAIGN_CATEGORY_SMS } from '@campaign/config/constants';

/**
 * Customer menu
 */
export const CUSTOMER_MENUS = [
  {
    value: 'all',
    label: 'ncrm_customer_customers',
    path: '/customer/all',
    license: 'customer_customers'
  },
  {
    value: 'account',
    label: 'ncrm_customer_account',
    path: '/customer/account',
    license: 'customer_account'
  },
  {
    value: 'contact',
    label: 'ncrm_customer_contact',
    path: '/customer/contact',
    license: 'customer_contact'
  },
  {
    value: 'marketing',
    label: 'Marketing List',
    path: '/customer/marketing',
    license: 'customer_marketing_list'
  },
  // {
  //   value: 'persona',
  //   label: 'Buyer Persona',
  //   path: '/customer/persona',
  // },
  // {
  //   value: 'ideal',
  //   label: 'Ideal Customer Profile',
  //   path: '/customer/ideal',
  // },
  {
    value: 'block',
    label: 'BlockList',
    path: '/customer/block',
    license: 'customer_blocklist'
  }
];

/**
 * Activity menu
 */
export const ACTIVITY_MENU = [
  {
    value: 'mywork',
    label: 'ncrm_activity_my_work',
    path: '/activity/mywork',
    license: 'my_work_my_work'
  },
  {
    value: 'activity',
    label: 'ncrm_activity_activity',
    path: '/activity/activity',
    license: 'my_work_activity'
  },
  {
    value: 'comparison',
    label: 'ncrm_activity_comparison',
    path: '/activity/comparison',
    license: 'my_work_comparision'
  }
];

/**
 * Activity menu
 */
export const ORDER_MENU = [
  {
    value: 'slist',
    label: 'Sale Order',
    path: '/sale-order/slist'
  },
  {
    value: 'point',
    label: 'Dashboard',
    path: '/selling/point'
  },
  {
    value: 'selling',
    label: 'Selling',
    path: '/selling/selling'
  }
];

/**
 * Invoice menu
 */
export const INVOICE_MENUS = [
  {
    value: 'title-0',
    label: 'Dashboard',
    path: '/invoice/dashboard'
  },
  {
    value: 'dashboard',
    label: 'Dashboard',
    path: '/invoice/dashboard'
  },
  {
    value: 'title-1',
    label: 'Invoices',
    path: '/invoice/invoice'
  },
  {
    value: 'invoice',
    label: 'Invoices',
    path: '/invoice/invoice'
  },
  {
    value: 'unpaid_invoice',
    label: 'Unpaid Invoices',
    path: '/invoice/unpaid'
  },
  {
    value: 'credit_note',
    label: 'Credit Note',
    path: '/invoice/credit-note'
  },
  {
    value: 'debit_note',
    label: 'Debit Note',
    path: '/invoice/debit-note'
  },
  {
    value: 'payment_received',
    label: 'Payment Received',
    path: '/invoice/payment-received'
  },
  {
    value: 'sales_commission',
    label: 'Sales Commission Expense',
    path: '/invoice/sales-commission'
  },
  {
    value: 'title-2',
    label: 'Purchase Bill',
    path: '/invoice/purchase-bill'
  },
  {
    value: 'purchase_bill',
    label: 'Purchase Bill',
    path: '/invoice/purchase-bill'
  },
  {
    value: 'credit_vendor',
    label: 'Credit Vendor',
    path: '/invoice/credit-vendor'
  },
  {
    value: 'debit_vendor',
    label: 'Debit Vendor',
    path: '/invoice/debit-vendor'
  },
  {
    value: 'payment_made',
    label: 'Payment Made',
    path: '/invoice/payment-made'
  }
];

/**
 * Desk menu
 */
export const DESK_MENUS = [
  {
    value: 'ticket',
    label: 'ncrm_common_desk_menu_ticket',
    path: '/mdesk/ticket',
    license: 'desk_ticket'
  },
  {
    value: 'knowledge',
    label: 'ncrm_common_desk_menu_knowledge',
    path: '/mdesk/knowledge',
    license: 'desk_knowledge_base'
  }
];

/**
 * Inventory menu
 */
export const INVENTORY_MENUS = [
  {
    value: 'warehouse',
    label: 'Warehouse',
    path: '/inventory/warehouse'
  },
  {
    value: 'item',
    label: 'Inventory Items',
    path: '/inventory/item'
  },
  {
    value: 'adjustment',
    label: 'Adjustment',
    path: '/inventory/adjustment'
  },
  {
    value: 'transfer',
    label: 'Transfer Order',
    path: '/inventory/transfer'
  },
  {
    value: 'receipt',
    label: 'Receipt',
    path: '/inventory/receipt'
  },
  {
    value: 'shipment',
    label: 'Shipment',
    path: '/inventory/shipment'
  }
];

export const PURCHASE_MENUS = [
  {
    value: 'pr',
    label: 'Purchase Request',
    path: '/purchase/pr'
  },
  {
    value: 'rfq',
    label: 'Request For Quote',
    path: '/purchase/rfq'
  },
  {
    value: 'rft',
    label: 'Request For Tender',
    path: '/purchase/rft'
  },
  {
    value: 'po',
    label: 'Purchase Order',
    path: '/purchase/po'
  },
  {
    value: 'pa',
    label: 'Purchase Agreement',
    path: '/purchase/pa'
  },
  {
    value: 'pb',
    label: 'Purchase Bill',
    path: '/purchase/pb'
  }
];

/**
 * Sales menu
 */
export const SALES_MENUS = [
  // {
  //   value: 'lead',
  //   label: 'ncrm_common_menu_lead',
  //   path: '/lead'
  // },
  {
    value: 'opportunity',
    label: 'ncrm_common_menu_opportunity',
    path: '/opportunity'
  }
];

export const LEAD_MENUS = [
  {
    value: 'lead',
    label: 'ncrm_common_menu_lead',
    path: '/lead',
    license: 'lead'
  }
];

export const SETTING_ONLINE_DIGITAL_MENUS = [
  {
    value: 'cta',
    label: 'ncrm_generalsetting_call_to_action',
    path: '/settings/digital/cta'
  },
  {
    value: 'landing-page',
    label: 'ncrm_generalsetting_landing_page',
    path: '/settings/digital/landing-page'
  },
  {
    value: 'survey',
    label: 'ncrm_generalsetting_survey',
    path: '/settings/digital/survey'
  },
  {
    value: 'form',
    label: 'ncrm_generalsetting_form',
    path: '/settings/digital/form'
  }
];

export const DIGITAL_SURVEY_MENUS = [
  {
    value: 'survey',
    label: 'Surveys',
    path: '/settings/digital/survey'
  }
];

export const DIGITAL_SATISFACTION_MENUS = [
  {
    value: 'satisfaction',
    label: 'Recent Satisfaction Surveys',
    path: '/settings/digital/satisfaction'
  }
];

export const SETTING_TEMPLATE_MENUS = [
  {
    value: 'knowledgebase',
    label: 'ncrm_setting_template_knowledgebase',
    path: '/settings/template/knowledgebase'
  },
  {
    value: 'email',
    label: 'ncrm_setting_template_email',
    path: '/settings/template/email'
  },
  {
    value: 'sms',
    label: 'ncrm_setting_template_sms',
    path: '/settings/template/sms'
  },
  {
    value: 'task',
    label: 'ncrm_setting_template_task',
    path: '/settings/template/task'
  },
  {
    value: 'call',
    label: 'ncrm_setting_template_call',
    path: '/settings/template/call'
  },
  {
    value: 'quote',
    label: 'ncrm_setting_template_quote',
    path: '/settings/template/quote'
  }
];

/**
 * Product menu
 */
export const PRODUCT_MENUS = [
  {
    value: 'product',
    label: 'ncrm_common_menu_product_product',
    path: '/product/product',
    license: 'product_products'
  },
  {
    value: 'group',
    label: 'ncrm_common_menu_product_product_tree',
    path: '/product/group',
    license: 'product_product_tree'
  },
  {
    value: 'item',
    label: 'ncrm_common_menu_product_item',
    path: '/product/item',
    license: 'product_items'
  },
  // {
  //   value: 'component',
  //   label: 'ncrm_common_menu_product_component',
  //   path: '/product/component',
  // },
  {
    value: 'unit',
    label: 'ncrm_common_menu_product_unit',
    path: '/product/unit',
    license: 'product_units'
  }
];

export const ORDER_MENUS = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    path: '/order/dashboard'
  },
  {
    value: 'process',
    label: 'Order Process',
    path: '/order/process'
  },
  {
    value: 'sales',
    label: 'Sales Order',
    path: '/order/sales'
  },
  {
    value: 'return',
    label: 'Sales Return',
    path: '/order/return'
  },
  {
    value: 'replacement',
    label: 'Replacement Order',
    path: '/order/replacement'
  },
  {
    value: 'point',
    label: 'Point Of Sale',
    path: '/order/point'
  },
  {
    value: 'report',
    label: 'Sales Report',
    path: '/order/report'
  }
];

export const SITE_MENUS = [
  {
    value: 'desk',
    label: 'Desk',
    path: '/setting/site/desk'
  }
];

export const SETTING_ASSIGNMENT_RULE = [
  {
    value: 'assignment_rule',
    label: 'Assignment Rule',
    path: '/settings/assignment/rule'
  },
  {
    value: 'assignment_report',
    label: 'Run Report',
    path: '/settings/assignment/report'
  }
];

export const SETTING_SITE_TEMPLATE_MENUS = [
  {
    value: 'desk',
    label: 'Desk',
    path: '/settings/site/desk'
  }
];

export const ANALYTIC_MENU = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    path: '/analytic/dashboard',
    license: 'dashboard_dashboard'
  },
  {
    value: 'report',
    label: 'Report',
    path: '/analytic/report',
    license: 'dashboard_report'
  },
  {
    value: 'sus-log',
    label: 'Simple URL Log',
    path: '/analytic/sus-log',
    license: 'dashboard_sus'
  }
];

export const PROCESS_MENU = [
  {
    value: 'business',
    label: 'ncrm_common_admin_menu_business_process',
    path: '/process/business',
    license: 'settings_rtp_business_process'
  },
  {
    value: 'automation_rule',
    label: 'ncrm_common_admin_menu_auto_rule',
    path: '/process/automation',
    license: 'settings_rtp_automation_rule'
  },
  {
    value: 'setting',
    label: 'ncrm_common_admin_menu_step_trigger_attribute',
    path: '/process/setting',
    license: 'settings_rtp_step_trigger_attribute'
  }
];

export const ADMINISTRATION_MENU = [
  {
    value: 'general',
    label: 'General Setting',
    path: '/settings/general'
  },
  {
    value: 'preferences',
    label: 'Preferences Setting',
    path: '/settings/preferences'
  }
];

export const PROJECT_MENU = [
  {
    value: 'project',
    label: 'ncrm_project_project',
    path: '/project/project',
    license: 'project_project'
  },
  {
    value: 'planning',
    label: 'ncrm_project_planning',
    path: '/project/planning',
    license: 'project_planning'
  },
  {
    value: 'task',
    label: 'ncrm_project_dev_task',
    path: '/project/task',
    license: 'project_dev_task'
  },
  {
    value: 'estimate',
    label: 'ncrm_project_estimate',
    path: '/project/estimate',
    license: 'project_estimate'
  }
];

// export const QUOTE_GROUP_MENUS = [
//   {
//     value: 'opportunity',
//     label: 'Opportunity',
//     path: '/opportunity/opportunity',
//     license: 'opportunity_opportunity'
//   },
//   {
//     value: 'quote',
//     label: 'Quote',
//     path: '/opportunity/quote',
//     license: 'opportunity_quote'
//   },
//   {
//     value: 'competitor',
//     label: 'Competitor',
//     path: '/opportunity/competitor',
//     license: 'opportunity_competitor'
//   }
// ];

export const PROJECT_TEMPLATE_MENU = [
  {
    value: 'task_group',
    label: 'Dev Task Group',
    path: '/project/template/group'
  },
  {
    value: 'task',
    label: 'Dev Task',
    path: '/project/template/task'
  }
];

/**
 * campaign menu
 */
export const CAMPAIGN_ROUTE_MENUS = [
  {
    value: CAMPAIGN_CATEGORY_ALL,
    label: 'All Campaigns',
    path: '/campaign/all',
    license: 'campaign_all_campaigns'
  },
  {
    value: CAMPAIGN_CATEGORY_EMAIL,
    label: 'Email Campaigns',
    path: '/campaign/email',
    license: 'campaign_email_campaigns'
  },
  {
    value: CAMPAIGN_CATEGORY_SMS,
    label: 'SMS Campaigns',
    path: '/campaign/sms',
    license: 'campaign_sms_campaigns'
  }
];

export const OPPORTUNITY_MENUS = [
  {
    value: 'opportunity',
    label: 'ncrm_common_menu_opportunity',
    license: 'opportunity_opportunity',
    path: '/opportunity/opportunity'
  },
  {
    value: 'quote',
    label: 'ncrm_common_menu_opportunity_quote',
    license: 'opportunity_quote',
    path: '/opportunity/quote'
  },
  {
    value: 'competitor',
    label: 'ncrm_common_menu_opportunity_competitor',
    path: '/opportunity/competitor',
    license: 'opportunity_competitor'
  }
];
