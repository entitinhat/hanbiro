import { gql } from 'graphql-request';
//attachment
export const ATTACHMENT_GET_LIST_BY_MENU = gql`
  query q($filter: SearchFilter, $source: SourceInput) {
    builtin_attachments(filter: $filter, source: $source) {
      results {
        id
        source {
          id
          menu
        }
        name
        objectId
        objectUrl
        contentType
        size
        download
        createdBy {
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

export const ATTACHMENT_ADD_ITEM = gql`
  mutation q($attachment: Attachment) {
    builtin_createAttachment(attachment: $attachment) {
      id
    }
  }
`;

export const ATTACHMENT_DELETE_ITEM = gql`
  mutation q($id: String!) {
    builtin_deleteAttachment(id: $id) {
      id
    }
  }
`;
