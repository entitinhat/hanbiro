// import * as keyNames from '@desk/ticket/config/data-types';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import * as components from './components';
import * as commonComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';

import { WriteConfig } from '@base/types/common';
import { TextField } from '@mui/material';
import { AssignmentChannelOptions, AssignmentTypeOptions } from '../constants';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_NAME]: {
    component: TextField,
    showFullRow: true
    // validate: {
    //   required: validators.required
    // },
    // defaultValue: ''
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_MODULE]: {
    component: components.ModulePicker,
    showFullRow: true,
    componentProps: {
      defaultDesk: false
    }
    // validate: {
    //   required: validators.required
    // },
    // defaultValue: ''
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_CHANNEL]: {
    component: components.ChannelAutoComplete,
    showFullRow: true,
    componentProps: {
      options: AssignmentChannelOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    }
    // validate: {
    //   required: validators.required
    // },
    // defaultValue: ''
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO]: {
    component: components.AssignTo,
    showFullRow: true
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_DESC]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 3,
      autoComplete: 'off'
    },
    defaultValue: '',
    showFullRow: true
    // validate: {
    //   required: validators.required
    // },
    // defaultValue: ''
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES]: {
    component: components.RuleCriteria,
    componentProps: {},
    hideTitle: true,
    showFullRow: true
    // validate: {
    //   required: validators.required
    // },
    // defaultValue: ''
  }
  // [keyNames.KEY_TICKET_PRIORITY]: {
  //   component: components.PrioritySelect,
  //   componentProps: {
  //     isDisabled: true
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => value?.priority || ''
  // },
  // [keyNames.KEY_TICKET_STATUS]: {
  //   component: commonComponents.DataSourceSelect,
  //   componentProps: {
  //     single: true,
  //     sourceKey: 'ticket_status',
  //     sourceType: 'field'
  //   },
  //   showFullRow: true,
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: 'STATUS_NEW',
  //   //parseValue: (valueApi: any) => valueApi || null,
  //   parseParam: (value: any) => value?.value || 'STATUS_NEW'
  // },
  // [keyNames.KEY_TICKET_CLASSIFICATION]: {
  //   component: components.Classification,
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: true,
  //   parseParam: (value: any) => {
  //     const newParams: any = [];
  //     if (value?.language) {
  //       newParams.push({
  //         classification: {
  //           id: value.language.id,
  //           name: value.language.name
  //         },
  //         value: value.language.value
  //       });
  //     }
  //     if (value?.region) {
  //       newParams.push({
  //         classification: {
  //           id: value.region.id,
  //           name: value.region.name
  //         },
  //         value: value.region.value
  //       });
  //     }
  //     return newParams;
  //   }
  // },
  // [keyNames.KEY_TICKET_ASSIGN_GROUP]: {
  //   component: components.AssignGroupAutoComplete,
  //   componentProps: {
  //     single: true
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: true,
  //   parseParam: (value: any) => (value ? { id: value.id, name: value.name } : {})
  // },
  // [keyNames.KEY_TICKET_ASSIGN_USER]: {
  //   component: components.AssignRepAutoComplete,
  //   componentProps: {
  //     single: true
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: true,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           user: { id: value.id, name: value.name },
  //           group: value?.group || null //{ id: '', name: '' }
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_CATEGORY]: {
  //   component: components.CategoryAutoComplete,
  //   componentProps: {},
  //   defaultValue: null,
  //   showFullRow: false,
  //   validate: {
  //     required: validators.required
  //   },
  //   parseParam: (value: any) => (value ? { id: value.id, name: value.name } : {})
  // },
  // [keyNames.KEY_TICKET_PROCESS]: {
  //   component: components.ProcessAutoComplete,
  //   componentProps: {
  //     // fetchList: useTicketProcesses,
  //     // fetchList: useGetModuleProcesses,
  //     // fieldValue: 'id',
  //     // fieldLabel: 'name',
  //     // extraParams: { module: 'MODULE_DESK' },
  //     // isSearch: false
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           id: value.id,
  //           name: value.name
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_CHANNEL]: {
  //   component: commonComponents.LookUp,
  //   componentProps: {
  //     // fetchList: useTicketChannels,
  //     fieldValue: 'id',
  //     fieldLabel: 'name'
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           id: value.id,
  //           name: value.name
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_CONTENT]: {
  //   component: commonComponents.TuiEditor,
  //   componentProps: {},
  //   validate: {},
  //   defaultValue: '',
  //   showFullRow: true
  // },
  // [keyNames.KEY_TICKET_CUSTOMER]: {
  //   component: components.CustomerAutoComplete,
  //   componentProps: {
  //     single: true,
  //     showAvatar: true,
  //     addLabel: 'Add new customer'
  //   },
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           id: value.id,
  //           name: value.name
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_CONTACT]: {
  //   component: components.CustomerAutoComplete,
  //   componentProps: {
  //     single: true,
  //     showAvatar: true,
  //     placeholder: 'ncrm_generalsetting_assignment_rule_placeholder_contact',
  //     category: 'contact',
  //     addLabel: 'Add new contact'
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           id: value.id,
  //           name: value.name
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_PRODUCT]: {
  //   component: components.ProductAutoComplete,
  //   componentProps: {
  //     single: true
  //   },
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: null,
  //   showFullRow: false,
  //   parseParam: (value: any) => {
  //     return value
  //       ? {
  //           id: value.id,
  //           name: value.name
  //         }
  //       : {};
  //   }
  // },
  // [keyNames.KEY_TICKET_TAG]: {
  //   component: commonComponents.TagInput,
  //   componentProps: {
  //     // fetchList: useTicketTags,
  //     fieldValue: 'id',
  //     fieldLabel: 'name'
  //   },
  //   validate: {},
  //   defaultValue: null,
  //   showFullRow: true,
  //   parseParam: (value: any) => {
  //     return value
  //       ? value?.map((_item: any) => {
  //           return {
  //             id: _item.id,
  //             name: _item.name
  //           };
  //         })
  //       : [];
  //   }
  // }
};
export default writeConfig;
