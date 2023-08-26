//third-party
import { TextField } from '@mui/material';
import { t } from 'i18next';

//menu
import * as keyNames from '@quote/config/keyNames';
import * as components from '@quote/config/write-field/components';
import { useGetModuleProcesses } from '@process/hooks/useModule';

//project base
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { TemplateGroup } from '@base/types/app';

export default {
  [keyNames.KEY_NAME_QUOTE_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'quote'
    },
    //showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_QUOTE_OPPORTUNITY]: {
    component: components.OpportunityAutoComplete,
    componentProps: {
      single: true
    },
    //showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => (value ? { id: value.id, name: value.title } : null)
  },
  [keyNames.KEY_NAME_QUOTE_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_QUOTE_PROCESS]: {
    component: baseComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    //showFullRow: true,
    validate: {
      //required: validators.required
      required: (v: string) => validators.required(v) || 'Process is required.'
    },
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_QUOTE_CUSTOMER]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: true,
      showAvatar: true,
      showAddress: true,
      placeholder: 'Type or click to select a customer...'
    },
    showFullRow: true,
    validate: {
      required: (v: any) => validators.required(v?.name) || 'Customer is required.'
    },
    defaultValue: null,
    parseParam: (value: any) => value
  },
  // [keyNames.KEY_NAME_QUOTE_ACCOUNT]: {
  //   component: components.CustomerAutoComplete,
  //   componentProps: {
  //     single: true,
  //     showAvatar: true,
  //     //showAdd: true,
  //     //category: '',
  //     placeholder: 'Type or click to select a customer...'
  //   },
  //   showFullRow: true,
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) => ({
  //     id: value.id,
  //     name: value.name
  //   })
  // },
  // [keyNames.KEY_NAME_QUOTE_CONTACT]: {
  //   component: components.CustomerAutoComplete,
  //   componentProps: {
  //     single: true,
  //     isDisabled: true,
  //     showAvatar: true,
  //     category: 'contact',
  //     placeholder: 'Type or click to select a contact...'
  //   },
  //   validate: {},
  //   showFullRow: true,
  //   defaultValue: null,
  //   parseParam: (value: any) => ({
  //     id: value.id,
  //     name: value.name
  //   })
  // },
  [keyNames.KEY_NAME_QUOTE_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_QUOTE_TEMPLATE]: {
    // component: baseComponents.DataSourceSelect,
    // componentProps: {
    //   sourceKey: 'quote_template',
    //   sourceType: 'template',
    //   single: true,
    //   extraParams: {
    //     query: `group=6 stage=STAGE_ACTIVE`
    //   }
    // },
    component: components.SelectTemplate,
    componentProps: {
      useSelectBox: true,
      useItemTable: false,
      templateGroup: TemplateGroup.EMAIL
    },
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => (value?.id ? { id: value.id, name: t(value.languageKey) } : null)
  },
  [keyNames.KEY_NAME_QUOTE_EMAI_TEMPLATE]: {
    // component: baseComponents.DataSourceSelect,
    // componentProps: {
    //   sourceKey: 'email_template',
    //   sourceType: 'template',
    //   single: true,
    //   extraParams: {
    //     query: `group=2 stage=STAGE_ACTIVE`
    //   }
    // },
    component: components.SelectTemplate,
    componentProps: {
      useSelectBox: true,
      useItemTable: false,
      templateGroup: TemplateGroup.EMAIL
    },
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => (value?.id ? { id: value.id, name: t(value.languageKey) } : null)
  },
  [keyNames.KEY_NAME_QUOTE_DATE]: {
    component: baseComponents.DatePicker,
    componentProps: {},
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => value || null
  },
  [keyNames.KEY_NAME_QUOTE_EXPIRY_DATE]: {
    component: baseComponents.DatePicker,
    componentProps: {},
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => value || null
  },
  [keyNames.KEY_NAME_QUOTE_SALES_REP]: {
    component: components.UserAutoComplete,
    componentProps: {
      showAvatar: true,
      single: true
    },
    validate: {},
    //showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) =>
      value
        ? {
            user: {
              id: value.id,
              name: value.name
            }
          }
        : null
  },
  // [keyNames.KEY_NAME_QUOTE_BILL_TO]: {
  //   component: baseComponents.AddressInput,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) =>
  //     value && value.street.length > 0
  //       ? {
  //           //label: value.label?.label,
  //           //labelValue: value.labelValue,
  //           country: value.country?.isoCode2,
  //           addrState: value.state,
  //           city: value.city,
  //           street: value.street,
  //           zipcode: value.zipcode
  //         }
  //       : {}
  // },
  // [keyNames.KEY_NAME_QUOTE_SHIP_TO]: {
  //   component: baseComponents.AddressInput,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) =>
  //     value && value.street.length > 0
  //       ? {
  //           //label: value.label?.label,
  //           //labelValue: value.labelValue,
  //           country: value.country?.isoCode2,
  //           addrState: value.state,
  //           city: value.city,
  //           street: value.street,
  //           zipcode: value.zipcode
  //         }
  //       : {}
  // },
  [keyNames.KEY_NAME_QUOTE_ITEMS]: {
    component: components.QuoteItems,
    componentProps: {
      mode: 'w'
    },
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_QUOTE_TERM_CONDITION]: {
    component: components.TermCondition,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_QUOTE_CUSTOMER_NOTE]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_QUOTE_FILES]: {
    component: components.DigitalContentTable,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: [],
    parseParam: (value: any) =>
      value && value.length > 0
        ? value.map((_ele: any) => ({
            type: _ele.category,
            file: {
              id: _ele.id,
              name: _ele.name
            }
          }))
        : []
  },
  //for quote revision
  [keyNames.KEY_NAME_QUOTE_RECIPIENTS]: {
    component: baseComponents.EmailPhoneTagInput,
    componentProps: {
      placeholder: 'Type to select or enter to create a new email',
      showAvatar: true,
      showEmail: true,
      single: false
    },
    validate: {},
    showFullRow: true,
    defaultValue: [],
    parseParam: (value: any) =>
      value ? value.map((_ele: any) => ({ name: _ele.name, email: _ele.emails?.length > 0 ? _ele.emails[0]?.email : _ele.email })) : []
  },
  [keyNames.KEY_NAME_QUOTE_REVISION_ID]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'revision_quote'
    },
    //showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  }
};
