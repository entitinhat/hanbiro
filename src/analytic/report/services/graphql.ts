import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  //// console.log('schemas', schemas);
  return gql`
    query q($filter: SearchFilter) {
      analytic_reports(filter: $filter) {
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
    analytic_report(id: $id) {
      dateRange
      ${schema}
    }
  }
  `;
};

export const ANALYTIC_DELETEREPORT = gql`
  mutation q($ids: [String!]!) {
    analytic_deleteReport(ids: $ids) {
      ids
    }
  }
`;

export const ANALYTIC_COPYREPORT = gql`
  mutation q($id: String!) {
    analytic_copyReport(id: $id) {
      id
    }
  }
`;

export const ANALYTIC_CREATEREPORT = gql`
  mutation q($report: Report) {
    analytic_createReport(report: $report) {
      id
    }
  }
`;
