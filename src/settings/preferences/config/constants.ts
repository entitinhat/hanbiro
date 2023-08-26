import { NavItemType } from '@base/types/menu';
import { ChannelType, DeskAssignType, OperationalHours } from '../types/desk/common';

export const SLA_LANGS: any = {
  SLA_PREMIUM: 'ncrm_preferences_desk_premium_sla',
  SLA_STANDARD: 'ncrm_preferences_desk_standard_sla'
};

export const OPERATIONAL_HOURS_OPTIONS = [
  { value: OperationalHours.BUSINESS_HOURS, label: 'Business Hours' },
  { value: OperationalHours.CALENDAR_HOURS, label: 'Calendar Hours' }
];

export const DURATION_OPTIONS = [
  { value: 'UNIT_MINUTE', label: 'ncrm_generalsetting_preferences_desk_duration_mins' },
  { value: 'UNIT_HOUR', label: 'ncrm_generalsetting_preferences_desk_duration_hrs' },
  { value: 'UNIT_DAY', label: 'ncrm_generalsetting_preferences_desk_duration_days' },
  { value: 'UNIT_WEEK', label: 'ncrm_generalsetting_preferences_desk_duration_weeks' },
  { value: 'UNIT_MONTH', label: 'ncrm_generalsetting_preferences_desk_duration_months' }
];

export const CTYPE_OPTIONS = [
  { value: ChannelType.DIRECT_INPUT, label: 'Direct Input' },
  { value: ChannelType.EMAIL, label: 'Email' },
  { value: ChannelType.LANDING_PAGE, label: 'Landing Page' },
  { value: ChannelType.WEBHOOK, label: 'Webhook' }
];

export const ATYPE_OPTIONS = [
  { value: DeskAssignType.USER, label: 'User' },
  { value: DeskAssignType.GROUP, label: 'Group' }
];

export const PRIORITY_LANGS: any = {
  PRIORITY_URGENT: 'ncrm_common_urgent',
  PRIORITY_HIGH: 'ncrm_common_high',
  PRIORITY_MEDIUM: 'ncrm_common_medium',
  PRIORITY_LOW: 'ncrm_common_low'
};

export const PREFERENCES_MENUS: NavItemType[] = [
  {
    id: 'Preferences',
    title: 'Preferences Menu',
    type: 'group',
    children: [
      {
        id: 'Preferences-desk-page',
        title: 'ncrm_generalsetting_preferences_desk',
        license: 'admin_settings_preferences_desk',
        type: 'item',
        url: '/settings/preferences/desk',
        icon: {
          icon: 'desk',
          iconType: 'main',
          color: '#ffb866'
        }
      },
      {
        id: 'Preferences-activity-page',
        title: 'ncrm_generalsetting_preferences_activity',
        license: 'admin_settings_preferences_activity',
        type: 'item',
        url: '/settings/preferences/activity',
        icon: {
          icon: 'activity',
          iconType: 'main',
          color: '#e69395'
        }
      },
      {
        id: 'Preferences-customer-page',
        title: 'ncrm_generalsetting_preferences_customer',
        license: 'admin_settings_preferences_customer',
        type: 'item',
        url: '/settings/preferences/customer',
        icon: {
          icon: 'customer',
          iconType: 'main',
          color: '#93bbe7'
        }
      },
      {
        id: 'Preferences-product-page',
        title: 'ncrm_generalsetting_preferences_product',
        license: 'admin_settings_preferences_product',
        type: 'item',
        url: '/settings/preferences/product',
        icon: {
          icon: 'product',
          iconType: 'main',
          color: '#bcdc97'
        }
      },
      {
        id: 'Preferences-project-page',
        title: 'ncrm_generalsetting_preferences_project',
        license: 'admin_settings_preferences_project',
        type: 'item',
        url: '/settings/preferences/project',
        icon: {
          icon: 'manage_process',
          iconType: 'main',
          color: '#4cdc97'
        }
      },
      {
        id: 'preferences-quote-page',
        title: 'ncrm_generalsetting_preferences_quote',
        license: 'admin_settings_preferences_quote',
        type: 'item',
        url: '/settings/preferences/quote',
        icon: {
          icon: 'quotes',
          iconType: 'main',
          color: '#fa8c16'
        }
      },
      {
        id: 'preferences-lead-page',
        title: 'ncrm_common_menu_sales',
        license: 'admin_settings_preferences_sales',
        type: 'item',
        url: '/settings/preferences/sales',
        icon: {
          icon: 'sales',
          iconType: 'main',
          color: '#e69395'
        }
      },
      {
        id: 'preferences-marketing-page',
        title: 'Marketing',
        license: 'admin_settings_preferences_marketing',
        type: 'item',
        url: '/settings/preferences/marketing',
        icon: {
          icon: 'marketing',
          iconType: 'main',
          color: '#e69395'
        }
      }
    ]
  }
];
