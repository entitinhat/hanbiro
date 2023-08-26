//third-party
import { t } from 'i18next';
import _ from 'lodash';

//project
import { FieldConfig } from '@base/types/pagelayout';
import * as baseComponents from '@base/config/view-field/components';

//related-menu
import { useGetModuleProcesses } from '@process/hooks/useModule';

//menu
import * as keyNames from '@quote/config/keyNames';
import * as components from './components';
import { TemplateGroup } from '@base/types/app';
import { useEffect } from 'react';

const viewConfig: FieldConfig = {
  [keyNames.KEY_NAME_QUOTE_CODE]: {
    schema: 'code'
  },
  [keyNames.KEY_NAME_QUOTE_NAME]: {
    schema: 'name'
  },
  [keyNames.KEY_NAME_QUOTE_CUSTOMER]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: true,
      showAvatar: true,
      //showAdd: true,
      //category: '',
      placeholder: 'Type or click to select a customer...'
    },
    schema: `
    customerCategory
    customer {
      id
      code
      name
    }`,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_QUOTE_CUSTOMER_CATEGORY]: value.category,
        [keyNames.KEY_NAME_QUOTE_CUSTOMER]: { id: value.id, name: value.name, code: value.code }
      };
    }
  },
  [keyNames.KEY_NAME_QUOTE_ACCOUNT]: {
    component: components.CustomerView,
    componentProps: {
      single: true,
      showAvatar: true,
      //category: 'account',
      placeholder: 'Type or click to select customer...'
    },
    schema: ``,
    getMutationValue: (value: any) => {
      const newValue = value ? { id: value?.id, name: value?.name } : {};
      return { [keyNames.KEY_NAME_QUOTE_ACCOUNT]: newValue };
    }
  },
  [keyNames.KEY_NAME_QUOTE_CONTACT]: {
    component: components.CustomerView,
    componentProps: {
      single: true,
      showAvatar: true,
      category: 'contact',
      placeholder: 'Type or click to select contact...'
    },
    schema: ``,
    // getPropsEdit: (value: any) => {
    //   return { accountId: value.account.id };
    // },
    getMutationValue: (value: any) => {
      const newValue = value ? { id: value?.id, name: value?.name } : {};
      return { [keyNames.KEY_NAME_QUOTE_CONTACT]: newValue };
    }
  },
  // [keyNames.KEY_NAME_QUOTE_ACCOUNT]: {
  //   component: components.CustomerView,
  //   componentProps: {
  //     single: true,
  //     showAvatar: true,
  //     category: 'account',
  //     placeholder: 'Type or click to select account...'
  //   },
  //   schema: `account {
  //     id
  //     name
  //   }`,
  //   getMutationValue: (value: any) => {
  //     const newValue = value ? { id: value?.id, name: value?.name } : {};
  //     return { [keyNames.KEY_NAME_QUOTE_ACCOUNT]: newValue };
  //   }
  // },
  // [keyNames.KEY_NAME_QUOTE_CONTACT]: {
  //   component: components.CustomerView,
  //   componentProps: {
  //     single: true,
  //     showAvatar: true,
  //     category: 'contact',
  //     placeholder: 'Type or click to select contact...'
  //   },
  //   schema: `contact {
  //     id
  //     name
  //   }`,
  //   // getPropsEdit: (value: any) => {
  //   //   return { accountId: value.account.id };
  //   // },
  //   getMutationValue: (value: any) => {
  //     const newValue = value ? { id: value?.id, name: value?.name } : {};
  //     return { [keyNames.KEY_NAME_QUOTE_CONTACT]: newValue };
  //   }
  // },
  [keyNames.KEY_NAME_QUOTE_BILL_TO]: {
    component: baseComponents.AddressToInputView,
    componentProps: {},
    schema: `billTo {
        fCountry {
          isoCode3
          isoCode2
          country
        }
        zipcode
        addrState
        city
        street
      }`,
    getValueEdit: (value: any) => {
      return { ...value, country: value?.fCountry ?? '', state: value?.addrState ?? '' };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_NAME_QUOTE_BILL_TO]: newValue };
    }
  },
  [keyNames.KEY_NAME_QUOTE_SHIP_TO]: {
    component: baseComponents.AddressToInputView,
    componentProps: {},
    schema: `shipTo {
        fCountry {
          isoCode2
          isoCode3
          country
        }
        zipcode
        addrState
        city
        street
      }`,
    getValueEdit: (value: any) => {
      return { ...value, country: value?.fCountry ?? '', state: value?.addrState ?? '' };
    },
    getMutationValue: (value: any) => {
      const newValue =
        value.street.length > 0
          ? {
              //label: value.label?.label,
              //labelValue: value.labelValue,
              country: value.country?.isoCode2,
              addrState: value.state,
              city: value.city,
              street: value.street,
              zipcode: value.zipcode
            }
          : {};
      return { [keyNames.KEY_NAME_QUOTE_SHIP_TO]: newValue };
    }
  },
  [keyNames.KEY_NAME_QUOTE_OPPORTUNITY]: {
    component: components.QuoteOpportunityView,
    schema: `opportunity {
      id
      code
      title
    }`,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_QUOTE_OPPORTUNITY]: {
          id: value?.id || '',
          code: value?.code || ''
          // title: value?.title || ''
        }
      };
    }
  },
  [keyNames.KEY_NAME_QUOTE_DATE]: {
    component: baseComponents.DateTimeView,
    schema: 'quoteDate',
    getValueView: (val: any) => {
      return _.isString(val) ? val : val?.toISOString();
    },
    getValueEdit: (val: Date | string | null) => {
      const valueView = _.isString(val) ? val : val?.toISOString() || '';

      const shortDate = valueView?.length > 0 ? valueView.slice(0, 10) : '';

      if (shortDate !== '' && shortDate !== '0001-01-01' && shortDate !== '1970-01-01') {
        return val;
      } else {
        return new Date().toISOString();
      }
    }
  },
  [keyNames.KEY_NAME_QUOTE_EXPIRY_DATE]: {
    component: baseComponents.DateTimeView,
    schema: 'expiryDate',
    getValueView: (val: any) => {
      return _.isString(val) ? val : val?.toISOString();
    },
    getValueEdit: (val: Date | string | null) => {
      const valueView = _.isString(val) ? val : val?.toISOString() || '';

      const shortDate = valueView?.length > 0 ? valueView.slice(0, 10) : '';

      if (shortDate !== '' && shortDate !== '0001-01-01' && shortDate !== '1970-01-01') {
        return val;
      } else {
        return new Date().toISOString();
      }
    }
  },
  [keyNames.KEY_NAME_QUOTE_EXPECTED_SHIPMENT_DATE]: {
    component: baseComponents.DateTimeView,
    schema: 'expectedShipmentDate',
    getValueView: (val: any) => {
      return _.isString(val) ? val : val?.toISOString();
    },
    getValueEdit: (val: Date | string | null) => {
      const valueView = _.isString(val) ? val : val?.toISOString() || '';

      const shortDate = valueView?.length > 0 ? valueView.slice(0, 10) : '';

      if (shortDate !== '' && shortDate !== '0001-01-01' && shortDate !== '1970-01-01') {
        return val;
      } else {
        return new Date().toISOString();
      }
    }
  },
  [keyNames.KEY_NAME_QUOTE_PROCESS]: {
    component: baseComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    schema: `process {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_TEMPLATE]: {
    component: components.QuoteTplView,
    componentProps: {
      useSelectBox: true,
      useItemTable: false,
      templateGroup: TemplateGroup.EMAIL
    },
    schema: `quoteTpl {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      return {
        [keyNames.KEY_NAME_QUOTE_TEMPLATE]: {
          id: value?.id,
          name: value?.name
        }
      };
    }
  },
  [keyNames.KEY_NAME_QUOTE_EMAI_TEMPLATE]: {
    component: baseComponents.DataSourceView,
    componentProps: {
      sourceKey: 'email_template',
      sourceType: 'template',
      single: true
    },
    schema: `emailTpl {
      id
      name
    }`,
    getValueView: (value: any) => {
      return { ...value, languageKey: value?.name };
    },
    getMutationValue: (value: any) => {
      const newValue = value ? { id: value?.id, name: t(value?.languageKey) } : {};
      return { [keyNames.KEY_NAME_QUOTE_EMAI_TEMPLATE]: newValue };
    }
  },
  [keyNames.KEY_NAME_QUOTE_DESCRIPTION]: {
    component: baseComponents.TextAreaView,
    schema: keyNames.KEY_NAME_QUOTE_DESCRIPTION
  },
  [keyNames.KEY_NAME_QUOTE_SALES_REP]: {
    component: baseComponents.UserInputView,
    schema: `salesRep {
      id
      name
    }`,
    componentProps: {
      single: true,
      showAvatar: true
    },
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_NAME_QUOTE_SALES_REP]: value ? { user: { id: value.id, name: value.name } } : null };
    }
  },
  [keyNames.KEY_NAME_QUOTE_CREATED_BY]: {
    //component: commonComponents.TextView,
    schema: `createdBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name || '';
    }
  },
  [keyNames.KEY_NAME_QUOTE_CREATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_QUOTE_UPDATED_BY]: {
    component: null,
    schema: `updatedBy {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value?.name || '';
    }
  },
  [keyNames.KEY_NAME_QUOTE_UPDATED_AT]: {
    //component: commonComponents.DateTimeView,
    schema: 'updatedAt'
  },

  [keyNames.KEY_NAME_QUOTE_CUSTOMER_NOTE]: {
    component: components.CustomerNoteView,
    componentProps: {},
    schema: `customerNote`
  },
  [keyNames.KEY_NAME_QUOTE_TERM_CONDITION]: {
    component: components.TermConditionView,
    componentProps: {},
    schema: `termConditionContent`,
    getValue(data: any) {
      // console.log('value data: ', data);
      return {
        [keyNames.KEY_NAME_QUOTE_TERM_CONDITION]: data[keyNames.KEY_NAME_QUOTE_TERM_CONDITION],
        [keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT]: data[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT]
      };
    },
    getValueView: (value: any) => {
      // console.log('🚀 view value:', value);
      return value;
    },
    getValueEdit: (value: any) => {
      // console.log('🚀 edit value:', value);
      return value;
    },
    getMutationValue: (value: any) => {
      // console.log('🚀 mutation value:', value);
      return value;
    },
    getDefaultValue: (value: any) => {
      // console.log('🚀 default value:', value);
      return value;
    }
  },
  [keyNames.KEY_NAME_QUOTE_ITEMS]: {
    component: components.QuoteItemsView,
    componentProps: {
      mode: 'v'
    },
    schema: `
      items {
        id
        type
        product {
          id
          name
        }
        productItem {
          id
          name
          images {
            id
            name
            type
            orgName
          }
          basePrice {
            amount
            currency
          }
          unitPrice {
            amount
            currency
          }
          attrValues {
            id
            name
          }
          unit {
            id
            name
          }
          unitVal
          {
            id
            name
            qty
          }
        }
        price
        qty
        discount
        amount
      }
      currency
      totalDiscount
      subTotalAmount
      shipCharge
      isApplyTax
      tax
      taxAmount
      roundOff
      totalAmount
    `
  },
  [keyNames.KEY_NAME_QUOTE_TOTAL_AMOUNT]: {
    component: baseComponents.TextView,
    schema: `totalAmount`
  },

  [keyNames.KEY_NAME_QUOTE_RECIPIENTS]: {
    component: baseComponents.TextView,
    schema: `recipients {
      name
      email
    }`
  },
  [keyNames.KEY_NAME_QUOTE_STAGE]: {
    component: baseComponents.TextView,
    componentProps: {},
    schema: `stage {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_STATUS]: {
    componentProps: {},
    schema: `status {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_FILES]: {
    component: baseComponents.TextView,
    componentProps: {},
    schema: `files {
      id
      type
      file {
        id
        name
        type
      }
      createdBy {
      	id 
      	name
      }
      createdAt
    }`
  },
  // [keyNames.KEY_NAME_QUOTE_DELETED_BY]: {
  //   schema: `restore {
  //     deletedBy {
  //       id
  //       name
  //     }
  //     deletedAt
  //   }`
  // },
  [keyNames.KEY_NAME_QUOTE_DELETED_AT]: {
    schema: `restore {
      deletedBy {
        id
        name
      }
      deletedAt
    }`
  },

  // fix API not found field
  [keyNames.KEY_NAME_QUOTE_SUBJECT]: {
    componentProps: {},
    schema: ``
  },
  assignTo: {
    componentProps: {},
    schema: ``
  },
  createInvoice: {
    componentProps: {},
    schema: ``
  },
  priceList: {
    componentProps: {},
    schema: ``
  },
  productDetail: {
    componentProps: {},
    schema: ``
  },
  attachments: {
    componentProps: {},
    schema: ``
  },
  summary: {
    schema: ''
  }
};

export default viewConfig;
