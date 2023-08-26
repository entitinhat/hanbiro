import { SelectBox } from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import { MODULE_OPTIONS, PROCESS_TRIGGER_OPTIONS } from '@process/config/constants';
import * as keyNames from '@process/config/keyNames';

import { ProductAutoComplete, SwitchWrite, UserAutoComplete } from './components';

const BusinessWriteField = {
  [keyNames.KEY_NAME_BUSINESS_MODULE]: {
    component: SelectBox,
    showFullRow: true,
    defaultValue: MODULE_OPTIONS[0],
    validate: {
      required: validators.required
    },
    useTooltip: false,
    tooltipLangKey: '',
    hideTtile: false,
    languageKey: 'process_business_module',
    componentProps: {
      options: MODULE_OPTIONS
    },
    parseParam: (value: any) => value.keyName
  },
  [keyNames.KEY_NAME_BUSINESS_NAME]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'process_business_name',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_BUSINESS_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    showFullRow: true,
    languageKey: 'process_business_description',
    defaultValue: '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_BUSINESS_ASSIGN_USER]: {
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true,
      placement: 'left'
    },
    showFullRow: true,
    defaultValue: [],
    languageKey: 'process_business_assign_user',
    parseParam: (_ele: any) => {
      if (_ele.length == 0) {
        return _ele;
      }

      return _ele.map((v: any) => {
        // const group =
        //   v.properties?.crmGroups?.length > 0 ? v.properties.crmGroups[0] : { id: '', name: '' };
        return {
          user: {
            id: v.id,
            name: v.name
          },
          group: {
            // id: group.id,
            // name: group.name,
            id: '',
            name: ''
          }
        };
      });
    }
  },
  [keyNames.KEY_NAME_BUSINESS_PRODUCT]: {
    component: ProductAutoComplete,
    showFullRow: true,
    defaultValue: [],
    languageKey: 'process_business_product',
    parseParam: (value: any) => value?.map((_ele: any) => ({ id: _ele.id, name: _ele.name }))
  },
  [keyNames.KEY_NAME_BUSINESS_SEND_EMAIL]: {
    component: SwitchWrite,
    languageKey: 'process_business_send_email',
    showFullRow: true,
    defaultValue: false,
    parseParam: (v: boolean) => v || false
  },
  [keyNames.KEY_NAME_BUSINESS_TRIGGER]: {
    component: SelectBox,
    validate: {
      required: validators.required
    },
    showFullRow: true,
    defaultValue: PROCESS_TRIGGER_OPTIONS[0],
    languageKey: 'process_business_trigger',
    componentProps: {
      options: PROCESS_TRIGGER_OPTIONS
    },
    parseParam: (value: any) => value.keyName
  },
  [keyNames.KEY_NAME_BUSINESS_USE_TEMPLATE]: {
    component: SwitchWrite,
    languageKey: 'process_business_use_template',
    showFullRow: true,
    defaultValue: true,
    parseParam: (v: boolean) => v || false
  },
};

export default BusinessWriteField;
