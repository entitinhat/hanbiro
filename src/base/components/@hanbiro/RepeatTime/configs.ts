import { LabelValue } from '@base/types/app';
import _ from 'lodash';

export const defaultReDay = 'nnnnnnn';
export const lastDay = 'l';
export const months: LabelValue[] = [
  {
    value: 1,
    label: 'ncrm_common_january'
  },
  {
    value: 2,
    label: 'ncrm_common_february'
  },
  {
    value: 3,
    label: 'ncrm_common_march'
  },
  {
    value: 4,
    label: 'ncrm_common_april'
  },
  {
    value: 5,
    label: 'ncrm_common_may'
  },
  {
    value: 6,
    label: 'ncrm_common_june'
  },
  {
    value: 7,
    label: 'ncrm_common_july'
  },
  {
    value: 8,
    label: 'ncrm_common_august'
  },
  {
    value: 9,
    label: 'ncrm_common_september'
  },
  {
    value: 10,
    label: 'ncrm_common_october'
  },
  {
    value: 11,
    label: 'ncrm_common_november'
  },
  {
    value: 12,
    label: 'ncrm_common_december'
  }
];
export const MONTHS: LabelValue[] = [
  {
    value: 1,
    label: 'ncrm_common_january'
  },
  {
    value: 2,
    label: 'ncrm_common_february'
  },
  {
    value: 3,
    label: 'ncrm_common_march'
  },
  {
    value: 4,
    label: 'ncrm_common_april'
  },
  {
    value: 5,
    label: 'ncrm_common_may'
  },
  {
    value: 6,
    label: 'ncrm_common_june'
  },
  {
    value: 7,
    label: 'ncrm_common_july'
  },
  {
    value: 8,
    label: 'ncrm_common_august'
  },
  {
    value: 9,
    label: 'ncrm_common_september'
  },
  {
    value: 10,
    label: 'ncrm_common_october'
  },
  {
    value: 11,
    label: 'ncrm_common_november'
  },
  {
    value: 12,
    label: 'ncrm_common_december'
  }
];

// export const every_type = {
//   hourly: 'h',
//   daily: 'd',
//   weekly: 'w',
//   monthly: 'm',
//   yearly: 'y',
// };

export const RECURRENCE_TYPE: { [index: string]: string } = {
  hourly: 'TYPE_HOURLY',
  daily: 'TYPE_DAILY',
  weekly: 'TYPE_WEEKLY',
  monthly: 'TYPE_MONTHLY',
  yearly: 'TYPE_YEARLY'
};

export const RECURRENCE_EVERY_TYPE: { [index: string]: string } = {
  day: 'EVERY_DAYS',
  week: 'EVERY_WEEKS',
  last: 'EVERY_LAST_DAY_OF_MONTH'
};

export const RECURRENCE_EVERY_TYPE_REVERSE: { [index: string]: string } = _.invert(RECURRENCE_EVERY_TYPE);

export const RECURRENCE_TYPE_LABEL: { [index: string]: string } = {
  [RECURRENCE_TYPE.monthly]: 'ncrm_common_months',
  [RECURRENCE_TYPE.yearly]: 'ncrm_common_years',
  [RECURRENCE_TYPE.weekly]: 'ncrm_common_weeks'
};

export const langRecurrence: { [index: string]: string } = {
  [RECURRENCE_TYPE.hourly]: 'ncrm_common_hourly',
  [RECURRENCE_TYPE.daily]: 'ncrm_common_daily',
  [RECURRENCE_TYPE.weekly]: 'ncrm_common_weekly',
  [RECURRENCE_TYPE.monthly]: 'ncrm_common_monthly',
  [RECURRENCE_TYPE.yearly]: 'ncrm_common_yearly',
  mon: 'ncrm_common_mon',
  tue: 'ncrm_common_tue',
  wed: 'ncrm_common_wed',
  thu: 'ncrm_common_thu',
  fri: 'ncrm_common_fri',
  sat: 'ncrm_common_sat',
  sun: 'ncrm_common_sun'
};

export const days: LabelValue[] = [
  {
    value: 1,
    label: langRecurrence.mon
  },
  {
    value: 2,
    label: langRecurrence.tue
  },
  {
    value: 3,
    label: langRecurrence.wed
  },
  {
    value: 4,
    label: langRecurrence.thu
  },
  {
    value: 5,
    label: langRecurrence.fri
  },
  {
    value: 6,
    label: langRecurrence.sat
  },
  {
    value: 0,
    label: langRecurrence.sun
  }
];

export const RECURRENCES: LabelValue[] = [
  // {
  //   value: RECURRENCE_TYPE.hourly,
  //   label: langRecurrence[RECURRENCE_TYPE.hourly]
  // },
  {
    value: RECURRENCE_TYPE.daily,
    label: langRecurrence[RECURRENCE_TYPE.daily]
  },
  {
    value: RECURRENCE_TYPE.weekly,
    label: langRecurrence[RECURRENCE_TYPE.weekly]
  },
  {
    value: RECURRENCE_TYPE.monthly,
    label: langRecurrence[RECURRENCE_TYPE.monthly]
  },
  {
    value: RECURRENCE_TYPE.yearly,
    label: langRecurrence[RECURRENCE_TYPE.yearly]
  }
];
export const weekLabel: any = {
  1: 'Frist ',
  2: 'Second ',
  3: 'Third ',
  4: 'Fourth ',
  5: 'Last '
};

