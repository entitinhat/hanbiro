//project
import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';
import { t } from 'i18next';
//menu
import * as keyNames from '@settings/digital/survey/config/keyNames';
import * as components from './components';
import { SURVEY_STATUS_PUBLISHED, SURVEY_STATUS_UNPUBLISH, SURVEY_TYPE_GENERAL, SURVEY_TYPE_SATISFACTION } from '../constants';
import * as commonConfig from '@base/config/view-field';

const viewConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_SURVEY_NAME]: {
    //component: TextField,
    schema: 'name'
    // getRecoilStateValue: (value: any) => {
    //   return value || '';
    // },
  },
  [keyNames.KEY_SURVEY_TITLE]: {
    //component: commonComponents.TextView,
    schema: 'title'
  },
  [keyNames.KEY_SURVEY_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    schema: 'description'
  },
  [keyNames.KEY_SURVEY_TYPE]: {
    //component: commonComponents.Selectbox,
    schema: 'type',
    getValueView: (value: string) => {
      let typeLabel = '(none)';
      if (value === SURVEY_TYPE_GENERAL) {
        typeLabel = t('ncrm_generalsetting_survey_type_general');
      }
      if (value === SURVEY_TYPE_SATISFACTION) {
        typeLabel = t('ncrm_generalsetting_survey_type_satisfaction');
      }
      return typeLabel;
    }
  },
  [keyNames.KEY_SURVEY_LANGUAGE]: {
    component: components.LanguageSelectView,
    schema: 'language'
  },
  [keyNames.KEY_SURVEY_STAGE]: {
    //component: commonComponents.Selectbox,
    schema: 'status',
    getValueView: (value: string) => {
      let statusLabel = '(none)';
      if (value === SURVEY_STATUS_PUBLISHED) {
        statusLabel = t('ncrm_generalsetting_survey_status_published');
      }
      if (value === SURVEY_STATUS_UNPUBLISH) {
        statusLabel = t('ncrm_generalsetting_survey_status_unpublish');
      }
      return statusLabel;
    }
  },
  [keyNames.KEY_SURVEY_TEMPLATE]: {
    component: null,
    schema: ''
  },
  [keyNames.KEY_SURVEY_CONTENT]: {
    component: null,
    schema: `
      headerImage
      headerLineColor
      bgColor
      sections
    `
  }
  // [keyNames.KEY_SURVEY_CREATED_BY]: {
  //   //component: commonComponents.TextView,
  //   schema: `createdBy {
  //     id
  //     name
  //   }`,
  //   getValueView: (value: any) => {
  //     return value?.name || '';
  //   }
  // },
  // [keyNames.KEY_SURVEY_CREATED_AT]: {
  //   //component: commonComponents.DateTimeView,
  //   schema: 'createdAt'
  // },
  // [keyNames.KEY_SURVEY_UPDATED_BY]: {
  //   //component: null,
  //   schema: `updatedBy {
  //     id
  //     name
  //   }`,
  //   getValueView: (value: any) => {
  //     return value?.name;
  //   }
  // },
  // [keyNames.KEY_SURVEY_UPDATED_AT]: {
  //   //component: commonComponents.DateTimeView,
  //   schema: 'updatedAt'
  // }
};

export default viewConfig;
