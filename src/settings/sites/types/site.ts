import { User } from '@base/types/user';

export interface MenuSite {
  id: string;
  properties?: string;
  createdAt?: any;
  createdBy?: User;

  name?: string;
  title?: string;
  html?: string;
  group?: SiteGroup;
  thumbnail?: string;
}

export enum SiteGroup {
  DESK = 'SITE_GROUP_DESK'
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

interface Select {
  id: string;
  value: string;
  label: string;
  name: string;
}

export interface EmailTemplate {
  id: string;
  name?: string;

  title?: string;
  type: string;
  language: string;
  products: Select[];
  description: string;
  assignTo: Select[];
  stage: string;
}

export interface TplPropertyRelatedItem {
  enable: boolean;
  inputType: string;
  label: string;
  layouts: string[];
  name: string;
  row: boolean;
  type: string;
  withCondition: string;
  placeholder: string;
  defaultValue: string;
}

export interface TplPropertyAlias {
  enable: boolean;
  inputType: string;
  label: string;
  layouts: string[];
  name: string;
  row: boolean;
  type: string;
  withCondition: string;
  placeholder: string;
  defaultValue: string;
}

export interface TplPropertyField {
  enable: boolean;
  inputType: string;
  label: string;
  layouts: string[];
  name: string;
  row: boolean;
  type: string;
  withCondition: string;
  placeholder: string;
  defaultValue: string;
  relatedItems: TplPropertyRelatedItem[];
  alias: TplPropertyAlias[];
}

export interface TplProperty {
  name: string;
  fields: TplPropertyField[];
}

export interface TplTab {
  enable: boolean;
  icon: string;
  layout: string;
  name: string;
  title: string;
  withCondition: string;
}

export interface TemplateDetail {
  html: string;
  options: string;
  results: TplProperty[];
  tabs: TplTab[];
}

export interface IPreviewTemplateDetail {
  html: string;
  options: any;
}
export interface SiteConfig {
  [key: string]: Site;
}
export interface Site {
  path: string;
  label: string;
  group: string;
  title: string;
  menu: string;
  configView: any;
  groupByOptions: any;
  dateByOptions: any;
  filterByOptions: any;
  parseFieldsList: any;
}
