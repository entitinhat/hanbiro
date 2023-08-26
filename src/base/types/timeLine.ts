import { Menu, MenuSection, MenuTab } from './menu';
import { User } from './user';

export interface TimelineContent {
  field: string;
  value: string;
  // lang: string;
}

export interface Timeline {
  id?: string;
  menu: Menu;
  tab: MenuTab;
  section: MenuSection;
  sectionId: string;
  sourceId: string;
  action: string;
  timezone: string;
  remoteIp: string;
  userAgent: string;
  content: TimelineContent[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: User;
  updatedBy?: User;
}
