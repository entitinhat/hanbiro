import * as keyNames from '@base/config/keyNames';
const configFields = {
  [keyNames.KEY_NAME_ID]: {
    schema: 'id'
  },
  [keyNames.KEY_NAME_NAME]: {
    schema: 'name'
  },
  [keyNames.KEY_NAME_CODE]: {
    schema: 'code'
  },
  [keyNames.KEY_NAME_ACTIVE]: {
    schema: keyNames.KEY_NAME_ACTIVE
  },
  [keyNames.KEY_NAME_CREATED_BY]: {
    schema: `createdBy{
      id
      name
      fullName
    }`
  },
  [keyNames.KEY_NAME_PRIORITY]: {
    schema: `priority{
      keyName
      languageKey
    }`
  },
  [keyNames.KEY_NAME_CREATED_AT]: {
    schema: 'createdAt'
  },
  [keyNames.KEY_NAME_UPDATED_BY]: {
    schema: `updatedBy{
      id
      name
      fullName
    }`
  },
  [keyNames.KEY_NAME_CLOSED_BY]: {
    schema: `closedBy{
      id
      name
      fullName
    }`
  },
  [keyNames.KEY_NAME_UPDATED_AT]: {
    schema: 'updatedAt'
  },
  [keyNames.KEY_NAME_CLOSED_AT]: {
    schema: 'closedAt'
  },
  [keyNames.KEY_NAME_DESCRIPTION]: {
    schema: keyNames.KEY_NAME_DESCRIPTION
  },
  [keyNames.KEY_NAME_DELETED_AT]: {
    schema: ''
    // schema: `restore {
    //   id
    //   aggId
    //   aggType
    //   deletedAt
    //   deletedBy {
    //     id
    //     name
    //   }
    // }`
  },
  [keyNames.KEY_NAME_DELETED_BY]: {
    schema: ``
    // schema: `restore {
    //   id
    //   aggId
    //   aggType
    //   deletedAt
    //   deletedBy {
    //     id
    //     name
    //   }
    // }`
  }
};

export default configFields;
