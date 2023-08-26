import { User } from '@base/types/user';

export enum SiteGroup {
  DESK = 'SITE_GROUP_DESK',
  SALES = 'SITE_GROUP_SALES',
  MARKETING = 'SITE_GROUP_MARKETING'
}

export interface SiteTemplate {
  id: string;
  name?: string;
  properties?: string;
  siteGroup?: SiteGroup;
  description?: string;
  isDefault?: boolean;
  thumbnail?: string;
  createdAt?: any;
  createdBy?: User;
}
