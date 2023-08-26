//third-party
import { t } from 'i18next';
import _ from 'lodash';

//project
//import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';

//menu
import * as keyNames from '@competitor/config/keyNames';
import * as components from './components';

export default {
  [keyNames.KEY_NAME_COMPETITOR_CODE]: {
    schema: 'code'
  },
  [keyNames.KEY_NAME_COMPETITOR_NAME]: {
    schema: 'name'
  },
  [keyNames.KEY_NAME_COMPETITOR_WEBSITE]: {
    component: baseComponents.WebsiteInputView,
    componentProps: {
      isMultiple: false,
      disableLabel: true
    },
    schema: `website {
      protocol
      website
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_COMPETITOR_WEBSITE]: value ? { protocol: value.protocol, website: value.website } : null };
    }
  },
  [keyNames.KEY_NAME_COMPETITOR_PRODUCT]: {
    component: components.ProductView,
    componentProps: {},
    schema: `products {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      const paramValue = value && value.length > 0 ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [];
      return { [keyNames.KEY_NAME_COMPETITOR_PRODUCT]: paramValue };
    }
  },
  [keyNames.KEY_NAME_COMPETITOR_STRENGTH]: {
    component: baseComponents.TextAreaView,
    componentProps: {},
    schema: `strength`
  },
  [keyNames.KEY_NAME_COMPETITOR_WEAKNESS]: {
    component: baseComponents.TextAreaView,
    componentProps: {},
    schema: `weakness`
  },
  [keyNames.KEY_NAME_COMPETITOR_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    componentProps: {},
    schema: `description`
  },
  [keyNames.KEY_NAME_COMPETITOR_CREATED_BY]: {
    component: baseComponents.UserInputView,
    schema: `createdBy {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_COMPETITOR_CREATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_COMPETITOR_UPDATED_BY]: {
    component: baseComponents.UserInputView,
    schema: `updatedBy {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_COMPETITOR_UPDATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_COMPETITOR_DELETED_BY]: {
    schema: `restore {
      deletedBy {
        id
        name
      }
      deletedAt
    }`
  },
  [keyNames.KEY_NAME_COMPETITOR_DELETED_AT]: {
    schema: `restore {
      deletedBy {
        id
        name
      }
      deletedAt
    }`
  }
};
