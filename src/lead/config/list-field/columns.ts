import * as keyNames from '@lead/config/keyNames';
import commonConfigs from '@base/config/list-field/columns';
import { all, myLead, myGroupLead1, myGroupLead2, allDisqualified, allUndisqualified, allDeleted1, allDeleted2, gridSplit } from './leadColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  all: all,
  myLead: myLead,
  myGroupLead1: myGroupLead1,
  myGroupLead2: myGroupLead2,
  allDisqualified: allDisqualified,
  allUndisqualified: allUndisqualified,
  allDeleted1: allDeleted1,
  allDeleted2: allDeleted2,
  gridSplit: gridSplit
};

export const configFields = {
  ...commonConfigs,
  // [keyNames.KEY_LEAD_CONTACT_NAME]: {
  //   schema: `name`
  // },
  [keyNames.KEY_LEAD_TYPE]:{
    schema: `type`
  },
  [keyNames.KEY_LEAD_PRIORITIZE]: {
    schema: `isPrioritize`
  },
  [keyNames.KEY_LEAD_TITLE]: {
    schema: `title`
  },
  [keyNames.KEY_LEAD_COLLECTION_METHOD]: {
    schema: `collectionMethod {
      id
      name
    }`
  },
  [keyNames.KEY_LEAD_CONTACT_NAME]: {
    schema: `contactName`
  },
  [keyNames.KEY_LEAD_CONTACT_EMAIL]: {
    schema: `contactEmails {
      #label {
      #  languageKey
      #  label
      #}
      labelValue
      email
    }`
  },
  [keyNames.KEY_LEAD_SOURCE]: {
    schema: `source{
      menu
      ref {
        id
        name
      }
    }`
  },
  [keyNames.KEY_LEAD_ASSIGN_TO]: {
    schema: `assignTo {
      user {
       id
       name
      }
      group {
       id
       name
      }
      }`
  },
  [keyNames.KEY_LEAD_PRODUCT]: {
    schema: `products{
      id
      name
    }`
  },
  [keyNames.KEY_LEAD_DISQUALIFIED_DATE]: {
    schema: `#disqualifiedAt`
  },
  [keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE]: {
    schema: `#undisqualifiedAt`
  },
};
