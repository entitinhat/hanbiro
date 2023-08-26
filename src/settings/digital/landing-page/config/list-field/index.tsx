//third-party
import _ from 'lodash';

//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import * as components from '@settings/digital/landing-page/config/write-field/components';
import { t } from 'i18next';
// material-ui
import { LabelValue } from '@base/types/app';

export const groupByCategoryOptions=  [
    { 
      label: t('ncrm_generalsetting_landing_page_groupby_all'), 
      value: 'all' 
    },
    { 
      label: t('ncrm_generalsetting_landing_page_groupby_unpublish'), 
      value: 'unpublish' 
    },
    { 
      label: t('ncrm_generalsetting_landing_page_groupby_publish'), 
      value: 'publish' 
    },
    { 
      label: t('ncrm_generalsetting_landing_page_groupby_schedule'), 
      value: 'schedule' 
    }
  ]

export const dateByOptions = [
  { 
    label: t('ncrm_generalsetting_landing_page_dateby_created'), 
    value: keyNames.KEY_NAME_LANDING_PAGE_CREATED_AT 
  },
  { 
    label: t('ncrm_generalsetting_landing_page_dateby_publish'), 
    value: keyNames.KEY_NAME_LANDING_PAGE_UPDATED_AT 
  }
];

export const filterByCategoryOptions: { [key: string]: any } = {
  'landing-page': [
    {
      label: t('ncrm_generalsetting_landing_page_filterby_owner'),
      value: keyNames.KEY_NAME_LANDING_PAGE_CREATED_BY,
      component: components.UserAutoComplete,
      componentProps: {
        single: true
      },
      getValue: (value: any) => {
        return value?.id || '';
      },
      setValue: (value: string) => {
        return value;
      }
    }
  ],
  general: []
};

export const searchOptions = [
  {
    label: 'Name',
    value: keyNames.KEY_NAME_LANDING_PAGE_NAME
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_NAME_LANDING_PAGE_CREATED_AT,
    label: t('ncrm_generalsetting_landing_page_sortby_created_at')
  },
  {
    value: keyNames.KEY_NAME_LANDING_PAGE_UPDATED_AT,
    label: t('ncrm_generalsetting_landing_page_sortby_updated_at')
  }
];
