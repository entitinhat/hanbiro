import {
  MENU_ACTIVITY,
  MENU_CAMPAIGN,
  MENU_CUSTOMER,
  MENU_DASHBOARD,
  MENU_DESK,
  MENU_LEAD,
  MENU_MYWORK,
  MENU_OPPORTUNITY,
  MENU_PRODUCT,
  MENU_PROJECT
} from '@base/config/menus';
import {
  ACTIVITY_MENU,
  ANALYTIC_MENU,
  CAMPAIGN_ROUTE_MENUS,
  CUSTOMER_MENUS,
  DESK_MENUS,
  LEAD_MENUS,
  PRODUCT_MENUS,
  PROJECT_MENU,
  OPPORTUNITY_MENUS
} from '@base/config/routeMenus';
import { NavItemType } from '@base/types/menu';
import { GENERAL_MENUS } from '@settings/general/config/constants';
import { PREFERENCES_MENUS } from '@settings/preferences/config/constants';
import { TEMPLATE_MENU } from '@settings/template/pages/contants';

import { DIGITAL_MENUS } from '@settings/digital/main/contants';
import { USERS_GROUPS_MENU } from '@settings/users-groups/config/subMenus';
import { SITE_MENU } from '@settings/sites/main/pages/contants';

const MAIN_MENU_DASHBOARD = 'dashboard';
const MAIN_MENU_PROJECT = 'project';
const MAIN_MENU_MY_WORK = 'my_work';
const MAIN_MENU_DESK = 'desk';
const MAIN_MENU_CAMPAIGN = 'campaign';
const MAIN_MENU_CUSTOMER = 'customer';
const MAIN_MENU_PRODUCT = 'product';
const MAIN_MENU_LEAD = 'lead';
const MAIN_MENU_OPPORTUNITY = 'opportunity';

const SETTING_MENU_ADMINISTRATOR_SETTINGS = 'admin_settings';
const SETTING_MENU_RULES_TOOLS_PROCESS = 'settings_rtp';

export const SUB_SETTING_MENU_GENERAL = 'admin_settings_general';
const SUB_SETTING_MENU_GENERAL_FORMAT = 'admin_settings_general_format';
const SUB_SETTING_MENU_GENERAL_SELECTION_FIELDS = 'admin_settings_general_selections_fields';
const SUB_SETTING_MENU_GENERAL_SELECTION_PERSONALIZE = 'admin_settings_general_personalize';
const SUB_SETTING_MENU_GENERAL_SELECTION_SUS = 'admin_settings_general_sus';

export const SUB_SETTING_MENU_PREFERENCES = 'admin_settings_preferences';
const SUB_SETTING_MENU_PREFERENCES_DESK = 'admin_settings_preferences_desk';
const SUB_SETTING_MENU_PREFERENCES_ACTIVITY = 'admin_settings_preferences_activity';
const SUB_SETTING_MENU_PREFERENCES_CUSTOMER = 'admin_settings_preferences_customer';
const SUB_SETTING_MENU_PREFERENCES_PRODUCT = 'admin_settings_preferences_product';
const SUB_SETTING_MENU_PREFERENCES_PROJECT = 'admin_settings_preferences_project';
const SUB_SETTING_MENU_PREFERENCES_QUOTE = 'admin_settings_preferences_quote';
const SUB_SETTING_MENU_PREFERENCES_SALES = 'admin_settings_preferences_sales';
const SUB_SETTING_MENU_PREFERENCES_MARKETING = 'admin_settings_preferences_marketing';

export const SUB_SETTING_MENU_TEMPLATE = 'admin_settings_template';
const SUB_SETTING_MENU_TEMPLATE_EMAIL = 'admin_settings_template_email';
const SUB_SETTING_MENU_TEMPLATE_SMS = 'admin_settings_template_sms';
const SUB_SETTING_MENU_TEMPLATE_TASK = 'admin_settings_template_task';
const SUB_SETTING_MENU_TEMPLATE_CALL = 'admin_settings_template_call';
const SUB_SETTING_MENU_TEMPLATE_KB = 'admin_settings_template_kb';
const SUB_SETTING_MENU_TEMPLATE_QUOTE = 'admin_settings_template_quote';
const SUB_SETTING_MENU_TEMPLATE_DEV_TASK_GROUP = 'admin_settings_template_dev_task_group';
const SUB_SETTING_MENU_TEMPLATE_DEV_TASK = 'admin_settings_template_dev_task';

export const SUB_SETTING_MENU_PAGELAYOUT = 'admin_settings_pagelayout';

export const SUB_SETTING_MENU_SITES = 'admin_settings_sites';
const SUB_SETTING_MENU_SITES_DESK = 'admin_settings_sites_desk';

export const SUB_SETTING_MENU_DIGITAL = 'admin_settings_digital';
const SUB_SETTING_MENU_DIGITAL_CTA = 'admin_settings_digital_cta';
const SUB_SETTING_MENU_DIGITAL_LANDING_PAGE = 'admin_settings_digital_landing_page';
const SUB_SETTING_MENU_DIGITAL_LANDING_SURVEY = 'admin_settings_digital_survey';
const SUB_SETTING_MENU_DIGITAL_LANDING_FORM = 'admin_settings_digital_form';

