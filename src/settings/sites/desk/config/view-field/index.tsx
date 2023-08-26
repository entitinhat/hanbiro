import * as keyNames from '@settings/sites/config/key-names';
import * as commonConfig from '@base/config/view-field';
import { FieldConfig } from '@base/types/pagelayout';
import * as commonComponents from '@base/config/view-field/components';
import * as components from './components';

const configViewDesk: FieldConfig = {
  ...commonConfig?.default,

  [keyNames.KEY_MENU_SITE_NAME]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_MENU_SITE_TICKET_NO]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_MENU_SITE_CUSTOMER]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (value: any) => {
      return value?.[keyNames.KEY_MENU_SITE_CUSTOMER]?.name;
    }
  },
  [keyNames.KEY_MENU_SITE_CONTACT]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (value: any) => {
      return value?.[keyNames.KEY_MENU_SITE_CONTACT]?.name;
    }
  },
  [keyNames.KEY_MENU_SITE_STATUS]: {
    component: commonComponents.DataSourceView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    componentProps: {
      single: true,
      sourceKey: 'ticket_status',
      sourceType: 'field'
    }
  },
  [keyNames.KEY_MENU_SITE_CATEGORY]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (value: any) => {
      let category = value?.[keyNames.KEY_MENU_SITE_CATEGORY];
      return category?.[keyNames.KEY_MENU_SITE_CATEGORY]?.name + '/' + category?.[keyNames.KEY_MENU_SITE_PRODUCT]?.name;
    }
  },
  [keyNames.KEY_MENU_SITE_ASSIGN_REP]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValue: (value: any) => {
      return value?.[keyNames.KEY_MENU_SITE_ASSIGN_REP]?.name;
    }
  },
  [keyNames.KEY_MENU_SITE_RESPONSE]: {
    component: components.FirstRespondDueView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_MENU_SITE_RESOLVED]: {
    component: components.ResolutionDueView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  },
  [keyNames.KEY_MENU_SITE_CLOSED]: {
    component: commonComponents.DurationView,
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    }
  }
};

export default configViewDesk;
