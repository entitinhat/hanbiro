import { gql } from 'graphql-request';

export const OPPORTUNITY_CREATE = gql`
  mutation q($opportunity: Opportunity!, $customer: Customer!) {
    opportunity_createOpportunity(opportunity: $opportunity, customer: $customer) {
      id
    }
  }
`;

export const OPPORTUNITY_UPDATE = gql`
  mutation q($opportunity: Opportunity) {
    opportunity_updateOpportunity(opportunity: $opportunity) {
      id
    }
  }
`;

export const OPPORTUNITY_BULK_UPDATE = gql`
  mutation q($ids: [String], $opportunity: Opportunity) {
    opportunity_bulkUpdateOpportunity(ids: $ids, opportunity: $opportunity) {
      ids
    }
  }
`;

export const OPPORTUNITY_DELETE = gql`
  mutation q($ids: [String]) {
    opportunity_deleteOpportunity(ids: $ids) {
      ids
    }
  }
`;

export const OPPORTUNITY_RESTORE = gql`
  mutation q($ids: [String]) {
    opportunity_restoreOpportunity(ids: $ids) {
      ids
    }
  }
`;

export const OPPORTUNITY_EMPTY = gql`
  mutation q() {
    opportunity_emptyRecovery() {
      success
    }
  }
`;

export const OPPORTUNITY_DELETE_RECOVERY = gql`
  mutation q($ids: [String]) {
    opportunity_deleteRecovery(ids: $ids) {
      ids
    }
  }
`;

export const OPPORTUNITY_DELETE_COMPETITOR = gql`
  mutation q($id: String, $competitorIds: [String]) {
    opportunity_deleteOpportunityCompetitor(id: $id, competitorIds: $competitorIds) {
      ids
    }
  }
`;

export const OPPORTUNITY_IDENTIFY_CONTACT_CREATE = gql`
  mutation q($id: String!, $identifyContact: IdentifyContactInput!) {
    opportunity_createOpportunityIdentifyContact(id: $id, identifyContact: $identifyContact) {
      id
    }
  }
`;

export const OPPORTUNITY_IDENTIFY_CONTACT_DELETE = gql`
  mutation q($id: String!, $identifyContactIds: [String!]) {
    opportunity_deleteOpportunityIdentifyContact(id: $id, identifyContactIds: $identifyContactIds) {
      ids
    }
  }
`;

export const OPPORTUNITY_LISTS_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunities(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        code
        title
        type
      }
    }
  }
`;

export const OPPORTUNITY_LISTS_COMPETITOR_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunities(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        code
        customer {
          id
          name
          category
          parentAccount {
            id
            name
          }
          account {
            id
            name
          }
        }
        estimatedRevenue
        insightWinProbability
      }
    }
  }
`;

export const OPPORTUNITY_FILES_LIST_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunityFiles(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        type
        file {
          id
          name
        }
        createdAt
        createdBy {
          id
          name
        }
      }
    }
  }
`;

export const OPPORTUNITY_FILE_CREATE = gql`
  mutation q($id: String!, $files: QuoteFile!) {
    opportunity_createOpportunityFile(id: $id, files: $files) {
      ids
    }
  }
`;

export const OPPORTUNITY_FILE_DELETE = gql`
  mutation q($id: String!, $fileIds: [String!]) {
    opportunity_deleteOpportunityFile(id: $id, fileIds: $fileIds) {
      ids
    }
  }
`;

export const OPPORTUNITY_QUOTE_REVISIONS_LIST_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunityQuoteProposals(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        quote {
          id
          code
          name
        }
        quoteRevision {
          id
          code
          name
        }
        isSent
        createdAt
        createdBy {
          id
          name
        }
      }
    }
  }
`;

export const OPPORTUNITY_QUOTE_REVISION_DELETE = gql`
  mutation q($id: String!, $quoteProposalIds: [String!]) {
    opportunity_deleteOpportunityQuoteProposal(id: $id, quoteProposalIds: $quoteProposalIds) {
      ids
    }
  }
`;

export const OPPORTUNITY_QUOTE_REVISION_CREATE = gql`
  mutation q($id: String!, $revision: QuoteRevision!) {
    quote_createQuoteRevision(id: $id, revision: $revision) {
      id
    }
  }
`;

// ============ develop product

export const OPPORTUNITY_PRODUCT_DEVELOP_LIST_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunityProductDevelops(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        product {
          id
          name
        }
        customerNeedAnalysis
        valueProposition
        objections
        createdAt
        createdBy {
          id
          name
        }
        updatedAt
        updatedBy {
          id
          name
        }
      }
    }
  }
`;

export const OPPORTUNITY_PRODUCT_DEVELOP_CREATE = gql`
  mutation q($id: Id, $productDevelop: ProductDevelop) {
    opportunity_createOpportunityProductDevelop(id: $id, productDevelop: $productDevelop) {
      id
    }
  }
`;

export const OPPORTUNITY_PRODUCT_DEVELOP_UPDATE = gql`
  mutation q($id: Id, $productDevelop: ProductDevelop) {
    opportunity_updateOpportunityProductDevelop(id: $id, productDevelop: $productDevelop) {
      id
    }
  }
`;

export const OPPORTUNITY_PRODUCT_DEVELOP_DELETE = gql`
  mutation q($id: Id, $productDevelopIds: ProductDevelopIds) {
    opportunity_deleteOpportunityProductDevelop(id: $id, productDevelopIds: $productDevelopIds) {
      ids
    }
  }
`;

// ============ develop analysis

export const OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_GET = gql`
  query q($filter: SearchFilter) {
    opportunity_opportunityPerceptionAnalyses(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        type
        reviewer {
          id
          name
        }
        todoTasks {
          id
          name
          content
          createdAt
          createdBy {
            id
            name
          }
        }
      }
    }
  }
`;

export const OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_CREATE = gql`
  mutation q($id: Id, $perceptionAnalysis: PerceptionAnalysis) {
    opportunity_createOpportunityPerceptionAnalysis(id: $id, perceptionAnalysis: $perceptionAnalysis) {
      id
    }
  }
`;

export const OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_DELETE = gql`
  mutation q($id: Id, $perceptionAnalysisIds: PerceptionAnalysisIds) {
    opportunity_deleteOpportunityPerceptionAnalysis(id: $id, perceptionAnalysisIds: $perceptionAnalysisIds) {
      ids
    }
  }
`;
