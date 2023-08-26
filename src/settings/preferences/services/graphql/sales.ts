import { gql } from 'graphql-request';

export const SETTING_SALES_TEAM_LIST = gql`
  query q($filter: FilterInput) {
    setting_salesTeams(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        name
        leader {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
        description
        email
        assignmentRule {
          id
          name
        }
        products {
          product {
            id
            name
          }
          process {
            id
            name
          }
        }
        members {
          user {
            user {
              id
              name
            }
            group {
              id
              name
            }
          }
          role {
            keyName
            languageKey
          }
          active
        }
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

export const SETTING_SALES_TEAM_VIEW = gql`
  query q($id: String) {
    setting_salesTeam(id: $id) {
      id
      name
      leader {
        user {
          id
          name
        }
        group {
          id
          name
        }
      }
      description
      email
      assignmentRule {
        id
        name
      }
      products {
        product {
          id
          name
        }
        process {
          id
          name
        }
      }
      members {
        user {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
        role {
          keyName
          languageKey
        }
        active
      }
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
`;

export const SETTING_SALES_TEAM_LIST_SELECT = gql`
  query q($filter: FilterInput) {
    setting_salesTeams(filter: $filter) {
      paging {
        totalPage
        totalItems
        currentPage
      }
      results {
        id
        name
      }
    }
  }
`;

export const SETTING_SALES_TEAM_CREATE = gql`
  mutation q($team: TeamInput) {
    setting_createSalesTeam(team: $team) {
      id
    }
  }
`;

export const SETTING_SALES_TEAM_DELETE = gql`
  mutation q($ids: [String]) {
    setting_deleteSalesTeam(ids: $ids) {
      ids
    }
  }
`;

export const SETTING_SALES_TEAM_PRODUCT_CREATE = gql`
  mutation q($id: String, $product: ProductInput) {
    setting_createSalesTeamProduct(id: $id, product: $product) {
      id
    }
  }
`;

export const SETTING_SALES_TEAM_PRODUCT_DELETE = gql`
  mutation q($id: String, $productIds: [String]) {
    setting_deleteSalesTeamProduct(id: $id, productIds: $productIds) {
      ids
    }
  }
`;

export const SETTING_SALES_TEAM_MEMBER_CREATE = gql`
  mutation q($id: String, $member: MemberInput) {
    setting_createSalesTeamMember(id: $id, member: $member) {
      id
    }
  }
`;

export const SETTING_SALES_TEAM_MEMBER_UPDATE = gql`
  mutation q($id: String, $member: MemberInput) {
    setting_updateSalesTeamMember(id: $id, member: $member) {
      id
    }
  }
`;

export const SETTING_SALES_TEAM_MEMBER_DELETE = gql`
  mutation q($id: String, $memberIds: [String]) {
    setting_deleteSalesTeamMember(id: $id, memberIds: $memberIds) {
      ids
    }
  }
`;
