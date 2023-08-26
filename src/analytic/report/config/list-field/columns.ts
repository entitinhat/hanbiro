import commonConfigs from '@base/config/list-field/columns';
import * as keyNames from '@analytic/report/config/keyNames';
import { KEY_NAME_CREATED_BY } from '@base/config/keyNames';

export const configFields = {
  ...commonConfigs,
  [keyNames.REPORT_NAME]: {
    schema: `
      name
    `
  },
  [KEY_NAME_CREATED_BY]: {
    schema: `createdBy {
      id
      name
      fullName
    }`
  },
  [keyNames.REPORT_ACTIVE]: {
    schema: `active`
  },
  [keyNames.REPORT_RECIPIENT]: {
    schema: `recipients {
      id
      name
    }`
  },
  [keyNames.REPORT_SUBJECT]: {
    schema: `subject`
  },
  [keyNames.REPORT_CONTENT]: {
    schema: `content`
  },
  [keyNames.REPORT_ASSIGNMENT_GROUP]: {
    schema: `
    assignmentGroupType
    assignmentGroups{
      id
      name
    }
  `
  },
  [keyNames.REPORT_REPORTING_CYCLE]: {
    schema: `reportingCycle {
      frequency
      dayAt
      monthAt
      timeAt
    }`
  },
  [keyNames.REPORT_DATE_RANGE]: {
    schema: `dateRange`
  },
  [keyNames.REPORT_REPORTING_CONTENT]: {
    schema: `
    pages {
      id
      name
      displayMode
      displayGrid
      sections {
        section
        charts
      }
    }
  `
  }
};
