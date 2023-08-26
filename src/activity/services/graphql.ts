import { queryKeys } from '@activity/config/queryKeys';
import { gql } from 'graphql-request';

export const getListQuery = (schemas: string) => {
  return gql`
    query q($filter: SearchFilter, $source: Source) {
      activity_activities(filter: $filter, source: $source) {
        results {
          ${schemas}
        }
        paging {
          totalPage
          totalItems
          currentPage
        }
      }
    }
  `;
};

export const getViewQuery = (schemas: string) => {
  return gql`
    query q($id: String!) {
      ${queryKeys.viewActivity}(id: $id) {
        ${schemas}
      }
    }
  `;
};

export const getComparisonUserQuery = (schemas: string) => {
  return gql`
        query q($filter: SearchFilter) {
            analytic_activityComparisons(filter: $filter) {
                lastTotal {
                    ${schemas}
                }
                results {
                  group{
                    id
                    name
                  }
                    user {
                        id
                        name
                    }
                    total {
                        ${schemas}
                    }
                    lastTotal {
                        ${schemas}
                    }
                }
                total {
                    ${schemas}
                }
            }
        }
    `;
};

export const ACTIVITY_GET_BASIC = gql`
  query q($id: String!) {
    activity_activity(id: $id) {
      id
      category
      subject
    }
  }
`;

export const ACTIVITY_GET_ASSIGNTOS = gql`
  query q($id: String!) {
    activity_assignTos(id: $id) {
      results {
        current {
          code
          name
          phones {
            phoneNumber
          }
          emails {
            email
          }
        }
        type
        id
        name
        phone
        email
      }
    }
  }
`;

export const ACTIVITY_GET_PRODUCTS = gql`
  query q($id: String!) {
    activity_products(id: $id) {
      results {
        id
        name
      }
    }
  }
`;

export const ACTIVITY_GET_CHECKLIST = gql`
  query q($id: String!) {
    activity_checklist(id: $id) {
      results {
        id
        title
        description
        duration {
          time
          unit
        }
        instruction
        doneTime
        done
        workers {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
      }
    }
  }
`;

export const ACTIVITY_GET_SEQUENCES = gql`
  query q($id: String!) {
    activity_sequences(id: $id) {
      results {
        id
        title
        description
        duration {
          time
          unit
        }
        instruction
        doneTime
        done
        workers {
          user {
            id
            name
          }
          group {
            id
            name
          }
        }
      }
    }
  }
`;

export const ADD_ACTIVITY = gql`
  mutation q($activity: Activity) {
    activity_createActivity(activity: $activity) {
      id
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation q($ids: [String!]!) {
    activity_deleteActivity(ids: $ids) {
      ids
    }
  }
`;

export const ADD_SEQUENCE = gql`
  mutation q($id: String!, $sequence: Sequence!) {
    activity_createTaskSequence(id: $id, sequence: $sequence) {
      id
    }
  }
`;

export const UPDATE_SEQUENCE = gql`
  mutation q($id: String!, $sequence: Sequence!) {
    activity_updateTaskSequence(id: $id, sequence: $sequence) {
      id
    }
  }
`;

export const DELETE_SEQUENCE = gql`
  mutation q($id: String!, $refId: String!) {
    activity_deleteTaskSequence(id: $id, refId: $refId) {
      id
    }
  }
`;

export const ADD_CHECKLIST = gql`
  mutation q($id: String!, $checklist: Checklist!) {
    activity_createTaskChecklist(id: $id, checklist: $checklist) {
      id
    }
  }
`;

export const UPDATE_CHECKLIST = gql`
  mutation q($id: String!, $checklist: Checklist!) {
    activity_updateTaskChecklist(id: $id, checklist: $checklist) {
      id
    }
  }
`;

export const DELETE_CHECKLIST = gql`
  mutation q($id: String!, $refId: String!) {
    activity_deleteTaskChecklist(id: $id, refId: $refId) {
      id
    }
  }
`;

export const ADD_ASSIGNTO = gql`
  mutation q($id: String!, $type: String!, $assignTo: [UserOrCustomer!]!) {
    activity_createAssignTo(id: $id, type: $type, assignTo: $assignTo) {
      ids
    }
  }
`;

export const DELETE_ASSIGNTO = gql`
  mutation q($id: String!, $type: String!, $assignTo: [String!]!) {
    activity_deleteAssignTo(id: $id, type: $type, assignTo: $assignTo) {
      ids
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation q($id: String!, $product: IdName!) {
    activity_createProduct(id: $id, product: $product) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation q($id: String!, $refId: String!) {
    activity_deleteProduct(id: $id, refId: $refId) {
      id
    }
  }
`;

export const ACTIVITY_GET_TAGS = gql`
  query q($id: String!) {
    activity_tags(id: $id) {
      results
    }
  }
`;

export const ADD_TAG = gql`
  mutation q($id: String!, $tag: String!) {
    activity_createTag(id: $id, tag: $tag) {
      id
    }
  }
`;

export const DELETE_TAG = gql`
  mutation q($id: String!, $tag: String!) {
    activity_deleteTag(id: $id, tag: $tag) {
      id
    }
  }
`;

export const ACTIVITY_GET_RELATEDTOS = gql`
  query q($id: String!) {
    activity_relatedTos(id: $id) {
      results {
        type
        id
        name
      }
    }
  }
`;

export const ADD_RELATEDTO = gql`
  mutation q($id: String!, $relatedTo: RelatedTo!) {
    activity_createRelatedTo(id: $id, relatedTo: $relatedTo) {
      id
    }
  }
`;

export const DELETE_RELATEDTO = gql`
  mutation q($id: String!, $relatedId: String!) {
    activity_deleteRelatedTo(id: $id, relatedId: $relatedId) {
      id
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation q($activity: Activity!) {
    activity_updateActivity(activity: $activity) {
      id
    }
  }
`;

export const ACITIVITY_QUICK_VIEW = `
  id
  type
  status
  subject
  content
`;

export const ACITIVITY_RESTORE = gql`
  mutation m($ids: [String!]) {
    activity_restoreActivity(ids: $ids) {
      ids
    }
  }
`;

export const ACITIVITY_DELETE_RECOVERY = gql`
  mutation m($ids: [String!]) {
    activity_deleteRecovery(ids: $ids) {
      ids
    }
  }
`;

export const ACITIVITY_EMPTY_RECOVERY = gql`
  mutation m() {
    activity_emptyRecovery() {
      success
    }
  }
`;
