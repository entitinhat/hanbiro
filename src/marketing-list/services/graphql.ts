import { gql } from 'graphql-request';

export const ADD_MARKETING_LIST = gql`
  mutation q($marketingList: marketingListInput) {
    marketing_createMarketingList(marketingList: $marketingList) {
      id
    }
  }
`;

export const MARKETING_DELETE = gql`
  mutation q($ids: [String!]!) {
    marketing_deleteMarketingList(ids: $ids) {
      ids
    }
  }
`;

export const GET_MEMBERS = gql`
  query q($filter: Filter) {
    marketing_marketingListMembers(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        source
        customer {
          id
          name
          mobiles {
            id
            label {
              languageKey
              label
            }
            labelValue
            country
            mobileNumber
          }
          account {
            id
            name
          }
          emails {
            id
            label
            labelValue
            email
          }
          phones {
            id
            label
            labelValue
            country
            phoneNumber
            extension
          }
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

export const CREATE_MEMBER = gql`
  mutation q($id: String, $source: String, $members: [Member]) {
    marketing_createMarketingListMember(id: $id, source: $source, members: $members) {
      ids
    }
  }
`;

export const DELETE_MEMBER = gql`
  mutation q($id: string, $memberIds: [string]) {
    marketing_deleteMarketingListMember(id: $id, memberIds: $memberIds) {
      ids
    }
  }
`;

export const GET_RELATED_CAMPAIGN = gql`
  query q($filter: Filter) {
    marketing_marketingListRelatedCampaigns(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        campaign {
          id
          name
          totalMember
        }
        marketingList {
          id
          name
        }
        lastUsedAt
      }
    }
  }
`;
