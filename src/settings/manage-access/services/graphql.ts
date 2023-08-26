import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  //// console.log('schemas', schemas);
  return gql`
    query q($filter: SearchFilter) {
      setting_assignmentRules(filter: $filter) {
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

export const DELETE_ASSIGNS_RULE = gql`
  mutation q($ids: [String]) {
    setting_deleteAssignmentRules(ids: $ids) {
      ids
    }
  }
`;
export const DELETE_ASSIGN_RULE = gql`
  mutation q($id: String!) {
    setting_deleteAssignmentRule(id: $id) {
      id
    }
  }
`;
export const COPY_ASSIGN_RULE = gql`
  mutation q($id: String!) {
    setting_copyAssignmentRule(id: $id) {
      id
    }
  }
`;
export const DELETE_ASSIGN_RULE_ENTRY = gql`
  mutation q($id: String!) {
    setting_deleteAssignmentRuleEntry(id: $id) {
      id
    }
  }
`;

// export const DELETE_ASSIGN_RULE_ENTRIES = gql`
//   mutation q($ids: [String!]!) {
//     activity_deleteActivity(ids: $ids) {
//       ids
//     }
//   }
// `;

export const CREATE_ASSIGNMENT_RULE = gql`
  mutation q($ar: AssignmentRule) {
    setting_createAssignmentRule(ar: $ar) {
      id
    }
  }
`;

export const CREATE_ASSIGNMENT_RULE_ENTRY = gql`
  mutation q($ar: AssignmentRule) {
    setting_createAssignmentRuleEntry(arEntry: $arEntry) {
      id
    }
  }
`;

export const CREATE_ASSIGNMENT_RULE_ASSIGN_TO = gql`
  mutation q($id: String, $assignTo: IARAssignTo) {
    setting_createAssignTo(id: $id, assignsTo: $assignTo) {
      id
    }
  }
`;

export const DELETE_ASSIGNMENT_RULE_ASSIGN_TO = gql`
  mutation q($id: String, $assignToId: String) {
    setting_deleteAssignTo(id: $id, assignToId: $assignToId) {
      id
    }
  }
`;

export const DELETE_ASSIGNMENT_RULE_ENTRY = gql`
  mutation q($id: String) {
    setting_deleteAssignmentRuleEntry(id: $id) {
      id
    }
  }
`;
export const UPDATE_ASSIGNMENT_RULE_ENTRY = gql`
  mutation q($arEntry: IAssignMentRule) {
    setting_updateAssignmentRuleEntry(arEntry: $arEntry) {
      id
    }
  }
`;
