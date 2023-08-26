import { lazy } from 'react';
import { t } from 'i18next';
//project
import { LabelValue } from '@base/types/app';

//related menu
export const UserAutoComplete = lazy(() => import('@sign-in/containers/UserAutoComplete'));

//menu
import { SURVEY_TYPE_GENERAL, SURVEY_TYPE_SATISFACTION } from '../constants';

export const categoryOptions = {
  survey: 'Recent Surveys'
};

export const groupByOptions = [
  { 
    label: t('ncrm_generalsetting_survey_groupby_all'), 
    value: 'all' 
  },
  { 
    label: t('ncrm_generalsetting_survey_groupby_general'), 
    value: SURVEY_TYPE_GENERAL 
  },
  { 
    label: t('ncrm_generalsetting_survey_groupby_satisfaction'), 
    value: SURVEY_TYPE_SATISFACTION 
  }
];

export const dateByOptions = [
  { label: t('ncrm_generalsetting_survey_dateby_created'), value: 'createdAt' },
  { label: t('ncrm_generalsetting_survey_dateby_updated'), value: 'updatedAt' }
];

export const filterByOptions: any[] = [
  {
    label: t('ncrm_generalsetting_survey_filterby_owner'),
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
    label: t('ncrm_generalsetting_survey_sortby_created_at')
  },
  {
    value: 'updatedAt',
    label: t('ncrm_generalsetting_survey_sortby_updated_at')
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
  { label: t('ncrm_generalsetting_survey_sortby_created_at'), value: 'createdAt' },
  { label: t('ncrm_generalsetting_survey_sortby_updated_at'), value: 'updatedAt' }
];
