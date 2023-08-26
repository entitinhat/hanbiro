import { gql } from 'graphql-request';

export const PRODUCT_GROUPS_GET = gql`
  query q($filter: FilterInput) {
    product_groups(filter: $filter) {
      results {
        id
        name
        parent {
          id
          name
        }
        countProducts
        updatedBy {
          id
          name
        }
        createdAt
        updatedAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const PRODUCT_GROUP_CREATE = gql`
  mutation q($group: GroupInput) {
    product_createGroup(group: $group) {
      id
    }
  }
`;

export const PRODUCT_GROUP_UPDATE = gql`
  mutation q($group: GroupInput) {
    product_updateGroup(group: $group) {
      id
    }
  }
`;

export const PRODUCT_GROUP_DELETE = gql`
  mutation q($ids: [String]) {
    product_deleteGroup(ids: $ids) {
      ids
    }
  }
`;
