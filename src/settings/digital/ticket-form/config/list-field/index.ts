import { lazy } from 'react';
import { LabelValue } from '@base/types/app';
import { t } from 'i18next';
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));

export const groupByOptions = [{ label: t('ncrm_generalsetting_ticket_form_groupby_all'), value: 'all' }];

export const dateByOptions = [
  { label: t('ncrm_generalsetting_ticket_form_list_header_createdAt'), value: 'createdAt' },
  { label: t('ncrm_generalsetting_ticket_form_list_header_updatedAt'), value: 'updatedAt' }
];

export const filterByOptions: any[] = [
  {
    label: t('ncrm_generalsetting_ticket_form_owner'),
    value: 'createdBy',
    component: UserAutoComplete,
    componentProps: {
      // placeholder: '12356',
      placeholder: t('ncrm_generalsetting_ticket_form_user_placeholder'),
      single: false
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const sortByOptions: LabelValue[] = [
  { label: t('ncrm_generalsetting_ticket_form_list_header_createdAt'), value: 'createdAt' },
  { label: t('ncrm_generalsetting_ticket_form_list_header_updatedAt'), value: 'updatedAt' }
];

export const searchFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    defaultValue: ''
  }
];
