import * as keyNames from '@settings/digital/satisfaction/config/keyNames';
import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';
import * as components from './components';

const viewConfig: FieldConfig = {
  [keyNames.KEY_SATISFACTION_SURVEY_NAME]: {
    //component: TextField,
    schema: 'name'
    // getRecoilStateValue: (value: any) => {
    //   return value || '';
    // },
  },
  // [keyNames.KEY_SURVEY_TITLE]: {
  //   //component: commonComponents.TextView,
  //   schema: 'title'
  // },
  [keyNames.KEY_SATISFACTION_SURVEY_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    schema: 'description'
  },
  // [keyNames.KEY_SURVEY_TYPE]: {
  //   //component: commonComponents.Selectbox,
  //   componentProps: {
  //     options: []
  //   },
  //   schema: ''
  // },
  [keyNames.KEY_SATISFACTION_SURVEY_LANGUAGE]: {
    component: components.LanguageSelectView,
    schema: 'language'
  },
  // [keyNames.KEY_SURVEY_STAGE]: {
  //   //component: commonComponents.Selectbox,
  //   schema: ''
  // },
  // [keyNames.KEY_SURVEY_TEMPLATE]: {
  //   component: null,
  //   schema: ''
  // },
  [keyNames.KEY_SATISFACTION_SURVEY_CONTENT]: {
    component: null,
    schema: `
      headerImage
      headerLineColor
      bgColor
      question
    `
  },
  [keyNames.KEY_SATISFACTION_SURVEY_CREATED_BY]: {
    //component: commonComponents.TextView,
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_SATISFACTION_SURVEY_CREATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_SATISFACTION_SURVEY_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_SATISFACTION_SURVEY_UPDATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'updatedAt'
  }
};

export default viewConfig;
