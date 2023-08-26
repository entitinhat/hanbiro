import * as keyNames from '@base/config/keyNames';
import { FieldConfig } from '@base/types/pagelayout';
import * as components from './components';

const commonConfig: FieldConfig = {
  [keyNames.KEY_NAME_ID]: {
    //component: components.TextView,
    schema: 'id'
  },
  [keyNames.KEY_NAME_NAME]: {
    //component: components.TextView,
    schema: 'name'
  },
  [keyNames.KEY_NAME_CODE]: {
    //component: components.TextView,
    schema: 'code',
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_ACTIVE]: {
    component: components.SwitchView,
    schema: keyNames.KEY_NAME_ACTIVE
  },
  [keyNames.KEY_NAME_CREATED_BY]: {
    component: components.TextView,
    schema: `createdBy{
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value?.fullName;
    }
  },
  [keyNames.KEY_NAME_PRIORITY]: {
    component: components.PriorityView,
    schema: `priority{
      keyName
      languageKey
    }`
  },
  [keyNames.KEY_NAME_CREATED_AT]: {
    component: components.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_UPDATED_BY]: {
    component: components.TextView,
    schema: `updatedBy{
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value?.fullName;
    }
  },
  [keyNames.KEY_NAME_CLOSED_BY]: {
    component: null,
    schema: `closedBy{
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value?.fullName;
    }
  },
  [keyNames.KEY_NAME_UPDATED_AT]: {
    component: components.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_CLOSED_AT]: {
    component: components.DateTimeView,
    schema: 'closedAt'
  },
  [keyNames.KEY_NAME_DESCRIPTION]: {
    component: components.TextAreaView,
    schema: keyNames.KEY_NAME_DESCRIPTION
  }
};

export default commonConfig;
