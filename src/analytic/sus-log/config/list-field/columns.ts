import commonConfigs from '@base/config/list-field/columns';
import * as keyNames from '@analytic/sus-log/config/keyNames';

export const configFields = {
  ...commonConfigs,
  [keyNames.SUS_LOG_ID]: {
    schema: `
      id
    `
  },
  [keyNames.SUS_LOG_SURL]: {
    schema: `
      sUrl
      backHalf{
        domain
        pathPrefix
        urlSuffix
      }
      deleted
    `
  },
  [keyNames.SUS_LOG_URL]: {
    schema: `
      url
    `
  },
  [keyNames.SUS_LOG_CTA]: {
    schema: `
      cta{
        id
        name
      }
    `
  },
  [keyNames.SUS_LOG_CAMPAIGN]: {
    schema: `
      campaign{
        id
        name
      }
    `
  },
  [keyNames.SUS_LOG_SOURCE]: {
    schema: `
      source
    `
  },
  [keyNames.SUS_LOG_MEDIUM]: {
    schema: `
      medium
    `
  },
  [keyNames.SUS_LOG_CUSTOMER]: {
    schema: `
      customer{
        id
        name
      }
    `
  },
  [keyNames.SUS_LOG_TOTAL_CLICK]: {
    schema: `
      totalClick
    `
  }
};
