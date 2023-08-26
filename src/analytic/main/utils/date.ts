import {isEqual} from "lodash";
import {RangeDayJs} from "@base/types/date";
import dayjs from "dayjs";

export const nowDayJs = dayjs();
export const todayDayJs = nowDayJs.startOf('day');
export const thisMonthDayJs = todayDayJs.startOf('month');

export const today = (): RangeDayJs => {
  const startDate = nowDayJs.startOf('day');
  const endDate = nowDayJs.endOf('day');
  return {startDate, endDate};
};

export const yesterday = (): RangeDayJs => {
  const startDate = nowDayJs.subtract(1, 'day').startOf('day');
  const endDate = nowDayJs.subtract(1, 'day').endOf('day');
  return {startDate, endDate};
};

export const thisWeek = (): RangeDayJs => {
  const startDate = nowDayJs.startOf('week');
  const endDate = nowDayJs.endOf('week');
  return {startDate, endDate};
};

export const thisMonth = (): RangeDayJs => {
  const startDate = nowDayJs.startOf('month');
  const endDate = nowDayJs.endOf('month');
  return {startDate, endDate};
};

export const isDateEqual = (value: Date, other: Date): boolean => {
  const valueDate = dayjs(value).format('YYYYMMDD');
  const otherDate = dayjs(other).format('YYYYMMDD');
  return isEqual(valueDate, otherDate);
}

export const castDayJsUtc = (date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs => {
  return dayjs(date, format, locale, strict).utc();
};