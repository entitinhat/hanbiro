import { IdName } from '@base/types/common';
import { DeskAssignType } from './assignment';
import { ChannelType } from './common';

export interface DeskChannelType {
  keyName: ChannelType;
  languageKey: string;
}

export const ListType: any = {
  [ChannelType.LANDING_PAGE]: {
    keyName: ChannelType.LANDING_PAGE,
    languageKey: 'options_items__ctype_landing_page' // Landing Page
  },
  [ChannelType.EMAIL]: {
    keyName: ChannelType.EMAIL,
    languageKey: 'options_items__ctype_email' // Email
  },
  [ChannelType.DIRECT_INPUT]: {
    keyName: ChannelType.DIRECT_INPUT,
    languageKey: 'options_items__ctype_direct_input' // Direct Input
  },
  [ChannelType.WEBHOOK]: {
    keyName: ChannelType.WEBHOOK,
    languageKey: 'options_items__ctype_webhook' // Webhook
  }
};

export interface DeskChannel {
  id: string;
  // type: ChannelType;
  type: DeskChannelType;
  name: string;
  description: string;
  useAssign?: boolean;
  assignType?: DeskAssignType;
  realUrl?: string;
  shortUrl?: string;
  email?: string;
  landingpage?: IdName;
  assignedGroups?: IdName[];
  assignedUsers?: IdName[];
  active: boolean;
  createdAt?: any; // Create Date
}
