import dayjs from 'dayjs';

import { DatePicker, LookUp } from '@base/config/write-field/components';
import { IdName, OptionValue } from '@base/types/common';
import { User } from '@base/types/user';
import validators from '@base/utils/validation/fieldValidator';
import { Schedule } from '@mui/icons-material';
import { OutlinedInput, TextField } from '@mui/material';
import { useGetModuleProcesses } from '@process/hooks/useModule';
import {
  KEY_NAME_PROJECT_ACCOUNT,
  KEY_NAME_PROJECT_DESCRIPTION,
  KEY_NAME_PROJECT_DUE_DATE,
  KEY_NAME_PROJECT_ESTIMATE_DURATION,
  KEY_NAME_PROJECT_MEMBERS,
  KEY_NAME_PROJECT_NAME,
  KEY_NAME_PROJECT_PARENT,
  KEY_NAME_PROJECT_PROCESS,
  KEY_NAME_PROJECT_START_DATE,
  KEY_NAME_PROJECT_TYPE
} from '@project/config/keyNames';
import { AssignRole } from '@project/types/project';

import { CustomerAutoComplete, DropdownTree, MemberWrite, SettingBoxWrite } from './components';

export const ProjectWriteField = {
  [KEY_NAME_PROJECT_NAME]: {
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
    languageKey: 'ncrm_project_project_name'
  },
  [KEY_NAME_PROJECT_PARENT]: {
    component: DropdownTree,
    defaultValue: null,
    languageKey: 'ncrm_project_project_parent',
    componentProps: {
      options: [],
      title: 'Select Parent'
    },
    parseParam: (v: any) => {
      return v
        ? {
            id: v.id,
            name: v.name
          }
        : null;
    }
  },
  [KEY_NAME_PROJECT_TYPE]: {
    component: SettingBoxWrite,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    languageKey: 'ncrm_project_project_type',
    componentProps: {
      type: 'TYPE_PROJECT'
    },
    parseParam: (v: OptionValue) => {
      return v
        ? {
            id: v.keyName,
            name: v.languageKey
          }
        : null;
    }
  },
  [KEY_NAME_PROJECT_DESCRIPTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_project_project_description'
  },

  // [KEY_NAME_PROJECT_PRICE_UNIT]: {
  //   languageKey: 'ncrm_project_project_price_unit',
  //   component: SelectBox,
  //   validate: {
  //     required: validators.date
  //   },
  //   defaultValue: null,
  //   componentProps: {
  //     options: []
  //   }
  // },
  [KEY_NAME_PROJECT_START_DATE]: {
    languageKey: 'ncrm_project_project_start_date',
    component: DatePicker,
    componentProps: {
      inputFormat: 'YYYY/MM/DD'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs(),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [KEY_NAME_PROJECT_DUE_DATE]: {
    languageKey: 'ncrm_project_project_due_date',
    component: DatePicker,
    componentProps: {
      inputFormat: 'YYYY/MM/DD'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs(),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  [KEY_NAME_PROJECT_ACCOUNT]: {
    component: CustomerAutoComplete,
    componentProps: {
      single: true,
      showAvatar: false,
      showEmail: false,
      placement: 'left'
    },
    showFullRow: false,
    defaultValue: [],
    languageKey: 'ncrm_project_project_account',
    parseParam: (v: any) => {
      return v
        ? {
            id: v.id,
            name: v.name
          }
        : null;
    }
  },
  [KEY_NAME_PROJECT_ESTIMATE_DURATION]: {
    languageKey: 'ncrm_project_project_estimate_duration',
    component: OutlinedInput,
    validate: {
      required: validators.required
    },
    useTooltip: true,
    tooltipLangKey: `mth: will parse to months (4 weeks per month)
    w: will parse to weeks (5 days per week)
    d: will parse to days (8 hours per day)
    h: will parse to hours
    m: will parse to minutes
    `,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      placeholder: '1w 2d 3h 4m',
      startAdornment: <Schedule sx={{ fontSize: 18, color: 'secondary' }} />
    },
    defaultValue: ''
  },
  // [KEY_NAME_PROJECT_STATUS]: {
  //   languageKey: 'ncrm_project_project_status',
  //   component: SelectBox,
  //   defaultValue: null,
  //   componentProps: {
  //     options: []
  //   }
  // },
  [KEY_NAME_PROJECT_PROCESS]: {
    component: LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_PROJECT' },
      isSearch: false
    },
    defaultValue: null,
    validate: {
      required: validators.required
    },
    showFullRow: true,
    languageKey: 'ncrm_project_project_process',
    parseParam: (v: IdName) => {
      return v
        ? {
            id: v.id,
            name: v.name
          }
        : null;
    }
  },
  [KEY_NAME_PROJECT_MEMBERS]: {
    languageKey: 'ncrm_project_project_member',
    component: MemberWrite,
    componentProps: {
      single: false,
      showAvatar: true
    },
    showFullRow: true,
    defaultValue: [],
    parseParam: (v: AssignRole[]) => {
      return v
        ? v.map((_v: AssignRole) => {
            return {
              id: _v.id,
              role: _v.role,
              fields: _v.fields.map((_f) => {
                return {
                  field: _f.field,
                  assignTo: _f.assignTo.map((_j: User) => {
                    const group = _j.properties?.crmBaseGroup ?? { id: '', name: '' };
                    return {
                      user: {
                        id: _j.id,
                        name: _j.name
                      },
                      group: {
                        id: group.id,
                        name: group.name
                      }
                    };
                  })
                };
              })
            };
          })
        : null;
    }
  }
};

export default ProjectWriteField;
