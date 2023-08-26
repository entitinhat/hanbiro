import { DurationValue, IdName } from '@base/types/common';

export enum OperationalHours {
  NONE = 'OPH_NONE',
  BUSINESS_HOURS = 'OPH_BUSINESS_HOURS',
  CALENDAR_HOURS = 'OPH_CALENDAR_HOURS'
}

export enum SLAType {
  NONE = 'SLA_NONE',
  PREMIUM = 'SLA_PREMIUM',
  STANDARD = 'SLA_STANDARD'
}

export enum BusinessHours {
  NONE = 'BH_NONE',
  BH_247 = 'BH_247',
  BH_246 = 'BH_246',
  BH_245 = 'BH_245',
  BH_CUSTOM = 'BH_CUSTOM'
}
export enum WeekDays {
  SUN = 'sun',
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat'
}

export enum ChannelType {
  NONE = 'CTYPE_NONE',
  LANDING_PAGE = 'CTYPE_LANDING_PAGE',
  EMAIL = 'CTYPE_EMAIL',
  DIRECT_INPUT = 'CTYPE_DIRECT_INPUT',
  WEBHOOK = 'CTYPE_WEBHOOK'
}
export enum DeskAssignType {
  NONE = 'ATYPE_NONE',
  USER = 'ATYPE_USER',
  GROUP = 'ATYPE_GROUP'
}

export interface SLA {
  sla: SLAType;
  isDefault: boolean;
  customers: IdName[];
}

export interface SLASetting {
  id: string;
  value: SLA[];
}

export interface PriorityItem {
  languageKey: string;
  priority: string;
  isDefault: boolean;
  active: boolean;
}

export interface PrioritySetting {
  id: string;
  value: PriorityItem[];
}
export interface RespondPriorityItem {
  priority: string;
  standardSla: DurationValue;
  premiumSla: DurationValue;
  // operationalHours: EOperationalHours;
}

export interface RespondPrioritySetting {
  id: string;
  value: RespondPriorityItem[];
}

export interface ResolveSLASetting {
  id: string;
  value: number;
}

export interface AutoCloseTicketSetting {
  id: string;
  value: number;
}
export interface SurveyTemplateSetting {
  id: string;
  value: any[];
}
export interface TicketClassification {
  id: string;
  name: string;
  values: any[];
  active: boolean;
}
export interface ClassificationValue {
  classification: IdName;
  value: string;
}
export interface DeskPriorityValue {
  keyName: string;
  languageKey: string;
}
export interface TicketCategoryRule {
  id: string;
  isAllProducts: boolean;
  products: IdName[];
  priority: DeskPriorityValue | null;
  averageTimeResolve: DurationValue;
}
export interface TicketCategory {
  id: string;
  name: string;

  rules: TicketCategoryRule[];
}

export interface DeskTag {
  id: string;
  name: string;
  linkedTickets: number;
  linkedArticles: number;
}
export interface DeskChannel {
  id: string;
  type: ChannelType;
  name: string;
  description: string;
  useAssign?: boolean;
  assignType?: DeskAssignType;
  realUrl?: string;
  shortUrl?: string;
  email?: string;
  form?: IdName;
  assignedGroups?: IdName[];
  assignedUsers?: IdName[];
  active: boolean;
}

export interface AssignmentGroup {
  id: string;
  name: string;
  reps?: AssignmentRep[] | null;
  description: string;
  active: boolean;
}
export interface AssignmentRepInfo {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: IdName | null;
}
export interface AssignmentRep {
  id: string;
  user: AssignmentRepInfo | null;
  capacity: number;
}
export interface AssignmentUser {
  id: string;
  user: AssignmentRepInfo | null;
  isEmail: boolean;
  isSms: boolean;
  active: boolean;
}
export interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}
export interface DeskHours {
  businessHours: BusinessHours;
  workingDays: string[]; //sun, mon, tue, wed, thu, fri, sat
  firstDayOfWeek: string;
  workingHours?: WorkingHour[];
}
