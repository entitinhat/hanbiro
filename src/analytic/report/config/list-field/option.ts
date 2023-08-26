import * as components from '@analytic/report/config/write-field/components';

import { REPORT_NAME, REPORT_SUBJECT } from '@analytic/report/config/keyNames';

import { KEY_NAME_CREATED_AT, KEY_NAME_CREATED_BY, KEY_NAME_UPDATED_AT } from '@base/config/keyNames';
import { LabelValue } from '@base/types/app';

export const groupByOptions = [
  { label: 'ncrm_dashboard_report_all_reports', value: 'all' },
  { label: 'ncrm_dashboard_report_my_reports', value: 'my' }
];

export const dateByOptions = [
  { label: 'ncrm_dashboard_report_created', value: KEY_NAME_CREATED_AT },
  { label: 'ncrm_dashboard_report_updated', value: KEY_NAME_UPDATED_AT }
];

export const filterByOptions = [
  {
    label: 'ncrm_dashboard_report_filter_by_owner',
    value: KEY_NAME_CREATED_BY,
    component: components.UserAutoComplete,
    componentProps: {},
    getValue: (value: any) => {
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {}
  }
];


