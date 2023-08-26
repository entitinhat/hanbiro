import { DATE_SEPARATORS } from '@base/config/constant';
import { EDateRangeType, LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import dayjs, { ManipulateType } from 'dayjs';
import { RangeDate, RangeDayJs, RangeString } from '@base/types/date';
import { padStart } from 'lodash';

import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { t } from 'i18next';
import _ from 'lodash';
dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

export enum DateUnit {
  'UNIT_SECOND' = 1,
  'UNIT_MINUTE' = 60,
  'UNIT_HOUR' = 60 * 60,
  'UNIT_DAY' = 60 * 60 * 24,
  'UNIT_WEEK' = 60 * 60 * 24 * 7,
  'UNIT_MONTH' = 60 * 60 * 24 * 7 * 30
}

export const DurationOptions: LabelValue[] = [
  {
    value: 'UNIT_SECOND',
    label: 'ncrm_common_duration_secs'
  },
  {
    value: 'UNIT_MINUTE',
    label: 'ncrm_common_duration_mins'
  },
  {
    value: 'UNIT_HOUR',
    label: 'ncrm_common_duration_hrs'
  },
  {
    value: 'UNIT_DAY',
    label: 'ncrm_common_duration_days'
  },
  {
    value: 'UNIT_WEEK',
    label: 'ncrm_common_duration_weeks'
  },
  {
    value: 'UNIT_MONTH',
    label: 'ncrm_common_duration_months'
  }
];

// const formatDateTime = 'YYYY-MM-DD HH:mm';
// const formatDate = 'YYYY-MM-DD';

export function plusDate(date: any, number = 0, unit: ManipulateType) {
  let newDate = dayjs(date);
  return newDate.add(number, unit);
}

export function diffDate(date1: any, date2: any, unit: ManipulateType) {
  let newDate1 = dayjs(date1);
  return newDate1.diff(date2, unit);
}

export function convertDateFormat(dateFormat: string): string {
  let data = dateFormat.replaceAll('d', 'D').replaceAll('y', 'Y');
  return data;
}

export function replaceSeparator(dateString = '', separator = ''): string {
  let data = dateString || '';
  DATE_SEPARATORS.forEach((element) => {
    data = data.replaceAll(element.value, separator);
  });
  return data;
}

export function parseDurationValueToString(input: DurationValue, showLabel: boolean = true): string {
  let result = '';
  let value = 1;
  let unitValue = DateUnit['UNIT_DAY'];
  let unitLabel = DurationOptions.find((item) => {
    return item.value == 'UNIT_DAY';
  });

  if (input && input.duration > 0) {
    unitLabel = DurationOptions.find((item) => {
      return item.value == input.durationUnit;
    });
    unitValue = DateUnit[input.durationUnit as keyof typeof DateUnit];
    value = unitValue ? Math.ceil(input.duration / unitValue) : 0;
  }
  result = value + '';
  if (showLabel) {
    // result = value + ' ' + unitLabel?.label;
    result = `${value} ${t(unitLabel?.label as string)}`;
  }

  return result;
}

export function parseDurationValueToSecond(input: DurationValue): number {
  let result = 1;
  if (input && input.duration > 0) {
    let unitValue = DateUnit[input.durationUnit as keyof typeof DateUnit];
    result = unitValue * input.duration;
  }

  return result;
}

export function getDateTime(value: string) {
  if (value == '0001-01-01T00:00:00Z' || value == '1970-01-01T00:00:00Z' || value == '') {
    return null;
  } else {
    return new Date(value);
  }
}

export const createArrayDayInMonth = (maxDay: number) => {
  return Array.from({ length: maxDay }, (_, i) => ({
    value: i + 1,
    label: i + 1
  }));
};

export const daysInMonth = (month: any) => {
  if (month) {
    const maxDay = new Date(new Date().getFullYear(), month, 0).getDate();
    return createArrayDayInMonth(maxDay);
  }
  return null;
};

/***
 * using for convert time
 * from second to time string hh:ii:sss
 * it's using in dashboard and activity comparison.
 * @param iSeconds: input seconds
 */
export const convertSecondsToString = (iSeconds: number): string => {
  const hours = Math.floor(iSeconds / 3600);
  const minutes = Math.floor((iSeconds - hours * 3600) / 60);
  const seconds = Math.floor(iSeconds % 60);

  const hourStr = hours < 10 ? padStart(hours.toString(), 2, '0') : hours.toString();
  const minuteStr = padStart(minutes.toString(), 2, '0');
  const secondStr = padStart(seconds.toString(), 2, '0');

  return hourStr + ':' + minuteStr + ':' + secondStr;
};

export const convertSecondsToDayHourMin = (iSeconds: number): string => {
  const days = Math.floor(iSeconds / 86400);
  const hours = Math.floor((iSeconds - days * 86400) / 3600);
  const minutes = Math.floor((iSeconds - days * 86400 - hours * 3600) / 60);

  const daysStr = padStart(days.toString(), 2, '0');
  const hourStr = hours < 10 ? padStart(hours.toString(), 2, '0') : hours.toString();
  const minuteStr = padStart(minutes.toString(), 2, '0');

  return days + 'd ' + hourStr + 'h ' + minuteStr + 'm ';
};
// 2023-04-13 12:00:00
export const convertUTCDateToNormalDate = (date: string): string => {
  const newDate = new Date(date);
  const dayStr = newDate.getUTCDate().toString().padStart(2, '0');
  const yearStr = newDate.getUTCFullYear().toString().padStart(4, '0');
  const monthStr = (newDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const hourStr = newDate.getUTCHours().toString().padStart(2, '0');
  const minStr = newDate.getUTCMinutes().toString().padStart(2, '0');
  const secStr = newDate.getUTCSeconds().toString().padStart(2, '0');
  return yearStr + '-' + monthStr + '-' + dayStr + ' ' + hourStr + ':' + minStr + ':' + secStr;
};

export const dateRangeDayJs = (keyName?: EDateRangeType): RangeDayJs => {
  const today = dayjs().utc().startOf('day');

  let startDate: dayjs.Dayjs = today.startOf('day'),
    endDate: dayjs.Dayjs = today.endOf('day');

  switch (keyName) {
    case EDateRangeType.DATE_RANGE_TODAY:
      startDate = today.startOf('day');
      endDate = today.endOf('day');
      break;
    case EDateRangeType.DATE_RANGE_YESTERDAY:
      startDate = today.subtract(1, 'day').startOf('day');
      endDate = today.subtract(1, 'day').endOf('day');
      break;
    case EDateRangeType.DATE_RANGE_THIS_WEEK:
      startDate = today.startOf('week');
      endDate = today.endOf('week');
      break;
    case EDateRangeType.DATE_RANGE_PREVIOUS_WEEK:
      startDate = today.subtract(1, 'week').startOf('week');
      endDate = today.subtract(1, 'week').endOf('week');
      break;
    case EDateRangeType.DATE_RANGE_LAST_7_DAYS:
      startDate = today.subtract(8, 'day').startOf('day');
      endDate = today.subtract(1, 'day').endOf('day');
      break;
    case EDateRangeType.DATE_RANGE_LAST_30_DAYS:
      startDate = today.subtract(31, 'day').startOf('day');
      endDate = today.subtract(1, 'day').endOf('day');
      break;
    case EDateRangeType.DATE_RANGE_THIS_MONTH:
      startDate = today.startOf('month');
      endDate = today.endOf('month');
      break;
    case EDateRangeType.DATE_RANGE_PREVIOUS_MONTH:
      startDate = today.subtract(1, 'month').startOf('month');
      endDate = today.subtract(1, 'month').endOf('month');
      break;
    case EDateRangeType.DATE_RANGE_LAST_3_MONTHS:
      startDate = today.subtract(4, 'month').startOf('month');
      endDate = today.subtract(1, 'month').endOf('month');
      break;
    case EDateRangeType.DATE_RANGE_THIS_QUARTER:
      startDate = today.startOf('quarter');
      endDate = today.endOf('quarter');
      break;
    case EDateRangeType.DATE_RANGE_PREVIOUS_QUARTER:
      startDate = today.subtract(1, 'quarter').startOf('quarter');
      endDate = today.subtract(1, 'quarter').endOf('quarter');
      break;
    case EDateRangeType.DATE_RANGE_LAST_6_MONTHS:
      startDate = today.subtract(7, 'month').startOf('month');
      endDate = today.subtract(1, 'month').endOf('month');
      break;
    case EDateRangeType.DATE_RANGE_THIS_YEAR:
      startDate = today.startOf('year');
      endDate = today.endOf('year');
      break;
    case EDateRangeType.DATE_RANGE_PREVIOUS_YEAR:
      startDate = today.subtract(1, 'year').startOf('year');
      endDate = today.subtract(1, 'year').endOf('year');
      break;
    case EDateRangeType.DATE_RANGE_LAST_360_DAYS:
      startDate = today.subtract(361, 'day').startOf('day');
      endDate = today.subtract(1, 'day').endOf('day');
      break;
  }

  return { startDate, endDate };
};

export const dateRangeString = (keyName?: EDateRangeType): RangeString => {
  const { startDate, endDate } = dateRangeDayJs(keyName);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};

export const dateRangeDate = (keyName?: EDateRangeType): RangeDate => {
  const { startDate, endDate } = dateRangeDayJs(keyName);

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate()
  };
};

export const etDatesFromDateRange = (from: Date, to: Date) => {
  const dates = [];
  for (let date = _.clone(from); date <= to; date.setDate(date.getDate() + 1)) {
    const cloned = new Date(date.valueOf());
    dates.push(cloned);
  }
  return dates;
};
