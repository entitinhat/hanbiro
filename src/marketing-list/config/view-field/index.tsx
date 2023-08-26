//third-party
import { t } from 'i18next';

//project
import { FieldConfig } from '@base/types/pagelayout';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import * as commonComponents from '@base/config/view-field/components';
import * as components from '@marketing-list/config/view-field/components';
import { MarketingTypeView } from './components';
import { getValue, Stack } from '@mui/system';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Typography } from '@mui/material';
const viewConfig: FieldConfig = {
  // ================================ SUMMARY FIELDS ====================================
  [keyNames.KEY_NAME_CUSTOMER_NAME]: {
    //component: commonComponents.TextView,
    schema: 'name'
    // getRecoilStateValue: (value: any) => {
    //   return value || '';
    // }
  },
  [keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE]: {
    component: components.MarketingTypeView,
    schema: 'type',
    getMutationValue: (value: any) => {
      console.log('muation value: ', value);
      return value.keyName;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_MARKETING_DESCRIPTION]: {
    component: commonComponents.TextAreaView,
    schema: 'description',
    componentProps: {
      mixRows: 3
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_ACTIVE]: {
    component: components.ActiveCommonView,
    schema: 'active'
  },
  [keyNames.KEY_NAME_CUSTOMER_COST]: {
    schema: `costs {
     type
     total
     cost {
      amount
      currency
      fCurrency {
        currencyName
        currencySymbol
        currencyFormat
      }
     }
    }`
  },
  [keyNames.KEY_NAME_CUSTOMER_LAST_USED_AT]: {
    component: commonComponents.DateTimeView,
    schema: 'lastUsedAt',
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_RELATED_CAMPAIGNS]: {
    schema: ''
  },
  [keyNames.KEY_NAME_CUSTOMER_OWNER]: {
    component: commonComponents.UserView,
    schema: `owner {
      id
      name
    }`,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      return {
        user: {
          name: value.name
        }
      };
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_MEMBERS]: {
    schema: `totalMember`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CREATED_BY]: {
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_CREATED_AT]: {
    component: commonComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      const updatedBy = value || null;
      return (
        <Stack spacing={1.5} direction="row" alignItems="center">
          <HanAvatar
            key={updatedBy?.id}
            name={updatedBy?.name || ''}
            size="sm"
            // photo={}
          />
          <Stack spacing={0}>
            <Typography variant="body1">{updatedBy?.name || ''}</Typography>
          </Stack>
        </Stack>
      );
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_UPDATED_AT]: {
    component: commonComponents.DateTimeView,
    schema: 'updatedAt',
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_NAME_CUSTOMER_DELETED_AT]: {
    schema: `restore {
      deletedAt
      deletedBy {
        id
        name
      }
    }`
  },
  [keyNames.KEY_NAME_CUSTOMER_DELETED_BY]: {
    schema: `restore {
      deletedAt
      deletedBy {
        id
        name
      }
    }`
  }
};

export default viewConfig;
