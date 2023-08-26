import _ from 'lodash';

import * as keyNames from '@process/config/keyNames';
import { LabelValue } from '@base/types/app';

export const groupByOptions: LabelValue[] = [{ label: 'ncrm_process_automation_rule_groupby_all_process', value: 'all' }];

export const dateByOptions: LabelValue[] = [
  { label: 'ncrm_process_automation_rule_created_date', value: keyNames.KEY_NAME_BUSINESS_CREATED_AT },
  { label: 'ncrm_process_automation_rule_updated_date', value: keyNames.KEY_NAME_BUSINESS_UPDATED_AT }
];

export const filterByOptions = [];

export const searchFields: LabelValue[] = [
  {
    value: 'name',
    label: 'Name'
  }
];
