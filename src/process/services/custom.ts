import { gql } from 'graphql-request';

export const CREATE_DEFINED_ITEM = gql`
  mutation q($definedItem: DefinedItem!) {
    process_createDefinedItem(definedItem: $definedItem) {
      id
    }
  }
`;

export const UPDATE_DEFINED_ITEM = gql`
  mutation q($definedItem: DefinedItem!) {
    process_updateDefinedItem(definedItem: $definedItem) {
      id
    }
  }
`;

export const DELETE_DEFINED_ITEM = gql`
  mutation q($id: String!) {
    process_deleteDefinedItem(id: $id) {
      id
    }
  }
`;

export const GET_DEFINED_ITEMS = gql`
  query q($isTenant: Boolean, $type: Type) {
    process_definedItems(isTenant: $isTenant, type: $type) {
      results {
        id
        name
        type
        description
        shape
        createdAt
        statuses {
          id
          name
          button
          view
          event
          direction
          property
          sequence
          multiple
          options
          flag
        }
        setting {
          method
          email
          due
          assign
          cta
          auto
          template
        }
        trigger {
          module
          ptype
          field
          process {
            id
            name
          }
          step {
            id
            name
          }
          property
          trigger
        }
        fixed
      }
    }
  }
`;

export const GET_DEFINED_TRIGGER = gql`
  query q($isTenant: Boolean, $type: Type) {
    process_definedItems(isTenant: $isTenant, type: $type) {
      results {
        id
        name
        type
        trigger {
          module
          ptype
          field
          ftype
          process {
            id
            name
          }
          step {
            id
            name
          }
          property
          trigger
        }
      }
    }
  }
`;

export const GET_DEFINED_FIELDS = gql`
  query q($isTenant: Boolean!, $module: String) {
    process_definedFields(isTenant: $isTenant, module: $module) {
      results {
        id
        module
        fieldName
        fieldType
      }
    }
  }
`;
