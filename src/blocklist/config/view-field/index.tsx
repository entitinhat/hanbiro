//third-party
import { t } from 'i18next';

//project
import * as baseComponents from '@base/config/view-field/components';
import validators from '@base/utils/validation/fieldValidator'; //all validate functions
import { LABEL_VALUE_CUSTOM_ANNI, LABEL_VALUE_CUSTOM_WEB, LABEL_VALUE_OTHER } from '@base/config/constant';
import { FieldConfig } from '@base/types/pagelayout';

//menu
import * as keyNames from '@blocklist/config/keyNames';
import { CUSTOMER_GENDER_OPTIONS, RECEIPT_TYPE_OPTIONS, SEND_MODE_OPTIONS } from '@blocklist/config/constants';
import * as components from '@blocklist/config/view-field/components';

const viewConfig: FieldConfig = {
  // ================================ SUMMARY FIELDS ====================================
  [keyNames.KEY_NAME_CUSTOMER_NAME]: {
    //component: commonComponents.TextView,
    schema: 'name'
    // getRecoilStateValue: (value: any) => {
    //   return value || '';
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_CODE]: {
    //component: commonComponents.TextView,
    schema: 'code'
  },

  [keyNames.KEY_NAME_CUSTOMER_CREATED_BY]: {
    //component: commonComponents.TextView,
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CREATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_CUSTOMER_DELETED_AT]: {
    schema: `restore {
      id
      aggId
      aggType
      deletedAt
      deletedBy {
        id
        name
      }
    }`
  },
  [keyNames.KEY_NAME_CUSTOMER_DELETED_BY]: {
    schema: `restore {
      id
      aggId
      aggType
      deletedAt
      deletedBy {
        id
        name
      }
    }`
  }
};

export default viewConfig;
