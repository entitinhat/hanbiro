import {IdName} from "@base/types/common";
import {BaseResponse} from "@base/types/response";
import { IDate } from '../interfaces';

export interface TicketCounting {
  new: number;
  assigned: number;
  unassigned: number;
  overdue: number;
  dueToday: number;
  unresolved: number;
  resolved: number;
  avgCustomerSatisfaction: number;
  avg1stResponseTime: number;
  resolutionTime: number;
  avgResolutionTime: number;
  resolveTimeEfficiency: number;
  avgResolveTimeEfficiency: number;
  avgAssignTime: number;
  resolvedWithinSla: number;
}

export interface TicketDateCounting {
  date: {
    key: string;
    name: string;
  };
  counting: TicketCounting;
}

export interface TicketTrendCountingResponse {
  firstCounting: any;
  lastCounting: any;
}

export interface TicketBaseCountingResponse {
  results: any[];
}

export interface TicketByDateCountingResponse<T> extends BaseResponse<T> {
  period: any;
}

export interface TicketAvgCustomerSatisfactionResponse {
  counting: TicketCounting;
}

export interface TicketCategoryCounting {
  category: IdName;
  total: number;
}

export interface TicketPriorityCountingResult {
  date: IDate;
  countings: TicketPriorityCounting[];
}

export interface TicketPriorityCounting {
  priority: string;
  total: number;
}

export interface KbCounting {
  published: string;
  viewed: number;
  inserted: number;
}

export interface KbDateCounting {
  date: IDate;
  counting: KbCounting;
}

export interface KbRepCounting {
  user: IdName;
  counting: KbCounting;
}
