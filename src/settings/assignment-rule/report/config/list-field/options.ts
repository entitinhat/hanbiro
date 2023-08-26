import { dateRangeOptions } from '@base/config/options';
import { EDateRangeType } from '@base/types/app';
import { t } from 'i18next';

export const groupByOptions = [
  { label: t(`ncrm_common_label_custom`), value: 'all' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_TODAY], value: 'today' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_YESTERDAY], value: 'yesterday' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_THIS_WEEK], value: 'thisWeek' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_PREVIOUS_WEEK], value: 'previousWeek' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_LAST_7_DAYS], value: 'lastWeek' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_LAST_30_DAYS], value: 'lastMonth' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_THIS_MONTH], value: 'thisMonth' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_PREVIOUS_MONTH], value: 'previousMonth' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_LAST_3_MONTHS], value: 'lastQuarterMonth' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_THIS_QUARTER], value: 'thisQuarter' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_PREVIOUS_QUARTER], value: 'previousQuarter' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_LAST_6_MONTHS], value: 'lastHaftYear' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_THIS_YEAR], value: 'thisYears' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_PREVIOUS_YEAR], value: 'previousYear' },
  { label: dateRangeOptions[EDateRangeType.DATE_RANGE_LAST_360_DAYS], value: 'lastYear' }
  // { label: 'Deleted Tickets', value: 'deleted' },
];
