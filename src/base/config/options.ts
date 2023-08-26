import { EDateRangeType } from '@base/types/app';

export const dateRangeOptions: any = {
  [EDateRangeType.DATE_RANGE_TODAY]: 'ncrm_common_dateby_today',
  [EDateRangeType.DATE_RANGE_YESTERDAY]: 'ncrm_common_dateby_yesterday',
  [EDateRangeType.DATE_RANGE_THIS_WEEK]: 'ncrm_common_dateby_thisweek',
  [EDateRangeType.DATE_RANGE_PREVIOUS_WEEK]: 'ncrm_common_dateby_previous_week',
  [EDateRangeType.DATE_RANGE_LAST_7_DAYS]: 'ncrm_common_dateby_last_7_days',
  [EDateRangeType.DATE_RANGE_LAST_30_DAYS]: 'ncrm_common_dateby_last_30_days',
  [EDateRangeType.DATE_RANGE_THIS_MONTH]: 'ncrm_common_dateby_thismonth',
  [EDateRangeType.DATE_RANGE_PREVIOUS_MONTH]: 'ncrm_common_dateby_previous_month',
  [EDateRangeType.DATE_RANGE_LAST_3_MONTHS]: 'ncrm_common_dateby_last_3_months',
  [EDateRangeType.DATE_RANGE_THIS_QUARTER]: 'ncrm_common_dateby_thisquarter',
  [EDateRangeType.DATE_RANGE_PREVIOUS_QUARTER]: 'ncrm_common_dateby_previous_quarter',
  [EDateRangeType.DATE_RANGE_LAST_6_MONTHS]: 'ncrm_common_dateby_last_6_months',
  [EDateRangeType.DATE_RANGE_THIS_YEAR]: 'ncrm_common_dateby_thisyear',
  [EDateRangeType.DATE_RANGE_PREVIOUS_YEAR]: 'ncrm_common_dateby_previous_year',
  [EDateRangeType.DATE_RANGE_LAST_360_DAYS]: 'ncrm_common_last_360_days'
};

export const dateRangeIncludeCustomOptions = {
  ...dateRangeOptions,
  [EDateRangeType.DATE_RANGE_CUSTOM]: 'ncrm_common_dateby_customize'
};
