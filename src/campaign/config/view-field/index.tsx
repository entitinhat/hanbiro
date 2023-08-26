//third-party
import { t } from 'i18next';

//project
import * as baseComponents from '@base/config/view-field/components';
import validators from '@base/utils/validation/fieldValidator'; //all validate functions
import { FieldConfig } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import * as components from '@campaign/config/view-field/components';
import { ACTIVITY_TYPE_OPTIONS, CAMPAIGN_MAIL_SEND_NOW, SMS_TYPE_OPTIONS } from '@campaign/config/constants';
import { useGetModuleProcesses } from '@process/hooks/useModule';

const viewConfig: FieldConfig = {
  // ================================ SUMMARY FIELDS ====================================
  [keyNames.KEY_CAMPAIGN_NAME]: {
    schema: 'name'
  },
  [keyNames.KEY_CAMPAIGN_ACTIVITY]: {
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: ACTIVITY_TYPE_OPTIONS
    },
    schema: `activity`,
    getValueView: (value: any) => {
      if (value?.keyName) {
        return value;
      } else {
        return ACTIVITY_TYPE_OPTIONS.find((_option) => _option.keyName === value);
      }
    },
    getValueEdit: (value: string) => {
      return ACTIVITY_TYPE_OPTIONS.find((_option) => _option.keyName === value) || null;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_ACTIVITY]: value.keyName };
    }
  },
  [keyNames.KEY_CAMPAIGN_CATEGORY]: {
    schema: 'category'
  },
  [keyNames.KEY_CAMPAIGN_OBJECTIVE]: {
    schema: `objective {
      id
      name
    }`,
    component: baseComponents.DataSourceView,
    componentProps: {
      single: true,
      sourceType: 'setting',
      sourceMenu: 'marketing',
      sourceKey: 'campaign_objective',
      keyOptionValue: 'id',
      keyOptionLabel: 'name'
    },
    getValueView: (value: any) => {
      if (value?.keyName) {
        return value;
      } else {
        return value ? { ...value, keyName: value.id, languageKey: value.name } : {};
      }
    }
    // getValueEdit: (value: any) => {
    //   return value ? { keyName: value.id, languageKey: value.name } : null;
    // },
    // getMutationValue: (value: any) => {
    //   return { [keyNames.KEY_CAMPAIGN_OBJECTIVE]: value ? value : null };
    // }
  },
  [keyNames.KEY_CAMPAIGN_RECIPIENTS]: {
    schema: `recipients {
      id
      name
    }`,
    component: baseComponents.UserInputView,
    componentProps: {
      single: false
    }
    // getMutationValue: (value: any) => {
    //   const newValue = value?.map((_ele: any) => ({
    //     id: _ele?.id,
    //     name: t(_ele?.languageKey)
    //   }));
    //   return { [keyNames.KEY_NAME_CUSTOMER_INDUSTRIES]: newValue };
    // }
  },
  [keyNames.KEY_CAMPAIGN_LAUNCHED_ON]: {
    component: baseComponents.DateTimeView,
    schema: `launchedAt`
  },
  [keyNames.KEY_CAMPAIGN_PRODUCT]: {
    component: components.ProductView,
    componentProps: {},
    schema: `products {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      const paramValue = value && value.length > 0 ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [];
      return { [keyNames.KEY_CAMPAIGN_PRODUCT]: paramValue };
    }
  },
  [keyNames.KEY_CAMPAIGN_PROCESS]: {
    component: baseComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' },
      isSearch: false
    },
    schema: `process {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_PROCESS]: value ? { id: value.id, name: value.name } : null };
    }
  },
  [keyNames.KEY_CAMPAIGN_DESCRIPTION]: {
    schema: `description`
  },
  [keyNames.KEY_CAMPAIGN_ONWER]: {
    component: baseComponents.UserInputView,
    componentProps: {
      single: true,
      showAvatar: true
    },
    schema: `owner {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_ONWER]: value ? { user: { id: value.id, name: value.name } } : null };
    }
  },
  [keyNames.KEY_CAMPAIGN_STAGE]: {
    schema: `stage {
      id
      name
    }`
  },
  [keyNames.KEY_CAMPAIGN_SCHEDULE_SEND]: {
    component: components.SendScheduleView,
    componentProps: {},
    schema: `sendSchedule {
      type
      interval
    }`,
    getValueEdit: (value: any) => {
      return value ? { type: value.type || CAMPAIGN_MAIL_SEND_NOW, sendBatch: false, interval: Number(value.interval) } : null;
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_CAMPAIGN_SCHEDULE_SEND]: {
          type: value.type,
          interval: Number(value.interval)
        }
      };
    }
  },
  [keyNames.KEY_CAMPAIGN_EXPENSES]: {
    component: components.ExpensesView,
    componentProps: {},
    schema: `expenses {
      id
      name
      amount {
        amount
        currency
      }
    }`
  },
  [keyNames.KEY_CAMPAIGN_KPI]: {
    component: components.KpiView,
    schema: `kpi {
      clickThroughRate
      totalPageView
    }`
  },
  [keyNames.KEY_CAMPAIGN_EMAIL_TEMPALTE]: {
    //component: commonComponents.TextView,
    schema: `emailTpl {
      id
      name
    }`
  },
  [keyNames.KEY_CAMPAIGN_SUBJECT]: {
    component: baseComponents.TextView,
    schema: 'subject',
    getValueView: (value: any) => {
      return value || <em>(none)</em>;
    }
  },
  [keyNames.KEY_CAMPAIGN_CONTENT]: {
    //component: commonComponents.TextView,
    schema: `
      content
    `
    // getValueView: (value: any) => {
    //   return value?.name;
    // }
  },
  [keyNames.KEY_CAMPAIGN_SENDER]: {
    component: components.SenderView,
    schema: `sender {
      type
      name
      email
    }`,
    getValueView: (value: any) => {
      if (value?.emails) {
        return value;
      } else {
        return value
          ? {
              type: value.type,
              emails: value.name ? [{ name: value.name, email: value.email }] : []
            }
          : null;
      }
    },
    getValueEdit: (value: any) => {
      return value
        ? {
            type: value.type,
            emails: value.name ? [{ name: value.name, email: value.email }] : []
          }
        : null;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_SENDER]: { type: value.type, name: value.emails[0].name, email: value.emails[0].email } };
    }
  },
  [keyNames.KEY_CAMPAIGN_REPLY_TRACKING]: {
    component: baseComponents.SwitchView,
    schema: `replyTracking`
  },
  [keyNames.KEY_CAMPAIGN_REPLY_TO]: {
    component: components.ReplyToView,
    schema: `replyTo {
      type
      email
    }`,
    getValueView: (value: any) => {
      if (value?.emails) {
        return value;
      } else {
        return value
          ? {
              type: value.type,
              emails: value.email ? [value.email] : []
            }
          : null;
      }
    },
    getValueEdit: (value: any) => {
      return value
        ? {
            type: value.type,
            emails: value.email ? [value.email] : []
          }
        : null;
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_REPLY_TO]: { type: value.type, email: value.emails[0] } };
    }
  },
  [keyNames.KEY_CAMPAIGN_FOOTER]: {
    component: baseComponents.TextView,
    schema: 'footer',
    getValueView: (value: any) => {
      return value || <em>(none)</em>;
    }
  },
  [keyNames.KEY_CAMPAIGN_SMS_TYPE]: {
    component: baseComponents.RadioGroupView,
    componentProps: {
      options: SMS_TYPE_OPTIONS
    },
    schema: `smsType`,
    getValueView: (value: any) => {
      if (value?.value) {
        return value;
      } else {
        return SMS_TYPE_OPTIONS.find((_option) => _option.value === value);
      }
    },
    getValueEdit: (value: string) => {
      return SMS_TYPE_OPTIONS.find((_option) => _option.value === value) || SMS_TYPE_OPTIONS[0];
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_CAMPAIGN_SMS_TYPE]: value.value };
    }
  },
  [keyNames.KEY_CAMPAIGN_CREATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_CAMPAIGN_CREATED_BY]: {
    component: null,
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  },
  [keyNames.KEY_CAMPAIGN_UPDATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_CAMPAIGN_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name;
    }
  }
};

export default viewConfig;
