import * as baseComponents from '@base/config/write-field/components';
import * as components from './components';
import * as keyNames from '@opportunity/config/keyNames';
import validators from '@base/utils/validation/fieldValidator';
import CompetitorAutoComplete from '@competitor/containers/CompetitorAutoComplete';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const fieldsConfig: any[] = [
  {
    keyName: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_REASON,
    columns: 2,
    Component: components.LostReasonAutoComplete,
    languageKey: 'Status Reason',
    componentProps: {
      options: [{ keyName: 'UNKNOWN', languageKey: 'Unknown Reason' }]
    },
    validate: {
      required: validators.required
    }
  },
  {
    keyName: keyNames.KEY_NAME_OPPORTUNITY_ACTUAL_REVENUE,
    columns: 2,
    Component: baseComponents.NumberField,
    languageKey: 'Actual Revenue',
    componentProps: {
      fullWidth: true
    },
    validate: {
      required: validators.required
    }
  },
  {
    keyName: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE,
    columns: 2,
    Component: baseComponents.DatePicker,
    languageKey: 'Closed Date',
    componentProps: {
      inputFormat: 'MM/DD/YYYY'
    },
    validate: {
      required: validators.date
    },
    defaultValue: dayjs().add(1, 'day'),
    parseParam: (v: Date) => (v ? v.toISOString() : null)
  },
  {
    keyName: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_COMPETITOR,
    columns: 2,
    Component: CompetitorAutoComplete,
    languageKey: 'Competitor',
    componentProps: {
      fullWidth: true
    },
    validate: {
      required: validators.required
    }
  },
  {
    keyName: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DESC,
    columns: 1,
    Component: TextField,
    languageKey: 'Description',
    componentProps: {
      fullWidth: true,
      multiline: true,
      row: 2
    },
    validate: {
      required: validators.required
    }
  }
];

export default fieldsConfig;
