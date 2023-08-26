import * as commonConfig from '@base/config/view-field';
import { FieldConfig } from '@base/types/pagelayout';
import * as commonComponents from "@base/config/view-field/components";
import * as components from './components';
import * as baseKeyNames from "@base/config/keyNames";
import * as keyNames from '@analytic/sus-log/config/keyNames';
import {mediumOptions, sourceOptions} from "@analytic/main/config/options";
import {t} from "i18next";

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.SUS_LOG_ID]: {
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_SURL]: {
    viewProps: {
      userPermission: { isEdit: false, isShow: true }
    },
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_URL]: {
    component: components.LinkUrl,
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_CTA]: {
    schema: `
      cta{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_CAMPAIGN]: {
    schema: `
      campaign{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_SOURCE]: {
    getValueView: (value: any) => {
      return value && sourceOptions?.[value] ? (t(sourceOptions[value]) as string) : '-';
    }
  },
  [keyNames.SUS_LOG_MEDIUM]: {
    getValueView: (value: any) => {
      return value && mediumOptions?.[value] ? (t(mediumOptions[value]) as string) : '-';
    }
  },
  [keyNames.SUS_LOG_TERM]: {
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_CONTENT]: {
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_CUSTOMER]: {
    schema: `
      customer{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_ACTIVITY]: {
    schema: `
      activity{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_PROCESS]: {
    schema: `
      process{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_DOCUMENT]: {
    schema: `
      document{
        id
        name
      }
    `,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [keyNames.SUS_LOG_TOTAL_CLICK]: {
    schema: `
      totalClick
    `,
    getValueView: (value: any) => {
      return value || 0;
    }
  },
  [keyNames.SUS_LOG_EMAIL]: {
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [keyNames.SUS_LOG_MOBILE]: {
    getValueView: (value: any) => {
      return value || '-';
    }
  },
  [baseKeyNames.KEY_NAME_CREATED_BY]: {
    schema: `createdBy {
      id
      name
    }`,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
  [baseKeyNames.KEY_NAME_UPDATED_BY]: {
    schema: `updatedBy {
      id
      name
    }`,
    component: commonComponents.TextView,
    getValueView: (value: any) => {
      return value?.name || '-';
    }
  },
};
export default viewFieldsConfig;
