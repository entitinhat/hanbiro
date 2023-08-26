import { ReactNode } from 'react';

import { ChipProps } from '@mui/material';

import { IconType } from './app';

export type Menu =
  | 'MENU_CUSTOMER'
  | 'MENU_ACCOUNT'
  | 'MENU_CONTACT'
  | 'MENU_PRODUCT'
  | 'MENU_ACTIVITY'
  | 'MENU_DESK'
  | 'MENU_PROCESS'
  | 'MENU_SETTING'
  | 'MENU_DASHBOARD'
  | 'MENU_QUOTE'
  | 'MENU_PROJECT';

export type MenuTab =
  | 'TAB_SELF'
  | 'TAB_PROCESS_STEP'
  | 'TAB_PROCESS_STATUS'
  | 'TAB_PROCESS_STAGE'
  | 'TAB_PROCESS_CUSTOM_ACTION'
  | 'TAB_PRODUCT_ITEM '
  | 'TAB_PRODUCT_AGREEMENT '
  | 'TAB_PRODUCT_ATTRIBUTE '
  | 'TAB_PRODUCT_DISCOUNT '
  | 'TAB_PRODUCT_UNIT '
  | 'TAB_PRODUCT_PRICELIST '
  | 'TAB_PRODUCT_COMPONENT '
  | 'TAB_DESK_TICKET '
  | 'TAB_DESK_KB '
  | 'TAB_SETTING_COUNTRY '
  | 'TAB_SETTING_CURRENCY '
  | 'TAB_SETTING_TEMPLATE '
  | 'TAB_SETTING_GROUP '
  | 'TAB_SETTING_LICENSE '
  | 'TAB_SETTING_LANGUAGE '
  | 'TAB_SETTING_MENU_SETTING '
  | 'TAB_SETTING_PAGELAYOUT '
  | 'TAB_SETTING_ROLE '
  | 'TAB_SETTING_SELECTION '
  | 'TAB_SETTING_SYSTEM_LANGUAGE '
  | 'TAB_SETTING_USER_SETTING '
  | 'TAB_SETTING_PAYMENT '
  | 'TAB_SETTING_MENU_TEMPLATE '
  | 'TAB_SETTING_ASSIGNMENT_RULE '
  | 'TAB_SETTING_SITE '
  | 'TAB_SETTING_SURVEY '
  | 'TAB_SETTING_CTA '
  | 'TAB_SETTING_LANDINGPAGE '
  | 'TAB_DESK_TICKET_CATEGORY '
  | 'TAB_DESK_TICKET_CLASSIFICATION '
  | 'TAB_DESK_ASSIGNMENT_GROUP '
  | 'TAB_DESK_CHANNEL '
  | 'TAB_SETTING_TICKET_FORM '
  | 'TAB_SETTING_SURVEY_ANSWER '
  | 'TAB_DESK_ASSIGNMENT_USER '
  | 'TAB_DESK_KB_CATEGORY '
  | 'TAB_SETTING_ASSIGNMENT_RULE_ENTRY '
  | 'TAB_SETTING_ASSIGNMENT_RULE_ASSIGN_TO '
  | 'TAB_SETTING_PAGELAYOUT_DATA '
  | 'TAB_PROJECT_TASK '
  | 'TAB_PROJECT_COMMENT '
  | 'TAB_PROJECT_SETTING ';

export type MenuSection =
  | 'SECTION_ATTACHMENT'
  | 'SECTION_TAG'
  | 'SECTION_PROCESS'
  | 'SECTION_PROCESS_HISTORY'
  | 'SECTION_FIELD'
  | 'SECTION_ASSIGNTO'
  | 'SECTION_ASSIGNTO_LOG'
  | 'SECTION_CUSTOMER'
  | 'SECTION_ACCOUNT'
  | 'SECTION_CONTACT '
  | 'SECTION_EMPLOYEE'
  | 'SECTION_PRODUCT '
  | 'SECTION_PRODUCT_ITEM '
  | 'SECTION_ACTIVITY_KNOWLEDGE '
  | 'SECTION_ACTIVITY_RELATEDTO '
  | 'SECTION_ACTIVITY_CHECKLIST '
  | 'SECTION_ACTIVITY_SEQUENCE '
  | 'SECTION_NOTE '
  | 'SECTION_CUSTOMER_STATE_LOG '
  | 'SECTION_CUSTOMER_ACCOUNT_FIELD '
  | 'SECTION_CUSTOMER_CONTACT_FIELD '
  | 'SECTION_CUSTOMER_EMPLOYEE_FIELD '
  | 'SECTION_PRODUCT_DISCOUNT_HOLD '
  | 'SECTION_PRODUCT_ITEM_UNIT '
  | 'SECTION_PRODUCT_UNIT_VALUE '
  | 'SECTION_PRODUCT_ITEM_UNIT_INVENTORY '
  | 'SECTION_PRODUCT_DISCOUNT_VOL '
  | 'SECTION_PRODUCT_DISCOUNT_VOL_QTY '
  | 'SECTION_PRODUCT_BOM '
  | 'SECTION_SETTING_PAGELAYOUT_FIELD '
  | 'SECTION_SETTING_PAGELAYOUT_TEMPLATE '
  | 'SECTION_TICKET_ASSIGNED_USER '
  | 'SECTION_TICKET_CC_USER '
  | 'SECTION_TICKET_TAG '
  | 'SECTION_TICKET_CUSTOMER '
  | 'SECTION_TICKET_PRODUCT '
  | 'SECTION_TICKET_KB '
  | 'SECTION_DESK_ASSIGNMENT_REP '
  | 'SECTION_DESK_TICKET_CATEGORY_RULE '
  | 'SECTION_TICKET_CONTENT '
  | 'SECTION_SETTING_PAGELAYOUT_FIELD_DATA '
  | 'SECTION_QUOTE_SECTION '
  | 'SECTION_QUOTE_SECTION_ITEM '
  | 'SECTION_QUOTE_SECTION_ITEM_DATA ';

export type NavItemType = {
  children?: NavItemType[];
  chip?: ChipProps;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  icon?: {
    icon: string;
    iconType: IconType;
    color?: string;
    fontSize?: 'small' | 'inherit' | 'large' | 'medium';
  };
  id: string;
  target?: boolean;
  title: ReactNode | string;
  type?: string;
  url?: string;
  /**This is license key for menu. To check license of menu is available with data from server */
  license?: string;
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type MenuProps = {
  openItem: string[];
  openComponent: string;
  drawerOpen: boolean;
  componentDrawerOpen: boolean;
};
