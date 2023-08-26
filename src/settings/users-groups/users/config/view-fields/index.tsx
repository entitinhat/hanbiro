// import { FieldConfig } from '@base/types/pagelayout';
import * as keyNames from '@settings/users-groups/users/config/keyNames';
// import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';

import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';
// import * as components from './components';

//FieldConfig
const viewFieldsConfig: any = {
  [keyNames.KEY_USER_DISPLAY_NAME]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {}
  },
  [keyNames.KEY_USER_FULLNAME]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {}
  },
  [keyNames.KEY_USER_URL_NAME]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {}
  },
  [keyNames.KEY_USER_CREATEDDAT]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {},
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (date: string) => convertDateTimeServerToClient({ date: date, isTime: true })
  },
  [keyNames.KEY_USER_EMAIL_PRIMARY]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {}
  },
  [keyNames.KEY_USER_EMAIL]: {
    component: commonComponents.TextView,
    // showFullRow: true,
    componentProps: {},
    hideFieldLabel: true
  }
};
export default viewFieldsConfig;


