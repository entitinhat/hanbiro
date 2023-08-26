import { gql } from 'graphql-request';

export const NOTE_DELETE_ITEM = gql`
  mutation q($id: String!) {
    builtin_deleteNote(id: $id) {
      id
    }
  }
`;

export const NOTE_CREATE_ITEM = gql`
  mutation q($note: Note) {
    builtin_createNote(note: $note) {
      id
    }
  }
`;

export const NOTE_UPDATE_ITEM = gql`
  mutation q($note: Note) {
    builtin_updateNote(note: $note) {
      id
    }
  }
`;

export const NOTE_GET_LIST_BY_MENU = gql`
  query q($filter: SearchFilter, $source: Source) {
    builtin_notes(filter: $filter, source: $source) {
      results {
        id
        content
        createdBy {
          id
          name
        }
        createdAt
        updatedAt
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

export const NOTES_GET_LIST_BY_MENU = gql`
  query q($filter: SearchFilter, $source: Source) {
    builtin_notes(filter: $filter, source: $source) {
      results {
        id
        content
        order
        createdBy {
          id
          name
        }
        createdAt
        updatedAt
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
export const SORT_NOTES = gql`
mutation q($items: NoteItems!, $source:Source){
  builtin_sortNotes(
    items: $items,
    source: $source
  ){
    result
  }
}
`