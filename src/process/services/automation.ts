import { gql } from 'graphql-request';

export const CREATE_AUTOMATION_RULE = gql`
  mutation q($rule: AutomationRule!) {
    process_createAutomationRule(rule: $rule) {
      id
    }
  }
`;

export const UPDATE_AUTOMATION_RULE = gql`
  mutation q($rule: AutomationRule!) {
    process_updateAutomationRule(rule: $rule) {
      id
    }
  }
`;

export const DELETE_AUTOMATION_RULE = gql`
  mutation q($id: String!) {
    process_deleteAutomationRule(id: $id) {
      id
    }
  }
`;

export const GET_AUTOMATION_RULES = gql`
  query q($filter: SearchFilter) {
    process_automationRules(filter: $filter) {
      results {
        id
        name
        type
        description
        criteria {
          id
          name
        }
        trigger {
          id
          name
        }
        createdAt
      }
      paging {
        totalPage
        totalItems
        currentPage
      }
    }
  }
`;

export const GET_AUTOMATION_RULE = gql`
  query q($id: String!) {
    process_automationRule(id: $id) {
      id
      name
      type
      trigger {
        id
        name
      }
      criteria {
        id
        name
      }
      description
      module
      instants {
        id
        name
        type
        template {
          id
          name
        }
        criteria
        targets {
          id
          name
        }
        field {
          value
          name
          type
        }
        message
      }
    }
  }
`;

