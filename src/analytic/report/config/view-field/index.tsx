import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';
import { TuiEditor } from '@base/config/write-field/components';
import { cloneDeep, isArray, isBoolean, isString, keys, pick } from 'lodash';
import { dateRangeOptions } from '@base/config/options';
import { FieldConfig } from '@base/types/pagelayout';
import * as keyNames from '@analytic/report/config/keyNames';
import * as components from './components';
import { KEY_NAME_CREATED_BY } from '@base/config/keyNames';
import { EDateRangeType } from '@base/types/app';
import { EDisplayGridType } from '@analytic/main/types/enum';

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.REPORT_NAME]: {
    component: commonComponents.TextView,
    schema: 'name',
    getValueView: (value: any) => {
      return value || '';
    }
  },
  [KEY_NAME_CREATED_BY]: {
    component: components.Owner,
    showFullRow: false,
    schema: `createdBy {
      id
      name
      fullName
    }`,
    getValueView: (value: any) => {
      return value ?? {};
    }
  },
  [keyNames.REPORT_ACTIVE]: {
    component: commonComponents.SwitchView,
    showFullRow: false,
    schema: `active`,
    getValueView: (value: any) => {
      return !!value ?? false;
    }
  },
  [keyNames.REPORT_RECIPIENT]: {
    component: components.Recipient,
    showFullRow: false,
    schema: `recipients {
      id
      name
    }`,
    getValueView: (value: any) => {
      return value ?? [];
    },
    getValueEdit: (value: any) => {
      return !!value ? value.map((v: any) => ({ name: v.name, id: v.id })) : [];
    },
    getMutationValue: (value: any[]) => {
      return {
        [keyNames.REPORT_RECIPIENT]:
          value?.map((u: any) => ({
            user: {
              id: u.id ? u.id : '',
              name: u.name ? u.name : ''
            },
            group: {
              id: u.properties?.crmGroups?.length > 0 ? u.properties?.crmGroups[0]?.id : '',
              name: u.properties?.crmGroups?.length > 0 ? u.properties?.crmGroups[0]?.name : ''
            }
          })) ?? null
      };
    }
  },
  [keyNames.REPORT_SUBJECT]: {
    component: commonComponents.TextView,
    showFullRow: false,
    schema: `subject`
  },
  [keyNames.REPORT_CONTENT]: {
    component: commonComponents.EditorView,
    showFullRow: true,
    schema: `content`,
  },
  [keyNames.REPORT_ASSIGNMENT_GROUP]: {
    component: components.AssignmentGroup,
    showFullRow: true,
    schema: `
      assignmentGroupType
      assignmentGroups{
        id
        name
      }
    `,
    getValue: (data: any) => {
      return pick(data, ['assignmentGroupType', 'assignmentGroups']);
    },
    getMutationValue: (value: any) => {
      return {
        assignmentGroupType: value?.assignmentGroupType ?? '',
        assignmentGroups: value?.assignmentGroups?.map((v: any) => ({ id: v.id, name: v.name })) ?? null
      };
    }
  },
  [keyNames.REPORT_REPORTING_CYCLE]: {
    component: components.ReportingCycle,
    showFullRow: false,
    schema: `reportingCycle {
      frequency
      dayAt
      monthAt
      timeAt
    }`
  },
  [keyNames.REPORT_DATE_RANGE]: {
    component: components.DateRange,
    componentProps: {},
    showFullRow: false,
    schema: `dateRange`,
    getValueView: (value: any) => {
      const key = isString(value) ? value : value?.value ?? '';
      return !!key ? dateRangeOptions[key] : '';
    },
    getMutationValue: (value: any) => {
      return {
        [keyNames.REPORT_DATE_RANGE]: value || EDateRangeType.DATE_RANGE_THIS_MONTH
      };
    }
  },
  [keyNames.REPORT_REPORTING_CONTENT]: {
    showFullRow: true,
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
    `,
    component: components.ReportingContent,
    getValue: (data: any) => {
      const pages = !!data?.pages ? cloneDeep(data?.pages) : [];
      if (!!pages?.length) {
        return {pages: pages.map((p: any) => {
          if (p?.hasOwnProperty('displayGrid') && isBoolean(p.displayGrid)) {
            p.displayGrid = p.displayGrid ? EDisplayGridType.DISPLAY_GRID_SHOW : EDisplayGridType.DISPLAY_GRID_NEVER;
          }
          p.sections = p.sections?p.sections:[]
          return p;
        })};
      }
      return {pages:[...pages]};
    },
    getMutationValue: (value: any) => {
      return {
        pages:[...value.pages]
      };
    },
  }
};
export default viewFieldsConfig;
