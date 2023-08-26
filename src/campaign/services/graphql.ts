import { gql } from 'graphql-request';

export const campaignGetList = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter) {
      marketing_campaigns(filter: $filter) {
        results {
          ${schemas}
        }
      }
    }
  `;
};

export const CAMPAIGN_CREATE = gql`
  mutation q($campaign: CampaignInput) {
    marketing_createCampaign(campaign: $campaign) {
      id
    }
  }
`;

export const CAMPAIGN_UPDATE = gql`
  mutation q($campaign: CampaignInput) {
    marketing_updateCampaign(campaign: $campaign) {
      id
    }
  }
`;

export const CAMPAIGN_DELETE = gql`
  mutation q($ids: [String]) {
    marketing_deleteCampaign(ids: $ids) {
      ids
    }
  }
`;

export const CAMPAIGN_TARGET_MEMBERS_GET = gql`
  query q($filter: SearchFilter) {
    marketing_campaignMembers(filter: $filter) {
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
          code
          name
          category
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
          account {
            id
            name
          }
          createdAt
        }
        campaign {
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

export const CAMPAIGN_TARGET_MEMBER_CREATE = gql`
  mutation q($id: String, $members: MemberInput, $source: String, $marketingList: MarketingListInput) {
    marketing_createCampaignMember(id: $id, members: $members, source: $source, marketingList: $marketingList) {
      ids
    }
  }
`;

export const CAMPAIGN_TARGET_MEMBER_DELETE = gql`
  mutation q($id: String, $memberIds: [String]) {
    marketing_deleteCampaignMember(id: $id, memberIds: $memberIds) {
      ids
    }
  }
`;

export const MARKETING_LISTS_GET = gql`
  query q($filter: SearchFilter) {
    marketing_marketingLists(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        type
        name
      }
    }
  }
`;

export const MARKETING_LIST_MEMBERS_GET = gql`
  query q($filter: SearchFilter) {
    marketing_marketingListMembers(filter: $filter) {
      results {
        id
        source
        customer {
          id
          name
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
          createdAt
          createdBy {
            id
            name
          }
        }
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;
