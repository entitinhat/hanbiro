// import * as keyNames from '@desk/ticket/config/data-types';
import * as keyNames from '@desk/ticket/config/keyNames';
import * as components from './components';
import * as commonComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { MENU_DESK } from '@base/config/menus';
import { WriteConfig } from '@base/types/common';
import { TextField } from '@mui/material';
import { useGetModuleProcesses } from '@process/hooks/useModule';

const writeConfig: WriteConfig = {
  [keyNames.KEY_TICKET_SUBJECT]: {
    component: TextField,
    componentProps: {
      type: 'text'
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: ''
  },
  [keyNames.KEY_TICKET_CODE]: {
    component: commonComponents.CodeGenerator,
    componentProps: {
      menu: MENU_DESK
    },
    showFullRow: false,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  // [keyNames.KEY_TICKET_PRIORITY]: {
  //   component: commonComponents.CodeGenerator,
  //   componentProps: {
  //     //menu: MENU_DESK
  //   },
  //   showFullRow: false,
  //   defaultValue: '',
  //   parseParam: (value: string) => value
  // },
  [keyNames.KEY_TICKET_PRIORITY]: {
    component: components.PrioritySelect,
    componentProps: {
      readOnly: true
    },
    validate: {},
    defaultValue: null,
    showFullRow: false,
    parseParam: (value: any) => value?.keyName || ''
  },
  [keyNames.KEY_TICKET_CLASSIFICATION]: {
    component: components.Classification,
    validate: {},
    defaultValue: null,
    showFullRow: true
  },
  [keyNames.KEY_TICKET_CATEGORY]: {
    component: components.CategorySelect,
    componentProps: { noProductPlaceholder: 'Please select a Product first...' },
    defaultValue: null,
    showFullRow: false,
    parseParam: (value: any) => (value ? { id: value.id, name: value.name } : null)
  },
  [keyNames.KEY_TICKET_PROCESS]: {
    component: commonComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' },
      isSearch: false
    },
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => {
      // console.log('KEY_TICKET_PROCESS', value);
      return value
        ? {
            id: value.id,
            name: value.name
          }
        : {};
    }
  },
  [keyNames.KEY_TICKET_CONTENT]: {
    component: commonComponents.TuiEditor,
    componentProps: {},
    validate: {},
    defaultValue: '',
    showFullRow: true
  },
  [keyNames.KEY_TICKET_DESCRIPTION]: {
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
  [keyNames.KEY_TICKET_CUSTOMER]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: true,
      showAvatar: true,
      showAdd: true,
      addLabel: 'Add new customer',
      category: 'all'
    },
    defaultValue: null,
    showFullRow: false,
    parseParam: (value: any) => {
      return value
        ? {
            id: value.id,
            name: value.name
          }
        : {};
    }
  },
  [keyNames.KEY_TICKET_PRODUCT]: {
    component: components.ProductAutoComplete,
    componentProps: {
      single: true
    },
    defaultValue: null,
    showFullRow: false,
    parseParam: (value: any) => {
      return value
        ? {
            id: value.id,
            name: value.name
          }
        : {};
    }
  },
  [keyNames.KEY_TICKET_TAG]: {
    component: components.Tags,
    componentProps: {
      fieldValue: 'id',
      fieldLabel: 'name'
    },
    validate: {},
    defaultValue: [],
    showFullRow: false,
    parseParam: (value: any) => {
      return value ? value : [];
    }
  },
  [keyNames.KEY_TICKET_ASSIGN_USER]: {
    component: components.AssignRepAutocomplete,
    componentProps: {
      single: true
    },
    validate: {},
    parseParam: (value: any) => {
      return value ? value : null;
    }
  }
};
export default writeConfig;
export const CategoryGroup = [keyNames.KEY_TICKET_CATEGORY, keyNames.KEY_TICKET_PRODUCT];
