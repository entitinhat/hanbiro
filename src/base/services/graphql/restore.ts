import { gql } from 'graphql-request';

export const DELETE_DOCUMENT = gql`
  mutation m($ids: [String!]) {
    recovery_deleteDocument(ids: $ids) {
      ids
    }
  }
`;

export const RESTORE_DOCUMENT = gql`
  mutation m($ids: [String!]) {
    recovery_restoreDocument(ids: $ids) {
      ids
    }
  }
`;

export const EMPTY_DOCUMENT = gql`
  mutation m($aggType: Number) {
    recovery_emptyDocument(aggType: $aggType) {
      success
    }
  }
`;
