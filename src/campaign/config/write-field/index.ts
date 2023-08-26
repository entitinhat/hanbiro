//third-party
import { TextField } from '@mui/material';
//import { t } from 'i18next';

//project
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
//import { MENU_CAMPAIGN } from '@base/config/menus';
import { useGetModuleProcesses } from '@process/hooks/useModule';

//menu
import * as keyNames from '@campaign/config/keyNames';
import * as components from '@campaign/config/write-field/components';
import { SMS_TYPE_OPTIONS } from '@campaign/config/constants';

export default {
  [keyNames.KEY_CAMPAIGN_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    showFullRow: true,
    defaultValue: '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_CAMPAIGN_ACTIVITY]: {
    component: baseComponents.SelectBox,
    componentProps: {
      options: [
        { keyName: 'CAMPAIGN_TYPE_EMAIL', languageKey: 'Email' },
        { keyName: 'CAMPAIGN_TYPE_SMS', languageKey: 'SMS' }
      ]
    },
    validate: {},
    showFullRow: true,
    defaultValue: { keyName: 'CAMPAIGN_TYPE_EMAIL', languageKey: 'Email' },
    parseParam: (value: any) => value?.keyName || ''
  },
  [keyNames.KEY_CAMPAIGN_SUBJECT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_CAMPAIGN_OBJECTIVE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      single: true,
      sourceType: 'setting',
      sourceMenu: 'marketing',
      sourceKey: 'campaign_objective',
      keyOptionValue: 'id',
      keyOptionLabel: 'name'
    },
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => (value ? { id: value.id, name: value.name } : null)
  },

  // [keyNames.KEY_CAMPAIGN_RECIPIENTS]: {
  //   component: TextField,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) => value
  // },
  // [keyNames.KEY_CAMPAIGN_LAUNCHED_ON]: {
  //   component: baseComponents.DatePicker,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: new Date(),
  //   showFullRow: true,
  //   parseParam: (value: Date) => value
  // },
  // [keyNames.KEY_CAMPAIGN_SCHEDULED]: {
  //   component: baseComponents.DatePicker,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: new Date(),
  //   showFullRow: true,
  //   parseParam: (value: Date) => value
  // },

  [keyNames.KEY_CAMPAIGN_PRODUCT]: {
    component: components.ProductAutoComplete,
    componentProps: {
      single: false
    },
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) => {
      return value && value.length > 0 ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [];
    }
  },
  [keyNames.KEY_CAMPAIGN_PROCESS]: {
    component: baseComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' },
      isSearch: false
    },
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => {
      return value
        ? {
            id: value.id,
            name: value.name
          }
        : {};
    }
  },
  [keyNames.KEY_CAMPAIGN_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      autoComplete: 'off',
      fullWidth: true,
      multiline: true,
      rows: 3
    },
    showFullRow: true,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_CAMPAIGN_ONWER]: {
    component: components.UserAutoComplete,
    componentProps: {
      showAvatar: true,
      single: true
    },
    validate: {},
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) => {
      return value ? { user: { id: value.id, name: value.name } } : {};
    }
  },

  // [keyNames.KEY_CAMPAIGN_STAGE]: {
  //   component: TextField,
  //   componentProps: {
  //     isMultiple: true
  //   },
  //   validate: {},
  //   showFullRow: true,
  //   defaultValue: [],
  //   parseParam: (value: any) => value
  // },

  [keyNames.KEY_CAMPAIGN_SCHEDULE_SEND]: {
    component: components.SendSchedule,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => (value ? { type: value.type, interval: Number(value.interval) } : null)
  },
  [keyNames.KEY_CAMPAIGN_EXPENSES]: {
    component: components.Expenses,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: [],
    parseParam: (value: any) => value
  },
  [keyNames.KEY_CAMPAIGN_KPI]: {
    component: components.KeyPerformanceIndicator,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: {
      clickThroughRate: 0, //%
      totalPageView: 0 //%
    },
    parseParam: (value: any) => value
  },
  [keyNames.KEY_CAMPAIGN_CONTENT]: {
    component: components.ContentEditor,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_CAMPAIGN_SENDER]: {
    component: components.Sender,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => (value ? { type: value.type, name: value.emails[0].name, email: value.emails[0].email } : null)
  },
  [keyNames.KEY_CAMPAIGN_REPLY_TRACKING]: {
    component: baseComponents.SwitchWrite,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: false,
    parseParam: (value: boolean) => value
  },
  [keyNames.KEY_CAMPAIGN_REPLY_TO]: {
    component: components.ReplyTo,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => (value ? { type: value.type, email: value.emails[0] } : null)
  },

  // [keyNames.KEY_CAMPAIGN_ATTACHMENT]: {
  //   component: baseComponents.MultiFileUpload,
  //   componentProps: {
  //     keyName: keyNames.KEY_CAMPAIGN_ATTACHMENT
  //   },
  //   validate: {},
  //   showFullRow: true,
  //   defaultValue: [],
  //   parseParam: (value: any) => value
  // },

  [keyNames.KEY_CAMPAIGN_FOOTER]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 3
    },
    validate: {},
    showFullRow: true,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_CAMPAIGN_SMS_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      options: SMS_TYPE_OPTIONS
    },
    validate: {},
    showFullRow: true,
    defaultValue: SMS_TYPE_OPTIONS[0],
    parseParam: (value: any) => value.value
  }
};