export const SUB_SETTING_MENU_BILL_LICENSE = 'admin_settings_bill_license';
const SUB_SETTING_MENU_BILL_LICENSE_BILLING_INFO = 'admin_settings_bill_license_billing_info';
const SUB_SETTING_MENU_BILL_LICENSE_LICENSES = 'admin_settings_bill_license_licenses';
const SUB_SETTING_MENU_BILL_LICENSE_BILL_PAYMENT = 'admin_settings_bill_license_bill_payment';
const SUB_SETTING_MENU_BILL_LICENSE_BILL_HISTORY = 'admin_settings_bill_license_history';
const SUB_SETTING_MENU_BILL_LICENSE_BILL_PRODUCTS = 'admin_settings_bill_license_products';
const SUB_SETTING_MENU_BILL_LICENSE_BILL_PRODUCT_URLS = 'admin_settings_bill_license_product_urls';

export const SUB_SETTING_MENU_USERS_GROUPS = 'admin_settings_users_groups';

export const SUB_SETTING_MENU_USERS_MANAGE_ACCESS = 'admin_settings_manage_access';

const SUB_SETTING_MENU_RTP_ASSIGNMENT_RULE = 'settings_rtp_assignment_rule';
const SUB_SETTING_MENU_RTP_BUSINESS_PROCESS = 'settings_rtp_business_process';
const SUB_SETTING_MENU_RTP_AUTOMATION_RULE = 'settings_rtp_automation_rule';
const SUB_SETTING_MENU_RTP_TRIGGER_ATRIBUTE = 'settings_rtp_step_trigger_attribute';

export const MAIN_MENU: string[] = [
  MAIN_MENU_DASHBOARD,
  MAIN_MENU_PROJECT,
  MAIN_MENU_MY_WORK,
  MAIN_MENU_DESK,
  MAIN_MENU_CAMPAIGN,
  MAIN_MENU_CUSTOMER,
  MAIN_MENU_PRODUCT,
  MAIN_MENU_LEAD,
  MAIN_MENU_OPPORTUNITY
];
export const SETTING_MENU: string[] = [SETTING_MENU_ADMINISTRATOR_SETTINGS, SETTING_MENU_RULES_TOOLS_PROCESS];
interface ROUTE_MENU_BY_KEY {
  [key: string]: {
    value: string;
    label: string;
    path: string;
    license: string;
  }[];
}
export const ALL_ROUTE_MENUS: ROUTE_MENU_BY_KEY = {
  [MAIN_MENU_DASHBOARD]: ANALYTIC_MENU,
  [MAIN_MENU_PROJECT]: PROJECT_MENU,
  [MAIN_MENU_MY_WORK]: ACTIVITY_MENU,
  [MAIN_MENU_DESK]: DESK_MENUS,
  [MAIN_MENU_CAMPAIGN]: CAMPAIGN_ROUTE_MENUS,
  [MAIN_MENU_CUSTOMER]: CUSTOMER_MENUS,
  [MAIN_MENU_PRODUCT]: PRODUCT_MENUS,
  [MAIN_MENU_LEAD]: LEAD_MENUS,
  [MAIN_MENU_OPPORTUNITY]: OPPORTUNITY_MENUS
};
interface SETTING_ROUTE_MENU_BY_KEY {
  [key: string]: NavItemType[];
}
export const ALL_SETTING_ROUTE_MENUS: SETTING_ROUTE_MENU_BY_KEY = {
  [SUB_SETTING_MENU_TEMPLATE]: TEMPLATE_MENU,
  [SUB_SETTING_MENU_GENERAL]: GENERAL_MENUS,
  [SUB_SETTING_MENU_PREFERENCES]: PREFERENCES_MENUS,
  [SUB_SETTING_MENU_PAGELAYOUT]: [],
  [SUB_SETTING_MENU_SITES]: SITE_MENU,
  [SUB_SETTING_MENU_DIGITAL]: DIGITAL_MENUS,
  [SUB_SETTING_MENU_BILL_LICENSE]: [],
  [SUB_SETTING_MENU_USERS_GROUPS]: USERS_GROUPS_MENU,
  [SUB_SETTING_MENU_USERS_MANAGE_ACCESS]: []
};

interface LICENSE_BY_MENU {
  [x: string]: string;
}
export const ALL_LICENSE_KEY_BY_MENU: LICENSE_BY_MENU = {
  [MENU_DASHBOARD]: MAIN_MENU_DASHBOARD,
  [MENU_PROJECT]: MAIN_MENU_PROJECT,
  [MENU_ACTIVITY]: MAIN_MENU_MY_WORK,
  [MENU_DESK]: MAIN_MENU_DESK,
  [MENU_CAMPAIGN]: MAIN_MENU_CAMPAIGN,
  [MENU_CUSTOMER]: MAIN_MENU_CUSTOMER,
  [MENU_PRODUCT]: MAIN_MENU_PRODUCT,
  [MENU_LEAD]: MAIN_MENU_LEAD,
  [MENU_OPPORTUNITY]: MAIN_MENU_OPPORTUNITY
};
