import { gql } from 'graphql-request';
//query:"menu=MENU_DESK"
export const GET_MERGE_FIELDS = gql`
  query q($query: string) {
    setting_mergeFields(filter: { query: $query, sort: { field: "order", orderBy: ASC } }) {
      results {
        id
        menu
        fieldTag
        replace
        fixed
        order
      }
    }
  }
`;
export const SORT_MERGE_FIELD = gql`
  mutation q($items: OrderItems!) {
    setting_sortMergeFields(items: $items) {
      result
    }
  }
`;

export const CREATE_MERGE_FIELD = gql`
  mutation q($mergeField: MergeField!) {
    setting_createMergeField(mergeField: $mergeField) {
      id
    }
  }
`;

export const DELETE_MERGE_FIELD = gql`
  mutation q($id: String!) {
    setting_deleteMergeField(id: $id) {
      id
    }
  }
`;
