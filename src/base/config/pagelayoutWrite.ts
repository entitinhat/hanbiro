import * as menuKeys from './menus';
// import { BasicConfig } from '@base/config/write-field';
import AccountConfig from '@customer/config/write-field/account';
import ContactConfig from '@customer/config/write-field/contact';
import ActivityConfig from '@activity/config/write-field';
// import { SequenceWriteField } from '@activity/config/write-field/sequence';
import TicketConfig from '@desk/ticket/config/write-field';
import KnowledgeBaseConfig from '@desk/knowledge-base/config/write-field';
import AnalyticReportConfig from '@analytic/report/config/write-field';
// import LandingPageConfig from '@settings/online-digital-content/landing-page/config/write-field';
import MarketingCtaConfig from '@settings/digital/cta/config/write-field';
import SurveyConfig from '@settings/digital/survey/config/write-field';
import SatisfactionConfig from '@settings/digital/satisfaction/config/write-field';
// import TicketFormConfig from '@settings/online-digital-content/ticket-form/config/write-field';
// import AnalyticReportConfig from '@dashboard/report/configs/write-field';
import QuoteConfig from '@quote/config/write-field';
import UnitConfig from '@product/unit/config/write-field';
// import SatisfactionSurveyConfig from '@settings/online-digital-content/satisfaction-survey/config/write-field';
import TicketFormConfig from '@settings/digital/ticket-form/config/write-field';
// import AnalyticReportConfig from '@dashboard/report/configs/write-field';
import ProductConfig from '@product/product/config/write-field';
import ItemConfig from '@product/item/config/write-field';
import LandingConfig from '@settings/digital/landing-page/config/write-field';
import CampaignConfig from '@campaign/config/write-field';
import LeadConfig from '@lead/config/write-field';
import MarketingListConfig from '@marketing-list/config/write-field';
import CompetitorConfig from '@competitor/config/write-field';
import OpportunityConfig from '@opportunity/config/write-field';
import AssignmentConfig from '@settings/assignment-rule/rule/config/write-field';
import IdentifyContactConfig from '@opportunity/containers/WriteIdentifyContact/config/write-field';

export const ModuleConfig: any = {
  [menuKeys.MENU_CUSTOMER_ACCOUNT]: AccountConfig,
  [menuKeys.MENU_CUSTOMER_CONTACT]: ContactConfig,
  //[menuKeys.MENU_ACTIVITY]: ActivityConfig
  [menuKeys.MENU_ACTIVITY_TASK]: ActivityConfig,
  // [menuKeys.MENU_ACTIVITY_TASK_SEQUENCE]: SequenceWriteField,
  [menuKeys.MENU_ACTIVITY_CALL]: ActivityConfig,
  [menuKeys.MENU_ACTIVITY_EMAIL]: ActivityConfig,
  [menuKeys.MENU_ACTIVITY_SMS]: ActivityConfig,
  [menuKeys.MENU_DESK_TICKET]: TicketConfig,
  [menuKeys.MENU_DESK_KNOWLEDGE]: KnowledgeBaseConfig,
  [menuKeys.MENU_SETTING_CTA]: MarketingCtaConfig,
  [menuKeys.MENU_SETTING_SURVEY]: SurveyConfig,
  [menuKeys.MENU_SETTING_SATISFACTION_SURVEY]: SatisfactionConfig,
  // [menuKeys.MENU_SETTING_SATISFACTION_SURVEY]: SatisfactionSurveyConfig,
  [menuKeys.MENU_SETTING_TICKET_FORM]: TicketFormConfig,
  [menuKeys.MENU_ANALYTIC_REPORT]: AnalyticReportConfig,
  [menuKeys.MENU_SETTING_ASSIGNMENT_RULE]: AssignmentConfig,
  [menuKeys.MENU_PRODUCT_PRODUCT]: ProductConfig,
  [menuKeys.MENU_PRODUCT_ITEM]: ItemConfig,
  [menuKeys.MENU_SALES_QUOTE]: QuoteConfig,
  [menuKeys.MENU_PRODUCT_UNIT]: UnitConfig,
  [menuKeys.MENU_SETTING_LANDINGPAGE]: LandingConfig,
  [menuKeys.MENU_CAMPAIGN_EMAIL]: CampaignConfig,
  [menuKeys.MENU_CAMPAIGN_SMS]: CampaignConfig,
  [menuKeys.MENU_SALES_LEAD]: LeadConfig,
  [menuKeys.MENU_CUSTOMER_MARKETING_LIST]: MarketingListConfig,
  [menuKeys.MENU_OPPORTUNITY_COMPETITOR]: CompetitorConfig,
  [menuKeys.MENU_OPPORTUNITY_OPPORTUNITY]: OpportunityConfig,
  [menuKeys.MENU_OPPORTUNITY_IDENTIFY_CONTACT]: IdentifyContactConfig
};

export const getConfigForMenu = (menu = '') => {
  return {
    // ...BasicConfig,
    //...CommonConfig,
    ...(ModuleConfig?.[menu] || {})
  };
};

const getAllConfig = () => {
  let all: any = {
    // ...BasicConfig,
    //...CommonConfig,
  };
  const allConfig = Object.keys(ModuleConfig).reduce((oldValue, menu) => {
    all = {
      ...all,
      ...ModuleConfig[menu]
    };
    return {
      ...oldValue,
      [menu]: getConfigForMenu(menu)
    };
  }, {});

  return {
    all: all,
    ...allConfig
  };
};

export const pagelayoutWriteConfig = getAllConfig();

export const TOOLTIP_TYPE_ICON = '1';
export const TOOLTIP_TYPE_TEXT = '2';

export const CUSTOM_LAYOUT_TYPES = [
  {
    value: 'horizontal',
    type: 'horizontal',
    label: 'Horizontal',
    icon: 'MoreHorizontal'
  },
  {
    value: 'vertical',
    type: 'vertical',
    label: 'Vertical',
    icon: 'MoreVertical'
  }
];
