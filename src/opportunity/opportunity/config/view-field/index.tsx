//third-party
import { t } from 'i18next';
import _ from 'lodash';

//project
//import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';
import validators from '@base/utils/validation/fieldValidator';
import RouteName from '@base/components/@hanbiro/RouteName';
import { OptionValue } from '@base/types/common';
import { LabelValue } from '@base/types/app';
import { FieldConfig } from '@base/types/pagelayout';

//related menu
import { useGetModuleProcesses } from '@process/hooks/useModule';

//menu
import * as keyNames from '@opportunity/config/keyNames';
import * as components from './components';
import {
  CLOSE_TYPE_OPTIONS,
  CONTACT_METHOD_STATUS_OPTIONS,
  CUST_TYPES,
  DECISION_MAKER_OPTIONS,
  OPP_TYPES,
  SALES_REP_TYPE_USER,
  TIME_FRAME_OPTIONS
} from '../constants';
import dayjs from 'dayjs';

const viewConfig: FieldConfig = {
  [keyNames.KEY_NAME_OPPORTUNITY_CODE]: {
    //unsure
    schema: 'code',
    viewProps: {
      userPermission: {
        isEdit: false,
        isShow: true
      }
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TITLE]: {
    schema: 'title'
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TYPE]: {
    schema: `type`,
    component: baseComponents.TextView,
    getValueView: (value: any) => {
      return OPP_TYPES.concat(CUST_TYPES).find((v: LabelValue) => v.value === value)?.label || <em>(none)</em>;
    },
    viewProps: {
      userPermission: {
        isEdit: false,
        isShow: true
      }
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]: {
    schema: `customer {
      id
      name
      category
      parentAccount {
        id
        name
      }
      account {
        id
        name
      }
    }`,
    // getMutationValue: (value: any) => {
    //   return { [keyNames.KEY_NAME_OPPORTUNITY_WEBSITE]: value ? { protocol: value.protocol, website: value.website } : null };
    // }
    componentProps: {
      single: true
    },
    component: components.CustomerViewName
  },
  [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]: {
    component: components.SalesRepView,
    schema: `salesRepType
    salesReps {
      user {
        user {
          id
          name
        }
        group {
          id
          name
        }
      }
      team {
        id
        name
        members {
          user {
            user {
              id
              name
            }
            group {
              id
              name
            }
          }
          role {
            keyName
            languageKey
          }
        }
      }
    }`,
    getValue: (data: any) => {
      const user = data?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.map((v: any) => ({
        id: v?.user?.user?.id,
        name: v?.user?.user?.name
      }));

      const team = data?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.map((v: any) => ({
        id: v?.team?.id,
        name: v?.team?.name,
        members: v?.team?.members
      }));

      return {
        [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]:
          data?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_USER ? { user } : { team },
        [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]: data?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE]: value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE],
        [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]:
          value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP_TYPE] === SALES_REP_TYPE_USER
            ? value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.user?.map((v: any) => ({
                id: v?.id,
                name: v?.name
              }))
            : value?.[keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]?.team?.map((v: any) => ({
                id: v?.id,
                name: v?.name
              }))
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_REFERRER]: {
    schema: `referrer {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT]: {
    // component: baseComponents.WebsiteInputView,
    // componentProps: {
    //   isMultiple: false,
    //   disableLabel: true
    // },
    schema: `products {
      id
      name
    }`,
    component: components.ProductView,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT]: value?.map((v: any) => ({ id: v?.id, name: v?.name })) };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_COMPETITOR]: {
    // component: baseComponents.WebsiteInputView,
    // componentProps: {
    //   isMultiple: false,
    //   disableLabel: true
    // },
    schema: `competitors {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PROCESS]: {
    schema: `process {
      id
      name
    }`,
    component: baseComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    validate: {
      //required: validators.required
      required: (v: string) => validators.required(v) || 'Process is required.'
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_STAGE]: {
    schema: `stage {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_STATUS]: {
    schema: `status {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PROBABILITY]: {
    schema: `probability`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_WEIGHTED_AMOUNT]: {
    schema: `weightedAmount`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    componentProps: {},
    showFullRow: true,
    schema: `description`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]: {
    component: baseComponents.DateTimeView,
    schema: 'closedAt'
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CREATED_BY]: {
    component: baseComponents.UserInputView,
    schema: `createdBy {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CREATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_OPPORTUNITY_UPDATED_BY]: {
    component: baseComponents.UserInputView,
    schema: `updatedBy {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_UPDATED_AT]: {
    component: baseComponents.DateTimeView,
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_OPPORTUNITY_DELETED_BY]: {
    schema: `restore {
      deletedBy {
        id
        name
      }
      deletedAt
    }`
  },
  [keyNames.KEY_NAME_OPPORTUNITY_DELETED_AT]: {
    schema: `restore {
      deletedBy {
        id
        name
      }
      deletedAt
    }`
  },

  // view
  [keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY,
    component: components.WinProbabilityView
  },
  [keyNames.KEY_NAME_OPPORTUNITY_INSIGHT_ESTIMATED_REVENUE]: {
    schema: `
    insightEstimatedRevenue
    currency
    fCurrency {
      code
      currencySymbol
      currencyFormat
      pricePrecision
    }
    `,
    component: baseComponents.NumberFieldCurrencyView,
    componentProps: {
      optionOnlyCurrency: true
    },
    getValue: (data: any) => {
      return {
        moneyValue: data?.[keyNames.KEY_NAME_OPPORTUNITY_INSIGHT_ESTIMATED_REVENUE],
        currency: data?.[keyNames.KEY_NAME_OPPORTUNITY_CURRENCY],
        fCurrency: data?.fCurrency
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE]: {
    schema: `
    estimatedRevenue
    currency
    fCurrency {
      code
      currencySymbol
      currencyFormat
      pricePrecision
    }
    `,
    component: baseComponents.NumberFieldCurrencyView,
    componentProps: {
      optionOnlyCurrency: true
    },
    getValue: (data: any) => {
      return {
        moneyValue: data?.[keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE],
        currency: data?.[keyNames.KEY_NAME_OPPORTUNITY_CURRENCY],
        fCurrency: data?.fCurrency
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE]: value?.moneyValue,
        [keyNames.KEY_NAME_OPPORTUNITY_CURRENCY]: value?.fCurrency?.code
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_CLOSE_AT]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_CLOSE_AT,
    component: baseComponents.DateTimeView,
    getValueView: (value: any) => {
      if (dayjs.isDayjs(value)) {
        return value.toDate().toISOString();
      } else {
        return value;
      }
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_BUDGET]: {
    schema: `
      budget
      currency
      fCurrency {
        code
        currencySymbol
        currencyFormat
        pricePrecision
      }
    `,
    // component: baseComponents.NumberFieldView,
    component: baseComponents.NumberFieldCurrencyView,
    componentProps: {
      optionOnlyCurrency: true
    },
    getValue: (data: any) => {
      return {
        moneyValue: data?.[keyNames.KEY_NAME_OPPORTUNITY_BUDGET],
        currency: data?.[keyNames.KEY_NAME_OPPORTUNITY_CURRENCY],
        fCurrency: data?.fCurrency
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_BUDGET]: value?.moneyValue,
        [keyNames.KEY_NAME_OPPORTUNITY_CURRENCY]: value?.fCurrency?.code
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_DECISION_MAKER]: {
    //unsure
    schema: keyNames.KEY_NAME_OPPORTUNITY_DECISION_MAKER,
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: DECISION_MAKER_OPTIONS
    },
    getValueView: (value: any) => {
      return DECISION_MAKER_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return DECISION_MAKER_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_DECISION_MAKER]: value?.keyName
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PURCHASE_PROCESS]: {
    schema: `
    purchaseProcess {
       id
       name
      }
    `,
    component: baseComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    getValueView: (value: any) => {
      return value ? value : '';
    },
    validate: {
      //required: validators.required
      required: (v: string) => validators.required(v) || 'Process is required.'
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_QUOTE_PROCESS]: {
    schema: `
    quoteProcess {
       id
       name
      }
    `,
    component: baseComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    validate: {
      //required: validators.required
      required: (v: string) => validators.required(v) || 'Process is required.'
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER_NEED]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER_NEED,
    component: baseComponents.TextAreaView
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TIME_FRAME]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_TIME_FRAME,
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: TIME_FRAME_OPTIONS
    },
    getValueView: (value: any) => {
      return TIME_FRAME_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return TIME_FRAME_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_TIME_FRAME]: value?.keyName
      };
    }
  },

  // view center
  [keyNames.KEY_NAME_OPPORTUNITY_COLLECTION_METHOD]: {
    schema: `
    collectionMethod {
      id
      name
      parent {
        id
        name
      }
    }
    `,
    hideFieldLabel: true,
    component: components.CollectionMethodView,
    getValueEdit: (value: any) => {
      return {
        id: value?.id,
        name: value?.name
      };
      // return {
      //   keyName: value?.parent?.id || '',
      //   languageKey: value?.parent?.name || '',
      //   children: { keyName: value?.id || '', languageKey: value?.name || '' }
      // };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_COLLECTION_METHOD]: {
          id: value?.id,
          name: value?.name
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
    schema: `
    contactMethod {
      preferred {
        id
        name
      }
      email
      bulkEmail
      phone
      sms
    }
    `
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PAIN_POINTS]: {
    schema: `
    painPoints {
      id
      name
    }
    `
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PREFERRED]: {
    languageKey: 'opportunity_opportunity_field_basic_preferred',
    showFullRow: true,
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]?.[keyNames.KEY_NAME_OPPORTUNITY_PREFERRED];
    },
    component: components.LeadPreferredView,
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
          [keyNames.KEY_NAME_OPPORTUNITY_PREFERRED]: value
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_EMAIL]: {
    languageKey: 'opportunity_opportunity_field_basic_email',
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]?.[keyNames.KEY_NAME_OPPORTUNITY_EMAIL];
    },
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: CONTACT_METHOD_STATUS_OPTIONS
    },
    getValueView: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
          [keyNames.KEY_NAME_OPPORTUNITY_EMAIL]: value?.keyName
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL]: {
    languageKey: 'opportunity_opportunity_field_basic_bulk_email',
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]?.[keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL];
    },
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: CONTACT_METHOD_STATUS_OPTIONS
    },
    getValueView: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
          [keyNames.KEY_NAME_OPPORTUNITY_BULK_EMAIL]: value?.keyName
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PHONE]: {
    languageKey: 'opportunity_opportunity_field_basic_phone',
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]?.[keyNames.KEY_NAME_OPPORTUNITY_PHONE];
    },
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: CONTACT_METHOD_STATUS_OPTIONS
    },
    getValueView: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
          [keyNames.KEY_NAME_OPPORTUNITY_PHONE]: value?.keyName
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_SMS]: {
    languageKey: 'opportunity_opportunity_field_basic_sms',
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]?.[keyNames.KEY_NAME_OPPORTUNITY_SMS];
    },
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: CONTACT_METHOD_STATUS_OPTIONS
    },
    getValueView: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return CONTACT_METHOD_STATUS_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CONTACT_METHOD]: {
          [keyNames.KEY_NAME_OPPORTUNITY_SMS]: value?.keyName
        }
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_IDENTIFY_CONTACT]: {
    schema: `
      identifyContacts {
        id
        name
        buyingRole {
          id
          name
        }
        mobiles {
          id
          label
          labelValue
          country
          fCountry {
            country
            isoCode2
            isoCode3
            phoneCode
            region
          }
          mobileNumber
        }
        phones {
          id
          label
          labelValue
          country
          fCountry {
            country
            isoCode2
            isoCode3
            phoneCode
            region
          }
          phoneNumber
        }
        emails {
          id
          label
          labelValue
          email
        }
        department
        job {
          id
          name
        }
      }
    `
  },

  // view close opportunity
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE,
    component: baseComponents.SelectBoxView,
    componentProps: {
      options: CLOSE_TYPE_OPTIONS
    },
    getValueView: (value: any) => {
      return CLOSE_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === value) || value;
    },
    getValueEdit: (value: any) => {
      return CLOSE_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === value) || { keyName: '', languageKey: '' };
    },
    getMutationValue: (value: any, viewData: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE]: value?.keyName
      };
    }
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON]: {
    schema: `
    closedReason {
      id
      name
    }
    `
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE,
    component: baseComponents.DateTimeView
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_COMPETITOR]: {
    schema: `
    closedCompetitor {
      id
      name
    }
    `,
    component: components.CompetitorAutoComplete
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DESC]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DESC,
    component: baseComponents.TextAreaView,
    showFullRow: true
  },
  [keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE]: {
    schema: keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE,
    component: baseComponents.NumberFieldCurrencyView,
    componentProps: {
      optionOnlyCurrency: true
    },
    getValue: (data: any) => {
      return {
        moneyValue: data?.[keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE],
        currency: data?.[keyNames.KEY_NAME_OPPORTUNITY_CURRENCY],
        fCurrency: data?.fCurrency
      };
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE]: value?.moneyValue,
        [keyNames.KEY_NAME_OPPORTUNITY_CURRENCY]: value?.fCurrency?.code
      };
    }
  }
};

export default viewConfig;
