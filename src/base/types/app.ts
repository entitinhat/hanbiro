import { PaginateInput, SortInput, FilterByOption } from './common';
import { ReactElement, ReactNode } from 'react';

export type IconType = 'icon' | 'material' | 'ant' | 'main' | 'custom' | 'feather';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type LayoutType = 'layout1' | 'layout2' | 'layout3';
export type FormType = 'list' | 'view' | 'write' | 'setting' | 'diagram' | 'dashboard' | 'basic';
export type CountrySelectType = 'list' | 'used';
export type SignatureIndex = { [property: string]: string };

export type LabelValue = {
  label: string;
  value: string | number;
  extra?: any | any[];
};

export type LabelValueData = LabelValue & {
  data?: any;
};

export type ObjectSignature = Record<string, any>;

export enum ListType {
  GRID = 'GRID',
  LIST = 'LIST',
  SPLIT = 'SPLIT',
  CALENDAR = 'CALENDAR',
  KANBAN = 'KANBAN'
}

export enum GroupType {
  ROWSPAN = 'ROWSPAN',
  ROWGROUP = 'ROWGROUP'
}

export enum ITemplateType {
  NONE = 'NONE',
  MENU = 'template',
  EMAIL = 'email_template'
}

export enum EPriority {
  NONE = 'PRIORITY_NONE',
  URGENT = 'PRIORITY_URGENT',
  HIGH = 'PRIORITY_HIGH',
  MEDIUM = 'PRIORITY_MEDIUM',
  LOW = 'PRIORITY_LOW'
}

export enum TemplateGroup {
  NONE = 'GROUP_NONE',
  KNOWLEDGE = 'GROUP_KNOWLEDGE',
  EMAIL = 'GROUP_EMAIL',
  SMS = 'GROUP_SMS',
  TASK = 'GROUP_TASK',
  CALL = 'GROUP_CALL'
}

export const TemplateGroupNum: { [index: string]: number } = {
  [TemplateGroup.KNOWLEDGE]: 1,
  [TemplateGroup.EMAIL]: 2,
  [TemplateGroup.SMS]: 3,
  [TemplateGroup.TASK]: 4,
  [TemplateGroup.CALL]: 5
};

export enum EDateRangeType {
  DATE_RANGE_NONE = 'DATE_RANGE_NONE',
  DATE_RANGE_TODAY = 'DATE_RANGE_TODAY',
  DATE_RANGE_YESTERDAY = 'DATE_RANGE_YESTERDAY',
  DATE_RANGE_THIS_WEEK = 'DATE_RANGE_THIS_WEEK',
  DATE_RANGE_PREVIOUS_WEEK = 'DATE_RANGE_PREVIOUS_WEEK',
  DATE_RANGE_LAST_7_DAYS = 'DATE_RANGE_LAST_7_DAYS',
  DATE_RANGE_LAST_30_DAYS = 'DATE_RANGE_LAST_30_DAYS',
  DATE_RANGE_THIS_MONTH = 'DATE_RANGE_THIS_MONTH',
  DATE_RANGE_PREVIOUS_MONTH = 'DATE_RANGE_PREVIOUS_MONTH',
  DATE_RANGE_LAST_3_MONTHS = 'DATE_RANGE_LAST_3_MONTHS',
  DATE_RANGE_THIS_QUARTER = 'DATE_RANGE_THIS_QUARTER',
  DATE_RANGE_PREVIOUS_QUARTER = 'DATE_RANGE_PREVIOUS_QUARTER',
  DATE_RANGE_LAST_6_MONTHS = 'DATE_RANGE_LAST_6_MONTHS',
  DATE_RANGE_THIS_YEAR = 'DATE_RANGE_THIS_YEAR',
  DATE_RANGE_PREVIOUS_YEAR = 'DATE_RANGE_PREVIOUS_YEAR',
  DATE_RANGE_LAST_360_DAYS = 'DATE_RANGE_LAST_360_DAYS',
  DATE_RANGE_CUSTOM = 'DATE_RANGE_CUSTOM'
}

export type Theme = 'light' | 'dark';
export interface Device {
  // device: DeviceType;
  // layout: LayoutType;
  isMobile: boolean;
  isDesktop: boolean;
  // isTablet: boolean;
  innerWidth: number;
  innerHeight: number;
  // skin: Theme;
  // headerColor: string;
  // language: string;
  // enableTrans: boolean;
}
export interface Tab {
  default?: boolean;
  label: string;
  path: string;
  order: number;
  tabComponent: any;
  tabComponentProps?: any;
  show?: boolean;
}
export interface Tabs {
  [key: string]: Tab;
}

export interface SearchFilter {
  query?: string;
  keyword?: string;
  sort?: SortInput;
  //base filter
  baseFilters?: any;
  // filter for top list
  headerFilters?: any;
  // filter for search form
  searchFilters?: any;
  //current page
  paging?: PaginateInput;
  // export or not
  export?: boolean;
  // remain params should add extraParams
  extraParams?: any;
}

export interface MenuData {
  // sub menu active
  activeMenu?: string;
  // id
  activeId?: string;
  // active tab in view page
  activeTab?: string;
  // filter for list page
  filter?: SearchFilter;
  isSplitMode: boolean;
  // list type: List | grid
  listType: ListType;
  // for column setting on table
  settingColumns?: any;
}

export interface SideMenuItem {
  id: string | number;
  languageKey: string;
  keyName: string;
  path?: string;
  icon?: any;
  layouts?: SideMenuItem[];
  component?: any;
  componentView?: any;
  default?: boolean;
  type?: string; // menu|layout
}

export interface ListTypeState {
  grid?: boolean;
  list?: boolean;
}

export interface IDLanguage {
  id: string;
  languageKey: string;
}

interface Currency {
  code: string;
  currencyName: string;
}

export interface LabelValueIcon {
  label: string;
  value: string;
  icon?: ReactElement;
  onClick?: () => void;
  moreAction?: FilterByOption[]; //In case toolbar have more field to update
  excuteMoreAction?: (value: any) => void; // Excute update with field and value return from dropdown
  // [x: string]: any;
}

export interface LabelValueIconPath extends LabelValueIcon {
  path: string;
}

export interface LabelValueButton {
  label: string;
  value: string;
  color:
    | 'inherit'
    | 'secondary'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'magenta'
    | 'purple'
    | 'orange'
    | 'yellow'
    | 'lime'
    | 'volcano'
    | undefined;
  icon?: ReactElement;
  onClick?: () => void;
}

export interface LanguageValue {
  key?: string;
  label: string;
  value: string;
  icon: string;
}
