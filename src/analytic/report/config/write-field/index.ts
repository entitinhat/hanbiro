import * as components from './components';
import * as commonComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import * as keyNames from '@analytic/report/config/keyNames';
import { WriteConfig } from '@base/types/common';
import { TextField } from '@mui/material';

const writeConfig: WriteConfig = {
  [keyNames.REPORT_SUBJECT]: {
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
  [keyNames.REPORT_NAME]: {
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
  [keyNames.REPORT_RECIPIENT]: {
    component: components.UserAutoComplete,
    componentProps: {},
    validate: {},
    showFullRow: true,
    defaultValue: null,
    parseParam: (v: any) =>
      v?.length > 0
        ? v?.map((u: any) => ({
            user: {
              id: u.id ? u.id : '',
              name: u.name ? u.name : ''
            },
            group: {
              id: u.properties?.crmGroups?.length > 0 ? u.properties?.crmGroups[0]?.id ?? '' : '',
              name: u.properties?.crmGroups?.length > 0 ? u.properties?.crmGroups[0]?.name ?? '' : ''
            }
          }))
        : null
  },
  [keyNames.REPORT_CONTENT]: {
    component: commonComponents.TuiEditor,
    componentProps: {},
    validate: {},
    defaultValue: '',
    showFullRow: true
  },
  [keyNames.REPORT_ASSIGNMENT_GROUP]: {
    component: components.AssignmentGroup,
    componentProps: {},
    validate: {},
    defaultValue: null,
    showFullRow: true,
    parseParam: (v: any) => (v?.length > 0 ? v?.map((u: any) => ({ id: u.id, name: u.name })) : null)
  },
  [keyNames.REPORT_REPORTING_CYCLE]: {
    component: components.ReportingCycle,
    componentProps: {},
    validate: {},
    defaultValue: '',
    showFullRow: true
  },
  [keyNames.REPORT_DATE_RANGE]: {
    component: components.DateRangeSelectBox,
    componentProps: {},
    validate: {},
    defaultValue: 'DATE_RANGE_THIS_MONTH',
    showFullRow: true
  },
  [keyNames.REPORT_REPORTING_CONTENT]: {
    component: components.ReportingContent,
    componentProps: {},
    validate: {},
    defaultValue: '',
    showFullRow: true
  }
};
export default writeConfig;
