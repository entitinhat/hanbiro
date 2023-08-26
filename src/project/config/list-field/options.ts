import _ from 'lodash';

import { LabelValue } from '@base/types/app';
import { KEY_NAME_PROJECT_CREATED_AT, KEY_NAME_PROJECT_UPDATED_AT } from '../keyNames';

export const groupByOptions: LabelValue[] = [{ label: 'ncrm_project_all_project', value: 'all' }];

export const dateByOptions: LabelValue[] = [
  { label: 'ncrm_project_created_date', value: KEY_NAME_PROJECT_CREATED_AT },
  { label: 'ncrm_project_updated_date', value: KEY_NAME_PROJECT_UPDATED_AT }
];

export const filterByOptions = [];

export const searchFields: LabelValue[] = [
  {
    value: 'name',
    label: 'Name'
  }
];
