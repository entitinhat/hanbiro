import { lazy } from 'react';
import { LabelValue } from '@base/types/app';
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));

export const categoryOptions = {
  satisfaction: 'Recent Satisfaction Surveys'
};

export const groupByOptions = [{ label: 'All Surveys', value: 'all' }];

export const dateByOptions = [
  { label: 'Created', value: 'createdAt' },
  { label: 'Updated', value: 'updatedAt' }
];

export const filterByOptions: any[] = [
  {
    label: 'Owner',
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: { single: false },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: 'createdAt',
    label: 'Created At'
  },
  {
    value: 'updatedAt',
    label: 'Updated At'
  }
];

export const searchFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    defaultValue: ''
  }
];

export const sortsBy = [
  { label: 'Name', value: 'name' },
  { label: 'Created At', value: 'createdAt' },
  { label: 'Updated At', value: 'updatedAt' }
];
