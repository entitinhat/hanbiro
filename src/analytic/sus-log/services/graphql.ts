import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      builtin_susLogs(filter: $filter) {
        results {
          ${schemas}
        }
        paging {
          totalPage
          totalItems
          currentPage
          itemPerPage
        }
      }
    }
  `;
};

export const getViewQuery = (schema: string) => {
  return gql`
  query q($id: String!) {
    builtin_susLog(id: $id) {
      ${schema}
    }
  }
  `;
};