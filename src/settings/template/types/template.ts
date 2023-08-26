import { TaskChecklist } from '@activity/types/task';
import { LabelValue } from '@base/types/app';
import { FieldConfig } from '@base/types/pagelayout';
import { User } from '@base/types/user';

export interface MenuTemplate {
  id: string;
  templateName?: string;
  properties?: string;
  templateGroup?: string;
  templateThumbnail?: string;
  createdAt?: any;
  createdBy?: User;

  name?: string;
  title?: string;
  html?: string;
  group?: string;
  thumbnail?: string;
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
export interface TemplateConfig {
  [key: string]: Template;
}

export type TemplateGroup = 'sms' | 'task' | 'knowledgebase' | 'call' | 'email' | 'quote';
export interface Template {
  /**path for url  */
  path: TemplateGroup;
  /**label for toolbar  */
  label: string;
  /** This is key for requesting API for list page data (group=3-SMS, group=2-Email, group=5-Call, group=4-Task, group=1-KB) */
  group: string;
  /** This is queryKey for requset api */
  menu: string;
  /** This is title for WritePage model */
  title: string;
  /**Group is options for filter List Page */
  groupByOptions: LabelValue[];
  /**Date is options for filter List Page */
  dateByOptions: LabelValue[];
  /**Filter is options for filter List Page */
  filterByOptions: any[];
  /**Config for left and center section in View Page */
  configView: FieldConfig;
  /**Filds not load in View Page */
  ignoreFields: string[];
  /**
   * Using this helper to get fields in List
   * @param t : is translate from i18
   * */
  parseFieldsList: (layoutList: any, menuApi: string,t?:any) => {};
  /**Using this helper to get fields in View */
  parseFieldsView: (layoutList: any, menuApi: string) => {};
}

export interface LabelData extends LabelValue {
  name: string;
  id: string;
  languageKey?:string
}

export interface TaskSequence extends TaskChecklist {
  [x: string]: any;
}

export interface MainTemplate {
  id?: string;
  name?: string;
  group: string;
  title?: string;
  type: string;
  subType?: string;
  language: string;
  products: Select[];
  description: string;
  // assignTo: Select[];
  stage: string;
  html: string;
  thumbnail?: string;
  isAllProducts?: boolean;
  createdBy?: User;
}
