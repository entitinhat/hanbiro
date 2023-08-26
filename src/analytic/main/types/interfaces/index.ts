import {IdName} from "@base/types/common";
import {BaseResponse} from "@base/types/response";

export interface ChartCountingProps {
  me?: boolean;
  isShowFilter?: boolean;
  defaultFilterQuery?: string;
}

export interface IdNameLanguageKey extends IdName {
  keyName: string;
  languageKey: string;
}

export interface DatePeriod {
  startTime: string;
  endTime: string;
}

export interface IDate {
  key: string;
  name: string;
  period: DatePeriod;
}

export interface DateNumber {
  date: IDate;
  number: number;
}

export interface IdNameNumber {
  idName: IdName;
  number1: number;
  number2: number;
  total: number;
}

export interface DateCountingResponse<T> extends BaseResponse<T> {
  period: DatePeriod;
}

export interface DateCountingResult<T> {
  date: IDate;
  counting: T;
}

export interface DateCountingsResult<T> {
  date: IDate;
  countings: T[];
}

export interface TrendCountingResponse<T> {
  firstCounting: T;
  lastCounting: T;
}
