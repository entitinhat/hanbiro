import { gql } from 'graphql-request';

export const COMPETITOR_CREATE = gql`
  mutation q($competitor: Competitor!) {
    competitor_createCompetitor(competitor: $competitor) {
      id
    }
  }
`;

export const COMPETITOR_OPPORTUNITY_CREATE = gql`
  mutation q($id: String, $competitors: Competitors) {
    opportunity_createOpportunityCompetitor(id: $id, competitors: $competitors) {
      ids
    }
  }
`;

export const COMPETITOR_UPDATE = gql`
  mutation q($competitor: Competitor) {
    competitor_updateCompetitor(competitor: $competitor) {
      id
    }
  }
`;

export const COMPETITOR_DELETE = gql`
  mutation q($ids: [String]) {
    competitor_deleteCompetitor(ids: $ids) {
      ids
    }
  }
`;

export const COMPETITOR_RESTORE = gql`
  mutation q($ids: [String]) {
    competitor_restoreCompetitor(ids: $ids) {
      ids
    }
  }
`;

export const COMPETITOR_EMPTY = gql`
  mutation q() {
    competitor_emptyRecovery() {
      success
    }
  }
`;

export const COMPETITOR_DELETE_RECOVERY = gql`
  mutation q($ids: [String]) {
    competitor_deleteRecovery(ids: $ids) {
      ids
    }
  }
`;

export const COMPETITOR_LISTS_GET = gql`
  query q($filter: SearchFilter) {
    competitor_competitors(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        name
        website {
          #label
          #labelValue
          protocol
          website
        }
        products {
          id
          name
        }
        strength
        weakness
      }
    }
  }
`;

export const COMPETITOR_QUICK_VIEW = gql`
  query q($id: String) {
    competitor_competitor(id: $id) {
      id
      code
      name
      website {
        #label
        #labelValue
        protocol
        website
      }
      products {
        id
        name
      }
      strength
      weakness
      description
    }
  }
`;
